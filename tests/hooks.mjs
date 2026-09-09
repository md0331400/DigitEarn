/* Resolves firebase-admin + lib/firebase-admin.js to local in-memory fakes. */
const MOCK_FA = new URL('./mocks/firebase-admin-fake.mjs', import.meta.url).href;
const MOCK_FS = new URL('./mocks/firestore-fake.mjs', import.meta.url).href;

export async function resolve(specifier, context, next) {
  if (specifier === 'firebase-admin/firestore') return { url: MOCK_FS, shortCircuit: true };
  const res = await next(specifier, context);
  if (res.url.endsWith('/lib/firebase-admin.js') || res.url.endsWith('/api/_lib/firebase-admin.js')) {
    return { ...res, url: MOCK_FA };
  }
  return res;
}
