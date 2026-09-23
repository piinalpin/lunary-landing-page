# 🌙 Lunary: Landing Page

> **Sistem Operasi Keuangan Personal Modern**  
> Single Page Application (SPA) landing page untuk Lunary App, dibangun dengan **Svelte 5 (Runes)**, **Tailwind CSS v4**, **TypeScript**, **Axios API Client Wrapper**, dan **Nginx Alpine**.

---

## 🌟 Fitur & Keunggulan

- **Cosmic Obsidian Design System:** Antarmuka dark-mode fintech premium terinspirasi dari Linear dan Vercel, dilengkapi ambient glow orbs dan glassmorphism tipis.
- **Svelte 5 Runes Mode:** Memanfaatkan reaktivitas modern Svelte 5 (`$state`, `$derived`, `$props`, snippets) untuk performa rendering optimal tanpa overhead lama.
- **Tailwind CSS v4:** Terintegrasi langsung via `@tailwindcss/vite` dengan konfigurasi `@theme` kustom (*Electric Indigo* `#4D5BFF`, *Cyber Cyan* `#06D6A0`, *Deep Obsidian* `#070A12`).
- **Integrasi Backend `/api/landing-page`:**
  - Terhubung dengan kontrak respons API backend: `testimonials`, `faqs`, `module_plans`, dan `plan_variants`.
  - **Cosmic Skeleton Shimmer:** Placeholder pemuatan berdenyut halus saat proses request berlangsung.
  - **Fallback Data:** Data cadangan komprehensif agar landing page tetap berfungsi 100% dan tidak pernah blank saat backend sedang offline.
- **Registrasi & Pembayaran In-Page (Checkout Modal):**
  - Alur pembelian 2-step langsung di landing page tanpa redirect paksa.
  - Pembuatan signature **HMAC-SHA256** secara aman di browser via Web Crypto API (`window.crypto.subtle`).
  - Integrasi endpoint `/api/landing-page/payment-methods` dan `/api/landing-page/register`.
  - Tampilan nomor Virtual Account, batas waktu pembayaran, tautan bayar Duitku, dan tombol salin 1-klik yang intuitif.
- **Penyajian Fitur Nyata (RealFeatureShowcase & LunaryFeatureGrid):**
  - Pratinjau antarmuka asli modul Lunary Cashflow, Spending, dan video demo Autocashflow yang responsif di berbagai perangkat (desktop, tablet, mobile).
- **Corner Ribbon Best Value & Badge Paling Lengkap:**
  - Kartu paket Pro Yearly otomatis menampilkan pita sudut (*corner ribbon*) **Harga Terbaik** (*Best Value*) saat varian bernilai terbaik aktif, serta mempertahankan badge **Paling Lengkap** pada paket Pro.
- **Masking Privasi Pengguna Testimoni:**
  - Penyembunyian otomatis nama pengguna testimoni untuk privasi: 1 suku kata (contoh: `Dimas` -> `D***s`), $\ge 2$ suku kata (contoh: `Dimas Prasetyo` -> `Dimas P***o`, `Sarah Annisa Putri` -> `Sarah A***i`).
- **Kontainerisasi Nginx Alpine:**
  - Konfigurasi Docker multi-stage build yang ringan dan cepat, kompresi Gzip otomatis, header keamanan modern, routing SPA fallback (`try_files`), dan dukungan reverse proxy Traefik.
