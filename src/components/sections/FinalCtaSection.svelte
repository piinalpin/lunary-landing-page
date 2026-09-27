<script lang="ts">
  import { env } from '@/utils/env';
  import type { Locale } from '@/types/landing';

  interface Props {
    locale?: Locale;
    onRegister: () => void;
  }

  let { locale = 'id', onRegister }: Props = $props();

  const copy = {
    id: {
      title: 'Mulai Rapikan Uangmu Hari Ini.',
      subtitle: 'Catat cashflow, pantau spending, dan pahami kondisi finansialmu dalam satu tempat.',
      cta: 'Mulai Pakai Lunary',
      login: 'Sudah punya akun? Masuk',
    },
    en: {
      title: 'Take Control of Your Money Today.',
      subtitle: 'Track cashflow, monitor spending, and understand your financial health in one place.',
      cta: 'Get Started with Lunary',
      login: 'Already have an account? Sign in',
    },
  } as const;

  const c = $derived(copy[locale]);
</script>

<section class="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="cta">
  <div class="relative rounded-3xl overflow-hidden p-8 sm:p-14 lg:p-20 text-center border border-white/15 bg-gradient-to-b from-brand-surfaceHover via-brand-dark to-brand-dark shadow-2xl">
    <!-- Cosmic orb inside CTA -->
    <div class="glow-orb-indigo absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-2xl opacity-60"></div>

    <div class="relative z-10 max-w-3xl mx-auto">
      <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
        {c.title}
      </h2>
      <p class="text-base sm:text-lg text-slate-300 mb-8">
        {c.subtitle}
      </p>

      <div class="flex flex-col items-center gap-4">
        <button
          type="button"
          onclick={onRegister}
          class="inline-flex items-center justify-center gap-2 min-h-12 px-7 py-4 rounded-2xl font-bold text-white bg-brand-primary hover:bg-brand-primaryHover transition-all shadow-glow-primary border border-indigo-300/30 text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          <span>{c.cta}</span>
          <svg aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
        <a
          class="text-sm font-semibold text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg px-2 py-1"
          href={env.loginUrl}
        >
          {c.login}
        </a>
      </div>
    </div>
  </div>
</section>
