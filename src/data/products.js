export const PRODUCTS = [
  {
    id: "p1",
    slug: "kotkoti-mix",
    name_bn: "কটকটি মিক্স",
    name_en: "Kotkoti Mix",
    description_bn:
      "প্রিমিয়াম দেশি কটকটি ও গুড়ের গজা—ঘরে তৈরি, প্রিজারভেটিভ ছাড়া।",
    categories: ["kotkoti", "mishti"],
    images: [
      "https://i.ibb.co.com/N6sLfQf1/delicious-nougats-wooden-board.jpg",
      "https://i.ibb.co.com/W4MkYNwc/brown-sugar-cubes-bowl-dark-wooden-table-flat-lay.jpg",
    ],
    variants: [
      { label: "হাফ কেজি", weight_g: 500, price_bdt: 310 },
      { label: "১ কেজি", weight_g: 1000, price_bdt: 600 },
    ],
    badges: ["কোনো প্রিজারভেটিভ নয়", "ঘরে তৈরি"],
    rating: 4.7,
    reviews: [
      { name: "আশিক", comment_bn: "স্বাদে অসাধারণ, আবার নেবো!", stars: 5 },
      { name: "মেহজাবিন", comment_bn: "প্যাকেজিং খুব সুন্দর ছিল।", stars: 4 },
    ],
  },
  {
    id: "p2",
    slug: "chanachur-classic",
    name_bn: "চানাচুর ক্লাসিক",
    name_en: "Chanachur Classic",
    description_bn: "ঝাল-মশলাদার, হালকা ক্রাঞ্চি—চায়ের সাথে পারফেক্ট।",
    categories: ["chanachur"],
    images: ["https://i.ibb.co.com/WNS3WZvv/granola-white-bowl.jpg"],
    variants: [
      { label: "৪০০ গ্রাম", weight_g: 400, price_bdt: 365 },
      { label: "৮০০ গ্রাম", weight_g: 800, price_bdt: 590 },
    ],
    badges: ["তাজা ও নিরাপদ", "দ্রুত ডেলিভারি"],
    rating: 4.6,
    reviews: [
      { name: "ইমরান", comment_bn: "মশলার ব্যালান্স একদম ঠিক।", stars: 5 },
      { name: "শারমিন", comment_bn: "ঝালটা একটু বেশি লেগেছে।", stars: 4 },
    ],
  },
  {
    id: "p3",
    slug: "goja-gur",
    name_bn: "গুড়ের গজা",
    name_en: "Gur-er Goja",
    description_bn: "খাস্তা গজা, খাঁটি গুড়ের মিষ্টতা—খাওয়ার পর সুখ।",
    categories: ["goja", "mishti"],
    images: [
      "https://i.ibb.co.com/W4MkYNwc/brown-sugar-cubes-bowl-dark-wooden-table-flat-lay.jpg",
    ],
    variants: [
      { label: "৫০০ গ্রাম", weight_g: 500, price_bdt: 380 },
      { label: "১ কেজি", weight_g: 1000, price_bdt: 720 },
    ],
    badges: ["ঘরে তৈরি"],
    rating: 4.5,
    reviews: [
      { name: "তৃষা", comment_bn: "খাস্তা আর কম তেল—দারুণ।", stars: 5 },
    ],
  },
];
