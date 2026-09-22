<script lang="ts">
  import type { TestimonialItem } from '@/types/api';
  import { FALLBACK_TESTIMONIALS } from '@/data/fallbackLandingData';
  import TestimonialSkeleton from '@/components/skeletons/TestimonialSkeleton.svelte';

  interface Props {
    testimonials?: TestimonialItem[];
    loading?: boolean;
  }

  let {
    testimonials = FALLBACK_TESTIMONIALS,
    loading = false,
  }: Props = $props();
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="testimoni">
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-xs uppercase font-bold tracking-widest text-indigo-400">TESTIMONI</span>
    <h2 class="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
      Cerita Nyata dari Pengguna Lunary
    </h2>
    <p class="text-base sm:text-lg text-slate-400">
      Bagaimana para profesional modern mengubah relasi mereka dengan uang.
    </p>
  </div>

  {#if loading}
    <TestimonialSkeleton />
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each testimonials as item}
        <div class="glass-card p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-brand-primary/30 transition-all">
          <div>
            <div class="text-amber-400 text-sm mb-4" aria-label="{item.rating || 5} dari 5 bintang">
              {'★'.repeat(item.rating || 5)}
            </div>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              "{item.quote}"
            </p>
          </div>
          <div class="pt-4 border-t border-white/5">
            <h3 class="text-white font-bold text-sm">{item.name}</h3>
            <p class="text-xs text-slate-400">
              {item.role || ''}{item.role && item.company ? ', ' : ''}{item.company || ''}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

