<script lang="ts">
  import { onMount } from 'svelte';
  import AmbientGlows from '@/components/layout/AmbientGlows.svelte';
  import Navbar from '@/components/layout/Navbar.svelte';
  import Footer from '@/components/layout/Footer.svelte';
  import HeroSection from '@/components/sections/HeroSection.svelte';
  import DashboardPreview from '@/components/sections/DashboardPreview.svelte';
  import BentoFeatures from '@/components/sections/BentoFeatures.svelte';
  import CalendarDeepDive from '@/components/sections/CalendarDeepDive.svelte';
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
  import { formatRupiah } from '@/utils/formatters';

  // API State
  let isLoading = $state(true);
  let testimonials = $state<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
  let faqs = $state<FaqItem[]>(FALLBACK_FAQS);
  let pricingTiers = $state<NormalizedPricingTier[]>(FALLBACK_PRICING_TIERS);

  // Modal & Toast State
  let isDemoModalOpen = $state(false);
  let activeToast = $state<ToastMessage | null>(null);

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
    try {
      const data = await landingService.getLandingPageData();

      // Update testimonials if available from backend
      if (data.testimonials && data.testimonials.length > 0) {
        testimonials = data.testimonials;
      }

      // Update faqs if available from backend
      if (data.faqs && data.faqs.length > 0) {
        faqs = data.faqs;
      }

      // Map module_plans & plan_variants to NormalizedPricingTier if available
      if (data.module_plans && data.module_plans.length > 0) {
        const mappedTiers: NormalizedPricingTier[] = data.module_plans.map((plan) => {
          const variants = (data.plan_variants || []).filter(
            (v) => String(v.module_plan_id) === String(plan.id)
          );

          const monthlyVar = variants.find((v) => v.billing_cycle === 'monthly');
          const yearlyVar = variants.find((v) => v.billing_cycle === 'yearly');
          const lifetimeVar = variants.find((v) => v.billing_cycle === 'lifetime');

          const monthlyRaw = monthlyVar ? monthlyVar.price : 0;
          const yearlyRaw = yearlyVar ? yearlyVar.price : monthlyRaw * 10;
          const lifetimeRaw = lifetimeVar ? lifetimeVar.price : 499000;

          return {
            id: plan.code || String(plan.id),
            name: plan.name,
            subtitle: plan.description || 'Optimalkan arus kas dengan modul Lunary.',
            monthlyPrice: formatRupiah(monthlyRaw),
            monthlyRawPrice: monthlyRaw,
            yearlyPrice: formatRupiah(yearlyRaw),
            yearlyRawPrice: yearlyRaw,
            lifetimePrice: formatRupiah(lifetimeRaw),
            lifetimeRawPrice: lifetimeRaw,
            featured: Boolean(plan.is_featured),
            badge: plan.is_featured ? 'PALING POPULER' : undefined,
            features: (plan.modules || []).map((m) => m.name),
            ctaText: plan.is_featured ? 'Pilih Paket Pro' : 'Mulai Sekarang',
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

<div class="min-h-screen relative overflow-x-hidden font-sans antialiased selection:bg-brand-primary selection:text-white bg-brand-dark text-slate-200">
  <!-- Ambient Background Glow Orbs -->
  <AmbientGlows />

  <!-- Sticky Glassmorphic Navbar -->
  <Navbar />

  <!-- Main Landing Content -->
  <main class="relative z-10">
    <HeroSection onOpenDemo={() => (isDemoModalOpen = true)} />
    <DashboardPreview onQuickAction={() => (isDemoModalOpen = true)} />
    <BentoFeatures />
    <CalendarDeepDive />
    <ComparisonTable />
    <PricingSection
      tiers={pricingTiers}
      loading={isLoading}
      onSelectPlan={handleSelectPlan}
    />
    <FaqSection faqs={faqs} loading={isLoading} />
    <TestimonialsSection testimonials={testimonials} loading={isLoading} />
    <FinalCtaSection onNotify={showToast} />
  </main>

  <!-- Main Footer -->
  <Footer />

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
          Coba Gratis Sekarang
        </a>
      </div>
    </div>
  </Modal>

  <!-- Global Toast Notification -->
  <Toast toast={activeToast} ondismiss={() => (activeToast = null)} />
</div>

