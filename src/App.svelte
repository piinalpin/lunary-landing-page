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
  import {
    FALLBACK_TESTIMONIALS,
    FALLBACK_FAQS,
    FALLBACK_PRICING_TIERS,
  } from '@/data/fallbackLandingData';
  import type { TestimonialItem, FaqItem } from '@/types/api';
  import type { NormalizedPricingTier, ToastMessage } from '@/types/landing';
  import type { Locale } from '@/types/landing';
  import { formatRupiah } from '@/utils/formatters';

  // API State
  let isLoading = $state(true);
  let testimonials = $state<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
  let faqs = $state<FaqItem[]>(FALLBACK_FAQS);
  let pricingTiers = $state<NormalizedPricingTier[]>(FALLBACK_PRICING_TIERS);

  // Modal & Toast State
  let isDemoModalOpen = $state(false);
  let activeToast = $state<ToastMessage | null>(null);
  let locale = $state<Locale>('id');

  function setLocale(nextLocale: Locale) {
    locale = nextLocale;
    document.documentElement.lang = nextLocale;
    localStorage.setItem('lunary-locale', nextLocale);
  }

  function showToast(toast: ToastMessage) {
    activeToast = toast;
    setTimeout(() => {
      if (activeToast?.id === toast.id) {
        activeToast = null;
      }
    }, 5000);
  }

  function handleSelectPlan(planId: string, cycle: string) {
    showToast({
      id: Date.now().toString(),
      type: 'info',
      message: `Anda memilih paket ${planId.toUpperCase()} (${cycle}). Mengarahkan ke registrasi...`,
    });
    // Open signup or scroll to final CTA
    const ctaEl = document.getElementById('cta');
    ctaEl?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(async () => {
    const storedLocale = localStorage.getItem('lunary-locale');
    if (storedLocale === 'id' || storedLocale === 'en') setLocale(storedLocale);

    try {
      const data = await landingService.getLandingPageData();

      // Update testimonials if available from backend
      if (data.testimonials && data.testimonials.length > 0) {
        const seenNames = new Set<string>();
        testimonials = [...data.testimonials, ...FALLBACK_TESTIMONIALS].filter((item) => {
          const normalizedName = item.name.trim().toLowerCase();
          if (seenNames.has(normalizedName)) return false;

          seenNames.add(normalizedName);
          return true;
        });
      }

      // Update faqs if available from backend
      if (data.faqs && data.faqs.length > 0) {
        faqs = data.faqs;
      }

      // Map module_plans & plan_variants to NormalizedPricingTier if available
      if (data.module_plans && data.module_plans.length > 0) {
        const mappedTiers: NormalizedPricingTier[] = data.module_plans.map((plan) => {
          const variants = (data.plan_variants || []).filter(
            (v) => String(v.module_plan_id ?? v.plan?.id) === String(plan.id)
          );

          const monthlyVar = variants.find((v) => v.billing_cycle === 'monthly' || v.expires_in === 30 || v.name?.toLowerCase().includes('monthly'));
          const yearlyVar = variants.find((v) => v.billing_cycle === 'yearly' || v.expires_in === 365 || v.name?.toLowerCase().includes('yearly'));

          const finalPrice = (variant: typeof monthlyVar) => {
            if (!variant) return 0;
            const discount = variant.discount_percentage ?? variant.discount ?? 0;
            return Math.floor(variant.price * (100 - discount) / 100);
          };
          const monthlyRaw = finalPrice(monthlyVar);
          const yearlyRaw = finalPrice(yearlyVar) || monthlyRaw * 10;
          const planCode = plan.code || plan.name.toLowerCase();

          return {
            id: planCode,
            name: plan.name,
            subtitle: plan.description || 'Optimalkan arus kas dengan modul Lunary.',
            monthlyPrice: formatRupiah(monthlyRaw),
            monthlyRawPrice: monthlyRaw,
            monthlyOriginalPrice: formatRupiah(monthlyVar?.price ?? monthlyRaw),
            monthlyOriginalRawPrice: monthlyVar?.price ?? monthlyRaw,
            monthlyDiscount: monthlyVar?.discount_percentage ?? monthlyVar?.discount ?? 0,
            yearlyPrice: formatRupiah(yearlyRaw),
            yearlyRawPrice: yearlyRaw,
            yearlyOriginalPrice: formatRupiah(yearlyVar?.price ?? yearlyRaw),
            yearlyOriginalRawPrice: yearlyVar?.price ?? yearlyRaw,
            yearlyDiscount: yearlyVar?.discount_percentage ?? yearlyVar?.discount ?? 0,
            featured: Boolean(plan.is_featured),
            badge: plan.is_featured ? 'PALING POPULER' : undefined,
            features: (plan.modules || []).map((m) => m.name),
            ctaText: plan.is_featured || planCode === 'pro' ? 'Pilih Pro' : 'Pilih Starter',
            ctaHref: '#harga',
          };
        });

        if (mappedTiers.length > 0) {
          pricingTiers = mappedTiers;
        }
      }
    } catch (err) {
      // Backend may be offline during initial dev, gracefully retain high-fidelity fallback data
      console.info('[Lunary] Backend offline or loading, using high-fidelity fallback datasets.');
    } finally {
      // Simulate quick natural load transition
      setTimeout(() => {
        isLoading = false;
      }, 350);
    }
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
    <ComparisonTable />
    <PricingSection
      {locale}
      tiers={pricingTiers}
      loading={isLoading}
      onSelectPlan={handleSelectPlan}
    />
    <FaqSection faqs={faqs} loading={isLoading} />
    <TestimonialsSection {locale} testimonials={testimonials} loading={isLoading} />
    <FinalCtaSection />
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
</div>
