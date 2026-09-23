<script lang="ts">
  import type { NormalizedPricingTier } from '@/types/landing';
  import type { Locale } from '@/types/landing';
  import { FALLBACK_PRICING_TIERS } from '@/data/fallbackLandingData';
  import PricingSkeleton from '@/components/skeletons/PricingSkeleton.svelte';

  interface Props {
    locale: Locale;
    tiers?: NormalizedPricingTier[];
    loading?: boolean;
    onSelectPlan?: (planId: string, cycle: string) => void;
  }

  let {
    locale,
    tiers = FALLBACK_PRICING_TIERS,
    loading = false,
    onSelectPlan,
  }: Props = $props();

  let billingCycle = $state<'monthly' | 'yearly'>('monthly');
  const visibleTiers = $derived(tiers.filter((tier) => tier.id !== 'lifetime'));

  function isProPlan(tier: NormalizedPricingTier) {
    return tier.id.toLowerCase() === 'pro' || tier.name.toLowerCase().includes('pro');
  }

  const copy = {
    id: {
      eyebrow: 'PAKET HARGA',
      heading: 'Pilih paket yang paling pas buat ritme finansialmu',
      body: 'Upgrade atau ubah level langgananmu kapan pun. Semua modul yang kamu butuhkan tampil jelas di sini.',
      billingLabel: 'Siklus tagihan',
      monthly: 'Bulanan',
      yearly: 'Tahunan',
      yearlyDiscount: '-20%',
      complete: 'Paling lengkap',
      starterFeatures: 'Yang sudah termasuk',
      proFeatures: 'Semua fitur Starter, plus:',
      save: 'Hemat',
      starterButton: 'Pilih Starter',
      proButton: 'Pilih Pro',
      monthlyPeriod: '/ bulan',
      yearlyPeriod: '/ tahun',
      starterSummary: 'Fitur esensial untuk mencatat dan memantau keuangan sehari-hari.',
      proSummary: 'Perencanaan, analisis, dan personalisasi yang lebih lengkap untuk finansialmu.',
    },
    en: {
      eyebrow: 'PRICING',
      heading: 'Pick the plan that fits your money rhythm',
      body: 'Upgrade or switch your plan whenever you want. Every module you need, clearly laid out.',
      billingLabel: 'Billing cycle',
      monthly: 'Monthly',
      yearly: 'Yearly',
      yearlyDiscount: '-20%',
      complete: 'Most complete',
      starterFeatures: 'What is included',
      proFeatures: 'Everything in Starter, plus:',
      save: 'Save',
      starterButton: 'Choose Starter',
      proButton: 'Choose Pro',
      monthlyPeriod: '/ month',
      yearlyPeriod: '/ year',
      starterSummary: 'Essential tools to track and monitor your everyday finances.',
      proSummary: 'More complete planning, analysis, and personalization for your finances.',
    },
  } as const;

  const featureTranslations: Record<Locale, Record<string, string>> = {
    id: {
      dashboard: 'Dasbor',
      cashflow: 'Arus Kas',
      'invest & savings': 'Investasi & Tabungan',
      wallet: 'Dompet',
      category: 'Kategori',
      'annual report': 'Laporan Tahunan',
      'financial goals': 'Target Keuangan',
      bills: 'Tagihan',
      installments: 'Cicilan',
      calendar: 'Kalender',
      'monthly analysis': 'Analisis Bulanan',
      'compare period': 'Bandingkan Periode',
      'use funds': 'Pakai Dana',
      'more themes': '20+ Tema Tampilan',
    },
    en: {
      dashboard: 'Dashboard',
      cashflow: 'Cashflow',
      'invest & savings': 'Invest & Savings',
      wallet: 'Wallet',
      category: 'Category',
      'annual report': 'Annual Report',
      'financial goals': 'Financial Goals',
      bills: 'Bills',
      installments: 'Installments',
      calendar: 'Calendar',
      'monthly analysis': 'Monthly Analysis',
      'compare period': 'Compare Period',
      'use funds': 'Use Funds',
      'more themes': 'More themes',
    },
  };

  const c = $derived(copy[locale]);

  function translateFeature(feature: string) {
    return featureTranslations[locale][feature.trim().toLowerCase()] ?? feature;
  }

  function getPriceDisplay(tier: NormalizedPricingTier) {
    return billingCycle === 'monthly'
      ? { price: tier.monthlyPrice, originalPrice: tier.monthlyOriginalPrice, discount: tier.monthlyDiscount, period: c.monthlyPeriod }
      : { price: tier.yearlyPrice, originalPrice: tier.yearlyOriginalPrice, discount: tier.yearlyDiscount, period: c.yearlyPeriod };
  }
</script>

