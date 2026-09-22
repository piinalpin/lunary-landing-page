# Lunary Design System — Tokens & Typography Guide

Dokumen ini adalah referensi lengkap untuk **Design Tokens, Palet Warna, Sistem Tipografi, dan Komponen UI** yang digunakan dalam aplikasi **Lunary App**. Dokumen ini dirancang sebagai acuan pengembang (developer), desainer (UI/UX), maupun generator AI (seperti Google Stitch, v0, Lovable).

---

## 🌌 1. Filosofi Desain

* **Tema Utama**: *Cosmic Obsidian Minimalist* — gaya dark-mode fintech premium terinspirasi dari Linear.app, Vercel, dan Revolut.
* **Dial Antislop**: `ENERGY 2 / RHYTHM 2 / MOTION 2` (Balanced, purposeful, subtle cosmic atmosphere).
* **Karakteristik**:
  * Gelap, bersih, dan kontras tinggi tanpa menyilaukan mata (*eye-friendly* untuk pemantauan harian).
  * Efek pencahayaan ambient kosmik (*subtle mesh gradient & nebula glow*).
  * Garis batas tipis 1px presisi (*crisp borders*) dipadukan dengan *glassmorphism*.
  * Metrik keuangan yang tegas dan terstruktur menggunakan *tabular-nums*.

---

## 🔤 2. Sistem Tipografi (Typography System)

### A. Font Families
Aplikasi mendukung multi-font dinamis yang dapat dikonfigurasi melalui preferensi pengguna:

| Key Token | Font Family | Sumber / Stack | Karakter / Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| **Default / Primary** | `Satoshi` | Fontshare CDN | Geometric, modern, netral, sangat bersih untuk dasbor fintech |
| **Metropolis** | `Metropolis` | Fontshare CDN | Tegas, bulat, cocok untuk heading berani |
| **DM Sans** | `DM Sans` | Google Fonts | Santai, readable untuk paragraf dan label |
| **Nunito** | `Nunito` | Google Fonts | Rounded, ramah, playful |
| **Roboto Condensed** | `Roboto Condensed` | Google Fonts | Padat dan hemat ruang untuk tabel data lebar |
| **Inconsolata** | `Inconsolata` | Google Fonts (Mono) | Monospace untuk kode, audit trail, atau angka transaksi teknis |
| **Platform** | `System UI` | Native OS Stack | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"` |

### B. Skala Ukuran Teks (Type Scale)
Tipografi Lunary mendukung **Dynamic Font Scaling** (`--app-font-scale-factor`):
* `small`: `0.825x`
* `medium`: `0.9x`
* `default`: `1.0x` (Base 16px)
* `large`: `1.2x`

```css
:root {
  --app-font-family: "Satoshi", ui-sans-serif, system-ui, sans-serif;
  --app-font-scale-factor: 1;

  --text-xs:  calc(0.75rem  * var(--app-font-scale-factor)); /* 12px */
  --text-sm:  calc(0.875rem * var(--app-font-scale-factor)); /* 14px */
  --text-base:calc(1rem     * var(--app-font-scale-factor)); /* 16px */
  --text-lg:  calc(1.125rem * var(--app-font-scale-factor)); /* 18px */
  --text-xl:  calc(1.25rem  * var(--app-font-scale-factor)); /* 20px */
  --text-2xl: calc(1.5rem   * var(--app-font-scale-factor)); /* 24px */
  --text-3xl: calc(1.875rem * var(--app-font-scale-factor)); /* 30px */
  --text-4xl: calc(2.25rem  * var(--app-font-scale-factor)); /* 36px */
  --text-5xl: calc(3rem     * var(--app-font-scale-factor)); /* 48px */
  --text-6xl: calc(3.75rem  * var(--app-font-scale-factor)); /* 60px */
  --text-7xl: calc(4.5rem   * var(--app-font-scale-factor)); /* 72px */
}
```

### C. Utilitas Ukuran Teks Spesifik (Micro & Display Utilities)
Untuk label kecil, badge kartu, dan angka mikro:
* `.text-[6px]` sampai `.text-[13px]` (otomatis dikalikan `--app-font-scale-factor`)
* `.text-[14px]` sampai `.text-[32px]`

### D. Bobot Teks (Font Weights)
* `font-normal` (`400`): Teks paragraf, catatan transaksi, tooltip.
* `font-medium` (`500`): Label input formulir, nama kategori, navigasi sidebar.
* `font-semibold` (`600`): Nilai metrik kartu, judul card/widget, status badge.
* `font-bold` (`700`): Angka saldo utama, headline hero, page titles.

### E. Format Angka & Mata Uang (Currency Formatting)
* Selalu sertakan utilitas Tailwind `tabular-nums` untuk tampilan angka mata uang atau jam/tanggal agar digit angka rata sempurna secara vertikal.
* Standar Indonesia: Simbol `Rp` diikuti spasi tipis, titik pemisah ribuan, dan koma pemisah desimal: `Rp 48.500.000,00`.

---

## 🎨 3. Token Warna (Color Tokens)

### A. Tema Standar Utama: `lunary` (Cosmic Dark Theme)
Ini adalah tema identitas resmi Lunary App yang aktif secara default:

