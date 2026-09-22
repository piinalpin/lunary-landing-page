<script lang="ts">
  import type { NormalizedPricingTier } from '@/types/landing';
  import { FALLBACK_PRICING_TIERS } from '@/data/fallbackLandingData';
  import PricingSkeleton from '@/components/skeletons/PricingSkeleton.svelte';

  interface Props {
    tiers?: NormalizedPricingTier[];
    loading?: boolean;
    onSelectPlan?: (planId: string, cycle: string) => void;
  }

  let {
    tiers = FALLBACK_PRICING_TIERS,
    loading = false,
    onSelectPlan,
  }: Props = $props();

  let billingCycle = $state<'monthly' | 'yearly' | 'lifetime'>('yearly');

  function getPriceDisplay(tier: NormalizedPricingTier) {
    if (tier.id === 'starter') {
      return { price: 'Rp 0', period: '/ bulan', note: '' };
    }
    if (tier.id === 'lifetime') {
      return { price: 'Rp 499.000', period: '', note: 'Sekali bayar untuk selamanya' };
    }
    // Pro Tier
    if (billingCycle === 'monthly') {
      return {
        price: 'Rp 49.000',
        period: '/ bulan',
        note: 'Ditagih Rp 49.000 per bulan',
      };
    }
    if (billingCycle === 'yearly') {
      return {
        price: 'Rp 39.000',
        period: '/ bln',
        note: 'Rp 49.000 / bulan jika ditagih bulanan',
      };
    }
    return {
      price: 'Rp 39.000',
      period: '/ bln',
      note: 'Investasi terbaik jangka panjang',
    };
  }
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="harga">
  <!-- Heading & Eyebrow -->
  <div class="text-center max-w-3xl mx-auto mb-14">
    <span class="text-xs uppercase font-bold tracking-widest text-brand-cyan">PAKET HARGA</span>
    <h2 class="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
      Investasi Terbaik untuk Ketenangan Finansial
    </h2>
    <p class="text-base sm:text-lg text-slate-400">
      Pilih paket yang paling sesuai dengan target pertumbuhan finansialmu.
    </p>

    <!-- Billing Cycle Toggle Tabs -->
    <div class="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-brand-surface border border-white/10" role="tablist" aria-label="Pilihan Siklus Tagihan">
      <button
        type="button"
        role="tab"
        aria-selected={billingCycle === 'monthly'}
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer {billingCycle === 'monthly'
          ? 'bg-brand-primary text-white shadow-sm'
          : 'text-slate-300 hover:text-white'}"
        onclick={() => (billingCycle = 'monthly')}
      >
        Bulanan
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={billingCycle === 'yearly'}
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer {billingCycle === 'yearly'
          ? 'bg-brand-primary text-white shadow-sm'
          : 'text-slate-300 hover:text-white'}"
        onclick={() => (billingCycle = 'yearly')}
      >
        Tahunan <span class="text-[10px] text-cyan-300 font-bold ml-1">(Hemat 20%)</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={billingCycle === 'lifetime'}
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer {billingCycle === 'lifetime'
          ? 'bg-brand-primary text-white shadow-sm'
          : 'text-slate-300 hover:text-white'}"
        onclick={() => (billingCycle = 'lifetime')}
      >
        Akses Seumur Hidup (Lifetime)
      </button>
    </div>
  </div>

  <!-- Pricing Cards -->
  {#if loading}
    <PricingSkeleton />
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {#each tiers as tier}
        {@const pricing = getPriceDisplay(tier)}
        {@const isPro = tier.id === 'pro'}
        {@const isLifetime = tier.id === 'lifetime'}

        <div
          class="relative glass-card p-8 rounded-3xl border flex flex-col justify-between transition-all {isPro
            ? 'border-2 border-brand-primary shadow-glow-primary bg-gradient-to-b from-brand-surfaceHover via-brand-surface to-brand-card'
            : 'border-white/10'}"
        >
          <!-- Featured Badge -->
          {#if isPro}
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-primary text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-brand-primary/40">
              PALING POPULER
            </div>
          {/if}

          <div>
            <div class="text-sm font-semibold uppercase tracking-wider mb-2 {isPro ? 'text-brand-cyan' : isLifetime ? 'text-amber-400' : 'text-slate-400'}">
              {tier.name}
            </div>
            <div class="text-4xl font-extrabold text-white font-mono mb-1">
              {pricing.price}
              {#if pricing.period}
                <span class="text-base font-normal text-slate-400 font-sans">{pricing.period}</span>
              {/if}
            </div>

            {#if pricing.note}
              <div class="text-xs text-indigo-300 mb-2 font-medium">
                {pricing.note}
              </div>
            {/if}

            <p class="text-sm text-slate-400 mb-8">{tier.subtitle}</p>

            <ul class="space-y-3.5 text-sm font-medium mb-8 {isPro ? 'text-slate-200' : 'text-slate-300'}">
              {#each tier.features as feature}
                <li class="flex items-center gap-3">
                  {#if isPro}
                    <span class="text-brand-cyan font-bold">✓</span>
                  {:else if isLifetime}
                    <span class="text-amber-400">★</span>
                  {:else}
                    <span class="text-emerald-400">✓</span>
                  {/if}
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>
          </div>

          <button
            type="button"
            class="w-full inline-flex items-center justify-center py-4 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer {isPro
              ? 'text-white bg-brand-primary hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/40 border border-indigo-300/30 hover:scale-[1.02] active:scale-[0.98]'
              : 'text-white bg-slate-800 hover:bg-slate-700 border border-white/10'}"
            onclick={() => onSelectPlan?.(tier.id, billingCycle)}
          >
            {tier.ctaText}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>

