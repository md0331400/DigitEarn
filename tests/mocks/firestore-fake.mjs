/* Minimal in-memory Firestore mock covering the API surface used by the handlers. */
export const store = { docs: {} };

export const FieldValue = {
  serverTimestamp: () => ({ __srvTs: Date.now() }),
};

export function makeDb() {
  const d = store.docs;
  return {
    collection(...parts) {
      const path = parts.join('/');
      const listDocs = () => Object.entries(d)
        .filter(([k]) => k.startsWith(path + '/'))
        .map(([k, v]) => ({ id: k.split('/').pop(), data: () => v }));
      return {
        doc(id) {
          const key = path + '/' + id;
          return {
            id,
            _key: key,
            get: async () => ({ exists: d[key] !== undefined, data: () => d[key] }),
          };
        },
        where(field, _op, value) {
          const matches = () => Object.entries(d)
            .filter(([k, v]) => k.startsWith(path + '/') && v && v[field] === value);
          const toDocs = m => m.map(([k, v]) => ({ id: k.split('/').pop(), data: () => v }));
          return {
            limit(n) {
              return { get: async () => { const m = matches().slice(0, n); return { empty: !m.length, docs: toDocs(m) }; } };
            },
            get: async () => { const m = matches(); return { empty: !m.length, docs: toDocs(m) }; },
          };
        },
        // collection-level list (users, targetNotices ইত্যাদি — admin scan-এর জন্য)
        limit(n) {
          return { get: async () => { const m = listDocs().slice(0, n); return { empty: !m.length, docs: m }; } };
        },
        get: async () => { const m = listDocs(); return { empty: !m.length, docs: m }; },
      };
    },
    runTransaction: async (fn) => {
      const tx = {
        get: async (ref) => ({ exists: d[ref._key] !== undefined, data: () => d[ref._key] }),
        set: (ref, data) => { d[ref._key] = data; },
        update: (ref, data) => { d[ref._key] = { ...(d[ref._key] || {}), ...data }; },
      };
      return fn(tx);
    },
  };
}
