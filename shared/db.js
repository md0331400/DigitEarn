/* Shared SQLite database layer (Node 22 built-in node:sqlite).
   Used by BOTH the user site (port 3000) and the separate admin panel (port 3001). */
const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = process.env.DIGITEARN_DB || path.join(DATA_DIR, 'digitearn.db');

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  balance REAL NOT NULL DEFAULT 0,
  total_earned REAL NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 0,
  referred_by INTEGER,
  welcome_shown INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_login TEXT
);
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_bn TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'fa-solid fa-star',
  color TEXT NOT NULL DEFAULT '#2563eb',
  kind TEXT NOT NULL DEFAULT 'task',
  page TEXT,
  url TEXT,
  steps TEXT NOT NULL DEFAULT '[]',
  reward REAL NOT NULL DEFAULT 0,
  locked INTEGER NOT NULL DEFAULT 0,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS task_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  claimed_on TEXT NOT NULL,
  reward REAL NOT NULL,
  UNIQUE(user_id, task_id, claimed_on)
);
CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  method TEXT NOT NULL,
  account_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  processed_at TEXT
);
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS target_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tier TEXT NOT NULL,
  bonus REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, tier)
);
CREATE TABLE IF NOT EXISTS gift_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  claimed_on TEXT NOT NULL,
  reward REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
