# Google Stitch Master Prompt — Lunary App Landing Page

Dokumen ini berisi prompt spesifikasi tinggi yang ditulis dengan **instruksi teknis berbahasa Inggris (untuk akurasi tata letak, styling CSS, dan token visual)**, namun **seluruh copywriting, label, headline, dan konten antarmuka dikunci secara eksplisit dalam Bahasa Indonesia (fintech modern)**.

---

## 🎯 Cara Pakai di Google Stitch:
1. Salin seluruh teks di dalam blok kode di bawah ini (**Master Prompt**).
2. Tempelkan ke input prompt Google Stitch.
3. *(Opsional)* Jika Stitch menyediakan opsi unggah gambar referensi, Anda bisa melampirkan screenshot dasbor Lunary (`http://localhost:8000` dengan akun `demo@lunary.id` / `Demo@123`).

---

```markdown
Create a pixel-perfect, ultra-modern, high-converting SaaS landing page for "Lunary" (a modern personal finance & cashflow intelligence application). 

CRITICAL REQUIREMENT:
- All architectural, UI layout, styling, and design token instructions are specified in English for maximum precision.
- ALL user-facing text, headlines, navigation items, feature descriptions, buttons, badges, and labels MUST be rendered exactly in the provided Indonesian (Bahasa Indonesia) copy.

---

### 1. Visual Identity & Design Tokens

- Aesthetic: Deep cosmic dark mode with minimalist fintech polish (inspired by Linear.app, Vercel, and Raycast).
- Color System:
  * Primary Canvas (Background): #090D18 (Deep Obsidian Navy)
  * Elevated Card Surface: #10162A with subtle 1px border #242A4A
  * Primary Accent: #4D5BFF (Electric Indigo) with hover cyan ambient glow #13D7D0
  * Secondary Nebula Accent: #8B5CF6 (Nebula Violet)
  * Neon Accent & Badges: #13D7D0 (Cyber Cyan)
  * Positive Growth / Inflow: #2DD4BF (Mint Teal)
  * Alert / Warning: #FBBF24 (Amber Gold)
  * Expense / Outflow: #FB7185 (Rose Coral)
  * Text Colors: #F4F3FF (Pure Ice White) for headings, rgba(244, 243, 255, 0.65) for secondary copy
- Lighting & Atmosphere: Soft ambient mesh gradient blur orbs (indigo-600/25 and fuchsia-600/15 blurred 120px) behind the Hero and Footer sections. Crisp 1px glassmorphic borders with 0.6 opacity.
- Typography: Modern geometric sans-serif (Satoshi or DM Sans). Financial metrics and currency numbers must use clean tabular-nums formatting with the Indonesian Rupiah standard (`Rp`).

---

### 2. Header & Sticky Navigation

- Layout: Glassmorphic sticky navbar with backdrop-blur-md and subtle 1px border bottom (#242A4A).
- Left: Geometric crescent moon icon + bold white brand text "Lunary".
- Center Nav Links (Indonesian):
  * "Fitur"
  * "Ekosistem"
  * "Kalender & Laporan"
  * "Paket Harga"
  * "Testimoni"
- Right Actions:
  * Ghost button: "Masuk"
  * Glowing pill button (#4D5BFF background with cyan hover glow): "Mulai Gratis"

---

### 3. Hero Section (Maximum Impact & Conversion)

- Top Pill Badge:
  * Icon: ✦
  * Text: "SISTEM OPERASI KEUANGAN PERSONAL MODERN"
  * Styling: Semi-transparent cyan pill badge with border #13D7D0/30 and neon cyan text.
- Main Headline:
  * Text: "Kendalikan Keuanganmu, Lebih Mudah & Tenang."
  * Styling: Big bold typography (text-5xl to text-7xl) with gradient shimmer from white (#FFFFFF) to electric indigo (#4D5BFF).
- Subheadline:
  * Text: "Pantau arus kas bulanan, alokasi amplop budget, lacak saldo multi-rekening & e-wallet, hingga wujudkan target masa depan dalam satu dasbor cerdas tanpa spreadsheet rumit."
- Dual Call-to-Action:
  * Primary CTA: "Buka Dasbor Gratis" (Prominent glowing pill button with arrow icon →)
  * Secondary CTA: "Lihat Demo 2 Menit" (Glass button with subtle video play icon)
- Social Proof Bar:
  * Text: "⭐ Dipercaya lebih dari 10.000+ pengguna cerdas • Rating 4.9/5 • Enkripsi setara standar perbankan"
- Hero Visual Mockup:
  * A 3D-angled floating desktop preview of the Lunary Dashboard with soft ambient shadows and glow borders.
  * Inside the mockup interface, render realistic Indonesian fintech cards:
    - Card 1: "Total Saldo Bersih" -> "Rp 48.500.000" with a green badge "+14,2% vs bulan lalu".
    - Card 2: Interactive Cashflow Bar Chart showing "Pemasukan: Rp 18.200.000" and "Pengeluaran: Rp 11.450.000".
    - Floating Pill Notification: "Transaksi Cepat: Kopi & Makan Siang • Rp 45.000 (Dompet GoPay)".
    - Card 3: "Target Dana Darurat" -> Progress bar at 82% ("Rp 16.400.000 / Rp 20.000.000 • Sisa Rp 3.600.000").

---

### 4. Bento Grid: Fitur Unggulan ("Satu Dasbor untuk Seluruh Dimensi Finansialmu")

Design a 4-card modern Bento Grid layout:

1. Card 1: "Multi-Dompet Terintegrasi" (Large Card, col-span-2)
   - Description: "Pantau saldo rekening bank (BCA, Mandiri), e-wallet (GoPay, OVO), kas tunai, hingga portofolio investasi dalam satu ringkasan terkonsolidasi secara real-time."
   - Visual: Mini-list showing wallet icons with live balance badges and aggregate total.

2. Card 2: "Envelope Budgeting & Kontrol Belanja" (Tall Card)
   - Description: "Tentukan batas pengeluaran per kategori (Makanan, Transportasi, Hiburan). Indikator warna dinamis memberi peringatan sebelum anggaranmu bocor."
   - Visual: Category progress bars with status badges "Aman", "Mendekati Batas", dan "Overbudget".

3. Card 3: "Investasi, Tabungan & Dana Talangan" (Medium Card)
   - Description: "Pisahkan tabungan pos masa depan dengan fitur unik Dana Talangan — catat pinjaman sementara dari dana tabungan lengkap dengan jadwal pelunasan otomatis."
   - Visual: Progress tracker of repaid vs remaining fund usage.

4. Card 4: "Radar Tagihan Rutin & Pengelola Cicilan" (Medium Card)
   - Description: "Lacak jatuh tempo tagihan bulanan (listrik, wifi, asuransi) serta hitung otomatis sisa tenor cicilan tanpa pernah terkena denda keterlambatan."
   - Visual: Countdown pill badge: "3 hari lagi: Tagihan Internet Rp 375.000".

---

### 5. Interactive Deep-Dive: Kalender Finansial & Analisis Bulanan

- Split Section (Text on Left, Interactive UI on Right):
  * Left Copy:
    - Eyebrow: "TRANSPARANSI PENUH"
    - Headline: "Baca Kebiasaan Belanjamu Langsung di Kalender."
    - Body: "Bukan sekadar deretan angka tabel. Lunary memetakan arus kas harian ke dalam tampilan kalender interaktif. Temukan di tanggal berapa pengeluaranmu membengkak dan rancang strategi hemat yang lebih realistis."
    - Bullet points with check icons:
      • "Visualisasi titik pemasukan (hijau) dan pengeluaran (merah) per tanggal"
      • "Analisis komparasi performa pengeluaran antar bulan"
      • "Deteksi otomatis pola pengeluaran berulang"
  * Right UI Preview:
    - Dark mode monthly calendar widget displaying date cells with monetary badges (e.g. "15 Sep: +Rp 8.500.000", "19 Sep: -Rp 185.000").

---

### 6. Comparison Table: "Mengapa Lunary Lebih Unggul?"

Create a high-contrast comparison table comparing 3 columns:
- Column 1: "Spreadsheet Manual"
- Column 2: "Aplikasi Pencatat Konvensional"
- Column 3: "Lunary" (Highlighted column with neon indigo border)

Rows to compare:
- "Kemudahan Input": Spreadsheet (Rumit & lambat) | Aplikasi Lain (Terbatas) | Lunary (Transaksi cepat 1-klik)
- "Multi-Dompet & Rekonsiliasi": Spreadsheet (Rawan rumus rusak) | Aplikasi Lain (Kaku) | Lunary (Otomatis & selalu seimbang)
- "Manajemen Dana Talangan": Spreadsheet (Tidak ada) | Aplikasi Lain (Tidak didukung) | Lunary (Fitur bawaan lengkap)
- "UI & Pengalaman Pengguna": Spreadsheet (Membosankan) | Aplikasi Lain (Banyak iklan) | Lunary (Cosmic Dark-Mode elegan & bebas iklan)

---

### 7. Pricing Section: Paket & Investasi Nilai

- Cycle Toggle: "Bulanan" | "Tahunan (Hemat 20%)" | "Akses Seumur Hidup (Lifetime)"
- 3 Tier Cards:
  1. Card "Starter" (Gratis):
     - Price: "Rp 0 / bulan"
     - Subtitle: "Cocok untuk mulai mencatat keuangan harian."
     - Features: 2 Dompet aktif, Pencatatan transaksi tanpa batas, Laporan bulanan dasar.
     - Button: "Mulai Gratis"
  
  2. Card "Pro" (Paling Populer — glowing neon border, featured ribbon "PALING POPULER"):
     - Price: "Rp 49.000 / bulan" (atau "Rp 39.000 / bln jika tahunan")
     - Subtitle: "Untuk individu yang serius mengoptimalkan kekayaan."
     - Features: Multi-dompet tanpa batas, Modul Target Finansial (Goals), Pengelola Cicilan & Dana Talangan, Kalender & Analisis Tahunan Lengkap, Ekspor Laporan.
     - Button: "Pilih Paket Pro" (Primary glow button)
  
  3. Card "Lifetime" (Investasi Sekali):
     - Price: "Rp 499.000" (Sekali bayar untuk selamanya)
     - Subtitle: "Akses penuh seumur hidup tanpa biaya langganan berulang."
     - Features: Seluruh fitur Pro selamanya, Akses prioritas ke fitur baru, Badge eksklusif Lifetime Member.
     - Button: "Dapatkan Akses Seumur Hidup"

---

### 8. Testimonials Section: "Cerita Nyata dari Pengguna Lunary"

3 glassmorphic testimonial cards:
- Card 1:
  * Quote: "Sejak pakai Lunary, saya baru sadar selama ini banyak uang 'hilang' di langganan yang tidak terpakai. Tampilan kalendernya bikin melek finansial!"
  * Name: "Dimas Prasetyo" • "Software Engineer, Jakarta"
- Card 2:
  * Quote: "Fitur Dana Talangan-nya jenius. Saya bisa pakai dana tabungan darurat saat butuh mendesak tanpa takut lupa mengembalikannya ke pos awal."
  * Name: "Sarah Annisa" • "Creative Freelancer, Bandung"
- Card 3:
  * Quote: "Desain dark-mode kosmiknya luar biasa nyaman di mata. Rasanya bukan seperti mencatat keuangan yang membosankan, tapi seperti mengendalikan spaceship pribadi."
  * Name: "Reza Mahendra" • "Small Business Owner, Surabaya"

---

### 9. High-Conversion Final CTA & Footer

- Closing CTA Banner:
  * Headline: "Siap Mengambil Kendali Penuh Atas Masa Depan Finansialmu?"
  * Subline: "Bergabung bersama ribuan pengguna yang telah menikmati ketenangan finansial bersama Lunary."
  * Action: Email input field with a glowing button "Daftar Sekarang Secara Gratis".
  * Micro-copy: "Tanpa perlu kartu kredit • Batal kapan saja".

- Footer:
  * Brand: Logo Lunary + tagline "Master Your Money, Effortlessly."
  * Status Pill: "🟢 Semua sistem operasional normal"
  * Columns:
    - "Produk": Fitur, Ekosistem, Kalender, Paket Harga
    - "Perusahaan": Tentang Kami, Panduan, Karir, Kontak
    - "Legalitas": Kebijakan Privasi, Syarat & Ketentuan, Keamanan Data
  * Bottom bar: "© 2026 Lunary App. Hak Cipta Dilindungi."
```
