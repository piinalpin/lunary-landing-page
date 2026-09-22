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
];

export const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'Bagaimana Lunary menjaga privasi dan keamanan data finansial saya?',
    answer: 'Lunary menerapkan enkripsi standar industri AES-256 pada database serta TLS 1.3 saat transmisi data. Kami tidak pernah membagikan atau menjual data transaksi finansial Anda kepada pihak ketiga.',
    category: 'Keamanan',
  },
  {
    id: 2,
    question: 'Apakah Lunary membutuhkan koneksi langsung ke rekening bank saya?',
    answer: 'Tidak wajib. Lunary dirancang fleksibel: Anda dapat mencatat mutasi secara mandiri dengan transaksi cepat 1-klik, import file laporan mutasi bank (CSV/Excel), atau menghubungkan akun secara aman sesuai preferensi privasi Anda.',
    category: 'Fitur',
  },
  {
    id: 3,
    question: 'Apa itu fitur unik Dana Talangan di Lunary?',
    answer: 'Dana Talangan memungkinkan Anda meminjam sementara dari pos tabungan (seperti dana darurat atau liburan) untuk kebutuhan tak terduga. Sistem akan membuat jadwal cicilan pelunasan kembali ke tabungan tersebut sehingga target jangka panjang tetap tercapai.',
    category: 'Fitur',
  },
  {
    id: 4,
    question: 'Apakah saya bisa mengekspor laporan keuangan saya kapan saja?',
    answer: 'Tentu saja. Anda dapat mengunduh rekapan arus kas, kategori pengeluaran bulanan, dan histori saldo dalam format Excel spreadsheet maupun PDF siap cetak kapan pun dibutuhkan.',
    category: 'Laporan',
  },
];

export const FALLBACK_PRICING_TIERS: NormalizedPricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Cocok untuk mulai mencatat keuangan harian.',
    monthlyPrice: 'Rp 0',
    monthlyRawPrice: 0,
    yearlyPrice: 'Rp 0',
    yearlyRawPrice: 0,
    lifetimePrice: 'Rp 0',
    lifetimeRawPrice: 0,
    featured: false,
    features: [
      '2 Dompet aktif (Bank & Kas)',
      'Pencatatan transaksi tanpa batas',
      'Laporan bulanan dasar',
    ],
    ctaText: 'Mulai Gratis',
    ctaHref: '#harga',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Untuk individu yang serius mengoptimalkan kekayaan.',
    monthlyPrice: 'Rp 49.000',
    monthlyRawPrice: 49000,
    yearlyPrice: 'Rp 39.000',
    yearlyRawPrice: 39000,
    lifetimePrice: 'Rp 499.000',
    lifetimeRawPrice: 499000,
    featured: true,
    popular: true,
    badge: 'PALING POPULER',
    features: [
      'Multi-dompet tanpa batas',
      'Modul Target Finansial (Goals)',
      'Pengelola Cicilan & Dana Talangan',
      'Kalender & Analisis Tahunan Lengkap',
      'Ekspor Laporan Excel & PDF',
    ],
    ctaText: 'Pilih Paket Pro',
    ctaHref: '#harga',
  },
  {
    id: 'lifetime',
    name: 'Lifetime (Investasi Sekali)',
    subtitle: 'Akses penuh seumur hidup tanpa biaya langganan berulang.',
    monthlyPrice: 'Rp 499.000',
    monthlyRawPrice: 499000,
    yearlyPrice: 'Rp 499.000',
    yearlyRawPrice: 499000,
    lifetimePrice: 'Rp 499.000',
    lifetimeRawPrice: 499000,
    featured: false,
    badge: 'INVESTASI SEKALI',
    features: [
      'Seluruh fitur Pro selamanya',
      'Akses prioritas ke setiap update fitur baru',
      'Badge eksklusif Lifetime Member di profil',
    ],
    ctaText: 'Dapatkan Akses Seumur Hidup',
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