<section class="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="harga">
  <!-- Heading & Eyebrow -->
  <div class="text-center max-w-3xl mx-auto mb-14">
    <span class="text-xs uppercase font-bold tracking-widest text-brand-cyan">{c.eyebrow}</span>
    <h2 class="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
      {c.heading}
    </h2>
    <p class="text-base sm:text-lg text-slate-400">
      {c.body}
    </p>

    <div class="mt-8 inline-flex items-center rounded-xl border border-white/10 bg-brand-surface/70 p-1 shadow-inner" role="tablist" aria-label={c.billingLabel}>
      <button
        type="button"
        role="tab"
        aria-selected={billingCycle === 'monthly'}
        class="rounded-lg px-5 py-2 text-xs font-bold transition-all cursor-pointer {billingCycle === 'monthly'
          ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
          : 'text-slate-300 hover:bg-white/10 hover:text-white'}"
        onclick={() => (billingCycle = 'monthly')}
      >
        {c.monthly}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={billingCycle === 'yearly'}
        class="flex items-center gap-2 rounded-lg px-5 py-2 text-xs font-bold transition-all cursor-pointer {billingCycle === 'yearly'
          ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
          : 'text-slate-300 hover:bg-white/10 hover:text-white'}"
        onclick={() => (billingCycle = 'yearly')}
      >
        {c.yearly} <span class="rounded-md bg-brand-cyan/15 px-1.5 py-0.5 text-[9px] uppercase text-brand-cyan">{c.yearlyDiscount}</span>
      </button>
    </div>
  </div>

  <!-- Pricing Cards -->
  {#if loading}
    <PricingSkeleton />
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-6xl mx-auto">
      {#each visibleTiers as tier}
        {@const isPro = isProPlan(tier)}
        {@const pricing = getPriceDisplay(tier)}

        <div
          class="relative glass-card p-6 md:p-8 rounded-3xl border flex flex-col justify-between transition-all {isPro
            ? 'border-brand-primary shadow-lg shadow-brand-primary/10'
            : 'border-white/10'}"
        >
          <div class="mb-7 border-b border-white/10 pb-7">
            <div class="mb-5 flex min-h-7 flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl {isPro ? 'bg-brand-primary/15 text-brand-cyan' : 'bg-brand-cyan/10 text-brand-cyan'}" aria-hidden="true">
                  {#if isPro}
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 3 2.1 4.25 4.7.68-3.4 3.32.8 4.68L12 13.72l-4.2 2.21.8-4.68-3.4-3.32 4.7-.68L12 3Z" />
                    </svg>
                  {:else}
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7.5h18v11H3v-11Zm0 3h18M7 7.5V5.75A1.75 1.75 0 0 1 8.75 4h6.5A1.75 1.75 0 0 1 17 5.75V7.5M12 14h.01" />
                    </svg>
                  {/if}
                </span>
                <h3 class="text-2xl font-black uppercase tracking-tight text-white">{isPro ? 'Pro' : 'Starter'}</h3>
              </div>
              {#if isPro}
                <span class="rounded-md border border-brand-primary/50 px-2.5 py-1 text-[10px] font-black uppercase text-brand-cyan">{c.complete}</span>
              {/if}
            </div>
            <div class="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span class="text-4xl font-black tracking-tight text-white sm:text-5xl font-mono">{pricing.price}</span>
              <span class="text-xs font-bold uppercase text-slate-400">{pricing.period}</span>
            </div>
            {#if pricing.discount > 0}
              <div class="mb-3 flex flex-wrap items-center gap-3">
                <span class="text-sm font-bold text-slate-400 line-through">{pricing.originalPrice}</span>
                <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black uppercase text-emerald-300">
                  {c.save} {Math.round(pricing.discount)}%
                </span>
              </div>
            {/if}
            <p class="mt-5 text-sm leading-relaxed text-slate-400">{isPro ? c.proSummary : c.starterSummary}</p>
          </div>

          <div class="grow">
            <h4 class="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{isPro ? c.proFeatures : c.starterFeatures}</h4>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {#each tier.features as feature}
                <div class="flex min-w-0 items-center gap-3">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">✓</span>
                  <span class="text-sm font-bold text-slate-300">{translateFeature(feature)}</span>
                </div>
              {/each}
              {#if isPro}
                <div class="flex min-w-0 items-center gap-3">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">✓</span>
                  <span class="text-sm font-bold text-slate-300">{featureTranslations[locale]['more themes']}</span>
                </div>
              {/if}
            </div>
          </div>

          <button
            type="button"
            class="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-xl py-4 px-6 text-sm font-black transition-all cursor-pointer {isPro
              ? 'text-white bg-brand-primary hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/20 border border-indigo-300/30 hover:scale-[1.01]'
              : 'text-white bg-slate-800 hover:bg-slate-700 border border-white/10'}"
            onclick={() => onSelectPlan?.(tier.id, billingCycle)}
          >
            {isPro ? c.proButton : c.starterButton}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>
