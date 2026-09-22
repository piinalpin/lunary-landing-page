<script lang="ts">
  import { COMPARISON_ROWS } from '@/data/fallbackLandingData';
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-xs uppercase font-bold tracking-widest text-brand-primary">KOMPARASI KEUNGGULAN</span>
    <h2 class="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
      Mengapa Lunary Lebih Unggul?
    </h2>
    <p class="text-base sm:text-lg text-slate-400">
      Tinggalkan cara lama yang membuang waktu dan rentan kesalahan input.
    </p>
  </div>

  <!-- Responsive Comparison Table -->
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse min-w-[680px]">
      <thead>
        <tr class="border-b border-white/10 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <th class="py-4 px-6">Fitur &amp; Alur Kerja</th>
          <th class="py-4 px-6 text-slate-500">Spreadsheet Manual</th>
          <th class="py-4 px-6 text-slate-500">Aplikasi Konvensional</th>
          <th class="py-4 px-6 text-brand-cyan bg-brand-primary/10 rounded-t-2xl border-t border-x border-brand-primary/30">
            Lunary (Pilihan Cerdas)
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5 text-sm sm:text-base">
        {#each COMPARISON_ROWS as row, idx}
          {@const isLast = idx === COMPARISON_ROWS.length - 1}
          <tr>
            <td class="py-5 px-6 font-semibold text-white">{row.feature}</td>
            <td class="py-5 px-6 text-slate-400">{row.spreadsheet}</td>
            <td class="py-5 px-6 text-slate-400">{row.conventional}</td>
            <td
              class="py-5 px-6 text-white font-medium bg-brand-primary/10 border-x border-brand-primary/30 {isLast
                ? 'rounded-b-2xl border-b'
                : ''}"
            >
              <span class="inline-flex items-center gap-1.5 text-brand-cyan font-bold">
                {#if row.lunaryHighlight}
                  <span>{row.lunaryHighlight}</span>
                {/if}
                <span>{row.lunary}</span>
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

