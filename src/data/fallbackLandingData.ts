import type { TestimonialItem, FaqItem } from '@/types/api';
import type { BentoFeature, ComparisonRow, NormalizedPricingTier } from '@/types/landing';

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'Dimas Prasetyo',
    role: 'Software Engineer',
    company: 'Jakarta',
    quote: "Sejak pakai Lunary, saya baru sadar selama ini banyak uang 'hilang' di langganan yang tidak terpakai. Tampilan kalendernya bikin melek finansial!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Annisa',
    role: 'Creative Freelancer',
    company: 'Bandung',
    quote: 'Fitur Dana Talangan-nya jenius. Saya bisa pakai dana tabungan darurat saat butuh mendesak tanpa takut lupa mengembalikannya ke pos awal.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Reza Mahendra',
    role: 'Small Business Owner',
    company: 'Surabaya',
    quote: 'Desain dark-mode kosmiknya luar biasa nyaman di mata. Rasanya bukan seperti mencatat keuangan yang membosankan, tapi seperti mengendalikan spaceship pribadi.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Naya Putri',
    role: 'Content Creator',
    company: 'Yogyakarta',
    quote: 'Sekarang uang buat kebutuhan, tabungan, dan jajan punya tempat masing-masing. Jadi lebih gampang fokus tanpa takut saldo tiba-tiba lenyap.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Fajar Ramadhan',
    role: 'Product Designer',
    company: 'Jakarta',
    quote: 'Target liburan jadi lebih realistis karena progresnya kelihatan jelas. Buka Lunary sebentar, langsung tahu harus ngapain bulan ini.',
    rating: 5,
  },
];

export const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'Apakah data keuangan saya aman?',
    answer: 'Lunary menerapkan enkripsi standar industri AES-256 pada database serta TLS 1.3 saat transmisi data. Kami tidak pernah membagikan atau menjual data transaksi finansial Anda kepada pihak ketiga.',
    category: 'Keamanan',
  },
  {
    id: 2,
    question: 'Apakah Lunary bisa sync otomatis dengan rekening bank saya?',
    answer: 'Koneksi langsung ke rekening bank tidak wajib. Anda tetap bisa mencatat transaksi secara manual atau mengimpor data yang tersedia. Hubungkan rekening hanya jika integrasinya didukung dan memang sesuai dengan preferensi Anda.',
    category: 'Fitur',
  },
  {
    id: 3,
    question: 'Apa perbedaan STARTER dan PRO?',
    answer: 'Starter mencakup fitur penting untuk pencatatan dan pemantauan keuangan sehari-hari. Pro menambahkan fitur lanjutan seperti Use Funds, Tagihan, Cicilan, dan Analisis Bulanan.',
    category: 'Fitur',
  },
  {
    id: 4,
    question: 'Gimana cara bayarnya?',
    answer: 'Pilih paket dan siklus tagihan yang kamu inginkan, lalu ikuti instruksi checkout sampai selesai. Detail pembayaran akan ditampilkan selama proses checkout.',
    category: 'Fitur',
  },
  {
    id: 5,
    question: 'Apakah ada perpanjangan otomatis?',
    answer: 'Detail perpanjangan ditampilkan saat checkout. Status langganan dan pengaturannya dapat dikelola dari akun kamu.',
    category: 'Fitur',
  },
  {
    id: 6,
    question: 'Bisa dipakai di HP dan laptop sekaligus?',
    answer: 'Bisa. Lunary dapat diakses secara responsif melalui HP, tablet, dan laptop menggunakan akun yang sama.',
    category: 'Fitur',
  },
  {
    id: 7,
    question: 'Apakah saya dapat menghapus akun saya?',
    answer: 'Bisa. Lunary menyediakan fitur untuk menghapus akun dari pengaturan akun. Ikuti langkah konfirmasi yang tersedia untuk memproses penghapusan akun dan data terkait.',
    category: 'Akun',
  },
];

