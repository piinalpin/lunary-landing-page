<section class="real-features" id="fitur">
  <div class="real-features__intro">
    <span class="real-features__eyebrow">FITUR LUNARY</span>
    <h2>Catat cepat. Budget kebaca. Pola uang makin jelas.</h2>
    <p>Catat cashflow, pantau spending, dan pahami kondisi keuanganmu dalam satu alur yang sederhana.</p>
  </div>

  <div class="real-features__grid">
    <article class="real-feature real-feature--cashflow">
      <div class="real-feature__copy">
        <span class="real-feature__number">01</span>
        <h3>Cashflow sekali ketik, langsung beres.</h3>
        <p>
          Tulis transaksi, pilih kategori, tekan Enter. Arus uangmu langsung tercatat tanpa
          form panjang atau pindah halaman.
        </p>
        <span class="real-feature__tag">Catat cepat tanpa ribet</span>
      </div>
      <div class="real-feature__media real-feature__media--cashflow">
        <img
          src="/assets/product/lunary-demo-starter.png"
          alt="Tampilan asli Lunary Cashflow pada akun Starter demo-starter"
          loading="lazy"
        />
      </div>
    </article>

    <article class="real-feature real-feature--budget">
      <div class="real-feature__copy">
        <span class="real-feature__number">02</span>
        <h3>Spending lebih terkontrol.</h3>
        <p>
          Catat setiap pengeluaran dengan cepat dan lihat ke mana uangmu pergi, tanpa perlu menghitung manual.
        </p>
        <span class="real-feature__tag">Pantau pengeluaran dengan jelas</span>
      </div>
      <div class="real-feature__media real-feature__media--analysis real-feature__media--budget">
        <img
          src="/assets/product/lunary-spending-starter.png"
          alt="Tampilan asli Lunary Spending pada akun Starter"
          loading="lazy"
        />
      </div>
    </article>
  </div>

  <div class="real-features__devices">
    <div>
      <span class="real-features__eyebrow">IKUT KE MANA KAMU PERGI</span>
      <h3>Catat dari HP, review di tablet, lanjutkan dari laptop.</h3>
      <p>
        Lunary tetap terasa rapi di layar kecil maupun besar, jadi urusan uang tidak harus
        menunggu sampai kamu duduk di depan laptop.
      </p>
    </div>
    <div class="device-stack" aria-label="Lunary tersedia di berbagai perangkat">
      <div class="device-frame device-frame--laptop">
        <img
          src="/assets/product/lunary-demo-starter.png"
          alt="Lunary Cashflow pada akun Starter demo-starter di laptop"
          loading="lazy"
        />
      </div>
      <div class="device-frame device-frame--tablet">
        <img
          src="/assets/product/lunary-monthly-analysis.png"
          alt="Lunary Analisis Bulanan pada tablet portrait"
          loading="lazy"
        />
      </div>
      <div class="device-frame device-frame--phone">
        <img
          src="/assets/product/lunary-analysis-mobile.png"
          alt="Preview portrait Analisis Bulanan Lunary di ponsel"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .real-features {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 7rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .real-features__intro {
    max-width: 760px;
    margin: 0 auto 3.5rem;
    text-align: center;
  }

  .real-features__eyebrow {
    color: #5b68ff;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.18em;
  }

  .real-features__intro h2 {
    margin: 0.75rem 0 1rem;
    color: #f8f9ff;
    font-size: clamp(2rem, 4vw, 3.8rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .real-features__intro p,
  .real-feature__copy p,
  .real-features__devices p {
    color: #91a1bd;
    line-height: 1.65;
  }

  .real-features__grid {
    display: grid;
    gap: 1.25rem;
  }

  .real-feature {
    display: grid;
    min-height: 430px;
    overflow: hidden;
    border: 1px solid rgba(145, 161, 189, 0.18);
    border-radius: 1.5rem;
    background: linear-gradient(135deg, rgba(17, 25, 47, 0.96), rgba(9, 14, 28, 0.96));
  }

  .real-feature--cashflow {
    grid-template-columns: minmax(250px, 0.75fr) minmax(0, 1.65fr);
  }

  .real-feature--budget {
    grid-template-columns: minmax(230px, 0.8fr) minmax(0, 1.2fr);
  }

  .real-feature__copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2.25rem;
  }

  .real-feature__number {
    color: #5b68ff;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .real-feature__copy h3 {
    max-width: 360px;
    margin: 0.85rem 0 0.8rem;
    color: #f8f9ff;
    font-size: clamp(1.45rem, 2vw, 2.15rem);
    line-height: 1.12;
    letter-spacing: -0.03em;
  }

  .real-feature__copy p {
    max-width: 390px;
    margin: 0;
    font-size: 0.98rem;
  }

  .real-feature__tag {
    margin-top: 1.5rem;
    padding: 0.55rem 0.8rem;
    border: 1px solid rgba(0, 216, 170, 0.25);
    border-radius: 999px;
    color: #00d8aa;
    background: rgba(0, 216, 170, 0.08);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .real-feature__media {
    position: relative;
    min-height: 100%;
    overflow: hidden;
    border-left: 1px solid rgba(145, 161, 189, 0.13);
    background: #070b17;
  }

  .real-feature__media::after {
    position: absolute;
    inset: 0;
    content: '';
    pointer-events: none;
    box-shadow: inset 0 0 90px rgba(6, 10, 22, 0.5);
  }

  .real-feature__media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .real-feature__media--cashflow img {
    object-position: center;
  }

  .real-feature__media--analysis img {
    transform: scale(1.03);
    object-fit: cover;
  }

  .real-feature__media--budget img {
    object-position: center bottom;
  }

  .real-features__devices {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1.15fr);
    gap: 2rem;
    align-items: center;
    margin-top: 1.25rem;
    padding: 2.5rem;
    border: 1px solid rgba(145, 161, 189, 0.18);
    border-radius: 1.5rem;
    background: rgba(13, 19, 37, 0.72);
  }

  .real-features__devices h3 {
    max-width: 440px;
    margin: 0.65rem 0 0.8rem;
    color: #f8f9ff;
    font-size: clamp(1.5rem, 2.4vw, 2.4rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .real-features__devices p {
    max-width: 440px;
    margin: 0;
  }

  .device-stack {
    position: relative;
    min-height: 320px;
  }

  .device-frame {
    position: absolute;
    overflow: hidden;
    border: 7px solid #1b2542;
    background: #070b17;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }

  .device-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .device-frame--laptop {
    top: 0;
    left: 50%;
    width: min(100%, 470px);
    aspect-ratio: 1.72;
    border-radius: 1.15rem;
    transform: translateX(-50%) rotate(-3deg);
    z-index: 1;
  }

  .device-frame--tablet {
    right: 14%;
    bottom: 0;
    width: min(42%, 215px);
    aspect-ratio: 0.7;
    border-radius: 1.3rem;
    transform: rotate(4deg);
    z-index: 2;
  }

  .device-frame--phone {
    right: 3%;
    bottom: -0.25rem;
    width: 105px;
    aspect-ratio: 0.52;
    border-radius: 1.25rem;
    transform: rotate(7deg);
    z-index: 3;
  }

  .device-frame--phone img {
    object-position: center top;
  }

  @media (max-width: 800px) {
    .real-features {
      padding: 5rem 1rem;
    }

    .real-feature,
    .real-feature--cashflow,
    .real-feature--budget,
    .real-features__devices {
      grid-template-columns: 1fr;
    }

    .real-feature__copy {
      padding: 1.5rem;
    }

    .real-feature__media {
      min-height: 245px;
      border-top: 1px solid rgba(145, 161, 189, 0.13);
      border-left: 0;
    }

    .real-features__devices {
      padding: 1.5rem;
    }

    .device-stack {
      min-height: 270px;
      transform: scale(0.86);
      transform-origin: center center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .device-frame--laptop,
    .device-frame--tablet,
    .device-frame--phone {
      transform: none;
    }
  }
</style>
