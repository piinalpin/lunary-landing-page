# 🌙 Lunary: Landing Page

> **Sistem Operasi Keuangan Personal Modern**  
> Single Page Application (SPA) landing page untuk Lunary App, dibangun dengan **Svelte 5 (Runes)**, **Tailwind CSS v4**, **TypeScript**, dan **Axios API Client Wrapper**.

---

## 🌟 Fitur & Keunggulan

- **Cosmic Obsidian Design System:** Antarmuka dark-mode fintech premium terinspirasi dari Linear dan Vercel, dilengkapi ambient glow orbs dan glassmorphism tipis.
- **Svelte 5 Runes Mode:** Memanfaatkan reaktivitas modern Svelte 5 (`$state`, `$derived`, `$props`, snippets) untuk performa rendering optimal.
- **Tailwind CSS v4:** Terintegrasi langsung via `@tailwindcss/vite` dengan konfigurasi `@theme` kustom (*Electric Indigo* `#4D5BFF`, *Cyber Cyan* `#06D6A0`, *Deep Obsidian* `#070A12`).
- **Integrasi Backend `/api/landing-page`:**
  - Terhubung dengan kontrak endpoint backend: `testimonials`, `faqs`, `module_plans`, dan `plan_variants`.
  - **Cosmic Skeleton Shimmer:** Tampilan placeholder berdenyut saat proses request berlangsung.
  - **Fallback Data:** Data cadangan berkualitas tinggi agar landing page tetap berfungsi 100% saat backend sedang offline.
- **Formulir Pendaftaran Lead Email:** Validasi format dan pengiriman langsung via Axios client wrapper dengan feedback loading, sukses, dan error.
- **Kalender Arus Kas Interaktif:** Visualisasi titik pemasukan dan pengeluaran harian lengkap dengan detail transaksi saat tanggal diklik.
- **Pricing Cycle Toggle:** Beralih dengan mulus antara siklus **Bulanan**, **Tahunan (Hemat 20%)**, dan **Akses Seumur Hidup (Lifetime)**.
- **Aksesibilitas & Kepatuhan Antislop:** Memenuhi standar WCAG AA, navigasi ramah keyboard (`Tab`, `Enter`, `Escape`), nol tombol/tautan mati (*no dead controls*), dan bebas karakter em-dash (`—`).

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Svelte 5](https://svelte.dev/) | Frontend reactive SPA dengan Runes mode |
| **Bundler & Tooling** | [Vite 6](https://vitejs.dev/) | Development server kilat dan optimized bundler |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Engine utility-first CSS terbaru via `@tailwindcss/vite` |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/) | Type-safety ketat dan modular |
| **HTTP Client** | [Axios](https://axios-http.com/) | Client wrapper dengan interceptor dan error handler terstandarisasi |
| **Package Manager** | [pnpm](https://pnpm.io/) | Pengelola dependensi hemat ruang dan cepat |
| **Tipografi** | Plus Jakarta Sans & JetBrains Mono | Google Fonts untuk teks antarmuka dan angka monospaced |

---

## 📁 Struktur Proyek

```
lunary-landing-page/
├── .env                              # Variabel environment lokal
├── .env.example                      # Template variabel environment
├── .gitignore                        # Konfigurasi pengabaian file Git
├── AGENTS.md                         # Aturan codebase & standar antislop
├── DESIGN.md                         # Panduan Lunary Design Tokens & Sistem Warna
├── STITCH.md                         # Spesifikasi prompt UI & copywriting
├── index.html                        # Shell HTML aplikasi
├── package.json                      # Dependensi proyek & scripts
├── tsconfig.json                     # Konfigurasi TypeScript
├── vite.config.ts                    # Konfigurasi Vite, Svelte, dan Tailwind v4
└── src/
    ├── api/                          # Layer API & Axios wrapper
    │   ├── client.ts                 # Axios instance terkonfigurasi & interceptor
    │   ├── endpoints.ts              # Daftar endpoint API
    │   └── services/
    │       └── landingService.ts     # Service pemanggilan data & submission lead
    ├── components/
    │   ├── common/                   # Button, Modal, Toast
    │   ├── layout/                   # Navbar, Footer, AmbientGlows
    │   ├── skeletons/                # PricingSkeleton, TestimonialSkeleton, FaqSkeleton
    │   └── sections/                 # 9 Section landing page modular (Hero, Bento, Kalender, dll.)
    ├── data/
    │   ├── fallbackLandingData.ts    # Fallback datasets (bento, pricing, testimoni, faq)
    │   └── navigationData.ts         # Daftar navigasi & tautan footer
    ├── types/
    │   ├── api.ts                    # Kontrak tipe respons API backend
    │   └── landing.ts                # Tipe data komponen view model
    ├── utils/
    │   ├── env.ts                    # Type-safe wrapper untuk import.meta.env
    │   └── formatters.ts             # Formatter Rupiah (IDR) & format angka
    ├── app.css                       # Tema Tailwind v4, custom utility & glassmorphism
    ├── App.svelte                    # Root SPA orchestrator
    ├── main.ts                       # Entry point mount aplikasi
    └── vite-env.d.ts                 # Deklarasi tipe TypeScript Vite & Svelte
```

---

## 🚀 Memulai (Getting Started)

### 1. Prasyarat
- **Node.js:** Versi 20+ (disarankan LTS atau terbaru)
- **pnpm:** Versi 9+ atau 11+

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan variabel environment jika diperlukan:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Lunary
VITE_APP_LOGIN_URL=http://localhost:8000/login
VITE_APP_REGISTER_URL=http://localhost:8000/register
VITE_APP_DEMO_URL=http://localhost:8000/demo
```

### 4. Menjalankan Development Server
```bash
pnpm dev
```
Buka browser di `http://localhost:5173`.

---

## 🧪 Pemeriksaan Kualitas & Build

### Typecheck & Diagnostik Svelte
```bash
pnpm check
```

### Build Produksi
```bash
pnpm build
```
Output build produksi akan disimpan di direktori `dist/`.

### Preview Build Produksi
```bash
pnpm preview
```

---

## 📄 Lisensi
Hak Cipta © 2026 Lunary App. Dilindungi oleh undang-undang.

