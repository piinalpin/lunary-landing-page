<script lang="ts">
  import Modal from '@/components/common/Modal.svelte';

  type FeaturePreview = {
    title: string;
    src: string;
    alt: string;
  };

  type Feature = {
    title: string;
    description: string;
    accent: string;
    soft: string;
    paths: string[];
    pro?: boolean;
    preview?: FeaturePreview;
  };

  const features: Feature[] = [
    {
      title: 'Analisis tahunan yang lebih jelas',
      description: 'Lihat perkembangan pemasukan, pengeluaran, dan kebiasaan finansialmu sepanjang tahun.',
      accent: '#7c83ff',
      soft: 'rgba(124, 131, 255, 0.12)',
      paths: ['M4 19V5', 'M4 19h16', 'm7 14 3-4 3 2 5-6'],
      preview: {
        title: 'Contoh analisis Lunary',
        src: '/assets/product/lunary-analysis-mobile.png',
        alt: 'Tampilan analisis finansial Lunary',
      },
    },
    {
      title: 'Tampilan cashflow sesuai gayamu',
      description: 'Pilih tampilan simple atau visual dengan simbol agar pencatatan terasa lebih nyaman.',
      accent: '#19d3b0',
      soft: 'rgba(25, 211, 176, 0.12)',
      paths: ['M5 5h14v14H5z', 'M9 9h.01', 'M15 9h.01', 'M9 15h.01', 'M15 15h.01'],
      preview: {
        title: 'Contoh tampilan cashflow Lunary',
        src: '/assets/product/lunary-cashflow.webp',
        alt: 'Tampilan cashflow Lunary',
      },
    },
    {
      title: 'Pakai dana tanpa bikin cashflow berantakan',
      description: 'Gunakan dana dari dompet atau tabungan dengan pencatatan yang tetap jelas.',
      pro: true,
      accent: '#f7b955',
      soft: 'rgba(247, 185, 85, 0.12)',
      paths: ['M4 7h16v12H4z', 'M4 10h16', 'M16 14h.01'],
    },
    {
      title: 'Analisis bulanan yang mudah dipahami',
      description: 'Lihat pemasukan, pengeluaran, tabungan, dan sisa pendapatan dalam satu ringkasan.',
      pro: true,
      accent: '#b58cff',
      soft: 'rgba(181, 140, 255, 0.12)',
      paths: ['M5 4v16h15', 'M8 16v-4', 'M12 16V8', 'M16 16v-7'],
      preview: {
        title: 'Contoh analisis bulanan Lunary',
        src: '/assets/product/lunary-monthly-analysis.png',
        alt: 'Tampilan analisis bulanan Lunary',
      },
    },
    {
      title: 'Cicilan tetap terpantau',
      description: 'Catat pembayaran cicilan, lihat sisa kewajiban, dan ketahui jadwal pembayaran berikutnya.',
      pro: true,
      accent: '#ff7895',
      soft: 'rgba(255, 120, 149, 0.12)',
      paths: ['M4 7h16v12H4z', 'M4 11h16', 'M8 15h4'],
    },
    {
      title: 'Tagihan tidak lagi mendadak',
      description: 'Simpan tagihan rutin dan pantau status pembayarannya dengan lebih teratur.',
      pro: true,
      accent: '#ff9b62',
      soft: 'rgba(255, 155, 98, 0.12)',
      paths: ['M6 3h12v18H6z', 'M9 7h6', 'M9 11h6', 'M9 15h3'],
    },
    {
      title: 'Semua dompet dalam satu tempat',
      description: 'Kelola saldo bank, e-wallet, cash, dan dompet lainnya tanpa berpindah aplikasi.',
      accent: '#4dd9a4',
      soft: 'rgba(77, 217, 164, 0.12)',
      paths: ['M3 7h18v13H3z', 'M3 7l2-4h14l2 4', 'M16 13h.01'],
    },
    {
      title: 'Privasi tetap di tanganmu',
      description: 'Sembunyikan nominal saat dibutuhkan dan atur pengalaman finansialmu dengan lebih privat.',
      accent: '#72a9ff',
      soft: 'rgba(114, 169, 255, 0.12)',
      paths: ['M5 11a7 7 0 0 1 14 0', 'M5 11v7h14v-7', 'M9 18v2h6v-2'],
    },
  ];

  let activePreview = $state<FeaturePreview | null>(null);
</script>

