<script lang="ts">
  import Modal from '@/components/common/Modal.svelte';

  type FeaturePreview = {
    title: string;
    src: string;
    alt: string;
    type?: 'image' | 'video';
    mimeType?: string;
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
      accent: '#8875f2',
      soft: 'rgba(136, 117, 242, 0.12)',
      paths: ['M4 19V5', 'M4 19h16', 'm7 14 3-4 3 2 5-6'],
      preview: {
        title: 'Contoh analisis Lunary',
        src: '/assets/product/laporan-tahunan.png',
        alt: 'Tampilan analisis finansial Lunary',
      },
    },
    {
      title: 'Tampilan cashflow sesuai gayamu',
      description: 'Pilih tampilan simple atau visual dengan simbol agar pencatatan terasa lebih nyaman.',
      accent: '#36c4b2',
      soft: 'rgba(54, 196, 178, 0.12)',
      paths: ['M5 5h14v14H5z', 'M9 9h.01', 'M15 9h.01', 'M9 15h.01', 'M15 15h.01'],
      preview: {
        title: 'Contoh tampilan cashflow Lunary',
        src: '/assets/product/cashflow-view.mp4',
        alt: 'Tampilan cashflow Lunary',
        type: 'video',
      },
    },
    {
      title: 'Pakai dana tanpa bikin cashflow berantakan',
      description: 'Gunakan dana dari dompet atau tabungan dengan pencatatan yang tetap jelas.',
      pro: true,
      accent: '#36c4b2',
      soft: 'rgba(54, 196, 178, 0.12)',
      paths: ['M4 7h16v12H4z', 'M4 10h16', 'M16 14h.01'],
      preview: {
        title: 'Contoh pakai dana Lunary',
        src: '/assets/product/lunary-usefund.mp4',
        alt: 'Demo fitur pakai dana Lunary',
        type: 'video',
        mimeType: 'video/mp4',
      },
    },
    {
      title: 'Analisis bulanan yang mudah dipahami',
      description: 'Lihat pemasukan, pengeluaran, tabungan, dan sisa pendapatan dalam satu ringkasan.',
      pro: true,
      accent: '#6686e8',
      soft: 'rgba(102, 134, 232, 0.12)',
      paths: ['M5 4v16h15', 'M8 16v-4', 'M12 16V8', 'M16 16v-7'],
      preview: {
        title: 'Contoh analisis bulanan Lunary',
        src: '/assets/product/monthly-report.png',
        alt: 'Tampilan analisis bulanan Lunary',
      },
    },
    {
      title: 'Cicilan tetap terpantau',
      description: 'Catat pembayaran cicilan, lihat sisa kewajiban, dan ketahui jadwal pembayaran berikutnya.',
      pro: true,
      accent: '#36c4b2',
      soft: 'rgba(54, 196, 178, 0.12)',
      paths: ['M4 7h16v12H4z', 'M4 11h16', 'M8 15h4'],
      preview: {
        title: 'Contoh cicilan Lunary',
        src: '/assets/product/lunary-cicilan.png',
        alt: 'Tampilan cicilan Lunary',
      },
    },
    {
      title: 'Tagihan tidak lagi mendadak',
      description: 'Simpan tagihan rutin dan pantau status pembayarannya dengan lebih teratur.',
      pro: true,
      accent: '#36c4b2',
      soft: 'rgba(54, 196, 178, 0.12)',
      paths: ['M6 3h12v18H6z', 'M9 7h6', 'M9 11h6', 'M9 15h3'],
      preview: {
        title: 'Contoh tagihan Lunary',
        src: '/assets/product/lunary-bills.png',
        alt: 'Tampilan tagihan Lunary',
      },
    },
    {
      title: 'Semua dompet dalam satu tempat',
      description: 'Kelola saldo bank, e-wallet, cash, dan dompet lainnya tanpa berpindah aplikasi.',
      accent: '#36c4b2',
      soft: 'rgba(54, 196, 178, 0.12)',
      paths: ['M3 7h18v13H3z', 'M3 7l2-4h14l2 4', 'M16 13h.01'],
      preview: {
        title: 'Contoh dompet Lunary',
        src: '/assets/product/lunary-wallet.mp4',
        alt: 'Tampilan dompet Lunary',
        type: 'video',
        mimeType: 'video/mp4',
      },
    },
    {
      title: 'Autocashflow lebih praktis',
      description: 'Gunakan kembali kategori dan transaksi rutin setiap bulan tanpa perlu ribet menginputnya dari awal.',
      accent: '#6686e8',
      soft: 'rgba(102, 134, 232, 0.12)',
      paths: ['M20 11a8 8 0 0 0-14.9-4', 'M4 4v5h5', 'M4 13a8 8 0 0 0 14.9 4', 'M20 20v-5h-5'],
      preview: {
        title: 'Contoh Auto Cashflow Lunary',
        src: '/assets/product/lunary-autocashflow.mp4',
        alt: 'Demo Auto Cashflow Lunary',
        type: 'video',
      },
    },
  ];

  let activePreview = $state<FeaturePreview | null>(null);
  let videoEnded = $state(false);
  let previewVideo = $state<HTMLVideoElement | undefined>(undefined);

  function openPreview(preview: FeaturePreview | null) {
    activePreview = preview;
    videoEnded = false;
  }

  function closePreview() {
    activePreview = null;
    videoEnded = false;
  }

  function replayVideo() {
    if (!previewVideo) return;

    videoEnded = false;
    previewVideo.currentTime = 0;
    void previewVideo.play();
  }
