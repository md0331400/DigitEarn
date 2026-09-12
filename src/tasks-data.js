/* Single source of truth for task/project content.
   Used by: scripts/gen-task-pages.mjs (static SEO pages), scripts/seed.mjs (Firestore),
   and as the static fallback shown on each task page before Firebase loads. */

export const SITE = {
  name: 'DigitEarn',
  url: 'https://digitearn.vercel.app',
  locale: 'bn-BD',
};

export const TASKS = [
  {
    slug: 'facebook-sale',
    nameBn: 'ফেসবুক সেল',
    nameEn: 'Facebook',
    icon: 'fa-brands fa-facebook-f',
    color: '#1877f2',
    reward: 4.5,
    url: 'https://facebook.com',
    locked: false,
    sort: 1,
    password: '', // admin panel → Micro Jobs → Account Password (repo-তে real credential রাখা যাবে না — git history public)
    submitLabel: 'SUBMIT FACEBOOK ID',
    historyLabel: 'View Activity History',
    dailyLimit: 20,
    inputFields: [
      { label: 'UID', type: 'text', placeholder: 'UID', required: true },
      { label: 'Password', type: 'password', placeholder: 'Password', required: true },
      { label: 'Cookies', type: 'textarea', placeholder: 'Cookies এখানে পেস্ট করুন', required: false },
    ],
    steps: [
      'যে Facebook account বিক্রি করবেন তার পাসওয়ার্ড উপরের পাসওয়ার্ডে পরিবর্তন করুন',
      'সেই account-এর UID, Password ও Cookies নিচের ঘরে দিন',
      'Submit করুন — admin approve করলেই টাকা ব্যালেন্সে যোগ হবে',
    ],
    seo: {
      title: 'Facebook Sale Task — প্রতিদিন ৳৫ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এ Facebook Sale টাস্ক করে প্রতিদিন ৳৫ রিওয়ার্ড আর্ন করুন। ফেসবুক পেজ লাইক, ফলো করে সহজে রিওয়ার্ড ক্লেইম করুন — নতুন আইডিতে ৳১০ রেজিস্ট্রেশন বোনাস।',
    },
  },
  {
    slug: 'gmail-sale',
    nameBn: 'জিমেইল সেল',
    nameEn: 'Gmail',
    icon: 'fa-solid fa-envelope',
    color: '#ef4444',
    reward: 15,
    url: 'https://mail.google.com',
    locked: false,
    sort: 2,
    password: '', // ^ একই কারণে seed-এ credential নেই
    submitLabel: 'SUBMIT GMAIL',
    historyLabel: 'View Gmail History',
    dailyLimit: 20,
    inputFields: [
      { label: 'জিমেইল এড্রেস', type: 'email', placeholder: 'example@gmail.com', required: true },
      { label: 'পাসওয়ার্ড', type: 'password', placeholder: 'পাসওয়ার্ড লিখুন', required: true },
    ],
    steps: [
      'যে Gmail account বিক্রি করবেন তার পাসওয়ার্ড উপরের পাসওয়ার্ডে পরিবর্তন করুন',
      'সেই Gmail এড্রেস ও পাসওয়ার্ড নিচের ঘরে দিন',
      'Submit করুন — admin approve করলেই টাকা ব্যালেন্সে যোগ হবে',
    ],
    seo: {
      title: 'Gmail Sale Task — প্রতিদিন ৳১০ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এ Gmail Sale টাস্ক করে প্রতিদিন ৳১০ রিওয়ার্ড আর্ন করুন। Gmail ইনবক্সে পোস্টে লাইক-কমেন্ট করে সহজে টাকা আর্ন করুন — বোনাস ও রেফারেল সুবিধাসহ।',
    },
  },
  {
    slug: 'instagram-sale',
    nameBn: 'ইনস্টা সেল',
    nameEn: 'Instagram',
    icon: 'fa-brands fa-instagram',
    color: '#e1306c',
    reward: 3,
    url: 'https://instagram.com',
    locked: false,
    sort: 3,
    password: '', // admin panel → Micro Jobs → Account Password (repo-তে real credential রাখা যাবে না — git history public)
    submitLabel: 'SUBMIT INSTAGRAM ID',
    historyLabel: 'View Sales History',
    dailyLimit: 20,
    inputFields: [
      { label: 'Username', type: 'text', placeholder: '@username', required: true },
      { label: 'Password', type: 'password', placeholder: 'Password', required: true },
      { label: 'Profile Link', type: 'url', placeholder: 'https://instagram.com/username', required: false },
    ],
    steps: [
      'যে Instagram account বিক্রি করবেন তার পাসওয়ার্ড উপরের পাসওয়ার্ডে পরিবর্তন করুন',
      'সেই account-এর Username, Password ও 2FA Key নিচের ঘরে দিন',
      'Submit করুন — admin approve করলেই টাকা ব্যালেন্সে যোগ হবে',
    ],
    seo: {
      title: 'Instagram Sale Task — প্রতিদিন ৳৫ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এ Instagram Sale টাস্ক করে প্রতিদিন ৳৫ রিওয়ার্ড আর্ন করুন। ইনস্টাগ্রাম পোস্ট লাইক ও ফলো করে সহজে রিওয়ার্ড ক্লেইম করুন।',
    },
  },
  {
    slug: 'job-post',
    nameBn: 'জব পোস্ট',
    nameEn: 'Job Post',
    icon: 'fa-solid fa-briefcase',
    color: '#10b981',
    reward: 15,
    url: 'https://digitearn.vercel.app/help.html',
    locked: true,
    sort: 4,
    steps: [
      'টেলেগ্রাম চ্যানেলে পাওয়া জব পোস্ট শেয়ার করুন',
      'স্ক্রিনশট এডমিনকে পাঠান',
      'কনফার্ম হলে Submit বাটনে ক্লিক করুন',
    ],
    seo: {
      title: 'Job Post Task — ৳১৫ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এর Job Post টাস্কে জব পোস্ট শেয়ার করে ৳১৫ রিওয়ার্ড আর্ন করুন। শীঘ্রই খুলছে — আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।',
    },
  },
  {
    slug: 'angk-kron',
    nameBn: 'অংক ক্রন',
    nameEn: 'Angk Kron (Math)',
    icon: 'fa-solid fa-calculator',
    color: '#0ea5e9',
    reward: 8,
    url: 'https://youtube.com',
    locked: false,
    sort: 9,
    steps: [
      'ভিডিও দেখে অংকটি সমাধান করুন',
      'উত্তরটি এডমিনকে পাঠান',
      'সঠিক উত্তর কনফার্ম হলে Claim করুন',
    ],
    seo: {
      title: 'Angk Kron (Math) Task — প্রতিদিন ৳৮ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এ Angk Kron ম্যাথ টাস্ক করে প্রতিদিন ৳৮ রিওয়ার্ড আর্ন করুন। ভিডিও দেখে অংক সমাধান করে সহজে টাকা আর্ন করুন।',
    },
  },
  {
    slug: 'myjob',
    nameBn: 'মাইজাগো জব',
    nameEn: 'MyJago Job',
    icon: 'fa-solid fa-list-check',
    color: '#6366f1',
    reward: 12,
    url: 'https://myjago.com',
    locked: false,
    sort: 10,
    steps: [
      'লিংকে গিয়ে MyJago প্ল্যাটফর্মে জব পোস্টে অ্যাপ্লাই করুন',
      'স্ক্রিনশট এডমিনকে পাঠান',
      'Submit বাটনে ক্লিক করুন',
    ],
    seo: {
      title: 'MyJago Job Task — প্রতিদিন ৳১২ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এ MyJago Job টাস্ক করে প্রতিদিন ৳১২ রিওয়ার্ড আর্ন করুন। MyJago প্ল্যাটফর্মে জব অ্যাপ্লাই করে সহজে রিওয়ার্ড ক্লেইম করুন।',
    },
  },
  {
    slug: 'typing-job',
    nameBn: 'টাইপিং জব',
    nameEn: 'Typing Job',
    icon: 'fa-solid fa-keyboard',
    color: '#8b5cf6',
    reward: 20,
    url: 'https://digitearn.vercel.app/help.html',
    locked: true,
    sort: 11,
    steps: [
      'টেলেগ্রামে দেওয়া টেক্সটটি টাইপ করুন',
      'স্ক্রিনশট এডমিনকে পাঠান',
      'কনফার্ম হলে Submit বাটনে ক্লিক করুন',
    ],
    seo: {
      title: 'Typing Job Task — ৳২০ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এর Typing Job টাস্কে টাইপিং কাজ করে ৳২০ রিওয়ার্ড আর্ন করুন। শীঘ্রই খুলছে — আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।',
    },
  },
  {
    slug: 'ads-view',
    nameBn: 'ADS VIEW',
    nameEn: 'Ads View',
    icon: 'fa-solid fa-bullhorn',
    color: '#f59e0b',
    reward: 3,
    url: 'https://digitearn.vercel.app/help.html',
    locked: true,
    sort: 12,
    steps: [
      'বিজ্ঞাপন লিংকে ১০ সেকেন্ড ভিউ করুন',
      'স্ক্রিনশট এডমিনকে পাঠান',
      'Submit বাটনে ক্লিক করুন',
    ],
    seo: {
      title: 'Ads View Task — ৳৩ রিওয়ার্ড | DigitEarn',
      description: 'DigitEarn-এর Ads View টাস্কে বিজ্ঞাপন ভিউ করে ৳৩ রিওয়ার্ড আর্ন করুন। শীঘ্রই খুলছে — আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।',
    },
  },
];

export const INTERNAL_PAGES = [
  { slug: 'leadership', nameBn: 'লিডারশিপ', nameEn: 'Leadership', icon: 'fa-solid fa-crown', color: '#f59e0b', url: '/leadership.html', sort: 5 },
  { slug: 'target', nameBn: 'টার্গেট বোনাস', nameEn: 'Target Bonus', icon: 'fa-solid fa-bullseye', color: '#ef4444', url: '/target.html', sort: 6 },
  { slug: 'team', nameBn: 'রেফার', nameEn: 'Referral', icon: 'fa-solid fa-users', color: '#8b5cf6', url: '/team.html', sort: 7 },
  { slug: 'gift', nameBn: 'গিফট কোড', nameEn: 'Gift Code', icon: 'fa-solid fa-gift', color: '#ec4899', url: '/gift.html', sort: 8 },
];
