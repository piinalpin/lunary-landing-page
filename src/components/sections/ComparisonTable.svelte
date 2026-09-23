<script lang="ts">
  import type { Locale } from '@/types/landing';

  interface Props {
    locale?: Locale;
  }

  let { locale = 'id' }: Props = $props();

  const copy = {
    id: {
      heading: 'Mengatur uang tidak harus ribet.',
      subheading: 'Lunary merapikan hal-hal yang biasanya bikin pencatatan keuangan berhenti di tengah jalan.',
      comparisons: [
        {
          icon: 'grid',
          title: 'Spreadsheet',
          pains: ['Sulit dibuka dari HP', 'Rumus mudah keliru', 'Harus zoom terus'],
          benefits: ['Catat cepat di mana saja', 'Hitung otomatis dan konsisten', 'Ringkasan langsung terbaca'],
        },
        {
          icon: 'note',
          title: 'Catatan HP',
          pains: ['Total masih manual', 'Catatan cepat berantakan', 'Sulit lihat tren bulanan'],
          benefits: ['Kategori dan cashflow rapi', 'Budget terlihat sebelum lewat', 'Analisis bulanan mudah dipantau'],
        },
        {
          icon: 'app',
          title: 'Aplikasi lainnya',
          pains: ['Menu penting tersebar', 'Cashflow dan budget terpisah', 'Analisis sulit ditemukan'],
          benefits: ['Catat, pantau, rencanakan', 'Budget dan cashflow menyatu', 'Analisis mudah ditindaklanjuti'],
        },
      ],
    },
    en: {
      heading: 'Managing money does not have to be painful.',
      subheading: 'Lunary simplifies the bottlenecks that usually make personal bookkeeping fail halfway.',
      comparisons: [
        {
          icon: 'grid',
          title: 'Spreadsheet',
          pains: ['Clunky on mobile phones', 'Formulas easily break', 'Constant pinching and zooming'],
          benefits: ['Quick log anywhere', 'Automatic and reliable calculations', 'Instant clean summaries'],
        },
        {
          icon: 'note',
          title: 'Phone Notes',
          pains: ['Manual math required', 'Quickly turns messy', 'Hard to track monthly trends'],
          benefits: ['Clean categories and cashflow', 'Budget visibility before overspending', 'Easy-to-track monthly insights'],
        },
        {
          icon: 'app',
          title: 'Other Apps',
          pains: ['Scattered navigation', 'Cashflow and budget separated', 'Hidden or cluttered analytics'],
          benefits: ['Log, track, and plan seamlessly', 'Unified budget and cashflow', 'Actionable financial insights'],
        },
      ],
    },
  };

  const c = $derived(copy[locale] ?? copy.id);
</script>

<section class="comparison-section relative z-10 border-t border-white/5 px-4 py-20 sm:px-6 lg:py-28">
  <div class="mx-auto max-w-7xl">
    <div class="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
      <h2 class="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
        {c.heading}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
        {c.subheading}
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {#each c.comparisons as comparison}
        <article class="comparison-card">
          <div class="comparison-body">
            <div class="old-method">
              <span class="method-icon" aria-hidden="true">
                {#if comparison.icon === 'grid'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 4v16"/></svg>
                {:else if comparison.icon === 'note'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
                {:else if comparison.icon === 'app'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h4"/></svg>
                {/if}
              </span>
              <h3>{comparison.title}</h3>
              <ul class="pain-list">
                {#each comparison.pains as pain}
                  <li><span class="list-marker" aria-hidden="true">x</span><span class="list-copy">{pain}</span></li>
                {/each}
              </ul>
            </div>

            <div class="lunary-method">
              <div class="lunary-heading">
                <img src="/assets/lunary-icon.png" alt="" aria-hidden="true" />
                <div>
                  <span>LUNARY</span>
                </div>
              </div>
              <ul class="benefit-list">
                {#each comparison.benefits as benefit}
                  <li><span class="list-marker" aria-hidden="true">✓</span><span class="list-copy">{benefit}</span></li>
                {/each}
              </ul>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .comparison-section { background: #070b16; }

  .comparison-card {
    display: flex;
    height: 100%;
    min-height: 25rem;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgb(148 163 184 / 0.14);
    border-radius: 0.5rem;
    background: #0d1425;
  }

  .comparison-body {
    display: grid;
    flex: 1;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  }

  .old-method {
    min-height: 15rem;
    padding: 1.35rem 1.35rem 1.25rem;
    text-align: center;
  }

  .method-icon {
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background: rgb(99 102 241 / 0.12);
    color: #a5b4fc;
    margin: 0 auto;
  }

  .method-icon svg { width: 1.25rem; height: 1.25rem; }

  .old-method h3 {
    margin: 0.9rem auto 0;
    min-height: 1.75rem;
    color: #e2e8f0;
    font-size: 1.15rem;
    font-weight: 750;
  }

  .pain-list, .benefit-list {
    display: grid;
    gap: 0.6rem;
    width: min(100%, 18rem);
    margin: 1.25rem auto 0;
    padding: 0;
    list-style: none;
  }

  .pain-list li, .benefit-list li {
    display: flex;
    gap: 0.625rem;
    align-items: flex-start;
    justify-content: center;
    font-size: 0.875rem;
    line-height: 1.4;
    text-align: center;
  }

  .pain-list li { color: #94a3b8; }
  .list-marker { flex: 0 0 auto; font-size: 0.9rem; font-weight: 800; line-height: 1.3; }
  .pain-list .list-marker { color: #fb7185; }
  .list-copy { max-width: 14rem; }

  .lunary-method {
    min-height: 15rem;
    padding: 1.35rem 1.35rem 1.5rem;
    border-top: 1px solid rgb(148 163 184 / 0.1);
    background: #0c1a2a;
  }

  .lunary-heading {
    display: flex;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-align: center;
  }
  .lunary-heading img { width: 2.25rem; height: 2.25rem; border-radius: 0.5rem; object-fit: cover; }
  .lunary-heading span { display: block; color: #22d3ee; font-size: 0.65rem; font-weight: 800; text-align: center; }
  .benefit-list li { color: #d1fae5; font-weight: 600; }
  .benefit-list .list-marker { color: #34d399; }

  @media (max-width: 639px) {
    .comparison-body { grid-template-rows: auto auto; }
    .old-method { padding: 1.25rem; }
    .lunary-method { border-top: 1px solid rgb(148 163 184 / 0.1); }
  }
</style>