<section class="feature-grid-section" id="ekosistem" aria-labelledby="feature-grid-title">
  <div class="feature-grid-section__intro">
    <h2 id="feature-grid-title">Semua yang kamu butuhkan untuk memahami uangmu.</h2>
    <p>Dari detail harian sampai perkembangan finansial sepanjang tahun, semuanya tersusun dalam satu tempat.</p>
  </div>

  <div class="feature-grid" role="list">
    {#each features as feature}
      <article
        class="feature-card"
        role="listitem"
        style={`--feature-accent: ${feature.accent}; --feature-accent-soft: ${feature.soft};`}
      >
        <div class="feature-card__header">
          <div class="feature-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              {#each feature.paths as path}
                <path d={path} />
              {/each}
            </svg>
          </div>
          {#if feature.pro}
            <span class="feature-card__badge" aria-label="Fitur Pro">PRO</span>
          {/if}
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        {#if feature.preview}
          <div class="feature-card__footer">
            <button
              type="button"
              class="feature-card__preview"
              onclick={() => (activePreview = feature.preview ?? null)}
              aria-label={`Lihat contoh ${feature.title}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
              Lihat contoh
              <span aria-hidden="true">→</span>
            </button>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>

<Modal
  isOpen={activePreview !== null}
  title={activePreview?.title ?? 'Pratinjau Lunary'}
  onclose={() => (activePreview = null)}
>
  {#if activePreview}
    <div class="feature-preview-media">
      <img src={activePreview.src} alt={activePreview.alt} />
    </div>
  {/if}
</Modal>

<style>
  .feature-grid-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .feature-grid-section__intro {
    max-width: 760px;
    margin: 0 auto 3rem;
    text-align: center;
  }

  .feature-grid-section h2 {
    margin: 0.75rem 0 1rem;
    color: #f8f9ff;
    font-size: clamp(2rem, 4vw, 3.45rem);
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  .feature-grid-section__intro p {
    margin: 0;
    color: #91a1bd;
    font-size: 1.05rem;
    line-height: 1.65;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }

  .feature-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 275px;
    padding: 1.5rem;
    border: 1px solid rgba(145, 161, 189, 0.16);
    border-radius: 1rem;
    background: linear-gradient(150deg, rgba(17, 25, 47, 0.92), rgba(9, 14, 28, 0.94));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
  }

  .feature-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .feature-card__icon {
    display: grid;
    width: 2.75rem;
    height: 2.75rem;
    place-items: center;
    border: 1px solid color-mix(in srgb, var(--feature-accent) 32%, transparent);
    border-radius: 0.8rem;
    color: var(--feature-accent);
    background: var(--feature-accent-soft);
  }

  .feature-card__icon svg {
    width: 1.35rem;
    height: 1.35rem;
  }

  .feature-card__badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0.2rem 0.55rem;
    border: 1px solid rgba(25, 211, 176, 0.3);
    border-radius: 999px;
    color: #19d3b0;
    background: rgba(25, 211, 176, 0.1);
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  .feature-card h3 {
    max-width: 16rem;
    margin: 0;
    color: #f4f6ff;
    font-size: 1.05rem;
    line-height: 1.3;
    letter-spacing: -0.015em;
  }

  .feature-card p {
    margin: 0.8rem 0 0;
    color: #91a1bd;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .feature-card__footer {
    display: flex;
    align-items: flex-end;
    flex: 1;
    margin-top: 1.5rem;
  }

  .feature-card__preview {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0;
    border: 0;
    color: var(--feature-accent);
    background: transparent;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    opacity: 1;
    transform: none;
    transition: opacity 180ms ease, transform 180ms ease, color 180ms ease;
  }

  .feature-card__preview svg {
    width: 1rem;
    height: 1rem;
  }

  .feature-card__preview span {
    font-size: 1rem;
    line-height: 1;
    transition: transform 180ms ease;
  }

  .feature-card__preview:hover {
    color: #ffffff;
  }

  .feature-card__preview:hover span {
    transform: translateX(0.2rem);
  }

  .feature-preview-media {
    display: flex;
    max-height: 68vh;
    align-items: center;
    justify-content: center;
    overflow: auto;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.9rem;
    background: #080c17;
  }

  .feature-preview-media img {
    display: block;
    width: 100%;
    max-height: 66vh;
    object-fit: contain;
  }

  @media (max-width: 1024px) {
    .feature-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .feature-grid-section {
      padding: 4.5rem 1rem;
    }

    .feature-grid-section__intro {
      margin-bottom: 2.25rem;
    }

    .feature-grid-section__intro p {
      font-size: 0.95rem;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .feature-card {
      min-height: 0;
      padding: 1.35rem;
    }

  }
</style>
