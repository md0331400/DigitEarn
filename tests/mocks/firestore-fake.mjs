/* Minimal in-memory Firestore mock covering the API surface used by the handlers. */
export const store = { docs: {} };

/* ---------- concurrency mode (tests/bugfixes.mjs [N]) ----------
   Default mock sequential — ভেতরের "check → তারপর write" race কখনো ধরা পড়ে না।
   setConcurrencyMode(true) করলে:
     - runTransaction() গুলো পরপর serialize হয় (real Firestore একই doc-এর উপর
       একবারে একটা commit; তাই দ্বিতীয় transaction updated data পড়ে)
     - transaction-এর বাইরের প্রতিটা read ২ tick এগিয়ে চলে → দুটো concurrent request
       সত্যিই একে অপরকে মাঝখানে ঢোকে
   ⇒ guard tx-এর বাইরে থাকলে duplicate সেট হয় (test লাল), ভিতরে থাকলে সবুজ। */
export const mockState = { concurrency: false };
export function setConcurrencyMode(on) { mockState.concurrency = !!on; }
const yieldRead = () => (mockState.concurrency ? new Promise(r => setImmediate(() => setImmediate(r))) : Promise.resolve());

let txLock = Promise.resolve();
function withTxLock(body) {
  if (!mockState.concurrency) return body();
  const p = txLock.then(body, body);
  txLock = p.then(() => undefined, () => undefined);
  return p;
}

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
  let autoN = 0;
  function makeColl(path) {
    const depth = path.split('/').length;
    // a collection contains only docs exactly one segment deeper
    const inColl = k => k.startsWith(path + '/') && k.split('/').length === depth + 1;
    const toDocs = entries => entries.map(([k, v]) => ({ id: k.split('/').pop(), data: () => v }));
    const listDocs = () => toDocs(Object.entries(d).filter(([k]) => inColl(k)));

    return {
      path,

      doc(id) {
        /* real Admin SDK: collection.doc() (no arg) → auto-generated id. আগে fake-এ
           সেটা 'path/undefined' হতো → দুইটা notice create করলে একই doc overwrite। */
        const auto = id === undefined || id === null;
        const generated = '_auto' + (++autoN) + Math.random().toString(36).slice(2, 8);
        const key = path + '/' + (auto ? generated : id);
        return {
          id: auto ? generated : id,
          _key: key,
          path: key,
          get: async () => { await yieldRead(); return { exists: d[key] !== undefined, data: () => d[key] }; },
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
            return { get: async () => { await yieldRead(); const m = matches().slice(0, n); const docs = toDocs(m); return { empty: !docs.length, size: docs.length, docs }; } };
          },
          get: async () => { await yieldRead(); const docs = toDocs(matches()); return { empty: !docs.length, size: docs.length, docs }; },
        };
      },

      // collection-level list (users, targetNotices ইত্যাদি — admin scan-এর জন্য)
      limit(n) {
        return { get: async () => { await yieldRead(); const docs = listDocs().slice(0, n); return { empty: !docs.length, size: docs.length, docs }; } };
      },
      get: async () => { await yieldRead(); const docs = listDocs(); return { empty: !docs.length, size: docs.length, docs }; },
    };
  }

  return {
    // extra args intentionally ignored — exactly like firebase-admin
    collection: (...parts) => makeColl(parts[0]),

    runTransaction: (fn) => withTxLock(async () => {
      const tx = {
        get: async (ref) => {
          /* real Firestore allows tx.get(query) too (guard reads inside a transaction) —
             our query objects expose .get(), so delegate instead of reading a doc key */
          if (ref && ref._key === undefined && typeof ref.get === 'function') return ref.get();
          return { exists: d[ref._key] !== undefined, data: () => d[ref._key] };
        },
        // real Firestore tx.set(ref, data, { merge: true }) — merge support না থাকলে
        // handler-এর merge-write টা test-এ doc overwrite (field হারানো) দেখাত না
        set: (ref, data, opts) => {
          d[ref._key] = (opts && opts.merge) ? { ...(d[ref._key] || {}), ...data } : { ...data };
        },
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
    }),
  };
}
