/* Admin Management (Owner + Full Access) — "Join admin" আবেদন approve/reject,
   সরাসরি admin account তৈরি, suspend/unsuspend. NOTUN VERCEL FUNCTION না:
   সবকিছু /api/admin/panel?op=write এর ভেতর (what: 'join-approve' | 'join-reject' |
   'admin-create' | 'admin-suspend') — Vercel Hobby limit ১২।

   Security rules (owner-এর instruction):
   - self-service কেউ admin হতে পারে না: 'admin-join' শুধু আবেদন লেখে (status pending)।
   - approve করলেই admins/{email} doc + Firebase Auth user তৈরি হয় (Admin SDK)।
   - আবেদনকারীর password কোথাও store হয় না — approve-এর পর একটা password-setup
     link তৈরি করে owner-কে দেওয়া হয় (নিজে পাঠিয়ে দিন)।
   - Job Poster admin এখানে কিছুই পারে না (canManage() server-side gate)।
   - role field ছাড়া পুরোনো admin doc = Full Access (roleOf) — সেই ধরেই authority। */
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth } from '../firebase-admin.js';
import { ApiError } from '../http.js';
import { ROLE_OWNER, ROLE_FULL, ROLE_POSTER, roleOf } from '../../src/core/microjobs.js';

export const JOIN_COLLECTION = 'adminJoins';
export const MANAGER_ROLES = [ROLE_OWNER, ROLE_FULL];
/** Owner + Full Access = "full control"; Job Poster manage authority পায় না (§ user rule) */
export const canManage = role => MANAGER_ROLES.includes(role);
export const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim()) && String(v || '').length <= 120;

function authOf(injected) {
  if (injected) return injected;
  try { return getAdminAuth(); } catch (_) { return null; }   /* env না থাকলে doc লেখা যাবে, auth হবে না (message সহ) */
}

/* ---------- join request (public, no auth) ---------- */
export async function createJoinRequest({ db, email, fullName, requestedRole, note }) {
  const key = String(email).toLowerCase();
  const col = db.collection(JOIN_COLLECTION);
  const existing = (await col.doc(key).get())?.data?.() || null;
  if (existing && existing.status === 'pending') {
    /* বারবার আবেদন ঠেকাতে ছোট cooldown (serverless, তাই doc-এর updatedAt ই state) */
    const t = whenMs(existing.updatedAt || existing.createdAt);
    if (t && Date.now() - t < 5 * 60 * 1000) {
      throw new ApiError(429, 'এই email দিয়ে আগেই একটা আবেদন পাঠানো হয়েছে — রিভিউ শেষ হলে আবার চেষ্টা করুন');
    }
  }
  const alreadyAdmin = (await db.collection('admins').doc(key).get())?.exists;
  if (alreadyAdmin) {
    throw new ApiError(409, 'এই email দিয়ে আগেই admin account আছে — Login করুন');
  }
  const data = {
    email: key,
    fullName: String(fullName || '').trim().slice(0, 60),
    requestedRole,
    note: String(note || '').trim().slice(0, 300),
    status: 'pending',
    attempts: Number((existing && existing.attempts) || 0) + 1,
    createdAt: (existing && existing.createdAt) || FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    reviewedBy: null, reviewNote: null, reviewedAt: null,
  };
  await col.doc(key).set(data, { merge: true });
  return { status: 'pending', attempts: data.attempts };
}

function whenMs(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v.toDate === 'function') { const d = v.toDate(); return d instanceof Date ? d.getTime() : 0; }
  if (typeof v.__srvTs === 'number') return v.__srvTs;   /* sentinel shape (tests + optimistic local) */
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
}

/* ---------- account create / approve (manager only) ---------- */
/** admins/{email} doc + Firebase Auth user — একসাথে, নইলে "admin list-এ আছে কিন্তু
   login করা যায় না" (বা উল্টোটা) অবস্থা তৈরি হতো। */
