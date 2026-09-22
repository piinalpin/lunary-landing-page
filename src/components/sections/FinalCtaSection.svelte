<script lang="ts">
  import { landingService } from '@/api/services/landingService';
  import { apiClient } from '@/api/client';
  import type { ToastMessage } from '@/types/landing';

  interface Props {
    onNotify?: (toast: ToastMessage) => void;
  }

  let { onNotify }: Props = $props();

  let email = $state('');
  let isSubmitting = $state(false);
  let isSuccess = $state(false);
  let errorMessage = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!email || isSubmitting) return;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage = 'Format alamat email tidak valid.';
      return;
    }

    isSubmitting = true;
    errorMessage = '';

    try {
      const res = await landingService.submitWaitlist(email);
      isSuccess = true;
      const successMsg = res.message || 'Pendaftaran berhasil! Kami akan segera menghubungi Anda.';
      onNotify?.({
        id: Date.now().toString(),
        type: 'success',
        message: successMsg,
      });
      email = '';
    } catch (err) {
      errorMessage = apiClient.formatError(err);
      onNotify?.({
        id: Date.now().toString(),
        type: 'error',
        message: errorMessage,
      });
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="cta">
  <div class="relative rounded-3xl overflow-hidden p-8 sm:p-14 lg:p-20 text-center border border-white/15 bg-gradient-to-b from-brand-surfaceHover via-brand-dark to-brand-dark shadow-2xl">
    <!-- Cosmic orb inside CTA -->
    <div class="glow-orb-indigo absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-2xl opacity-60"></div>

    <div class="relative z-10 max-w-3xl mx-auto">
      <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
        Siap Mengambil Kendali Penuh Atas Masa Depan Finansialmu?
      </h2>
      <p class="text-base sm:text-lg text-slate-300 mb-8">
        Bergabung bersama ribuan pengguna yang telah menikmati ketenangan finansial bersama Lunary.
      </p>

      {#if isSuccess}
        <div class="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 max-w-md mx-auto mb-4 animate-fadeIn">
          <div class="flex items-center justify-center gap-2 font-bold mb-1">
            <span>✓</span> Pendaftaran Berhasil!
          </div>
          <p class="text-xs sm:text-sm text-emerald-200/90">
            Terima kasih telah bergabung. Undangan akses prioritas akan kami kirimkan ke email Anda.
          </p>
        </div>
      {:else}
        <!-- Email signup input form -->
        <form class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4" onsubmit={handleSubmit}>
          <input
            type="email"
            class="w-full px-5 py-4 rounded-2xl bg-brand-dark/90 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm shadow-inner disabled:opacity-50"
            placeholder="Masukkan alamat email kamu..."
            required
            bind:value={email}
            disabled={isSubmitting}
            aria-label="Alamat email untuk pendaftaran"
          />
          <button
            type="submit"
            class="w-full sm:w-auto flex-shrink-0 px-7 py-4 rounded-2xl font-bold text-white bg-brand-primary hover:bg-brand-primaryHover transition-all shadow-glow-primary border border-indigo-300/30 text-sm whitespace-nowrap disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Memproses...</span>
            {:else}
              <span>Daftar Sekarang Secara Gratis</span>
            {/if}
          </button>
        </form>

        {#if errorMessage}
          <p class="text-xs text-rose-400 mb-2">{errorMessage}</p>
        {/if}

        <p class="text-xs text-slate-400">
          Tanpa perlu kartu kredit • Batal kapan saja
        </p>
      {/if}
    </div>
  </div>
</section>

