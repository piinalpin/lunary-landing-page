<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen: boolean;
    title?: string;
    onclose: () => void;
    children?: Snippet;
  }

  let { isOpen, title = 'Pratinjau Lunary', onclose, children }: Props = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
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
      class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-brand-dark p-6 sm:p-8 shadow-2xl shadow-brand-primary/20 text-slate-200"
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <h3 id="modal-title" class="text-lg sm:text-xl font-bold text-white tracking-tight">
          {title}
        </h3>
        <button
          type="button"
          class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
          onclick={onclose}
          aria-label="Tutup dialog"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body -->
      <div class="space-y-4">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}