`);

/* ---------- helpers ---------- */

let txDepth = 0;
function tx(fn) {
  if (txDepth++ > 0) return fn(); // already inside a transaction
  db.exec('BEGIN');
  try {
    const out = fn();
    db.exec('COMMIT');
    return out;
  } catch (e) {
    try { db.exec('ROLLBACK'); } catch (_) {}
    throw e;
  } finally {
    txDepth--;
  }
}

function getSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const out = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}
function getSetting(key, def = null) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  if (row === undefined || row === null || row.value === null || row.value === '') return def;
  return row.value;
}
function setSetting(key, value) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, String(value));
}

function addBalance(userId, amount, type, note = '') {
  tx(() => {
    db.prepare('UPDATE users SET balance = balance + ? WHERE id = ?').run(amount, userId);
    if (amount > 0) db.prepare('UPDATE users SET total_earned = total_earned + ? WHERE id = ?').run(amount, userId);
    db.prepare('INSERT INTO transactions (user_id, amount, type, note) VALUES (?, ?, ?, ?)').run(userId, amount, type, note);
  });
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ---------- users ---------- */

function newRefCode() {
  for (let i = 0; i < 50; i++) {
    const code = String(Math.floor(10000 + Math.random() * 90000));
    if (!db.prepare('SELECT id FROM users WHERE ref_code = ?').get(code)) return code;
  }
  return String(Date.now()).slice(-6);
}

function createUser({ ref_code, full_name, mobile, email, password_hash, referred_by = null }) {
  const r = db.prepare('INSERT INTO users (ref_code, full_name, mobile, email, password_hash, referred_by) VALUES (?, ?, ?, ?, ?, ?)')
    .run(ref_code, full_name, mobile, email, password_hash, referred_by);
  return Number(r.lastInsertRowid);
}
function getUserById(id) {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!row) return null;
  const u = { ...row };
  u.is_active = !!u.is_active;
  return u;
}
function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE lower(email) = lower(?)').get(email) || null;
}
function getUserByMobile(mobile) {
  return db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile) || null;
}
function getUserByRefCode(code) {
  return db.prepare('SELECT * FROM users WHERE ref_code = ?').get(String(code).trim()) || null;
}
function allUsers({ search = '', page = 1, perPage = 15 } = {}) {
  let where = '';
  const params = [];
  if (search) {
    where = ' WHERE u.full_name LIKE ? OR u.email LIKE ? OR u.mobile LIKE ? OR CAST(u.id AS TEXT) LIKE ? OR u.ref_code LIKE ?';
    const s = `%${search}%`;
    params.push(s, s, s, s, s);
  }
  const total = Number(db.prepare('SELECT COUNT(*) AS c FROM users u' + where).all(...params)[0].c);
  const rows = db.prepare(
    'SELECT u.*, (SELECT COUNT(*) FROM users c WHERE c.referred_by = u.id) AS referrals FROM users u' +
    where + ' ORDER BY u.id DESC LIMIT ? OFFSET ?'
  ).all(...params, perPage, (page - 1) * perPage);
  return { rows: rows.map(r => ({ ...r, is_active: !!r.is_active })), total };
}
function updateUser(id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return;
  const set = keys.map(k => `${k} = ?`).join(', ');
  db.prepare(`UPDATE users SET ${set} WHERE id = ?`).run(...keys.map(k => fields[k]), id);
}
function deleteUser(id) {
  tx(() => {
    db.prepare('DELETE FROM task_claims WHERE user_id = ?').run(id);
    db.prepare('DELETE FROM withdrawals WHERE user_id = ?').run(id);
    db.prepare('DELETE FROM transactions WHERE user_id = ?').run(id);
    db.prepare('DELETE FROM target_claims WHERE user_id = ?').run(id);
    db.prepare('DELETE FROM gift_claims WHERE user_id = ?').run(id);
    db.prepare('UPDATE users SET referred_by = NULL WHERE referred_by = ?').run(id);
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
  });
}
function markWelcomeShown(id) {
  db.prepare('UPDATE users SET welcome_shown = 1 WHERE id = ?').run(id);
}
function touchLogin(id) {
  db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(id);
}

function childIds(ids) {
  if (!ids.length) return [];
  const ph = ids.map(() => '?').join(',');
  return db.prepare(`SELECT id FROM users WHERE referred_by IN (${ph})`).all(...ids).map(r => Number(r.id));
}
function teamCounts(userId) {
  const counts = [0, 0, 0, 0];
  let frontier = [Number(userId)];
  for (let lvl = 1; lvl <= 4; lvl++) {
    frontier = childIds(frontier);
    counts[lvl - 1] = frontier.length;
  }
  return counts;
}
function teamLevelMembers(userId, level) {
  let frontier = [Number(userId)];
  for (let lvl = 1; lvl < level; lvl++) frontier = childIds(frontier);
  const ids = childIds(frontier);
  if (!ids.length) return [];
  const ph = ids.map(() => '?').join(',');
  return db.prepare(`SELECT id, ref_code, full_name, mobile, email, balance, is_active, created_at FROM users WHERE id IN (${ph}) ORDER BY id`).all(...ids)
    .map(r => ({ ...r, is_active: !!r.is_active }));
}

/* ---------- tasks ---------- */

function allTasks({ includeDisabled = false } = {}) {
  const rows = includeDisabled
    ? db.prepare('SELECT * FROM tasks ORDER BY sort, id').all()
    : db.prepare('SELECT * FROM tasks WHERE enabled = 1 ORDER BY sort, id').all();
  return rows.map(t => ({ ...t, steps: safeParse(t.steps, []), locked: !!t.locked, enabled: !!t.enabled }));
}
function getTaskById(id) {
  const t = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!t) return null;
  return { ...t, steps: safeParse(t.steps, []), locked: !!t.locked, enabled: !!t.enabled };
}
function insertTask(data) {
  const r = db.prepare('INSERT INTO tasks (name_bn, icon, color, kind, page, url, steps, reward, locked, enabled, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(data.name_bn, data.icon, data.color || '#2563eb', data.kind, data.page || null, data.url || null, JSON.stringify(data.steps || []), data.reward || 0, data.locked ? 1 : 0, data.enabled ? 1 : 0, data.sort || 0);
  return Number(r.lastInsertRowid);
}
function updateTask(id, data) {
  db.prepare('UPDATE tasks SET name_bn=?, icon=?, color=?, kind=?, page=?, url=?, steps=?, reward=?, locked=?, enabled=?, sort=? WHERE id=?')
    .run(data.name_bn, data.icon, data.color || '#2563eb', data.kind, data.page || null, data.url || null, JSON.stringify(data.steps || []), data.reward || 0, data.locked ? 1 : 0, data.enabled ? 1 : 0, data.sort || 0, id);
}
function deleteTask(id) {
  tx(() => {
    db.prepare('DELETE FROM task_claims WHERE task_id = ?').run(id);
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  });
}
function claimedToday(userId, taskId) {
  return !!db.prepare('SELECT id FROM task_claims WHERE user_id = ? AND task_id = ? AND claimed_on = ?').get(userId, taskId, today());
}
function claimTask(userId, taskId, reward) {
  db.prepare('INSERT INTO task_claims (user_id, task_id, claimed_on, reward) VALUES (?, ?, ?, ?)').run(userId, taskId, today(), reward);
}

/* ---------- gift / target ---------- */

function giftClaimedToday(userId) {
  return !!db.prepare('SELECT id FROM gift_claims WHERE user_id = ? AND claimed_on = ?').get(userId, today());
}
function insertGiftClaim(userId, code, reward) {
  db.prepare('INSERT INTO gift_claims (user_id, code, claimed_on, reward) VALUES (?, ?, ?, ?)').run(userId, code, today(), reward);
}
function targetClaimed(userId, tier) {
  return !!db.prepare('SELECT id FROM target_claims WHERE user_id = ? AND tier = ?').get(userId, String(tier));
}
function insertTargetClaim(userId, tier, bonus) {
  db.prepare('INSERT INTO target_claims (user_id, tier, bonus) VALUES (?, ?, ?)').run(userId, String(tier), bonus);
}
function safeParse(s, def) {
  try { return JSON.parse(s); } catch (_) { return def; }
}

/* ---------- withdrawals ---------- */

function insertWithdrawal({ userId, amount, method, accountNumber }) {
  const r = db.prepare('INSERT INTO withdrawals (user_id, amount, method, account_number) VALUES (?, ?, ?, ?)').run(userId, amount, method, accountNumber);
  return Number(r.lastInsertRowid);
}
function userWithdrawals(userId) {
  return db.prepare('SELECT * FROM withdrawals WHERE user_id = ? ORDER BY id DESC').all(userId)
    .map(w => ({ ...w, is_active: !!w.is_active }));
}
function allWithdrawals(status = 'all', limit = 300) {
  const q = status === 'all'
    ? 'SELECT w.*, u.full_name, u.email, u.ref_code FROM withdrawals w LEFT JOIN users u ON u.id = w.user_id ORDER BY w.id DESC LIMIT ?'
    : 'SELECT w.*, u.full_name, u.email, u.ref_code FROM withdrawals w LEFT JOIN users u ON u.id = w.user_id WHERE w.status = ? ORDER BY w.id DESC LIMIT ?';
  const rows = status === 'all' ? db.prepare(q).all(limit) : db.prepare(q).all(status, limit);
  return rows;
}
function getWithdrawal(id) {
  const w = db.prepare('SELECT * FROM withdrawals WHERE id = ?').get(id);
  return w || null;
}
function setWithdrawalStatus(id, status, note = '') {
  db.prepare("UPDATE withdrawals SET status = ?, note = ?, processed_at = datetime('now') WHERE id = ?").run(status, note, id);
}

/* ---------- notices / transactions ---------- */

function enabledNotices() {
  return db.prepare('SELECT * FROM notices WHERE enabled = 1 ORDER BY sort, id').all();
}
function allNotices() {
  return db.prepare('SELECT * FROM notices ORDER BY sort, id').all().map(n => ({ ...n, enabled: !!n.enabled }));
}
function insertNotice(text) {
  const max = db.prepare('SELECT MAX(sort) AS m FROM notices').get().m || 0;
  db.prepare('INSERT INTO notices (text, sort) VALUES (?, ?)').run(text, max + 1);
}
function toggleNotice(id) {
  db.prepare('UPDATE notices SET enabled = 1 - enabled WHERE id = ?').run(id);
}
function deleteNotice(id) {
  db.prepare('DELETE FROM notices WHERE id = ?').run(id);
}
function searchTransactions(search = '', limit = 300) {
  let q = 'SELECT t.*, u.full_name, u.email, u.ref_code FROM transactions t LEFT JOIN users u ON u.id = t.user_id';
  const params = [];
  if (search) {
    q += ' WHERE u.full_name LIKE ? OR u.email LIKE ? OR CAST(t.user_id AS TEXT) LIKE ? OR u.ref_code LIKE ?';
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  q += ' ORDER BY t.id DESC LIMIT ?';
  return db.prepare(q).all(...params, limit);
}

/* ---------- admins ---------- */

function allAdmins() {
  return db.prepare('SELECT * FROM admins ORDER BY id').all();
}
function getAdminByUsername(username) {
  return db.prepare('SELECT * FROM admins WHERE username = ?').get(username) || null;
}
function insertAdmin({ username, name, password_hash }) {
  const r = db.prepare('INSERT INTO admins (username, name, password_hash) VALUES (?, ?, ?)').run(username, name, password_hash);
  return Number(r.lastInsertRowid);
}
function deleteAdmin(id) {
  db.prepare('DELETE FROM admins WHERE id = ?').run(id);
}
function updateAdminPassword(id, password_hash) {
  db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(password_hash, id);
}

/* ---------- seed ---------- */

function seed() {
  const seeded = getSetting('seeded', null);
  if (seeded) return;
  tx(() => {
    const defaults = {
      site_name: 'BANGLADESH TOP EARN',
      site_start: '2026-04-29',
      footer_text: 'POWERED BY ABIR IT',
      video_url: '',
      telegram_link: 'https://t.me/bdtopearn',
      facebook_link: 'https://facebook.com/bdtopearn',
      youtube_link: 'https://youtube.com/@bdtopearn',
      activation_link: 'https://t.me/bdtopearn',
      admin1_name: 'এডমিন ১',
      admin1_link: 'https://t.me/bdtopearn',
      admin2_name: 'এডমিন ২',
      admin2_link: 'https://t.me/bdtopearn',
      register_bonus: '10',
      activation_bonus: '20',
      referral_bonus: '5',
      min_withdraw: '100',
      gift_code: 'BDEARN01',
      gift_reward: '5',
      target_tiers: JSON.stringify([{ tier: 5, bonus: 50 }, { tier: 10, bonus: 100 }, { tier: 20, bonus: 300 }]),
      seeded: '1',
    };
    for (const [k, v] of Object.entries(defaults)) setSetting(k, v);

    // default admin: admin / admin123
    if (!getAdminByUsername('admin')) {
      const bcrypt = require('bcryptjs');
      insertAdmin({ username: 'admin', name: 'Super Admin', password_hash: bcrypt.hashSync('admin123', 10) });
    }

    const tasks = [
      { name_bn: 'ফেসবুক সেল', icon: 'fa-brands fa-facebook-f', color: '#1877f2', kind: 'task', url: 'https://facebook.com', steps: ['লিংক থেকে পেজে গিয়ে লাইক করুন', 'ফলো / ফলোয়িং করুন', 'সম্পন্ন হলে Claim বাটনে ক্লিক করুন'], reward: 5, locked: 0, sort: 1 },
      { name_bn: 'জিমেইল সেল', icon: 'fa-solid fa-envelope', color: '#ef4444', kind: 'task', url: 'https://mail.google.com', steps: ['লিংকে গিয়ে Gmail ইনবক্সে পোস্ট দেখুন', 'পোস্টে লাইক ও কমেন্ট করুন', 'Claim বাটনে ক্লিক করুন'], reward: 10, locked: 0, sort: 2 },
      { name_bn: 'ইনস্টা সেল', icon: 'fa-brands fa-instagram', color: '#e1306c', kind: 'task', url: 'https://instagram.com', steps: ['লিংকে গিয়ে পোস্টে লাইক করুন', 'ফলো করুন', 'Claim বাটনে ক্লিক করুন'], reward: 5, locked: 0, sort: 3 },
      { name_bn: 'জব পোস্ট', icon: 'fa-solid fa-briefcase', color: '#10b981', kind: 'task', url: 'https://t.me/bdtopearn', steps: ['টেলেগ্রাম চ্যানেলে জব পোস্ট শেয়ার করুন', 'স্ক্রিনশট এডমিনকে পাঠান', 'Claim বাটনে ক্লিক করুন'], reward: 15, locked: 1, sort: 4 },
      { name_bn: 'লিডারশিপ', icon: 'fa-solid fa-crown', color: '#f59e0b', kind: 'page', page: 'leadership', sort: 5 },
      { name_bn: 'টার্গেট বোনাস', icon: 'fa-solid fa-bullseye', color: '#ef4444', kind: 'page', page: 'target', sort: 6 },
      { name_bn: 'রেফার', icon: 'fa-solid fa-users', color: '#8b5cf6', kind: 'page', page: 'team', sort: 7 },
      { name_bn: 'গিফট কোড', icon: 'fa-solid fa-gift', color: '#ec4899', kind: 'page', page: 'gift', sort: 8 },
      { name_bn: 'অংক ক্রন', icon: 'fa-solid fa-calculator', color: '#0ea5e9', kind: 'task', url: 'https://youtube.com', steps: ['ভিডিও দেখে অংক সমাধান করুন', 'উত্তর এডমিনকে পাঠান', 'সঠিক হলে Claim করুন'], reward: 8, locked: 0, sort: 9 },
      { name_bn: 'মাইজেকো জব', icon: 'fa-solid fa-list-check', color: '#6366f1', kind: 'task', url: 'https://myjob.com.bd', steps: ['লিংকে গিয়ে জব পোস্টে অ্যাপ্লাই করুন', 'স্ক্রিনশট এডমিনকে পাঠান', 'Claim বাটনে ক্লিক করুন'], reward: 12, locked: 0, sort: 10 },
      { name_bn: 'টাইপিং জব', icon: 'fa-solid fa-keyboard', color: '#8b5cf6', kind: 'task', url: 'https://t.me/bdtopearn', steps: ['টেলেগ্রামে দেওয়া টেক্সট টাইপ করুন', 'স্ক্রিনশট এডমিনকে পাঠান', 'Claim বাটনে ক্লিক করুন'], reward: 20, locked: 1, sort: 11 },
      { name_bn: 'ADS VIEW OFF', icon: 'fa-solid fa-bullhorn', color: '#0ea5e9', kind: 'task', url: 'https://t.me/bdtopearn', steps: ['বিজ্ঞাপন লিংকে ১০ সেকেন্ড ভিউ করুন', 'স্ক্রিনশট এডমিনকে পাঠান', 'Claim বাটনে ক্লিক করুন'], reward: 3, locked: 1, sort: 12 },
    ];
    for (const t of tasks) insertTask({ ...t, enabled: 1 });

    // demo user: Md Abu Sayem (amisayem@gmail.com / sayem123)
    if (!getUserByEmail('amisayem@gmail.com')) {
      const bcrypt = require('bcryptjs');
      createUser({
        ref_code: newRefCode(),
        full_name: 'Md Abu Sayem',
        mobile: '01712345678',
        email: 'amisayem@gmail.com',
        password_hash: bcrypt.hashSync('sayem123', 10),
      });
    }

    insertNotice('গিফট কোড বোনাস পেতে আমাদের টেলিগ্রাম চ্যানেলে যোগাযোগ করুন');
    insertNotice('নতুন আইডি রেজিস্টার করলে সাথে সাথে ১০ টাকা বোনাস!');
  });
}
seed();

module.exports = {
  db, tx,
  getSettings, getSetting, setSetting,
  addBalance, today,
  newRefCode, createUser, getUserById, getUserByEmail, getUserByMobile, getUserByRefCode,
  allUsers, updateUser, deleteUser, markWelcomeShown, touchLogin, teamCounts, teamLevelMembers,
  allTasks, getTaskById, insertTask, updateTask, deleteTask, claimedToday, claimTask,
  giftClaimedToday, insertGiftClaim, targetClaimed, insertTargetClaim, safeParse,
  insertWithdrawal, userWithdrawals, allWithdrawals, getWithdrawal, setWithdrawalStatus,
  enabledNotices, allNotices, insertNotice, toggleNotice, deleteNotice,
  searchTransactions,
  allAdmins, getAdminByUsername, insertAdmin, deleteAdmin, updateAdminPassword,
};
