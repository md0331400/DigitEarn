/* Settings + user doc cache (localStorage, 5 min TTL) to cut Firestore reads. */
import { db, firebaseReady } from './firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const SETTINGS_KEY = 'de_settings_v1';
const TTL = 5 * 60 * 1000;

const DEFAULTS = {
  siteName: 'DigitEarn',
  footerText: 'POWERED BY DIGITEARN',
  videoUrl: '',
  telegramLink: '',
  facebookLink: '',
  youtubeLink: '',
  activationLink: '',
  admin1Name: 'এডমিন ১',
  admin1Link: '',
  admin1Phone: '',
  admin1Email: '',
  admin2Name: 'এডমিন ২',
  admin2Link: '',
  admin2Phone: '',
  admin2Email: '',
  registerBonus: 10,
  activationBonus: 20,
  activationFee: 30,
  bkashNumber: '',
  nagadNumber: '',
  rocketNumber: '',
  referralBonus: 5,
  minWithdraw: 100,
  /* giftCode ইচ্ছাকৃতভাবে নেই — server-only (settings/secret) */
  giftReward: 5,
  targetTiers: [
    { tier: 5, bonus: 50 },
    { tier: 10, bonus: 100 },
    { tier: 20, bonus: 300 },
  ],
};

let cache = null;

export async function getSettings(force = false) {
  if (!force) {
    try {
      const c = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
      if (c && Date.now() - c.at < TTL) return { ...DEFAULTS, ...c.data };
    } catch (_) {}
  }
  if (!firebaseReady || !db) return { ...DEFAULTS, _missing: true };
  try {
    const snap = await getDoc(doc(db, 'settings', 'site'));
    const data = snap.exists() ? snap.data() : {};
    cache = { data, at: Date.now() };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(cache));
    return { ...DEFAULTS, ...data };
  } catch (_) {
    return { ...DEFAULTS, _missing: true };
  }
}

export async function getUserDoc(uid) {
  if (!firebaseReady || !db || !uid) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}
