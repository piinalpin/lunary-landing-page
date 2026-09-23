<script lang="ts">
  import type { ModulePlanItem, PlanVariantItem } from '@/types/api';
  import type { Locale } from '@/types/landing';
  import { FALLBACK_MODULE_PLANS, FALLBACK_PLAN_VARIANTS } from '@/data/fallbackLandingData';
  import { formatRupiah } from '@/utils/formatters';
  import PricingSkeleton from '@/components/skeletons/PricingSkeleton.svelte';

  interface Props {
    locale: Locale;
    modulePlans?: ModulePlanItem[];
    planVariants?: PlanVariantItem[];
    loading?: boolean;
    onSelectPlan?: (planId: string | number, cycle: string) => void;
  }

  let {
    locale,
    modulePlans = FALLBACK_MODULE_PLANS,
    planVariants = FALLBACK_PLAN_VARIANTS,
    loading = false,
    onSelectPlan,
  }: Props = $props();

  let billingCycle = $state<'monthly' | 'yearly'>('monthly');

  function isProPlan(plan: ModulePlanItem): boolean {
    return plan.name.toLowerCase().includes('pro');
  }

  function getVariantsForPlan(plan: ModulePlanItem): PlanVariantItem[] {
    return planVariants.filter(
      (v) =>
        String(v.plan?.id ?? v.module_plan_id) === String(plan.id) ||
        v.plan?.name?.trim().toLowerCase() === plan.name.trim().toLowerCase() ||
        v.name?.toLowerCase().includes(plan.name.toLowerCase())
    );
  }

  function getActiveVariant(plan: ModulePlanItem): PlanVariantItem | undefined {
    const variants = getVariantsForPlan(plan);
    return variants.find((v) =>
      billingCycle === 'monthly'
        ? v.expires_in === 30 || v.billing_cycle === 'monthly' || v.name?.toLowerCase().includes('monthly')
        : v.expires_in === 365 || v.billing_cycle === 'yearly' || v.name?.toLowerCase().includes('yearly')
    );
  }

  function checkBestValue(plan: ModulePlanItem): boolean {
    const activeVar = getActiveVariant(plan);
    return Boolean(activeVar?.is_best_value);
  }

  const copy = {
    id: {
      eyebrow: 'PAKET HARGA',
      heading: 'Pilih paket yang paling pas buat ritme finansialmu',
      body: 'Upgrade atau ubah level langgananmu kapan pun. Semua modul yang kamu butuhkan tampil jelas di sini.',
      billingLabel: 'Siklus tagihan',
      monthly: 'Bulanan',
      yearly: 'Tahunan',
      complete: 'Paling lengkap',
      bestValue: 'Harga Terbaik',
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
      complete: 'Most complete',
      bestValue: 'Best Value',
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

  const idFeatureTranslations: Record<string, string> = {
    dashboard: 'Dasbor',
    cashflow: 'Arus Kas',
    savings: 'Investasi & Tabungan',
    wallet: 'Dompet',
    category: 'Kategori',
    'annual-report': 'Laporan Tahunan',
    goals: 'Target Keuangan',
    bills: 'Tagihan',
    installments: 'Cicilan',
    calendar: 'Kalender',
    'compare-period': 'Bandingkan Periode',
    analytics: 'Analisis Bulanan',
    'use-funds': 'Pakai Dana',
    'more-theme': '20+ Tema Tampilan',
  };

  const c = $derived(copy[locale]);

  const yearlyDiscountBadge = $derived.by(() => {
    const yearlyVariants = planVariants.filter(
      (v) => v.expires_in === 365 || v.billing_cycle === 'yearly' || v.name?.toLowerCase().includes('yearly')
    );
    const discounts = yearlyVariants
      .map((v) => Number(v.discount ?? v.discount_percentage) || 0)
      .filter((d) => d > 0);
    if (discounts.length > 0) {
      return `-${Math.round(Math.max(...discounts))}%`;
    }
    return '';
  });

  function translateFeature(code: string | undefined, fallbackName: string): string {
    if (locale === 'id' && code) {
      return idFeatureTranslations[code] ?? fallbackName;
    }
    return fallbackName;
  }

  function getPricingData(plan: ModulePlanItem) {
    const variant = getActiveVariant(plan);
    const origPrice = Number(variant?.price) || 0;
    const discount = Number(variant?.discount ?? variant?.discount_percentage) || 0;
    const finalPrice = variant?.final_price !== undefined
      ? Number(variant.final_price)
      : Math.floor(origPrice * (100 - discount) / 100);

    return {
      price: formatRupiah(finalPrice),
      originalPrice: formatRupiah(origPrice),
      discount,
      period: billingCycle === 'monthly' ? c.monthlyPeriod : c.yearlyPeriod,
    };
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
        {c.yearly}
        {#if yearlyDiscountBadge}
          <span class="rounded-md bg-brand-cyan/15 px-1.5 py-0.5 text-[9px] uppercase text-brand-cyan">{yearlyDiscountBadge}</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Pricing Cards -->
  {#if loading}
    <PricingSkeleton />
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-6xl mx-auto">
      {#each modulePlans as plan}
        {@const isPro = isProPlan(plan)}
        {@const isBestValue = checkBestValue(plan)}
        {@const pricing = getPricingData(plan)}

        <div
          class="relative glass-card p-6 md:p-8 rounded-3xl border flex flex-col justify-between transition-all overflow-hidden {isBestValue
            ? 'border-brand-primary shadow-lg shadow-brand-primary/20 ring-1 ring-brand-primary/40'
            : isPro
            ? 'border-brand-primary/40'
            : 'border-white/10'}"
        >
          {#if isBestValue}
            <div
              class="pointer-events-none absolute -right-12 top-7 w-44 rotate-45 bg-gradient-to-r from-brand-primary to-indigo-600 py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-brand-primary/30 border-y border-brand-cyan/30 z-20 select-none"
            >
              {c.bestValue}
            </div>
          {/if}

          <div class="mb-7 border-b border-white/10 pb-7">
            <div class="mb-5 flex min-h-7 flex-wrap items-center justify-between gap-2 {isBestValue ? 'pr-12' : ''}">
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
                <h3 class="text-2xl font-black uppercase tracking-tight text-white">{plan.name}</h3>
              </div>
              {#if isPro}
                <span class="rounded-md border border-brand-primary/50 px-2.5 py-1 text-[10px] font-black uppercase text-brand-cyan">
                  {c.complete}
                </span>
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
              {#each plan.modules as module}
                <div class="flex min-w-0 items-center gap-3">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">✓</span>
                  <span class="text-sm font-bold text-slate-300">{translateFeature(module.code, module.name)}</span>
                </div>
              {/each}
              {#if isPro}
                <div class="flex min-w-0 items-center gap-3">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">✓</span>
                  <span class="text-sm font-bold text-slate-300">
                    {locale === 'id' ? idFeatureTranslations['more-theme'] : '20+ Themes'}
                  </span>
                </div>
              {/if}
            </div>
          </div>

          <button
            type="button"
            class="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-xl py-4 px-6 text-sm font-black transition-all cursor-pointer {isPro
              ? 'text-white bg-brand-primary hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/20 border border-indigo-300/30 hover:scale-[1.01]'
              : 'text-white bg-slate-800 hover:bg-slate-700 border border-white/10'}"
            onclick={() => onSelectPlan?.(plan.id, billingCycle)}
          >
            {isPro ? c.proButton : c.starterButton}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>
