<script lang="ts">
  import { onMount } from 'svelte';
  import type { TestimonialItem } from '@/types/api';
  import type { Locale } from '@/types/landing';
  import { FALLBACK_TESTIMONIALS } from '@/data/fallbackLandingData';
  import TestimonialSkeleton from '@/components/skeletons/TestimonialSkeleton.svelte';
  import { maskLastName } from '@/utils/formatters';

  interface Props {
    locale: Locale;
    testimonials?: TestimonialItem[];
    loading?: boolean;
  }

  let {
    locale,
    testimonials = FALLBACK_TESTIMONIALS,
    loading = false,
  }: Props = $props();

  const copy = {
    id: {
      title: 'Cerita dari pengguna Lunary',
      subtitle: 'Pengalaman nyata saat mengatur cashflow, spending, dan tujuan finansial.',
    },
    en: {
      title: 'Stories from Lunary users',
      subtitle: 'Real experiences managing cashflow, spending, and financial goals.',
    },
  } as const;

  const c = $derived(copy[locale]);
  let slideIndex = $state(1);
  let activeOffset = $state(1);
  let cardWidth = $state(360);
  let carouselGap = $state(20);
  let slideOffset = $state(0);
  let isTransitionEnabled = $state(true);
  let isPaused = $state(false);
  let carouselElement = $state<HTMLDivElement | undefined>();

  const carouselTestimonials = $derived.by(() => {
    if (testimonials.length === 0) return [];

    // Duplicate the list so the track can slide into the next copy before resetting.
    return [testimonials[testimonials.length - 1], ...testimonials, ...testimonials];
  });

  function advanceTestimonials() {
    if (testimonials.length > 1 && !isPaused) {
      slideIndex += 1;
      updateCarouselMetrics();

      // Move into the duplicated first item, then silently jump back to the first copy.
      if (slideIndex === testimonials.length + 1) {
        window.setTimeout(() => {
          isTransitionEnabled = false;
          slideIndex = 1;

          window.requestAnimationFrame(() => {
            updateCarouselMetrics();
            window.requestAnimationFrame(() => (isTransitionEnabled = true));
          });
        }, 2020);
      }
    }
  }

  function updateActiveOffset() {
    activeOffset = window.innerWidth <= 900 ? 0 : 1;
  }

  function updateCarouselMetrics() {
    if (!carouselElement) return;

    const styles = window.getComputedStyle(carouselElement);
    const horizontalPadding =
      (Number.parseFloat(styles.paddingLeft) || 0) + (Number.parseFloat(styles.paddingRight) || 0);
    const availableWidth = carouselElement.clientWidth - horizontalPadding;
    if (availableWidth <= 0) return;

    const viewportWidth = window.innerWidth;
    const visibleCards = viewportWidth <= 640 ? 1 : viewportWidth <= 900 ? 2 : 3;
    const sidePeek = viewportWidth <= 640 ? 20 : Math.min(72, Math.max(16, viewportWidth * 0.05));

    carouselGap = viewportWidth <= 640 ? 16 : 20;
    const calculatedWidth = (availableWidth - sidePeek * 2 - carouselGap * visibleCards) / visibleCards;
    cardWidth = Math.max(260, calculatedWidth);
    slideOffset = -(slideIndex * (cardWidth + carouselGap)) + sidePeek;
  }

  function carouselAction(node: HTMLDivElement) {
    carouselElement = node;
    updateActiveOffset();
    updateCarouselMetrics();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateActiveOffset();
        updateCarouselMetrics();
      });
      ro.observe(node);
    }

    return {
      destroy() {
        ro?.disconnect();
        if (carouselElement === node) {
          carouselElement = undefined;
        }
      },
    };
  }

  $effect(() => {
    if (!loading && carouselElement) {
      updateActiveOffset();
      updateCarouselMetrics();
    }
  });

  $effect(() => {
    if (testimonials.length < 2) return;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const rotationTimer = window.setInterval(advanceTestimonials, 2400);
    return () => window.clearInterval(rotationTimer);
  });

  onMount(() => {
    updateActiveOffset();
    updateCarouselMetrics();
    window.addEventListener('resize', updateActiveOffset);
    window.addEventListener('resize', updateCarouselMetrics);

    return () => {
      window.removeEventListener('resize', updateActiveOffset);
      window.removeEventListener('resize', updateCarouselMetrics);
    };
  });

  function getAvatar(index: number) {
    return `/assets/profile-${(index % 5) + 1}.svg`;
  }
