<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, load the antislop skill for the task:
- Core filter, always on: `antislop`
- UI / visual: `antislop-ui`
- Copy & text: `antislop-copywriting`
- People: `antislop-human`
- Mobile / responsive: `antislop-layoutmobile`
- Code comments: `antislop-code`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->

---

## 📋 Aturan Codebase (Codebase Rules & Standards)

Semua agen dan developer yang bekerja pada repositori ini **WAJIB** mematuhi aturan berikut:

### 1. Arsitektur & Tech Stack
- **Framework:** Svelte 5 Single Page Application (SPA) dengan Vite dan TypeScript.
- **Svelte 5 Runes Mode:** Selalu gunakan runes (`$state`, `$derived`, `$props`, snippets). Dilarang keras menggunakan sintaks warisan Svelte 4/3 seperti `export let`, pernyataan reaktif `$:` atau event listener lama `on:click` (gunakan `onclick`).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) terintegrasi dengan Design Tokens Lunary di `src/app.css` (*Cosmic Obsidian* `#070A12`, *Electric Indigo* `#4D5BFF`, *Cyber Cyan* `#06D6A0`, *glassmorphism*, dan *glow shadows*).
- **Tipografi:** Teks UI utama menggunakan **Plus Jakarta Sans**, metrik angka/mata uang menggunakan **JetBrains Mono**.
- **Package Manager:** Selalu gunakan **pnpm** (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm check`).

### 2. Client API & Komunikasi Backend
- **Axios Wrapper:** Seluruh request HTTP wajib melalui `apiClient` (`src/api/client.ts`) atau modul service terkait di `src/api/services/`. Dilarang memanggil `fetch()` mentah atau membuat instance Axios baru sembarangan.
- **Konfigurasi Environment:** URL backend dan parameter konfigurasi harus diambil secara type-safe melalui `env` (`src/utils/env.ts`), didukung oleh `.env` dan `.env.example`.
- **Integrasi Endpoint `/api/landing-page`:** Kontrak response backend menyediakan `testimonials`, `faqs`, `module_plans`, dan `plan_variants`.
- **State Handling:** Selalu sediakan **Skeleton Loading** (`src/components/skeletons/`) saat proses fetching API, serta **Fallback Data** (`src/data/fallbackLandingData.ts`) agar aplikasi tetap berjalan sempurna dan tidak pernah blank saat backend sedang offline.

### 3. Struktur Direktori Proyek
Struktur file harus rapi dan terisolasi sesuai tanggung jawabnya:
- `src/api/`: Axios client wrapper, interceptors, konstanta endpoints, dan service domain.
- `src/components/common/`: Komponen atomik / reusable (`Button.svelte`, `Modal.svelte`, `Toast.svelte`).
- `src/components/layout/`: Tata letak global (`Navbar.svelte`, `Footer.svelte`, `AmbientGlows.svelte`).
- `src/components/sections/`: Bagian modular landing page (Hero, DashboardPreview, Bento, Kalender, Pricing, FAQ, Testimoni, CTA).
- `src/components/skeletons/`: Komponen skeleton shimmer untuk loading state.
- `src/data/`: Data statis, dataset navigasi, dan fallback data.
- `src/types/`: Definisi TypeScript (kontrak API dan view model).
- `src/utils/`: Helper utilitas (`env.ts`, `formatters.ts`).

### 4. Desain & Komponen UI (DESIGN.md & STITCH.md)
- Ikuti panduan visual dan token warna dari `DESIGN.md` serta spesifikasi tata letak dan copywriting dari `STITCH.md`.
- Gunakan format mata uang Rupiah standar melalui utilitas `formatRupiah` dengan font monospaced (`JetBrains Mono`).
- Pertahankan hierarki semantik finansial: Mint Teal untuk pemasukan (*inflow*), Rose Coral untuk pengeluaran (*outflow*), dan Amber Gold untuk peringatan/tagihan.

### 5. Aturan Kualitas Antislop (Mode: DURING)
- **R-02 (Copywriting):** Dilarang keras menggunakan karakter em-dash (`—`) dalam teks antarmuka atau judul. Gunakan tanda hubung/strip (`-`), koma (`,`), titik dua (`:`), atau tanda kurung `()`.
- **R-03 (Mobile Responsiveness):** Tampilan mobile harus sempurna tanpa *horizontal overflow*. Semua target sentuh tombol minimal 44px.
- **R-24 & R-26 (Navigasi & Elemen Interaktif):** Dilarang membuat tombol atau link mati (*no dead controls*). Dilarang menggunakan `href="#"`. Setiap tautan harus mengarah ke section yang valid atau rute nyata.
- **R-25 & R-32 (Aksesibilitas):** Kontras warna wajib memenuhi standar WCAG AA. Seluruh elemen interaktif dapat dioperasikan via keyboard (`Tab`, `Enter`, `Escape`), dengan indikator ring fokus yang jelas (`focus-visible:ring-2 focus-visible:ring-brand-cyan`).
- **R-35 (Verifikasi Mandiri):** Pastikan `pnpm check` menghasilkan 0 error/warning dan `pnpm build` sukses sebelum pekerjaan dinyatakan selesai.

