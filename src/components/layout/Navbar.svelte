<script lang="ts">
  import { onMount } from 'svelte';
  import { NAV_ITEMS } from '@/data/navigationData';
  import { env } from '@/utils/env';
  import type { Locale } from '@/types/landing';

  interface Props {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
  }

  let { locale, onLocaleChange }: Props = $props();

  const copy = {
    id: { nav: ['Fitur', 'Paket Harga', 'FAQ', 'Testimoni'], login: 'Login', menu: 'Buka menu', close: 'Tutup', aria: 'Navigasi utama' },
    en: { nav: ['Features', 'Pricing', 'FAQ', 'Testimonials'], login: 'Sign in', menu: 'Open menu', close: 'Close menu', aria: 'Main navigation' },
  } as const;

  const c = $derived(copy[locale]);
  const navItems = $derived(NAV_ITEMS.map((item, index) => ({ ...item, label: c.nav[index] })));

  let mobileMenuOpen = $state(false);
  let hasScrolled = $state(false);

  function updateScrolledState() {
    hasScrolled = window.scrollY > 16;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  }

  onMount(() => {
    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolledState);
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="landing-header fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300" class:header-scrolled={hasScrolled}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    <!-- Brand Logo -->
    <a class="flex items-center gap-3 group" href="/" aria-label="Lunary Beranda">
      <img class="w-10 h-10 rounded-xl shadow-lg shadow-brand-primary/20 transition-transform group-hover:scale-105" src="/assets/lunary-icon.png" alt="" />
      <span class="text-xl font-bold tracking-tight text-white font-sans">{env.appName}</span>
    </a>

    <!-- Desktop Navigation Menu -->
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label={c.aria}>
      {#each navItems as item}
        <a class="hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline" href={item.href}>
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Auth Actions (Desktop) -->
    <div class="hidden md:flex items-center gap-4">
      <div class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1" aria-label="Language">
        <button type="button" class:active-locale={locale === 'id'} class="locale-button" onclick={() => onLocaleChange('id')}>ID</button>
        <button type="button" class:active-locale={locale === 'en'} class="locale-button" onclick={() => onLocaleChange('en')}>EN</button>
      </div>
      <a
        class="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primaryHover rounded-full transition-all shadow-glow-primary border border-indigo-400/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        href={env.loginUrl}
      >
        {c.login}
      </a>
    </div>

    <!-- Mobile Hamburger Toggle -->
    <div class="flex md:hidden items-center gap-2">
      <button
        type="button"
        class="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        onclick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? c.close : c.menu}
      >
        {#if mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Drawer / Menu Dropdown -->
  {#if mobileMenuOpen}
    <div class="md:hidden glass-panel border-t border-white/10 px-4 pt-4 pb-6 space-y-4 animate-fadeIn">
      <nav class="flex flex-col space-y-3 text-sm font-medium text-slate-300" aria-label={c.aria}>
        {#each navItems as item}
          <a
            class="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            href={item.href}
            onclick={closeMobileMenu}
          >
            {item.label}
          </a>
        {/each}
      </nav>
      <div class="pt-4 border-t border-white/10 flex items-center">
        <div class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1" aria-label="Language">
          <button type="button" class:active-locale={locale === 'id'} class="locale-button" onclick={() => onLocaleChange('id')}>ID</button>
          <button type="button" class:active-locale={locale === 'en'} class="locale-button" onclick={() => onLocaleChange('en')}>EN</button>
        </div>
      </div>
      <div class="pt-4 border-t border-white/10 flex flex-col gap-3">
        <a
          class="w-full text-center py-3 text-sm font-bold text-white bg-brand-primary rounded-xl shadow-glow-primary border border-indigo-400/40"
          href={env.loginUrl}
          onclick={closeMobileMenu}
        >
          {c.login}
        </a>
      </div>
    </div>
  {/if}
</header>
