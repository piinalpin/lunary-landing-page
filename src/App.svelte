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
  import Modal from '@/components/common/Modal.svelte';
  import Toast from '@/components/common/Toast.svelte';

  import { landingService } from '@/api/services/landingService';
  import RegistrationModal from '@/components/registration/RegistrationModal.svelte';
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

  // Modal & Toast State
  let isDemoModalOpen = $state(false);
  let isRegistrationModalOpen = $state(false);
  let selectedVariant = $state<PlanVariantItem | null>(null);
  let selectedPlanName = $state('');
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
    const targetPlan = modulePlans.find((p) => String(p.id) === String(planId));
    if (!targetPlan) return;

    const isMonthly = cycle === 'monthly';
    const match = planVariants.find((v) => {
      const planMatch =
        String(v.plan?.id ?? v.module_plan_id) === String(targetPlan.id) ||
        v.plan?.name?.trim().toLowerCase() === targetPlan.name.trim().toLowerCase() ||
        v.name?.toLowerCase().includes(targetPlan.name.toLowerCase());
      const cycleMatch = isMonthly
        ? v.expires_in === 30 ||
          v.billing_cycle === 'monthly' ||
          v.name?.toLowerCase().includes('monthly')
        : v.expires_in === 365 ||
          v.billing_cycle === 'yearly' ||
          v.name?.toLowerCase().includes('yearly');
      return planMatch && cycleMatch;
    });

    if (!match) {
      showToast({
        id: Date.now().toString(),
        type: 'error',
        message:
          locale === 'en'
            ? 'Plan variant is unavailable. Refresh the page and try again.'
            : 'Varian paket tidak tersedia. Muat ulang halaman lalu coba lagi.',
      });
      return;
    }

    selectedVariant = match;
    selectedPlanName = targetPlan.name;
    isRegistrationModalOpen = true;
  }

  function handleCtaRegister() {
    const fallback = planVariants.find((v) => v.is_best_value) ?? planVariants[0];
    if (!fallback) {
      document.getElementById('harga')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    selectedVariant = fallback;
    selectedPlanName = fallback.plan?.name ?? fallback.name ?? '';
    isRegistrationModalOpen = true;
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
    <HeroSection {locale} onOpenDemo={() => (isDemoModalOpen = true)} />
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
    <FinalCtaSection {locale} onRegister={handleCtaRegister} />
  </main>

  <!-- Main Footer -->
  <Footer {locale} />

  <!-- Interactive Demo Preview Modal -->
  <Modal
    isOpen={isDemoModalOpen}
    title="Tur Fitur 2 Menit: Lunary App"
    onclose={() => (isDemoModalOpen = false)}
  >
    <div class="space-y-4">
      <div class="aspect-video w-full rounded-2xl bg-brand-surface border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div class="w-16 h-16 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-3xl mb-4 animate-pulse">
          ▶
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Simulasi Dasbor Interaktif</h4>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md">
          Pengalaman mencatat keuangan personal tanpa gesekan: sinkronisasi multi-wallet, envelope budgeting otomatis, dan pelunasan dana talangan secara real-time.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 pt-2">
        <div class="p-3.5 rounded-xl bg-brand-surface border border-white/5 text-xs">
          <span class="text-brand-cyan font-bold block mb-1">✓ Enkripsi Bank-Grade</span>
          <span class="text-slate-400">Data terlindungi enkripsi AES-256 end-to-end.</span>
        </div>
        <div class="p-3.5 rounded-xl bg-brand-surface border border-white/5 text-xs">
          <span class="text-brand-cyan font-bold block mb-1">✓ Multi-Platform</span>
          <span class="text-slate-400">Akses mulus dari browser desktop maupun ponsel.</span>
        </div>
      </div>

      <div class="pt-4 flex justify-end gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          onclick={() => (isDemoModalOpen = false)}
        >
          Tutup
        </button>
        <a
          class="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-primary hover:bg-brand-primaryHover transition-all shadow-glow-primary cursor-pointer"
          href="#harga"
          onclick={() => (isDemoModalOpen = false)}
        >
          Lihat Paket
        </a>
      </div>
    </div>
  </Modal>

  <!-- Global Toast Notification -->
  <Toast toast={activeToast} ondismiss={() => (activeToast = null)} />

  <!-- Registration & Payment Modal -->
  <RegistrationModal
    isOpen={isRegistrationModalOpen}
    variant={selectedVariant}
    planName={selectedPlanName}
    {locale}
    onclose={() => (isRegistrationModalOpen = false)}
  />
</div>
