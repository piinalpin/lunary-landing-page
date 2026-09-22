<script lang="ts">
  interface DateDetail {
    date: number;
    title: string;
    amount: string;
    type: 'income' | 'expense' | 'bill' | 'neutral';
  }

  let selectedDay = $state<number | null>(15);

  const dayDetails: Record<number, DateDetail> = {
    1: { date: 1, title: 'Bunga Rekening & Kas Masuk', amount: '+Rp 75.000', type: 'income' },
    3: { date: 3, title: 'Beli Bahan Dapur Mingguan', amount: '-Rp 420.000', type: 'expense' },
    5: { date: 5, title: 'Tagihan Listrik PLN', amount: '-Rp 650.000', type: 'bill' },
    9: { date: 9, title: 'Service Besar Mobil & Asuransi', amount: '-Rp 3.360.000', type: 'expense' },
    15: { date: 15, title: 'Gaji Bulanan Masuk', amount: '+Rp 8.500.000', type: 'income' },
    19: { date: 19, title: 'Makan Malam & Transport', amount: '-Rp 185.000', type: 'expense' },
  };

  function selectDate(day: number) {
    selectedDay = selectedDay === day ? null : day;
  }
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="kalender">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <!-- Left Column: Storytelling & checkpoints -->
    <div class="lg:col-span-5 space-y-6 text-left">
      <span class="text-xs uppercase font-bold tracking-widest text-brand-cyan">TRANSPARANSI PENUH</span>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
        Baca Kebiasaan Belanjamu Langsung di Kalender.
      </h2>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Bukan sekadar deretan angka tabel. Lunary memetakan arus kas harian ke dalam tampilan kalender interaktif. Temukan di tanggal berapa pengeluaranmu membengkak dan rancang strategi hemat yang lebih realistis.
      </p>
      <ul class="space-y-4 text-sm sm:text-base text-slate-300 pt-2 font-medium">
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
          <span>Visualisasi titik pemasukan (hijau) dan pengeluaran (merah) per tanggal</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
          <span>Analisis komparasi performa pengeluaran antar bulan</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
          <span>Deteksi otomatis pola pengeluaran berulang</span>
        </li>
      </ul>

      {#if selectedDay && dayDetails[selectedDay]}
        <div class="p-4 rounded-2xl bg-brand-surface border border-brand-primary/30 animate-fadeIn">
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Detail Transaksi Tanggal {selectedDay} September
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-white">{dayDetails[selectedDay].title}</span>
            <span class="font-mono font-bold {dayDetails[selectedDay].type === 'income' ? 'text-emerald-400' : 'text-rose-400'}">
              {dayDetails[selectedDay].amount}
            </span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Right Column: Interactive Dark Calendar Preview -->
    <div class="lg:col-span-7">
      <div class="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <!-- Calendar Header controls -->
        <div class="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h3 class="text-lg font-bold text-white">September 2026</h3>
            <p class="text-xs text-slate-400">Total Arus Keluar: <span class="text-rose-400 font-mono font-semibold">Rp 11.450.000</span></p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-lg bg-brand-surface text-xs text-slate-300 border border-white/5">Bulan Ini</span>
          </div>
        </div>

        <!-- Calendar Days Header -->
        <div class="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 py-4">
          <span>SEN</span><span>SEL</span><span>RAB</span><span>KAM</span><span>JUM</span><span>SAB</span><span>MIN</span>
        </div>

        <!-- Calendar Days Matrix -->
        <div class="grid grid-cols-7 gap-2 text-xs font-mono">
          <!-- Empty pads -->
          <div class="h-16 sm:h-20 rounded-xl bg-brand-surface/20 border border-transparent"></div>

          <!-- 1 Sep -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between text-left hover:border-emerald-500/40 transition-colors cursor-pointer {selectedDay === 1 ? 'ring-2 ring-emerald-400' : ''}"
            onclick={() => selectDate(1)}
          >
            <span class="text-slate-400">1</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>

          <!-- 2 Sep -->
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">2</span>
          </div>

          <!-- 3 Sep -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between text-left hover:border-rose-500/40 transition-colors cursor-pointer {selectedDay === 3 ? 'ring-2 ring-rose-400' : ''}"
            onclick={() => selectDate(3)}
          >
            <span class="text-slate-400">3</span>
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          </button>

          <!-- 4 Sep -->
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">4</span>
          </div>

          <!-- 5 Sep -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between text-left hover:border-amber-500/40 transition-colors cursor-pointer {selectedDay === 5 ? 'ring-2 ring-amber-400' : ''}"
            onclick={() => selectDate(5)}
          >
            <span class="text-slate-400">5</span>
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          </button>

          <!-- 6 Sep -->
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">6</span>
          </div>

          <!-- Week 2 -->
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">7</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">8</span>
          </div>

          <!-- 9 Sep: Highlighted Heavy Expense Date -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex flex-col justify-between shadow-inner text-left hover:border-rose-400 cursor-pointer {selectedDay === 9 ? 'ring-2 ring-rose-400' : ''}"
            onclick={() => selectDate(9)}
          >
            <div class="flex justify-between items-center">
              <span class="text-rose-300 font-bold">9</span>
              <span class="text-[9px] px-1 bg-rose-500/20 text-rose-300 rounded">Peak</span>
            </div>
            <div class="text-[10px] text-rose-300 font-bold truncate">-Rp 3,36jt</div>
          </button>

          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">10</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">11</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">12</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">13</span>
          </div>

          <!-- Week 3 -->
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">14</span>
          </div>

          <!-- 15 Sep Highlight Payday -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between text-left hover:border-emerald-400 cursor-pointer {selectedDay === 15 ? 'ring-2 ring-emerald-400' : ''}"
            onclick={() => selectDate(15)}
          >
            <div class="flex justify-between items-center">
              <span class="text-emerald-300 font-bold">15</span>
              <span class="text-[9px] px-1 bg-emerald-500/20 text-emerald-300 rounded">Gaji</span>
            </div>
            <div class="text-[10px] text-emerald-300 font-bold truncate">+Rp 8,50jt</div>
          </button>

          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">16</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">17</span>
          </div>
          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">18</span>
          </div>

          <!-- 19 Sep -->
          <button
            type="button"
            class="h-16 sm:h-20 p-1.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col justify-between text-left hover:border-indigo-400 cursor-pointer {selectedDay === 19 ? 'ring-2 ring-indigo-400' : ''}"
            onclick={() => selectDate(19)}
          >
            <span class="text-indigo-300 font-semibold">19</span>
            <span class="text-[9px] text-rose-300">-185rb</span>
          </button>

          <div class="h-16 sm:h-20 p-1.5 rounded-xl bg-brand-surface/40 border border-white/5 flex flex-col justify-between">
            <span class="text-slate-400">20</span>
          </div>
        </div>

        <!-- Legend items -->
        <div class="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Pendapatan</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-rose-400"></span> Pengeluaran</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Tagihan</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-cyan-400"></span> Pay Later</span>
        </div>
      </div>
    </div>
  </div>
</section>

