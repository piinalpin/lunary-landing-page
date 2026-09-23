<script lang="ts">
  import type { FaqItem } from '@/types/api';
  import type { Locale } from '@/types/landing';
  import { FALLBACK_FAQS } from '@/data/fallbackLandingData';
  import FaqSkeleton from '@/components/skeletons/FaqSkeleton.svelte';

  interface Props {
    locale?: Locale;
    faqs?: FaqItem[];
    loading?: boolean;
  }

  let { locale = 'id', faqs = FALLBACK_FAQS, loading = false }: Props = $props();

  let activeFaqId = $state<string | number | null>(1);

  const copy = {
    id: {
      eyebrow: 'PERTANYAAN UMUM',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Jawaban transparan seputar cara kerja, privasi, dan fitur utama Lunary.',
    },
    en: {
      eyebrow: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Frequently Asked Questions',
      subtitle: 'Transparent answers about how Lunary works, privacy, and core features.',
    },
  } as const;

  const c = $derived(copy[locale]);

  function toggleFaq(id: string | number) {
    activeFaqId = activeFaqId === id ? null : id;
  }
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="faq">
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-xs uppercase font-bold tracking-widest text-brand-cyan">{c.eyebrow}</span>
    <h2 class="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
      {c.title}
    </h2>
    <p class="text-base sm:text-lg text-slate-400">
      {c.subtitle}
    </p>
  </div>

  {#if loading}
    <FaqSkeleton />
  {:else}
    <div class="space-y-4 max-w-3xl mx-auto">
      {#each faqs as faq, index}
        {@const faqId = faq.id ?? faq.sequence ?? index + 1}
        {@const isOpen = activeFaqId === faqId}
        <div class="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors {isOpen ? 'border-brand-primary/40 bg-brand-surface' : ''}">
          <button
            type="button"
            class="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
            onclick={() => toggleFaq(faqId)}
            aria-expanded={isOpen}
          >
            <span class="font-bold text-white text-base sm:text-lg">{faq.question}</span>
            <span class="w-7 h-7 rounded-full bg-brand-surfaceHover flex items-center justify-center text-slate-300 transition-transform duration-200 {isOpen ? 'rotate-180 text-brand-cyan' : ''}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </button>

          {#if isOpen}
            <div class="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed animate-fadeIn border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</section>
