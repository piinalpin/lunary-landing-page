<script lang="ts">
  import { NAV_ITEMS } from '@/data/navigationData';
  import { env } from '@/utils/env';

  let mobileMenuOpen = $state(false);

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
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 w-full glass-panel border-b border-white/5 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    <!-- Brand Logo -->
    <a class="flex items-center gap-3 group" href="/" aria-label="Lunary Beranda">
      <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-brand-primary/20">
        <div class="w-full h-full bg-brand-dark rounded-[11px] flex items-center justify-center transition-colors group-hover:bg-brand-surface">
          <!-- Moon crescent brand symbol -->
          <svg class="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36 10.14 10.14 0 1 0 22 14.05a1 1 0 0 0-.36-1.05z"></path>
          </svg>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold tracking-tight text-white font-sans">{env.appName}</span>
        <span class="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">👑 PRO</span>
      </div>
    </a>

    <!-- Desktop Navigation Menu -->
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label="Navigasi Utama">
      {#each NAV_ITEMS as item}
        <a class="hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline" href={item.href}>
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Auth Actions (Desktop) -->
    <div class="hidden md:flex items-center gap-4">
      <a
        class="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg"
        href={env.loginUrl}
      >
        Masuk
      </a>
      <a
        class="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primaryHover rounded-full transition-all shadow-glow-primary border border-indigo-400/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        href="#harga"
      >
        Mulai Gratis
      </a>
    </div>

    <!-- Mobile Hamburger Toggle -->
    <div class="flex md:hidden items-center gap-2">
      <button
        type="button"
        class="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        onclick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
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
      <nav class="flex flex-col space-y-3 text-sm font-medium text-slate-300">
        {#each NAV_ITEMS as item}
          <a
            class="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            href={item.href}
            onclick={closeMobileMenu}
          >
            {item.label}
          </a>
        {/each}
      </nav>
      <div class="pt-4 border-t border-white/10 flex flex-col gap-3">
        <a
          class="w-full text-center py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-brand-surface rounded-xl border border-white/10"
          href={env.loginUrl}
          onclick={closeMobileMenu}
        >
          Masuk
        </a>
        <a
          class="w-full text-center py-3 text-sm font-bold text-white bg-brand-primary rounded-xl shadow-glow-primary border border-indigo-400/40"
          href="#harga"
          onclick={closeMobileMenu}
        >
          Mulai Gratis
        </a>
      </div>
    </div>
  {/if}
</header>

