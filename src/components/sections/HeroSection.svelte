<script lang="ts">
  interface Props {
    onOpenDemo: () => void;
  }

  let { onOpenDemo }: Props = $props();
</script>

<section class="pt-14 pb-12 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto relative z-10">
  <!-- Eyebrow Pill -->
  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-glow-cyan/20 animate-pulse">
    <span class="text-xs">✦</span>
    <span>SISTEM OPERASI KEUANGAN PERSONAL MODERN</span>
  </div>

  <!-- Main Heading -->
  <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15] mb-6">
    Kendalikan Keuanganmu,<br class="hidden sm:inline" />
    <span class="text-gradient-white">Lebih Mudah &amp; Tenang.</span>
  </h1>

  <!-- Subheadline -->
  <p class="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
    Pantau arus kas bulanan, alokasi amplop budget, lacak saldo multi-rekening &amp; e-wallet, hingga wujudkan target masa depan dalam satu dasbor cerdas tanpa spreadsheet rumit.
  </p>

  <!-- Dual Call to Action Buttons -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
    <a
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-primary hover:bg-brand-primaryHover rounded-2xl transition-all shadow-glow-primary border border-indigo-300/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
      href="#harga"
    >
      <span>Buka Dasbor Gratis</span>
      <svg class="w-5 h-5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
      </svg>
    </a>
    <button
      type="button"
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-200 glass-panel hover:bg-white/10 rounded-2xl transition-all border border-white/10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
      onclick={onOpenDemo}
    >
      <svg class="w-5 h-5 text-brand-cyan" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"></path>
      </svg>
      <span>Lihat Demo 2 Menit</span>
    </button>
  </div>

  <!-- Trust Badge & Social Proof -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 font-medium">
    <div class="flex -space-x-2">
      <div class="w-8 h-8 rounded-full border-2 border-brand-dark bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">AK</div>
      <div class="w-8 h-8 rounded-full border-2 border-brand-dark bg-emerald-600 flex items-center justify-center text-white text-[11px] font-bold">SP</div>
      <div class="w-8 h-8 rounded-full border-2 border-brand-dark bg-amber-600 flex items-center justify-center text-white text-[11px] font-bold">DR</div>
      <div class="w-8 h-8 rounded-full border-2 border-brand-dark bg-fuchsia-600 flex items-center justify-center text-white text-[11px] font-bold">RN</div>
    </div>
    <div class="flex items-center gap-1 text-amber-400">
      <span>★★★★★</span>
    </div>
    <span>Dipercaya lebih dari 10.000+ pengguna cerdas • Rating 4.9/5 • Enkripsi setara standar perbankan</span>
  </div>
</section>