</script>

<section class="relative z-10 w-full overflow-hidden border-t border-white/5 bg-brand-dark py-20 lg:py-28" id="testimoni">
  <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
    <div class="mx-auto mb-14 max-w-3xl">
      <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{c.title}</h2>
      <p class="mt-4 text-base text-slate-400 sm:text-lg">{c.subtitle}</p>
    </div>
  </div>

  {#if loading}
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <TestimonialSkeleton />
    </div>
  {:else}
    <div
      class="testimonial-carousel mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8"
      bind:this={carouselElement}
      use:carouselAction
      role="region"
      aria-label={c.title}
      onfocusin={() => (isPaused = true)}
      onfocusout={() => (isPaused = false)}
    >
      <div
        class:track-no-transition={!isTransitionEnabled}
        class="testimonial-carousel-track"
        style={`--slide-offset: ${slideOffset}px; --card-width: ${cardWidth}px; --card-gap: ${carouselGap}px;`}
      >
        {#each carouselTestimonials as item, index ((item.id ?? index) + '-' + index)}
            <article
              class="testimonial-card glass-card flex min-h-[248px] flex-col rounded-2xl border border-white/10 p-6 transition-colors hover:border-brand-cyan/40 sm:p-7"
              class:active-card={index === slideIndex + activeOffset}
            >
              <header class="flex items-center gap-3">
                <img
                  class="h-12 w-12 rounded-full border-2 border-white/10 bg-[#303036] object-cover"
                  src={item.avatar_url || getAvatar(index)}
                  alt=""
                />
                <div class="min-w-0 text-left">
                  <h3 class="truncate text-sm font-bold text-white">{maskLastName(item.name)}</h3>
                </div>
              </header>

              <p class="mt-8 text-base leading-relaxed text-slate-300 sm:text-lg">
                “{item.quote || item.review}”
              </p>
            </article>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .testimonial-carousel {
    overflow: hidden;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .testimonial-carousel-track {
    display: flex;
    gap: var(--card-gap);
    width: max-content;
    transform: translate3d(var(--slide-offset, 0px), 0, 0);
    transition: transform 2000ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .testimonial-carousel-track.track-no-transition {
    transition: none;
  }

  .testimonial-card {
    position: relative;
    flex: 0 0 var(--card-width, 360px);
    width: var(--card-width, 360px);
    min-width: min(280px, 85vw);
    z-index: 1;
    opacity: 0.62;
    transform: scale(0.91);
    filter: saturate(0.72);
    transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 760ms ease, filter 760ms ease, border-color 220ms ease, box-shadow 760ms ease;
  }

  .testimonial-card::before,
  .testimonial-card::after {
    position: absolute;
    color: rgba(145, 161, 189, 0.16);
    font-family: Georgia, serif;
    font-size: 4rem;
    line-height: 0.8;
    pointer-events: none;
  }

  .testimonial-card::before {
    top: 4.8rem;
    left: 1.1rem;
    content: '“';
  }

  .testimonial-card::after {
    right: 1.1rem;
    bottom: 0.8rem;
    content: '”';
  }

  .testimonial-card.active-card {
    z-index: 2;
    opacity: 1;
    transform: scale(1.04);
    filter: none;
    border-color: rgba(77, 91, 255, 0.42);
    background: linear-gradient(155deg, rgba(22, 31, 58, 0.98), rgba(9, 14, 28, 0.98));
    box-shadow: 0 24px 60px rgba(3, 6, 16, 0.35), 0 0 0 1px rgba(6, 214, 160, 0.08);
  }

  .testimonial-card.active-card::before,
  .testimonial-card.active-card::after {
    color: rgba(129, 140, 248, 0.22);
  }

  @media (prefers-reduced-motion: reduce) {
    .testimonial-carousel-track {
      transition: none;
    }

    .testimonial-card {
      transition: none;
    }
  }
</style>
