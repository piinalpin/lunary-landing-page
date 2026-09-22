<script lang="ts">
  import { FOOTER_LINKS } from '@/data/navigationData';
  import { env } from '@/utils/env';
</script>

<footer class="border-t border-white/10 bg-brand-dark pt-16 pb-12 text-sm text-slate-400 relative z-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
      <!-- Brand column -->
      <div class="col-span-2 space-y-4">
        <a class="flex items-center gap-3" href="/" aria-label="Kembali ke atas">
          <div class="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36 10.14 10.14 0 1 0 22 14.05a1 1 0 0 0-.36-1.05z"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-white tracking-tight">{env.appName}</span>
        </a>
        <p class="text-slate-400 max-w-sm text-xs sm:text-sm leading-relaxed">
          Master Your Money, Effortlessly: Sistem operasi kas personal terpadu dengan ketelitian desain kelas atas.
        </p>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Semua sistem operasional normal
        </div>
      </div>

      <!-- Links Column 1: Produk -->
      <div>
        <div class="font-bold text-white text-xs uppercase tracking-wider mb-4">Produk</div>
        <ul class="space-y-2.5 text-xs sm:text-sm">
          {#each FOOTER_LINKS.products as link}
            <li>
              <a class="hover:text-white transition-colors" href={link.href}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 2: Perusahaan -->
      <div>
        <div class="font-bold text-white text-xs uppercase tracking-wider mb-4">Perusahaan</div>
        <ul class="space-y-2.5 text-xs sm:text-sm">
          {#each FOOTER_LINKS.company as link}
            <li>
              <a class="hover:text-white transition-colors" href={link.href}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links Column 3: Legalitas -->
      <div>
        <div class="font-bold text-white text-xs uppercase tracking-wider mb-4">Legalitas</div>
        <ul class="space-y-2.5 text-xs sm:text-sm">
          {#each FOOTER_LINKS.legal as link}
            <li>
              <a class="hover:text-white transition-colors" href={link.href}>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Copyright Bottom -->
    <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
      <span>© 2026 Lunary App. Hak Cipta Dilindungi.</span>
      <div class="flex items-center gap-6">
        {#each FOOTER_LINKS.socials as social}
          <a
            class="hover:text-slate-300 transition-colors"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>

