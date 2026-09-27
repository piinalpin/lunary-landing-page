import type { TestimonialItem, FaqItem, ModulePlanItem, PlanVariantItem } from '@/types/api';
import type { ComparisonRow } from '@/types/landing';

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

export const FALLBACK_MODULE_PLANS: ModulePlanItem[] = [
  {
    id: '9c0e9e6a-7be4-409e-8406-569bbc8c6541',
    name: 'Starter',
    modules: [
      { id: '1', code: 'dashboard', name: 'Dashboard' },
      { id: '2', code: 'cashflow', name: 'Cashflow' },
      { id: '3', code: 'savings', name: 'Invest & Savings' },
      { id: '4', code: 'wallet', name: 'Wallet' },
      { id: '5', code: 'category', name: 'Category' },
      { id: '6', code: 'annual-report', name: 'Annual Report' },
    ],
  },
  {
    id: '9f67a8a7-e248-4d5e-8fee-77cd622143b0',
    name: 'Pro',
    modules: [
      { id: '1', code: 'dashboard', name: 'Dashboard' },
      { id: '2', code: 'cashflow', name: 'Cashflow' },
      { id: '3', code: 'savings', name: 'Invest & Savings' },
      { id: '7', code: 'goals', name: 'Financial Goals' },
      { id: '8', code: 'bills', name: 'Bills' },
      { id: '9', code: 'installments', name: 'Installments' },
      { id: '4', code: 'wallet', name: 'Wallet' },
      { id: '5', code: 'category', name: 'Category' },
      { id: '6', code: 'annual-report', name: 'Annual Report' },
      { id: '10', code: 'calendar', name: 'Calendar' },
      { id: '11', code: 'compare-period', name: 'Compare Period' },
      { id: '12', code: 'analytics', name: 'Monthly Analysis' },
      { id: '13', code: 'use-funds', name: 'Use Funds' },
    ],
  },
];

export const FALLBACK_PLAN_VARIANTS: PlanVariantItem[] = [
  {
    id: '4e48501d-2720-4316-b244-3f857b0bba84',
    name: 'Starter Monthly',
    expires_in: 30,
    price: '14999.00',
    final_price: 7499,
    discount: '50.00',
    active: true,
    is_best_value: false,
    plan: {
      id: '9c0e9e6a-7be4-409e-8406-569bbc8c6541',
      name: 'Starter',
    },
  },
  {
    id: '02d0610f-9429-40b7-abfa-58d07111382e',
    name: 'Starter Yearly',
    expires_in: 365,
    price: '179999.00',
    final_price: 80999,
    discount: '55.00',
    active: true,
    is_best_value: false,
    plan: {
      id: '9c0e9e6a-7be4-409e-8406-569bbc8c6541',
      name: 'Starter',
    },
  },
  {
    id: 'cee663be-fd8a-4e4a-92f6-6c4c56bc1342',
    name: 'Pro Monthly',
    expires_in: 30,
    price: '24999.00',
    final_price: 12499,
    discount: '50.00',
    active: true,
    is_best_value: false,
    plan: {
      id: '9f67a8a7-e248-4d5e-8fee-77cd622143b0',
      name: 'Pro',
    },
  },
  {
    id: '65759da0-c216-4c0f-8b11-de62ef8664da',
    name: 'Pro Yearly',
    expires_in: 365,
    price: '299999.00',
    final_price: 134999,
    discount: '55.00',
    active: true,
    is_best_value: true,
    plan: {
      id: '9f67a8a7-e248-4d5e-8fee-77cd622143b0',
      name: 'Pro',
    },
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
