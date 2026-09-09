/* Fake Admin SDK: token→identity map + in-memory db (shared store). */
import { makeDb } from './firestore-fake.mjs';

export const TOKENS = {
  TOKEN_ALICE: { uid: 'alice', email: 'alice@test.com' },
  TOKEN_BOB: { uid: 'bob', email: 'bob@test.com' },
  TOKEN_ADMIN: { uid: 'admin1', email: 'admin@digitearn.com' },
};

export function getAdminApp() {
  return {
    auth: () => ({
      verifyIdToken: async (t) => {
        const dec = TOKENS[t];
        if (!dec) throw new Error('invalid token');
        return dec;
      },
    }),
  };
}

export function getDb() {
  return makeDb();
}