- **Aksesibilitas & Kepatuhan Antislop:**
  - Memenuhi standar WCAG AA, navigasi ramah keyboard (`Tab`, `Enter`, `Escape`), nol tautan atau tombol mati (*no dead controls*), dan bebas karakter em-dash (`—`).

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Svelte 5](https://svelte.dev/) | Frontend reactive SPA dengan Runes mode |
| **Bundler & Tooling** | [Vite 6](https://vitejs.dev/) | Development server kilat dan optimized bundler |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Engine utility-first CSS terbaru via `@tailwindcss/vite` |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/) | Type-safety ketat dan modular |
| **HTTP Client** | [Axios](https://axios-http.com/) | Client wrapper dengan interceptor dan error handler terstandarisasi |
| **Kriptografi** | Web Crypto API | Pembuatan signature HMAC-SHA256 bawaan peramban |
| **Server Produksi** | [Nginx Alpine](https://hub.docker.com/_/nginx) | Reverse proxy & static server ringan dengan caching optimal |
| **Kontainerisasi** | [Docker & Compose](https://www.docker.com/) | Multi-stage builder (`node:22-alpine`) dan production runner (`nginx:alpine`) |
| **Package Manager** | [pnpm](https://pnpm.io/) | Pengelola dependensi hemat ruang dan cepat untuk dev lokal |
| **Tipografi** | Plus Jakarta Sans & JetBrains Mono | Google Fonts untuk antarmuka teks dan angka monospaced |

---

## 📁 Struktur Proyek

```
lunary-landing-page/
├── .dockerignore                         # Pengabaian file build container Docker
├── .env                                  # Variabel environment lokal
├── .env.example                          # Template konfigurasi variabel environment
├── .gitignore                            # Konfigurasi pengabaian Git
├── AGENTS.md                             # Aturan codebase, panduan agen, & standar antislop
├── DESIGN.md                             # Panduan Lunary Design Tokens & Color Palette
├── Dockerfile                            # Multi-stage Docker build (Node 22 builder -> Nginx Alpine)
├── STITCH.md                             # Spesifikasi UI prompt & copywriting
├── docker-compose.yaml                   # Definisi service container & routing Traefik
├── index.html                            # Shell HTML utama aplikasi
├── nginx.conf                            # Konfigurasi server Nginx (SPA fallback, Gzip, security headers)
├── package.json                          # Dependensi proyek & scripts
├── pnpm-lock.yaml                        # Lockfile dependensi pnpm
├── tsconfig.json                         # Konfigurasi TypeScript
├── vite.config.ts                        # Konfigurasi Vite, Svelte 5, dan Tailwind CSS v4
└── src/
    ├── api/                              # Layer API & Axios wrapper
    │   ├── client.ts                     # Instance Axios terkonfigurasi & interceptor
    │   ├── endpoints.ts                  # Konstanta endpoint backend
    │   └── services/
    │       ├── landingService.ts         # Service pengambilan data landing page (/api/landing-page)
    │       └── registrationService.ts    # Service metode pembayaran & order registrasi HMAC-SHA256
    ├── components/
    │   ├── common/                       # Modal dialog, Toast notifikasi
    │   ├── layout/                       # Navbar, Footer, AmbientGlows
    │   ├── registration/                 # RegistrationModal (alur registrasi & instruksi pembayaran)
    │   ├── sections/                     # Section modular landing page
    │   │   ├── ComparisonTable.svelte    # Tabel komparasi Lunary vs Spreadsheet vs Manual
    │   │   ├── FaqSection.svelte         # Accordion pertanyaan umum
    │   │   ├── FinalCtaSection.svelte    # Banner ajakan bertindak akhir halaman
    │   │   ├── HeroSection.svelte        # Headline dinamis (typewriter), subheadline & CTA
    │   │   ├── LunaryFeatureGrid.svelte  # Grid kartu fitur unggulan & video preview
    │   │   ├── PricingSection.svelte     # Pemilihan siklus (bulanan/tahunan) & kartu harga
    │   │   ├── RealFeatureShowcase.svelte# Showcase tampilan asli Lunary di multi-device
    │   │   └── TestimonialsSection.svelte# Carousel testimoni dengan masking nama pengguna
    │   └── skeletons/                    # Skeleton shimmer loading untuk pricing, FAQ, testimoni, & payment
    ├── data/
    │   ├── fallbackLandingData.ts        # Data cadangan saat API backend offline
    │   └── navigationData.ts             # Item navigasi navbar & link footer
    ├── types/
    │   ├── api.ts                        # Kontrak tipe respons & payload API backend
    │   └── landing.ts                    # Tipe view model komponen
    ├── utils/
    │   ├── crypto.ts                     # Utilitas pembuat signature HMAC-SHA256
    │   ├── env.ts                        # Type-safe wrapper untuk import.meta.env
    │   └── formatters.ts                 # Formatter mata uang Rupiah & masking nama
    ├── app.css                           # Tema Tailwind v4, custom utility, & glassmorphism
    ├── App.svelte                        # Komponen root orkestrator SPA
    ├── main.ts                           # Entry point aplikasi
    └── vite-env.d.ts                     # Deklarasi tipe lingkungan Vite & Svelte
```

---

## 🚀 Memulai (Getting Started)

### 1. Prasyarat
- **Node.js:** Versi 20+ (disarankan LTS)
- **pnpm:** Versi 9+

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan konfigurasi variabel environment:
```env
# Konfigurasi API Backend Lunary
VITE_API_BASE_HOST=http://localhost:8000
VITE_API_BASE_URL=${VITE_API_BASE_HOST}/api
VITE_API_TIMEOUT=10000

# Metadata Aplikasi & URL Eksternal
VITE_APP_HOST=localhost
VITE_APP_NAME=Lunary
VITE_APP_LOGIN_URL=${VITE_API_BASE_HOST}/login

# Signature Kunci Rahasia Registrasi (Harus sama dengan backend LANDING_PAGE_SECRET)
VITE_LANDING_PAGE_SECRET=5000e9c9478934cadd1b0ddc28cd470df6398e70e4237a8412b470580eb1118a
```

### 4. Menjalankan Server Development Lokal
```bash
pnpm dev
```
Buka browser Anda di `http://localhost:5173`.

---

## 🐳 Menjalankan dengan Docker & Docker Compose

Proyek ini telah dilengkapi dengan kontainerisasi siap produksi menggunakan multi-stage build dan web server **Nginx Alpine**.

### Build dan Jalankan Container
```bash
docker compose up -d --build
```
Aplikasi akan tersedia di: `http://localhost:8080` (atau sesuai konfigurasi reverse proxy Traefik).

### Menghentikan Container
```bash
docker compose down
```

---

## 🧪 Pemeriksaan Kualitas & Build

### Pemeriksaan Tipe & Diagnostik Svelte
```bash
pnpm check
```

### Build Produksi Lokal
```bash
pnpm build
```
Hasil kompilasi produksi disimpan di direktori `dist/`.

### Preview Hasil Build Produksi
```bash
pnpm preview
```

---

## 📄 Lisensi
Hak Cipta © 2026 Lunary App. Dilindungi oleh undang-undang.