export const FALLBACK_PRICING_TIERS: NormalizedPricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Fitur esensial untuk mencatat dan memantau keuangan sehari-hari.',
    monthlyPrice: 'Rp 7.499',
    monthlyRawPrice: 7499,
    monthlyOriginalPrice: 'Rp 14.999',
    monthlyOriginalRawPrice: 14999,
    monthlyDiscount: 50,
    yearlyPrice: 'Rp 80.999',
    yearlyRawPrice: 80999,
    yearlyOriginalPrice: 'Rp 179.999',
    yearlyOriginalRawPrice: 179999,
    yearlyDiscount: 55,
    featured: false,
    features: [
      'Dashboard',
      'Cashflow',
      'Invest & Savings',
      'Wallet',
      'Category',
      'Annual Report',
    ],
    ctaText: 'Pilih Starter',
    ctaHref: '#harga',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Untuk individu yang serius mengoptimalkan kekayaan.',
    monthlyPrice: 'Rp 12.499',
    monthlyRawPrice: 12499,
    monthlyOriginalPrice: 'Rp 24.999',
    monthlyOriginalRawPrice: 24999,
    monthlyDiscount: 50,
    yearlyPrice: 'Rp 134.999',
    yearlyRawPrice: 134999,
    yearlyOriginalPrice: 'Rp 299.999',
    yearlyOriginalRawPrice: 299999,
    yearlyDiscount: 55,
    featured: true,
    popular: true,
    badge: 'PALING POPULER',
    features: [
      'Financial Goals',
      'Bills',
      'Installments',
      'Calendar',
      'Monthly Analysis',
      'Use Funds',
    ],
    ctaText: 'Pilih Pro',
    ctaHref: '#harga',
  },
];

export const BENTO_FEATURES: BentoFeature[] = [
  {
    id: 'multi-wallet',
    title: 'Multi-Dompet Terintegrasi',
    description: 'Pantau saldo rekening bank (BCA, Mandiri), e-wallet (GoPay, OVO), kas tunai, hingga portofolio investasi dalam satu ringkasan terkonsolidasi secara real-time.',
    icon: '🏦',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'budgeting',
    title: 'Envelope Budgeting & Kontrol Belanja',
    description: 'Tentukan batas pengeluaran per kategori (Makanan, Transportasi, Hiburan). Indikator warna dinamis memberi peringatan sebelum anggaranmu bocor.',
    icon: '✉️',
  },
  {
    id: 'talangan',
    title: 'Investasi, Tabungan & Dana Talangan',
    description: 'Pisahkan tabungan pos masa depan dengan fitur unik Dana Talangan: catat pinjaman sementara dari tabungan lengkap dengan jadwal pelunasan otomatis.',
    icon: '🎯',
  },
  {
    id: 'bills',
    title: 'Radar Tagihan Rutin & Pengelola Cicilan',
    description: 'Lacak jatuh tempo tagihan bulanan (listrik, wifi, asuransi) serta hitung otomatis sisa tenor cicilan tanpa pernah terkena denda keterlambatan.',
    icon: '⏰',
    colSpan: 'md:col-span-2',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Kemudahan Input',
    spreadsheet: 'Rumit & lambat',
    conventional: 'Terbatas',
    lunary: 'Transaksi cepat 1-klik',
    lunaryHighlight: '⚡',
  },
  {
    feature: 'Multi-Dompet & Rekonsiliasi',
    spreadsheet: 'Rawan rumus rusak',
    conventional: 'Kaku',
    lunary: 'Otomatis & selalu seimbang',
    lunaryHighlight: '✓',
  },
  {
    feature: 'Manajemen Dana Talangan',
    spreadsheet: 'Tidak ada',
    conventional: 'Tidak didukung',
    lunary: 'Fitur bawaan lengkap',
    lunaryHighlight: '✓',
  },
  {
    feature: 'UI & Pengalaman Pengguna',
    spreadsheet: 'Membosankan',
    conventional: 'Banyak iklan',
    lunary: 'Cosmic Dark-Mode & Bebas Iklan',
    lunaryHighlight: '✨',
  },
];
