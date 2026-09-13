/* Admin panel সময় দেখানোর helper — আলাদা module, কারণ src/admin/core.js Firebase config
   import করে (node test-এ import করা যায় না), আর এটা শুদ্ধ-ভাবে unit-test করতে হবে।

   ⚠️ আসল bug (যা এটা ঠিক করে): Firestore Timestamp JSON হয়ে আসে `{ seconds, nanoseconds }`
   shape-এ (Timestamp.toJSON) — `new Date(obj)` → Invalid Date → পুরো panel-এর সময় '—' দেখাত
   (withdraw queue, processedAt, notification-এর time)। এখন ৪টা shape-ই বোঝে:
   Timestamp object / {__srvTs} (test fake) / number / ISO string। */
export function msOf(v) {
  if (!v) return 0;
  if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
  if (typeof v === 'string') { const t = Date.parse(v); return Number.isFinite(t) ? t : 0; }
  if (typeof v.toDate === 'function') { const d = v.toDate(); return d instanceof Date && d.getTime() ? d.getTime() : 0; }
  if (typeof v === 'object') {
    const sec = Number(v.seconds ?? v._seconds);
    if (Number.isFinite(sec)) return sec * 1000 + Math.round(Number(v.nanoseconds ?? v._nanoseconds ?? 0) / 1e6);
    const srv = Number(v.__srvTs);
    if (Number.isFinite(srv)) return srv;
  }
  return 0;
}

export const timeBn = (ts, locale = 'en-BD') => {
  const ms = msOf(ts);
  if (!ms) return '—';
  const d = new Date(ms);
  try {
    return d.toLocaleString(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch (_) {
    return d.toISOString().slice(0, 16).replace('T', ' ');
  }
};
