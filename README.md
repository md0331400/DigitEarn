# DigitEarn

Bangladesh Top Earn স্টাইলের মোবাইল-ফার্স্ট এরনিং প্ল্যাটফর্ম — **সম্পূর্ণ আলাদা Admin Panel** সহ।

> 🎨 UI রেফারেন্স: repo-তে থাকা ১৫টি `Screenshot_*.png` (bdtopearl.com-এর mobile app) অনুযায়ী বানানো।

## আর্কিটেকচার — দুইটা সম্পূর্ণ আলাদা অ্যাপ

| অ্যাপ | পোর্ট | লগইন | কোড |
|---|---|---|---|
|  **User Website** | `3000` | সাধারণ ইউজার (Email + Password) | `public-site/` |
| 🛡️ **Admin Panel** | `3001` | শুধু এডমিন (Username + Password) | `admin/` |

- Admin panel **সাইটের ভেতর নেই** — আলাদা প্রসেস, আলাদা পোর্ট, আলাদা লগইন পেজ, আলাদা ডিজাইন।
- ইউজার সাইট থেকে admin-এর কোনো লিংক নেই।
- দুইটা অ্যাপ শুধু **একটা SQLite database** (`data/digitearn.db`) শেয়ার করে।
- টেক স্ট্যাক: Node.js (built-in `node:sqlite`) + Express + EJS, zero-DB-server।

## চালাতে

```bash
npm install
npm start
```

- User site → http://localhost:3000
- Admin panel → http://localhost:3001

(অথবা আলাদা: `npm run start:user`, `npm run start:admin`)

## ডিফল্ট লগইন (প্রথমবার)

### Admin Panel (port 3001)
| Username | Password |
|---|---|
| `admin` | `admin123` |

> ⚠️ প্রোডাকশনে প্রথম লগইনের পরই Admins প্যেজ থেকে পাসওয়ার্ড পরিবর্তন করে নিন।

### Demo User (port 3000)
| Email | Password |
|---|---|
| `amisayem@gmail.com` | `sayem123` |

## User সাইটে যা যা আছে (screenshot অনুযায়ী)

- **Log In / Sign Up** — referral code, Full Name, BD mobile, email, password; ভিডিও টিউটোরিয়াল বক্স; "Powered by..." ফুটার
- **Welcome modal** — Telegram join, এডমিন ১/২ বাটন (প্রথমবার লগইনে)
- **Dashboard** — "একাউন্ট একটিভ নয়" রড ব্যানার (৳২০ activation bonus), লাইভ **"সাইটের বয়স"** টাইমার, Notice marquee, ১২টি প্রজেক্ট গ্রেড (ফেসবুক সেল, জিমেইল সেল, ইনস্টা সেল, জব পোস্ট 🔒, লিডারশিপ, টার্গেট বোনাস, রেফার, গিফট কোড, অংক ক্রন, মাইজেকো জব, টাইপিং জব 🔒, ADS VIEW OFF 🔒)
- **Task system** — ধাপসহ কাজ, লিংক, daily reward claim
- **গিফট কোড** — প্রতিদিনের কোড দিয়ে বোনাস
- **টার্গেট বোনাস** — ৫/১০/২০ রেফারে ৳৫০/১০০/৩০০
- **লিডারশিপ** — team size অনুযায়ী level (ব্রোঞ্জ→প্লাটিনাম)
- **My Referral Team** — level ১–৪, referral link copy
- **Wallet** — inactive হলে "উইথড্র করতে একাউন্ট এক্টিভ করুন" কার্ড; active হলে bKash/Nagad/Rocket উইথড্র
- **Withdrawal History**, **Account Settings** (email change-able না, password change), **Customer Support** (FB/Telegram/Admin/YouTube + training tutorials)
- হ্যামবার্গার **drawer** (ID, Active/Inactive, Balance, Member Since) ও নিচের **bottom nav** (Help • Wallet • HOME • Team • Profile)

## Admin Panel-এ যা যা আছে

- **Dashboard** — মোট/অ্যাক্টিভ ইউজার, আজকের নিবন্ধন, pending withdrawal টাকার হিসাব, সর্বশেষ activity
- **Users** — সার্চ, pagination, detail পেজ:
  - ✅ **Activate/Deactivate** (activate করলে সাথে সাথে activation bonus auto-credit)
  - 💰 ব্যালেন্স যোগ/বিয়াদ/সেট (+transaction log)
  - 🔑 পাসওয়ার্ড রিসেট, 🗑️ ডিলিট
- **Projects/Tasks** — CRUD: নাম, আইকন, রং, ধরন (task/internal page), লিংক, ধাপ, রিওয়ার্ড, লক, show/hide, sort
- **Withdrawals** — pending → **Paid** (confirm) বা **Reject** (টাকা auto-refund)
- **Transactions** — সব লেনদেনের লগ (সার্চযোগ্য)
- **Notices** — হোম পেজের Notice marquee ম্যানেজ
- **Settings** — সাইটের নাম, সাইটের বয়স তারিখ, ভিডিও লিংক, Telegram/FB/YouTube/activation লিংক, এডমিন ১/২, সব বোনাস, গিফট কোড, টার্গেট টিয়ার, min withdrawal
- **Admins** — একাধিক এডমিন add/delete/password reset (সর্বশেষ এডমিন ডিলিট করা যাবে না)

## ফোল্ডার স্ট্রাকচার

```
├── package.json
├── scripts/start.js          # দুইটা অ্যাপ start করে
├── shared/db.js              # SQLite schema + helpers + seed
├── public-site/              # 👤 User website (port 3000)
│   ├── server.js
│   ├── views/                # EJS templates
│   └── public/               # CSS/JS/logo
├── admin/                    # 🛡️ Admin panel (port 3001) — সম্পূর্ণ আলাদা অ্যাপ
│   ├── server.js
│   ├── views/
│   └── public/
├── data/                     # SQLite DB (auto-created, git-ignored)
└── Screenshot_*.png          # UI রেফারেন্স
```

## প্রোডাকশনের জন্য নোট

1. `public-site/server.js` ও `admin/server.js`-এ session secret পরিবর্তন করুন
2. admin পাসওয়ার্ড পরিবর্তন করুন
3. HTTPS ব্যবহার করুন (reverse proxy: Nginx → port 3000/3001)
4. Admin panel-কে আলাদা ডোমেইনে (যেমন `admin.yourdomain.com`) host করুন — তাহলে এটা ১০০% alada থাকবে
5. বড় traffic হলে SQLite → PostgreSQL/MySQL-এ migrate করুন (shared/db.js-তে সব query এক জায়গায়)
