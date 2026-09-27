<script lang="ts">
  import { onMount } from 'svelte';
  import AmbientGlows from '@/components/layout/AmbientGlows.svelte';
  import Navbar from '@/components/layout/Navbar.svelte';
  import Footer from '@/components/layout/Footer.svelte';
  import HeroSection from '@/components/sections/HeroSection.svelte';
  import RealFeatureShowcase from '@/components/sections/RealFeatureShowcase.svelte';
  import LunaryFeatureGrid from '@/components/sections/LunaryFeatureGrid.svelte';
  import ComparisonTable from '@/components/sections/ComparisonTable.svelte';
  import PricingSection from '@/components/sections/PricingSection.svelte';
  import FaqSection from '@/components/sections/FaqSection.svelte';
  import TestimonialsSection from '@/components/sections/TestimonialsSection.svelte';
  import FinalCtaSection from '@/components/sections/FinalCtaSection.svelte';
  import Toast from '@/components/common/Toast.svelte';

  import { landingService } from '@/api/services/landingService';
  import {
    FALLBACK_TESTIMONIALS,
    FALLBACK_FAQS,
    FALLBACK_MODULE_PLANS,
    FALLBACK_PLAN_VARIANTS,
  } from '@/data/fallbackLandingData';
  import type { TestimonialItem, FaqItem, ModulePlanItem, PlanVariantItem } from '@/types/api';
  import type { Locale, ToastMessage } from '@/types/landing';

  // API State (Directly matches API contract from /api/landing-page)
  let isLoading = $state(true);
  let testimonials = $state<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
  let faqs = $state<FaqItem[]>(FALLBACK_FAQS);
  let modulePlans = $state<ModulePlanItem[]>(FALLBACK_MODULE_PLANS);
  let planVariants = $state<PlanVariantItem[]>(FALLBACK_PLAN_VARIANTS);

  // Toast State
  let activeToast = $state<ToastMessage | null>(null);
  let locale = $state<Locale>('id');

  async function loadLandingData(currentLocale: Locale) {
    isLoading = true;
    try {
      const data = await landingService.getLandingPageData(currentLocale);

      testimonials = data.testimonials?.length > 0 ? data.testimonials : FALLBACK_TESTIMONIALS;
      faqs = data.faqs?.length > 0 ? data.faqs : FALLBACK_FAQS;
      modulePlans = data.module_plans?.length > 0 ? data.module_plans : FALLBACK_MODULE_PLANS;
      planVariants = data.plan_variants?.length > 0 ? data.plan_variants : FALLBACK_PLAN_VARIANTS;
    } catch (err) {
      console.info('[Lunary] Backend offline or error, using fallback datasets.', err);
      testimonials = FALLBACK_TESTIMONIALS;
      faqs = FALLBACK_FAQS;
      modulePlans = FALLBACK_MODULE_PLANS;
      planVariants = FALLBACK_PLAN_VARIANTS;
    } finally {
      isLoading = false;
    }
  }

  async function setLocale(nextLocale: Locale) {
    if (locale === nextLocale && !isLoading) return;
    locale = nextLocale;
    document.documentElement.lang = nextLocale;
    localStorage.setItem('lunary-locale', nextLocale);
    await loadLandingData(nextLocale);
  }

  function showToast(toast: ToastMessage) {
    activeToast = toast;
    setTimeout(() => {
      if (activeToast?.id === toast.id) {
        activeToast = null;
      }
    }, 5000);
  }

  function handleSelectPlan(planId: string | number, cycle: string) {
    const isEn = locale === 'en';
    const targetPlan = modulePlans.find((p) => String(p.id) === String(planId));
    const planName = targetPlan ? targetPlan.name : String(planId);

    showToast({
      id: Date.now().toString(),
      type: 'info',
      message: isEn
        ? `You selected the ${planName} plan (${cycle}). Redirecting to signup...`
        : `Anda memilih paket ${planName} (${cycle}). Mengarahkan ke registrasi...`,
    });
    // Open signup or scroll to final CTA
    const ctaEl = document.getElementById('cta');
    ctaEl?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(async () => {
    const storedLocale = localStorage.getItem('lunary-locale');
    const initialLocale: Locale = (storedLocale === 'en' || storedLocale === 'id') ? storedLocale : 'id';
    locale = initialLocale;
    document.documentElement.lang = initialLocale;
    await loadLandingData(initialLocale);
  });
</script>

<div class="landing-page min-h-screen relative overflow-x-hidden font-sans antialiased selection:bg-brand-primary selection:text-white bg-brand-dark text-slate-200 transition-colors duration-300">
  <!-- Ambient Background Glow Orbs -->
  <AmbientGlows />

  <!-- Sticky Glassmorphic Navbar -->
  <Navbar {locale} onLocaleChange={setLocale} />

  <!-- Main Landing Content -->
  <main class="relative z-10">
    <HeroSection {locale} />
    <RealFeatureShowcase />
    <LunaryFeatureGrid />
    <ComparisonTable {locale} />
    <PricingSection
      {locale}
      {modulePlans}
      {planVariants}
      loading={isLoading}
      onSelectPlan={handleSelectPlan}
    />
    <FaqSection {locale} faqs={faqs} loading={isLoading} />
    <TestimonialsSection {locale} testimonials={testimonials} loading={isLoading} />
    <FinalCtaSection {locale} />
  </main>

  <!-- Main Footer -->
  <Footer {locale} />

  <!-- Global Toast Notification -->
  <Toast toast={activeToast} ondismiss={() => (activeToast = null)} />
</div>
