/* Minimal in-memory Firestore mock covering the API surface used by the handlers. */
export const store = { docs: {} };

export const FieldValue = {
  serverTimestamp: () => ({ __srvTs: Date.now() }),
};

export function makeDb() {
  const d = store.docs;

  /* ⚠️ REAL Admin SDK semantics: db.collection(a, b, c) SILENTLY IGNORES b and c —
     it returns collection(a). An earlier version of this mock did parts.join('/'),
     which HID a critical production bug (every subcollection write landed in the
     top-level `users/` collection instead of `users/{uid}/sub`, overwriting real
     user docs). Do NOT "helpfully" join extra args here — mirror the real SDK so
     that path bugs fail loudly in tests. Correct usage in handlers:
        db.collection('users').doc(uid).collection('proofs')   */
  function makeColl(path) {
    const depth = path.split('/').length;
    // a collection contains only docs exactly one segment deeper
    const inColl = k => k.startsWith(path + '/') && k.split('/').length === depth + 1;
    const toDocs = entries => entries.map(([k, v]) => ({ id: k.split('/').pop(), data: () => v }));
    const listDocs = () => toDocs(Object.entries(d).filter(([k]) => inColl(k)));

    return {
      path,

      doc(id) {
        const key = path + '/' + id;
        return {
          id,
          _key: key,
          path: key,
          get: async () => ({ exists: d[key] !== undefined, data: () => d[key] }),
          collection: sub => makeColl(key + '/' + sub),
          // real Admin SDK DocumentReference also has set/update/delete — without
          // them a handler using docRef.set() would look broken in tests only.
          set: async (data, opts) => {
            d[key] = (opts && opts.merge) ? { ...(d[key] || {}), ...data } : { ...data };
            return { writeTime: Date.now() };
          },
          update: async data => {
            if (d[key] === undefined) {
              const e = new Error(`NOT_FOUND: no document to update: ${key}`);
              e.code = 5;
              throw e;
            }
            d[key] = { ...d[key], ...data };
          },
          delete: async () => { delete d[key]; },
        };
      },

      where(field, _op, value) {
        const matches = () => Object.entries(d).filter(([k, v]) => inColl(k) && v && v[field] === value);
        return {
          limit(n) {
            return { get: async () => { const m = matches().slice(0, n); const docs = toDocs(m); return { empty: !docs.length, size: docs.length, docs }; } };
          },
          get: async () => { const docs = toDocs(matches()); return { empty: !docs.length, size: docs.length, docs }; },
        };
      },

      // collection-level list (users, targetNotices ইত্যাদি — admin scan-এর জন্য)
      limit(n) {
        return { get: async () => { const docs = listDocs().slice(0, n); return { empty: !docs.length, size: docs.length, docs }; } };
      },
      get: async () => { const docs = listDocs(); return { empty: !docs.length, size: docs.length, docs }; },
    };
  }

  return {
    // extra args intentionally ignored — exactly like firebase-admin
    collection: (...parts) => makeColl(parts[0]),

    runTransaction: async (fn) => {
      const tx = {
        get: async (ref) => {
          /* real Firestore allows tx.get(query) too (guard reads inside a transaction) —
             our query objects expose .get(), so delegate instead of reading a doc key */
          if (ref && ref._key === undefined && typeof ref.get === 'function') return ref.get();
          return { exists: d[ref._key] !== undefined, data: () => d[ref._key] };
        },
        set: (ref, data) => { d[ref._key] = data; },
        update: (ref, data) => {
          // real Firestore: update() on a missing doc throws NOT_FOUND
          if (d[ref._key] === undefined) {
            const err = new Error(`NOT_FOUND: no document to update: ${ref._key}`);
            err.code = 5;
            throw err;
          }
          d[ref._key] = { ...d[ref._key], ...data };
        },
        delete: (ref) => { delete d[ref._key]; },
      };
      return fn(tx);
    },
  };
}
