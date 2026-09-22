<script lang="ts">
  interface Props {
    onQuickAction?: () => void;
  }

  let { onQuickAction }: Props = $props();
</script>

<div class="mt-4 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="demo">
  <div class="relative mx-auto max-w-6xl text-left">
    <!-- Ambient Backdrop Glow -->
    <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-primary/40 via-cyan-500/20 to-purple-600/40 blur-xl opacity-60"></div>

    <div class="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-brand-dark/95 shadow-2xl overflow-hidden backdrop-blur-2xl">
      <!-- Mockup Top Application Bar -->
      <div class="border-b border-white/10 px-4 sm:px-6 py-3.5 bg-brand-surface/90 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span class="ml-2 text-xs font-mono text-slate-400 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-cyan animate-ping"></span>
            lunary.app/beranda • 19 September 2026
          </span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 hidden sm:inline">User: <strong class="text-white">Lunary Demo</strong> 👑</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-brand-primary/30 hover:bg-brand-primaryHover transition-colors cursor-pointer"
            onclick={onQuickAction}
          >
            <span>⚡</span> Catat cepat
          </button>
        </div>
      </div>

      <!-- Mockup Main Surface View -->
      <div class="p-4 sm:p-6 lg:p-8 bg-[#0B0F1C] space-y-6">
        <!-- Top Metric Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Card 1: Total Saldo Bersih -->
          <div class="glass-card p-5 rounded-xl border border-white/10 relative overflow-hidden">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Saldo Bersih</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+14,2% vs bulan lalu</span>
            </div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">Rp 48.500.000</div>
            <div class="mt-3 text-xs text-slate-400 flex items-center gap-2">
              <span>Konsolidasi dari 4 rekening &amp; e-wallet aktif</span>
            </div>
          </div>

          <!-- Card 2: Arus Kas Bulanan -->
          <div class="glass-card p-5 rounded-xl border border-white/10">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Arus Kas (Sep 2026)</span>
            <div class="grid grid-cols-2 gap-2 text-sm font-mono">
              <div>
                <span class="text-xs text-emerald-400 block">Pemasukan</span>
                <span class="font-bold text-white">Rp 18.200.000</span>
              </div>
              <div>
                <span class="text-xs text-rose-400 block">Pengeluaran</span>
                <span class="font-bold text-white">Rp 11.450.000</span>
              </div>
            </div>
            <!-- Dual Progress Bar -->
            <div class="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden flex">
              <div class="bg-emerald-400 h-full w-[62%]"></div>
              <div class="bg-rose-400 h-full w-[38%]"></div>
            </div>
          </div>

          <!-- Card 3: Target Dana Darurat -->
          <div class="glass-card p-5 rounded-xl border border-white/10">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Dana Darurat</span>
              <span class="text-xs font-bold text-brand-cyan">82%</span>
            </div>
            <div class="text-lg font-bold text-white font-mono">
              Rp 16.400.000 <span class="text-xs text-slate-400 font-normal">/ Rp 20.000.000</span>
            </div>
            <div class="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
              <div class="bg-gradient-to-r from-brand-primary to-brand-cyan h-full w-[82%] rounded-full"></div>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">Sisa Rp 3.600.000 tercapai estimasi Nov 2026</p>
          </div>
        </div>

        <!-- Interactive Lower Preview: Floating Transaction Pill & Badges -->
        <div class="glass-card p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Quick Transaction Highlight Pill -->
          <div class="flex items-center gap-3 bg-brand-surfaceHover/80 px-4 py-2.5 rounded-xl border border-white/10 w-full md:w-auto">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">⚡</div>
            <div>
              <div class="text-xs font-semibold text-white">Transaksi Cepat Baru Saja</div>
              <div class="text-xs text-slate-400">Kopi &amp; Makan Siang • <span class="text-rose-400 font-mono">-Rp 45.000</span> (Dompet GoPay)</div>
            </div>
          </div>

          <!-- Multi-Wallet Badges mini bar -->
          <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span class="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">BCA: Rp 32,5Jt</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">Mandiri: Rp 12,2Jt</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">GoPay: Rp 1,8Jt</span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">Kas: Rp 2,0Jt</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

