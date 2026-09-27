<script lang="ts">
  import { onMount } from 'svelte';
  import type { Locale } from '@/types/landing';

  interface Props {
    locale: Locale;
  }

  let { locale }: Props = $props();

  const copy = {
    id: {
      messages: [
        { title: 'Uang lebih keatur.', accent: 'Hidup lebih tenang.' },
        { title: 'Bye-bye pusing finansial,', accent: 'Cashflow rapi secara maksimal.' },
        { title: 'Target lebih dekat.', accent: 'Pengeluaran lebih sadar.' },
        { title: 'Ngatur uang lebih simpel.', accent: 'Tanpa drama spreadsheet.' },
        { title: 'Tagihan tersetel.', accent: 'Dompet aman terkendali.' },
        { title: 'Satu klik kelar.', accent: 'Bebas pusing akhir bulan.' },
        { title: 'Saldo terpantau.', accent: 'Masa depan jalan terus.' },
      ],
      body: 'Catat cashflow, pantau dompet, atur target, tagihan, dan cicilan. Semua kebaca jelas, tanpa drama spreadsheet.',
      primary: 'Lihat paket',
      trust: 'Urusan uang jadi lebih kebaca, Gen Z approved.',
    },
    en: {
      messages: [
        { title: 'Money, but more sorted.', accent: 'Life, but more chill.' },
        { title: 'Bye-bye financial stress,', accent: 'Cashflow, sorted to perfection.' },
        { title: 'Goals get closer.', accent: 'Spending gets clearer.' },
        { title: 'Personal finance, simplified.', accent: 'Zero spreadsheet drama.' },
        { title: 'Bills are set.', accent: 'Your wallet stays in control.' },
        { title: 'One click and done.', accent: 'No more month-end stress.' },
        { title: 'Balance in sight.', accent: 'Your future keeps moving.' },
      ],
      body: 'Track cashflow, watch your wallets, set goals, and stay on top of bills and installments. Clear money stuff, zero spreadsheet drama.',
      primary: 'View plans',
      trust: 'Your money stuff, finally making sense.',
    },
  } as const;

  const c = $derived(copy[locale]);
  type TypewriterPhase = 'typing-title' | 'typing-accent' | 'holding' | 'deleting-accent' | 'deleting-title';

  let messageIndex = $state(0);
  let displayedTitle = $state('');
  let displayedAccent = $state('');
  let typewriterPhase = $state<TypewriterPhase>('typing-title');
  let characterIndex = $state(0);
  let holdTicks = $state(0);
  const activeMessage = $derived(c.messages[messageIndex % c.messages.length]);

  function resetTypewriter() {
    messageIndex = 0;
    displayedTitle = '';
    displayedAccent = '';
    typewriterPhase = 'typing-title';
    characterIndex = 0;
    holdTicks = 0;
  }

  function advanceTypewriter() {
    const message = activeMessage;

    if (typewriterPhase === 'typing-title') {
      if (characterIndex < message.title.length) {
        characterIndex += 1;
        displayedTitle = message.title.slice(0, characterIndex);
      } else {
        characterIndex = 0;
        typewriterPhase = 'typing-accent';
      }
      return;
    }

    if (typewriterPhase === 'typing-accent') {
      if (characterIndex < message.accent.length) {
        characterIndex += 1;
        displayedAccent = message.accent.slice(0, characterIndex);
      } else {
        holdTicks = 0;
        typewriterPhase = 'holding';
      }
      return;
    }

    if (typewriterPhase === 'holding') {
      holdTicks += 1;
      if (holdTicks >= 64) {
        characterIndex = message.accent.length;
        typewriterPhase = 'deleting-accent';
      }
      return;
    }

    if (typewriterPhase === 'deleting-accent') {
      if (characterIndex > 0) {
        characterIndex -= 1;
        displayedAccent = message.accent.slice(0, characterIndex);
      } else {
        characterIndex = message.title.length;
        typewriterPhase = 'deleting-title';
      }
      return;
    }

    if (characterIndex > 0) {
      characterIndex -= 1;
      displayedTitle = message.title.slice(0, characterIndex);
    } else {
      messageIndex = (messageIndex + 1) % c.messages.length;
      typewriterPhase = 'typing-title';
    }
  }

  onMount(() => {
    let previousLocale = locale;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      displayedTitle = c.messages[0].title;
      displayedAccent = c.messages[0].accent;
      typewriterPhase = 'holding';
    }

    const typewriterTimer = window.setInterval(() => {
      if (previousLocale !== locale) {
        previousLocale = locale;
        resetTypewriter();

        if (reduceMotion) {
          displayedTitle = c.messages[0].title;
          displayedAccent = c.messages[0].accent;
          typewriterPhase = 'holding';
        }

        return;
      }

      if (!reduceMotion) advanceTypewriter();
    }, 42);

    return () => window.clearInterval(typewriterTimer);
  });
</script>

<section class="landing-hero relative z-10 w-full max-w-none px-4 text-center sm:px-6 lg:px-8">
  <!-- Main Heading -->
  <h1 class="hero-headline mx-auto mb-6 max-w-5xl text-4xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-6xl lg:text-7xl" aria-label={`${activeMessage.title} ${activeMessage.accent}`}>
    <span class="hero-headline-line block">
      {displayedTitle}<span class:cursor-visible={typewriterPhase === 'typing-title' || typewriterPhase === 'deleting-title'} class="typewriter-cursor" aria-hidden="true">|</span>
    </span>
    <span class="hero-headline-line text-gradient-white block">
      {displayedAccent}<span class:cursor-visible={typewriterPhase === 'typing-accent' || typewriterPhase === 'deleting-accent' || typewriterPhase === 'holding'} class="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  </h1>

  <!-- Subheadline -->
  <p class="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
    {c.body}
  </p>

  <!-- Call to Action Button -->
  <div class="flex items-center justify-center mb-12">
    <a
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-primary hover:bg-brand-primaryHover rounded-2xl transition-all shadow-glow-primary border border-indigo-300/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
      href="#harga"
    >
      <span>{c.primary}</span>
      <svg class="w-5 h-5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
      </svg>
    </a>
  </div>

  <!-- Trust Badge & Social Proof -->
  <div class="hero-social-proof">
    <div class="profile-stack" aria-label="Profil pengguna Lunary">
      <span class="profile-avatar"><img src="/assets/profile-1.svg" alt="" /></span>
      <span class="profile-avatar"><img src="/assets/profile-2.svg" alt="" /></span>
      <span class="profile-avatar"><img src="/assets/profile-3.svg" alt="" /></span>
      <span class="profile-avatar"><img src="/assets/profile-4.svg" alt="" /></span>
      <span class="profile-avatar"><img src="/assets/profile-5.svg" alt="" /></span>
    </div>
    <div class="hero-social-copy">
      <div class="hero-stars" aria-label="5 dari 5 bintang">★★★★★</div>
      <span>{c.trust}</span>
    </div>
  </div>
</section>