</script>

<section class="feature-grid-section" id="ekosistem" aria-labelledby="feature-grid-title">
  <div class="feature-grid-section__intro">
    <h2 id="feature-grid-title">Mengapa Lunary ?</h2>
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
              onclick={() => openPreview(feature.preview ?? null)}
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
  wide
  hideHeader
  onclose={closePreview}
>
  {#if activePreview}
    <div class="feature-preview-media">
      {#if activePreview.type === 'video'}
        <div class="feature-preview-video">
          <video
            bind:this={previewVideo}
            controls
            autoplay
            muted
            playsinline
            aria-label={activePreview.alt}
            onended={() => (videoEnded = true)}
            onplay={() => (videoEnded = false)}
          >
            <source src={activePreview.src} type={activePreview.mimeType ?? 'video/mp4'} />
          </video>
          {#if videoEnded}
            <div class="feature-preview-replay">
              <button type="button" onclick={replayVideo} aria-label="Ulangi video">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
                Ulangi video
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <img src={activePreview.src} alt={activePreview.alt} />
      {/if}
    </div>
  {/if}
</Modal>

<style>
  .feature-grid-section {
    max-width: 1240px;
    margin: 0 auto;
    padding: 5.5rem 1.25rem 6.5rem;
    border-top: 1px solid rgba(145, 161, 189, 0.12);
  }

  .feature-grid-section__intro {
    display: grid;
    max-width: 960px;
    margin: 0 0 2.5rem;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 3rem;
    align-items: end;
    text-align: left;
  }

  .feature-grid-section h2 {
    margin: 0;
    color: #f8f9ff;
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 1.05;
    letter-spacing: -0.025em;
  }

  .feature-grid-section__intro p {
    margin: 0;
    max-width: 34rem;
    color: #a7b1c5;
    font-size: 0.98rem;
    line-height: 1.7;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }

  .feature-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 245px;
    padding: 1.35rem;
    border: 1px solid rgba(145, 161, 189, 0.15);
    border-radius: 0.75rem;
    background: #10182b;
    box-shadow: none;
    transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
  }

  .feature-card:hover {
    border-color: color-mix(in srgb, var(--feature-accent) 52%, rgba(145, 161, 189, 0.2));
    background: #131d33;
    box-shadow: 0 0.7rem 1.5rem rgba(2, 6, 23, 0.2);
    transform: translateY(-0.25rem);
  }

  .feature-card:focus-within {
    border-color: var(--feature-accent);
    box-shadow: 0 0 0 3px var(--feature-accent-soft);
  }

  .feature-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .feature-card__icon {
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border-radius: 0.65rem;
    color: #10182b;
    background: var(--feature-accent);
  }

  .feature-card__icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .feature-card__badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0.2rem 0.55rem;
    border: 0;
    border-radius: 999px;
    color: #241b0a;
    background: #efc978;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  .feature-card h3 {
    max-width: 19rem;
    margin: 0;
    color: #f4f6ff;
    font-size: 1.02rem;
    line-height: 1.32;
    letter-spacing: -0.01em;
  }

  .feature-card p {
    margin: 0.7rem 0 0;
    color: #91a1bd;
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .feature-card__footer {
    display: flex;
    align-items: flex-end;
    flex: 1;
    margin-top: 1.25rem;
  }

  .feature-card__preview {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0;
    border: 0;
    color: #b5c0d5;
    background: transparent;
    font: inherit;
    font-size: 0.76rem;
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
    color: var(--feature-accent);
  }

  .feature-card__preview:hover span {
    transform: translateX(0.2rem);
  }

  .feature-preview-media {
    display: flex;
    max-height: 74vh;
    align-items: center;
    justify-content: center;
    overflow: auto;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.9rem;
    background: #080c17;
  }

  .feature-preview-media img,
  .feature-preview-media video {
    display: block;
    width: auto;
    max-width: 100%;
    max-height: 72vh;
    object-fit: contain;
  }

  .feature-preview-video {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 100%;
    max-height: 72vh;
    align-items: center;
    justify-content: center;
  }

  .feature-preview-video video {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 72vh;
    object-fit: contain;
  }

  .feature-preview-replay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(3, 6, 15, 0.35);
  }

  .feature-preview-replay button {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    padding: 0.75rem 1rem;
    color: #ffffff;
    background: rgba(17, 24, 39, 0.9);
    box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.28);
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease;
  }

  .feature-preview-replay button:hover {
    background: rgba(124, 131, 255, 0.95);
    transform: translateY(-0.1rem);
  }

  .feature-preview-replay svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  @media (max-width: 1024px) {
    .feature-grid-section__intro {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

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
      max-width: 30rem;
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

  @media (prefers-reduced-motion: reduce) {
    .feature-card {
      transition: border-color 180ms ease, background-color 180ms ease;
    }

    .feature-card:hover {
      transform: none;
    }
  }
</style>