export async function provisionAdmin({ db, auth, email, fullName, role, balance = 0, actorEmail, fromJoin, password }) {
  const key = String(email).toLowerCase();
  const a = authOf(auth);
  const safeRole = role === ROLE_OWNER ? ROLE_OWNER : (role === ROLE_FULL ? ROLE_FULL : ROLE_POSTER);
  let uid = null;
  let authError = '';
  let setupLink = null;
  const pass = String(password || '').trim();
  try {
    if (a) {
      let exist = null;
      try { exist = await a.getUserByEmail(key); } catch (_) { exist = null; }
      if (exist) {
        uid = exist.uid;                                  /* আগে থেকেই account (ধরো normal user) → শুধু role যোগ */
      } else {
        /* password না দিলে Firebase Auth user password ছাড়াই তৈরি — তারপর reset
           link দিয়ে নিজে সেট করে (আবেদনকারীর password কোথাও রাখা হয় না) */
        const req = { email: key, emailVerified: true, displayName: String(fullName || key).slice(0, 60) };
        if (pass) req.password = pass;
        const created = await a.createUser(req);
        uid = created && created.uid ? created.uid : null;
      }
      if (!pass) {
        /* password জানানো হয়নি → owner এটা কপি করে পাঠাতে পারবেন */
        try { setupLink = await a.generatePasswordResetLink(key); } catch (e) { authError = String(e && e.code || e && e.message || e).slice(0, 120); }
      }
    } else authError = 'Admin Auth env নেই — শুধু admin doc তৈরি হয়েছে';
  } catch (e) {
    authError = String((e && (e.code || e.message)) || e).slice(0, 160);
    if (/password|INVALID_LOGIN/i.test(authError) && !pass) {
      try { setupLink = await a.generatePasswordResetLink(key); authError = ''; } catch (_) { /* আগের error-ই থাকে */ }
    }
  }
  const patch = {
    isAdmin: true,
    role: safeRole,
    suspended: false,
    balance: Math.max(0, Number(balance) || 0),
    fullName: String(fullName || '').trim().slice(0, 60),
    uid: uid || null,
    createdBy: String(actorEmail || '').toLowerCase(),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (fromJoin) patch.approvedJoinAt = FieldValue.serverTimestamp();
  await db.collection('admins').doc(key).set(patch, { merge: true });
  if (fromJoin) {
    await db.collection(JOIN_COLLECTION).doc(String(fromJoin).toLowerCase()).set({
      status: 'approved', reviewedBy: String(actorEmail || '').toLowerCase(),
      reviewedAt: FieldValue.serverTimestamp(), reviewNote: '', role: safeRole,
    }, { merge: true });
  }
  return { email: key, role: safeRole, uid, setupLink, authError };
}

export async function rejectJoin({ db, email, reason, actorEmail }) {
  const key = String(email).toLowerCase();
  const snap = await db.collection(JOIN_COLLECTION).doc(key).get();
  if (!snap.exists) { throw new ApiError(404, 'আবেদন পাওয়া যায়নি'); }
  await db.collection(JOIN_COLLECTION).doc(key).set({
    status: 'rejected', reviewedBy: String(actorEmail || '').toLowerCase(),
    reviewedAt: FieldValue.serverTimestamp(), reviewNote: String(reason || '').slice(0, 300),
  }, { merge: true });
  return { email: key, status: 'rejected' };
}

/* ---------- suspend / unsuspend (manager only) ---------- */
export async function setSuspended({ db, email, suspended, reason, actorEmail, myRole }) {
  const key = String(email).toLowerCase();
  const me = String(actorEmail || '').toLowerCase();
  if (suspended && key === me) { throw new ApiError(400, 'নিজেকে suspend করা যাবে না (সাথে সাথেই বন্ধ হয়ে যাবে)'); }
  const doc = await db.collection('admins').doc(key).get();
  if (!doc.exists) { throw new ApiError(404, 'Admin পাওয়া যায়নি'); }
  const d = doc.data() || {};
  if (suspended && roleOf(d) === ROLE_OWNER) {
    /* শেষ Owner suspend করলে কেউ manage করতে পারবে না → আটকায় (role-এর নিয়মের সাথে মিলে) */
    const all = await db.collection('admins').limit(200).get();
    const liveOwners = (all.docs || []).filter(x => {
      const v = x.data() || {};
      return roleOf(v) === ROLE_OWNER && !v.suspended;
    });
    if (liveOwners.length <= 1 && liveOwners.some(x => x.id === key)) {
      throw new ApiError(400, 'কমপক্ষে একজন Owner চালু থাকতে হবে — আগে আরেকজনকে Owner করুন');
    }
  }
  /* Full Access admin অন্য Full Access/Owner কে suspend করতে পারবে না — শুধু Owner পারবে */
  if (suspended && roleOf(d) === ROLE_OWNER && myRole !== ROLE_OWNER) {
    throw new ApiError(403, 'Owner account শুধু Ownerই suspend করতে পারেন');
  }
  await db.collection('admins').doc(key).set({
    suspended: !!suspended,
    suspendReason: suspended ? String(reason || '').slice(0, 300) : null,
    suspendedBy: suspended ? me : null,
    suspendedAt: suspended ? FieldValue.serverTimestamp() : null,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return { email: key, suspended: !!suspended };
}
