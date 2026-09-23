<script lang="ts">
  import { FOOTER_LINKS } from '@/data/navigationData';
  import { env } from '@/utils/env';
  import type { Locale } from '@/types/landing';

  let { locale = 'id' }: { locale?: Locale } = $props();

  const copy = {
    id: { tagline: 'Duit kekontrol, hidup gak gampang jompo.', contact: 'Hubungi kami', products: 'Produk', legal: 'Legalitas', copyright: 'Hak cipta dilindungi.' },
    en: { tagline: 'Money under control, life feels lighter.', contact: 'Contact us', products: 'Product', legal: 'Legal', copyright: 'All rights reserved.' },
  } as const;

  const c = $derived(copy[locale]);
</script>

<footer class="border-t border-white/10 bg-brand-dark pt-16 pb-12 text-sm text-slate-400 relative z-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
      <!-- Brand column -->
      <div class="col-span-2 space-y-4">
        <a class="flex items-center gap-3" href="/" aria-label="Kembali ke atas">
          <img class="w-8 h-8 rounded-lg" src="/assets/lunary-icon.png" alt="" />
          <span class="text-xl font-bold text-white tracking-tight">{env.appName}</span>
        </a>
        <p class="text-slate-400 max-w-sm text-xs sm:text-sm leading-relaxed">
          {c.tagline}
        </p>
        <div class="pt-1 space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.contact}</p>
          <a class="text-sm text-slate-300 transition-colors hover:text-white" href="mailto:support@lunary.id">
            support@lunary.id
          </a>
        </div>
      </div>

      <!-- Links Column 1: Produk -->
      <div>
        <div class="font-bold text-white text-xs uppercase tracking-wider mb-4">{c.products}</div>
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

      <!-- Links Column 2: Legalitas -->
      <div>
        <div class="font-bold text-white text-xs uppercase tracking-wider mb-4">{c.legal}</div>
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
    <div class="pt-8 border-t border-white/5 flex items-center justify-center text-xs text-slate-500">
      <span>© 2026 Lunary App. {c.copyright}</span>
    </div>
  </div>
</footer>
