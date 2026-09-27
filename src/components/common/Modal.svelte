<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen: boolean;
    title?: string;
    wide?: boolean;
    hideHeader?: boolean;
    mobileSheet?: boolean;
    onclose: () => void;
    children?: Snippet;
  }

  let { isOpen, title = 'Pratinjau Lunary', wide = false, hideHeader = false, mobileSheet = false, onclose, children }: Props = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div
    class={`fixed inset-0 z-[60] flex justify-center overflow-y-auto ${mobileSheet ? 'items-end p-0 sm:items-start sm:p-4 sm:pt-[calc(var(--landing-header-height)+1rem)]' : 'items-start p-4 pt-[calc(var(--landing-header-height)+1rem)]'}`}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Backdrop button to dismiss modal on click without a11y div-click warnings -->
    <button
      type="button"
      class="fixed inset-0 z-0 w-full h-full bg-black/80 backdrop-blur-md cursor-default focus:outline-none"
      onclick={onclose}
      aria-label="Tutup latar belakang dialog"
      tabindex="-1"
    ></button>

    <!-- Modal Container -->
    <div
      class={`relative z-10 w-full ${wide ? 'max-w-7xl' : 'max-w-2xl'} ${mobileSheet ? 'max-h-[100dvh] rounded-t-3xl rounded-b-none border-b-0 p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:max-h-[calc(100vh-var(--landing-header-height)-2rem)] sm:rounded-3xl sm:border-b sm:p-8' : 'max-h-[calc(100vh-var(--landing-header-height)-2rem)] rounded-3xl p-6 sm:p-8'} overflow-y-auto border border-white/15 bg-brand-dark shadow-2xl shadow-brand-primary/20 text-slate-200`}
    >
      {#if hideHeader}
        <button
          type="button"
          class="absolute right-4 top-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
          onclick={onclose}
          aria-label="Tutup dialog"
        >
          ✕
        </button>
      {:else}
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <h3 id="modal-title" class="text-lg sm:text-xl font-bold text-white tracking-tight">
            {title}
          </h3>
          <button
            type="button"
            class="w-11 h-11 -mr-2 -my-2 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
            onclick={onclose}
            aria-label="Tutup dialog"
          >
            ✕
          </button>
        </div>
      {/if}

      <!-- Modal Body -->
      <div class="space-y-4">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
