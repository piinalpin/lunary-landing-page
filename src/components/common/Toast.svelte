<script lang="ts">
  import type { ToastMessage } from '@/types/landing';

  interface Props {
    toast: ToastMessage | null;
    ondismiss: () => void;
  }

  let { toast, ondismiss }: Props = $props();
</script>

{#if toast}
  <div class="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce sm:animate-none">
    <div
      class="flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-300 {toast.type ===
      'success'
        ? 'bg-brand-surface/95 border-emerald-500/30 text-emerald-300 shadow-emerald-500/10'
        : toast.type === 'error'
          ? 'bg-brand-surface/95 border-rose-500/30 text-rose-300 shadow-rose-500/10'
          : 'bg-brand-surface/95 border-indigo-500/30 text-indigo-300 shadow-indigo-500/10'}"
    >
      <div class="flex-shrink-0 mt-0.5">
        {#if toast.type === 'success'}
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
            ✓
          </span>
        {:else if toast.type === 'error'}
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold">
            !
          </span>
        {:else}
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">
            ℹ
          </span>
        {/if}
      </div>

      <div class="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
        {toast.message}
      </div>

      <button
        type="button"
        class="flex-shrink-0 text-slate-400 hover:text-white transition-colors p-1"
        onclick={ondismiss}
        aria-label="Tutup notifikasi"
      >
        ✕
      </button>
    </div>
  </div>
{/if}