| Token Name | Hex Code | Deskripsi & Kegunaan UI |
| :--- | :--- | :--- |
| `--color-base-100` | `#090D18` | **Deep Canvas Background**: Latar belakang halaman aplikasi utama |
| `--color-base-200` | `#10162A` | **Surface / Card**: Latar kartu widget, baris tabel, panel menu |
| `--color-base-300` | `#242A4A` | **Subtle Borders & Dividers**: Garis pemisah komponen dan border kartu |
| `--color-base-content`| `#F4F3FF` | **Ice White Text**: Teks utama berdaya baca tinggi |
| `--color-primary` | `#4D5BFF` | **Electric Indigo**: Tombol aksi utama (CTA), active state, navbar accent |
| `--color-primary-content` | `#FFFFFF` | Teks putih di atas elemen berwarna primary |
| `--color-secondary` | `#8B5CF6` | **Nebula Violet**: Aksen pendukung, gradient blend, badge promo |
| `--color-secondary-content`| `#FFFFFF` | Teks di atas warna secondary |
| `--color-accent` | `#13D7D0` | **Cyber Cyan**: Aksen neon mencolok, badge pill, link highlight |
| `--color-accent-content` | `#06131C` | Teks gelap di atas warna aksen cyan |
| `--color-neutral` | `#151A2D` | Background netral, dropdown container, chip sekunder |
| `--color-neutral-content`| `#E9ECFF` | Teks di atas warna netral |

### B. Warna Semantik Finansial (Financial State Tokens)

| Token Semantik | Hex Code | Makna Finansial | Implementasi UI |
| :--- | :--- | :--- | :--- |
| **Success / Inflow** | `#2DD4BF` (Mint Teal) | **Pemasukan (Income)**, pertumbuhan saldo positif, target tercapai | Label `+Rp`, status lunas, progress bar hemat |
| **Error / Outflow** | `#FB7185` (Rose Coral) | **Pengeluaran (Spending)**, defisit saldo, tagihan tertunggak | Label `-Rp`, peringatan overbudget |
| **Warning / Alert** | `#FBBF24` (Amber Gold) | **Peringatan Anggaran**, tagihan mendekati tempo, renewal alert | Badge "Mendekati Limit", status cicilan |
| **Info / Flow** | `#38BDF8` (Sky Blue) | **Transfer Antar-Dompet**, info sistem, navigasi netral | Ikon mutasi antar-rekening, tag audit |

---

## 📐 4. Spacing, Radius & Elevation Tokens

### A. Border Radius (Sudut Lengkung)
DaisyUI & Tailwind radius token yang digunakan Lunary:

* `--radius-field: 0.25rem` (4px): Input fields, select dropdown, checklist checkbox.
* `--radius-selector: 0.5rem` (8px): Dropdown items, tab buttons, chips.
* `--radius-box: 0.5rem` (8px): Modal default, alert box.
* **Component Cards**: `rounded-2xl` (16px) — sudut lengkung elegan untuk widget dasbor & kartu bento.
* **Pill Buttons & Badges**: `rounded-full` (9999px) — status indicators, filter chips, tombol utama.

### B. Ketebalan Border & Efek Kaca (Glassmorphism)
* **Border Default**: `1px solid var(--color-base-300)` (`#242A4A` pada tema Lunary).
* **Glass Container**:
  * `background: rgba(16, 22, 42, 0.75)`
  * `backdrop-filter: blur(12px)`
  * `border: 1px solid rgba(36, 42, 74, 0.6)`
* **Glow Effects**:
  * Primary Glow: `box-shadow: 0 0 25px -5px rgba(77, 91, 255, 0.35)`
  * Cyan Neon Glow: `box-shadow: 0 0 20px -3px rgba(19, 215, 208, 0.3)`

### C. Z-Index Layering
* Layer 0: Background Canvas & Ambient Mesh Orbs
* Layer 1: Grid konten dan Kartu Dasbor
* Layer 10: Sticky Navigation Header
* Layer 20: Drawer Sidebar & Mobile Nav
* Layer 40: Dropdown Menu & Tooltips
* Layer 50: Modal Dialog & BottomSheet
* Layer 100: Toast Notification & Dimming Overlay

---

## 🧩 5. Komponen UI Standar Lunary

### 1. Tombol (Buttons)
* **Primary Glow**: `btn btn-primary rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40`
* **Ghost / Glass**: `btn btn-ghost border border-base-300 bg-base-200/50 backdrop-blur hover:bg-base-200`
* **Soft Variant**: `btn btn-soft btn-primary` (warna lembut dengan teks kontras)

### 2. IconBubble (Kategori & Dompet)
Komponen pembungkus ikon transaksi dengan bentuk squircle:
* Bentuk: `mask mask-squircle`
* Ukuran:
  * `sm`: `w-8 h-8` (ikon 22px)
  * `md`: `w-12 h-12` (ikon 32px)
  * `lg`: `w-14 h-14` (ikon 40px)
* Background: `bg-primary/20` atau warna dinamis per kategori scope.

### 3. FilterChip & Badges
* Pill badge status: `badge badge-sm rounded-full font-semibold gap-1.5`
* Filter chip aktif: `btn btn-sm rounded-full btn-primary btn-outline`

### 4. Input Formulir
* Default state: `input input-bordered w-full rounded-lg bg-base-100 border-base-300`
* Focus state: `border-primary ring-2 ring-primary/20 outline-none`

---

## 🌓 6. Tema Alternatif Terintegrasi

Selain tema gelap `lunary`, aplikasi menyediakan tema terang (*light themes*) dengan token terstandarisasi:

1. **Sakura (Light Rose)**:
   * `base-100`: `#FFF5F5` | `base-200`: `#F8E9E9` | `base-300`: `#E7C9CD`
   * `primary`: `#A87582` | `secondary`: `#E2B4BD`
2. **Harbor (Clean Slate Light)**:
   * `base-100`: `#F8F6F0` | `base-200`: `#EEF3F4` | `base-300`: `#C9D8DC`
   * `primary`: `#213448` | `secondary`: `#547792` | `accent`: `#94B4C1`
3. **Mauve (Warm Lilac)**:
   * `base-100`: `#FCFAF9` | `base-200`: `#F6EEEC` | `base-300`: `#E2D2D0`
   * `primary`: `#574964` | `secondary`: `#9F8383`

