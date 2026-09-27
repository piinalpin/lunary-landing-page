<script lang="ts">
  import axios from 'axios';
  import Echo from 'laravel-echo';
  import Pusher from 'pusher-js';
  import Modal from '@/components/common/Modal.svelte';
  import PaymentMethodsSkeleton from '@/components/skeletons/PaymentMethodsSkeleton.svelte';
  import { registrationService } from '@/api/services/registrationService';
  import { apiClient } from '@/api/client';
  import { env } from '@/utils/env';
  import { formatRupiah } from '@/utils/formatters';
  import type { PaymentMethodItem, PlanVariantItem } from '@/types/api';
  import type { Locale } from '@/types/landing';

  interface Props {
    isOpen: boolean;
    variant: PlanVariantItem | null;
    planName?: string;
    locale?: Locale;
    onclose: () => void;
  }

  let { isOpen, variant, planName = '', locale = 'id', onclose }: Props = $props();

  (window as unknown as Window & { Pusher: typeof Pusher }).Pusher = Pusher;

  type Step = 'details' | 'method' | 'payment';
  type PaymentGroup = 'va' | 'qris' | 'wallet' | 'other';
  type SubmitErrorKind = 'email' | 'signature' | 'popup' | 'generic';

  let step = $state<Step>('details');
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let fieldErrors = $state<Record<string, string>>({});
  let methods = $state<PaymentMethodItem[]>([]);
  let methodsLoading = $state(false);
  let methodsError = $state('');
  let selectedMethodKey = $state('');
  let activeMethodGroup = $state<PaymentGroup>('va');
  let submitting = $state(false);
  let submitError = $state<{ kind: SubmitErrorKind; message: string } | null>(null);
  let paymentChannel = $state('');
  let paymentStatus = $state<'waiting' | 'successful'>('waiting');
  let loadSeq = 0;

  const copy = {
    id: {
      modalTitle: 'Langganan',
      paymentTitle: 'Status Pembayaran',
      packageLabel: 'Paket dipilih',
      cycleMonthly: 'Tagihan bulanan',
      cycleYearly: 'Tagihan tahunan',
      save: 'Hemat',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama sesuai identitas',
      errName: 'Masukkan nama minimal 2 karakter.',
      emailLabel: 'Email Aktif',
      emailPlaceholder: 'nama@email.com',
      emailHint: 'Link aktivasi akun dikirim ke email ini setelah pembayaran.',
      errEmail: 'Masukkan alamat email yang valid.',
      phoneLabel: 'Nomor WhatsApp / HP',
      phonePlaceholder: '08xxxxxxxxxx',
      errPhone: 'Masukkan nomor HP 9 sampai 15 digit.',
      payTitle: 'Metode Pembayaran',
      payHint: 'Biaya admin mengikuti kebijakan kanal pembayaran.',
      errPayment: 'Pilih salah satu metode pembayaran.',
      groupVa: 'Virtual Account',
      groupQris: 'QRIS',
      groupWallet: 'E-Wallet',
      groupOther: 'Metode Lain',
      freeFee: 'Gratis',
      feePlaceholder: 'Pilih metode dulu',
      priceRow: 'Harga paket',
      feeRow: 'Biaya admin',
      totalRow: 'Total Pembayaran',
      submit: 'Lanjut ke Pembayaran',
      continue: 'Pilih Metode Pembayaran',
      back: 'Kembali',
      stepDetails: 'Data Diri',
      stepPayment: 'Pembayaran',
      chooseMethod: 'Pilih metode pembayaran',
      submitting: 'Memproses...',
      loadingMethods: 'Memuat metode pembayaran...',
      methodsError: 'Daftar metode pembayaran gagal dimuat.',
      methodsEmpty: 'Metode pembayaran belum tersedia. Muat ulang daftar ini.',
      retry: 'Muat Ulang',
      emailTaken: 'Email ini sudah terdaftar. Masuk ke akun Anda untuk melanjutkan langganan.',
      loginCta: 'Masuk ke Akun Anda',
      signatureHint: 'Pastikan waktu di perangkat Anda tersinkron otomatis, lalu coba lagi. Masih gagal? Hubungi dukungan Lunary.',
      errGeneric: 'Pendaftaran gagal diproses. Coba beberapa saat lagi.',
      popupBlocked: 'Izinkan pop-up untuk membuka halaman pembayaran.',
      waitingPayment: 'Menunggu Pembayaran',
      waitingPaymentDetail: 'Kami sedang menunggu konfirmasi dari penyedia pembayaran.',
      paymentSuccessful: 'Pembayaran Berhasil',
      paymentSuccessfulDetail: 'Pembayaran Anda telah terkonfirmasi.',
      done: 'Selesai',
    },
    en: {
      modalTitle: 'Subscription',
      paymentTitle: 'Payment Status',
      packageLabel: 'Selected plan',
      cycleMonthly: 'Monthly billing',
      cycleYearly: 'Yearly billing',
      save: 'Save',
      nameLabel: 'Full Name',
      namePlaceholder: 'Name as on your ID',
      errName: 'Enter at least 2 characters.',
      emailLabel: 'Active Email',
      emailPlaceholder: 'name@email.com',
      emailHint: 'Your account activation link is sent to this email after payment.',
      errEmail: 'Enter a valid email address.',
      phoneLabel: 'WhatsApp / Phone Number',
      phonePlaceholder: '08xxxxxxxxxx',
      errPhone: 'Enter a phone number of 9 to 15 digits.',
      payTitle: 'Payment Method',
      payHint: 'Admin fees follow each payment channel policy.',
      errPayment: 'Choose one payment method.',
      groupVa: 'Virtual Account',
      groupQris: 'QRIS',
      groupWallet: 'E-Wallet',
      groupOther: 'Other Methods',
      freeFee: 'Free',
      feePlaceholder: 'Pick a method first',
      priceRow: 'Plan price',
      feeRow: 'Admin fee',
      totalRow: 'Total Payment',
      submit: 'Continue to Payment',
      continue: 'Choose a Payment Method',
      back: 'Back',
      stepDetails: 'Your Details',
      stepPayment: 'Payment',
      chooseMethod: 'Choose a payment method',
      submitting: 'Processing...',
      loadingMethods: 'Loading payment methods...',
      methodsError: 'Payment methods failed to load.',
      methodsEmpty: 'Payment methods are not available yet. Reload this list.',
      retry: 'Reload',
      emailTaken: 'This email is already registered. Sign in to continue your subscription.',
      loginCta: 'Sign In to Your Account',
      signatureHint: 'Make sure your device time syncs automatically, then try again. Still failing? Contact Lunary support.',
      errGeneric: 'Registration could not be processed. Please try again shortly.',
      popupBlocked: 'Allow pop-ups to open the payment page.',
      waitingPayment: 'Awaiting Payment',
      waitingPaymentDetail: 'We are waiting for confirmation from the payment provider.',
      paymentSuccessful: 'Payment Successful',
      paymentSuccessfulDetail: 'Your payment has been confirmed.',
      done: 'Done',
    },
  } as const;

  const VA_PATTERN = /(bca|mandiri|bri|bni|permata|cimb|maybank|bsi)/i;
  const QRIS_PATTERN = /qris/i;
  const WALLET_PATTERN = /(shopeepay|dana|ovo|linkaja)/i;

  const c = $derived(copy[locale]);
  const planTitle = $derived(planName || variant?.plan?.name || variant?.name || '');
  const basePrice = $derived(variant ? Number(variant.final_price ?? variant.price) || 0 : 0);
  const originalPrice = $derived(variant ? Number(variant.price) || 0 : 0);
  const discount = $derived(variant ? Number(variant.discount ?? variant.discount_percentage) || 0 : 0);
  const billingLabel = $derived.by(() => {
    if (!variant) return '';
    const isYearly =
      variant.expires_in === 365 ||
      variant.billing_cycle === 'yearly' ||
      variant.name?.toLowerCase().includes('yearly');
    return isYearly ? c.cycleYearly : c.cycleMonthly;
  });
  const selectedMethod = $derived(
    methods.find((m) => m.paymentMethod === selectedMethodKey) ?? null
  );
  const fee = $derived(selectedMethod ? Number(selectedMethod.totalFee) || 0 : 0);
  const total = $derived(basePrice + fee);
  const methodGroups = $derived.by(() => {
    const va: PaymentMethodItem[] = [];
    const qris: PaymentMethodItem[] = [];
    const wallet: PaymentMethodItem[] = [];
    const other: PaymentMethodItem[] = [];
    for (const m of methods) {
      const label = `${m.paymentMethod} ${m.paymentName}`;
      if (VA_PATTERN.test(label)) va.push(m);
      else if (QRIS_PATTERN.test(label)) qris.push(m);
      else if (WALLET_PATTERN.test(label)) wallet.push(m);
      else other.push(m);
    }
    return { va, qris, wallet, other };
  });
  const paymentGroupTabs = $derived([
    { id: 'va' as const, label: c.groupVa, methods: methodGroups.va },
    { id: 'qris' as const, label: c.groupQris, methods: methodGroups.qris },
    { id: 'wallet' as const, label: c.groupWallet, methods: methodGroups.wallet },
    { id: 'other' as const, label: c.groupOther, methods: methodGroups.other },
  ].filter((group) => group.methods.length > 0));
  const visiblePaymentMethods = $derived(methodGroups[activeMethodGroup]);
  const modalTitle = $derived(
    step === 'payment' ? c.paymentTitle : `${c.modalTitle}: ${planTitle}`
  );

  $effect(() => {
    const channel = paymentChannel;
    if (!channel || !env.reverbAppKey || !env.reverbHost) return;

    const echo = new Echo({
      broadcaster: 'reverb',
      key: env.reverbAppKey,
      wsHost: env.reverbHost,
      wsPort: env.reverbPort,
      wssPort: env.reverbPort,
      forceTLS: env.reverbScheme === 'https',
      enabledTransports: ['ws', 'wss'],
    });
    let connectionClosed = false;

    echo.channel(channel).listen('.payment.successful', () => {
      paymentStatus = 'successful';
      echo.leaveChannel(channel);
      echo.disconnect();
      connectionClosed = true;
      paymentChannel = '';
    });

    return () => {
      if (!connectionClosed) {
        echo.leaveChannel(channel);
        echo.disconnect();
      }
    };
  });

  async function loadMethods(variantId: string) {
    const seq = ++loadSeq;
    methodsLoading = true;
    methodsError = '';
    methods = [];
    try {
      const res = await registrationService.getPaymentMethods(variantId);
      if (seq !== loadSeq) return;
      methods = res.data?.payment_methods ?? [];
      activeMethodGroup = methods.some((method) => VA_PATTERN.test(`${method.paymentMethod} ${method.paymentName}`))
        ? 'va'
        : methods.some((method) => QRIS_PATTERN.test(`${method.paymentMethod} ${method.paymentName}`))
          ? 'qris'
          : methods.some((method) => WALLET_PATTERN.test(`${method.paymentMethod} ${method.paymentName}`))
            ? 'wallet'
            : 'other';
    } catch (err) {
      if (seq !== loadSeq) return;
      methodsError = apiClient.formatError(err);
    } finally {
      if (seq === loadSeq) methodsLoading = false;
    }
  }

  $effect(() => {
    if (isOpen && variant) {
      step = 'details';
      name = '';
      email = '';
      phone = '';
      fieldErrors = {};
      selectedMethodKey = '';
      activeMethodGroup = 'va';
      submitError = null;
      paymentChannel = '';
      paymentStatus = 'waiting';
      void loadMethods(String(variant.id));
    }
  });

  function validateDetails(): boolean {
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = c.errEmail;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 15) errs.phone = c.errPhone;
    fieldErrors = errs;
    return Object.keys(errs).length === 0;
  }

  function validatePaymentMethod(): boolean {
    fieldErrors = selectedMethod ? {} : { payment: c.errPayment };
    return Boolean(selectedMethod);
  }

  function continueToPaymentMethods() {
    if (!validateDetails()) return;
    submitError = null;
    step = 'method';
  }

  function returnToDetails() {
    fieldErrors = {};
    submitError = null;
    step = 'details';
  }

  function classifyError(err: unknown): { kind: SubmitErrorKind; message: string } {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const data = err.response?.data as
        | { message?: string; errors?: Record<string, string[]> }
        | undefined;
      const message = data?.message ?? '';
      if (status === 422) {
        const emailMsg = data?.errors?.email?.[0] ?? message;
        if (/already been registered|sudah terdaftar|taken/i.test(emailMsg)) {
          return { kind: 'email', message: emailMsg };
        }
        return { kind: 'generic', message: emailMsg || c.errGeneric };
      }
      if (status === 403 && /signature|timestamp/i.test(message)) {
        return { kind: 'signature', message };
      }
      return { kind: 'generic', message: apiClient.formatError(err) };
    }
    return { kind: 'generic', message: c.errGeneric };
  }

  async function handleSubmit() {
    if (submitting || !variant) return;
    if (!validatePaymentMethod()) return;
    const method = selectedMethod;
    if (!method) return;
    const paymentWindow = window.open('about:blank', '_blank');
    if (!paymentWindow) {
      submitError = { kind: 'popup', message: c.popupBlocked };
      return;
    }
    paymentWindow.opener = null;

    submitting = true;
    submitError = null;
    try {
      const res = await registrationService.registerOrder({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        plan_variant_id: String(variant.id),
        payment_method: method.paymentMethod,
        payment_name: method.paymentName,
        fee,
      });
      const paymentUrl = res.data.payment_url ?? res.data.order?.payment?.payment_url ?? '';
      if (!paymentUrl) throw new Error('Payment URL is unavailable.');

      paymentChannel = res.data.landing_payment_channel;
      paymentStatus = 'waiting';
      step = 'payment';
      paymentWindow.location.replace(paymentUrl);
    } catch (err) {
      paymentWindow.close();
      submitError = classifyError(err);
    } finally {
      submitting = false;
    }
  }

  function closeModal() {
    paymentChannel = '';
    onclose();
  }
</script>

{#snippet methodOption(m: PaymentMethodItem)}
  <label
    class="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-2 py-2 transition-all sm:min-h-12 sm:gap-3 sm:px-3.5 sm:py-2.5 {selectedMethodKey ===
    m.paymentMethod
      ? 'border-brand-primary bg-brand-primary/10 ring-1 ring-brand-primary/40'
      : 'border-white/10 bg-brand-surface/60 hover:border-white/25'}"
  >
    <input
      type="radio"
      name="registration-payment-method"
      value={m.paymentMethod}
      bind:group={selectedMethodKey}
      class="h-4 w-4 shrink-0 accent-[#4D5BFF] focus-visible:ring-2 focus-visible:ring-brand-cyan"
    />
    {#if m.paymentImage}
      <img src={m.paymentImage} alt="" loading="lazy" class="h-5 w-7 shrink-0 object-contain sm:h-6 sm:w-10" />
    {/if}
    <span class="min-w-0 flex-1 whitespace-normal break-words text-xs font-bold leading-tight text-slate-200 sm:text-sm">{m.paymentName}</span>
    <span class="shrink-0 whitespace-nowrap text-[10px] font-bold sm:text-xs {Number(m.totalFee) > 0 ? 'text-slate-300' : 'text-brand-cyan'}">
      {Number(m.totalFee) > 0 ? formatRupiah(Number(m.totalFee)) : c.freeFee}
    </span>
  </label>
{/snippet}

{#snippet fieldError(id: string, message: string)}
  <p id="{id}-error" class="mt-1.5 text-xs font-semibold text-rose-300">{message}</p>
{/snippet}

<Modal isOpen={isOpen} title={modalTitle} mobileSheet onclose={closeModal}>
  {#if step === 'details'}
    <div class="space-y-4">
      <div class="flex items-center gap-3 text-xs font-bold">
        <span class="text-brand-cyan">01 <span class="text-slate-200">{c.stepDetails}</span></span>
        <span class="h-px flex-1 bg-white/10"></span>
        <span class="text-slate-500">02 {c.stepPayment}</span>
      </div>
      <!-- Selected package summary -->
      <div class="rounded-xl border border-white/10 bg-brand-surface/70 px-4 py-3">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[10px] font-black uppercase tracking-[0.18em] text-brand-cyan">
              {c.packageLabel}
            </p>
            <h4 class="mt-1 text-xl font-black uppercase tracking-tight text-white">{planTitle}</h4>
            <p class="mt-1 text-xs font-bold text-slate-400">{billingLabel}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-black text-white font-mono">{formatRupiah(basePrice)}</p>
            {#if discount > 0 && originalPrice > basePrice}
              <p class="mt-1 text-xs font-bold text-slate-400 line-through">
                {formatRupiah(originalPrice)}
              </p>
              <p class="mt-1 inline-block rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-300">
                {c.save} {Math.round(discount)}%
              </p>
            {/if}
          </div>
        </div>
      </div>

      <!-- Registration form -->
      <div class="space-y-3">
        <div>
          <label for="reg-name" class="mb-1.5 block text-xs font-bold text-slate-300">
            {c.nameLabel}
          </label>
          <input
            id="reg-name"
            type="text"
            autocomplete="name"
            bind:value={name}
            placeholder={c.namePlaceholder}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'reg-name-error' : undefined}
            class="min-h-12 w-full rounded-xl border bg-brand-surface px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan {fieldErrors.name
              ? 'border-rose-400'
              : 'border-white/10'}"
          />
          {#if fieldErrors.name}{@render fieldError('reg-name', fieldErrors.name)}{/if}
        </div>

        <div>
          <label for="reg-email" class="mb-1.5 block text-xs font-bold text-slate-300">
            {c.emailLabel}
          </label>
          <input
            id="reg-email"
            type="email"
            inputmode="email"
            autocomplete="email"
            bind:value={email}
            placeholder={c.emailPlaceholder}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'reg-email-error' : 'reg-email-hint'}
            class="min-h-12 w-full rounded-xl border bg-brand-surface px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan {fieldErrors.email
              ? 'border-rose-400'
              : 'border-white/10'}"
          />
          {#if fieldErrors.email}
            {@render fieldError('reg-email', fieldErrors.email)}
          {:else}
            <p id="reg-email-hint" class="mt-1.5 text-[11px] leading-relaxed text-slate-400">
              {c.emailHint}
            </p>
          {/if}
        </div>

        <div>
          <label for="reg-phone" class="mb-1.5 block text-xs font-bold text-slate-300">
            {c.phoneLabel}
          </label>
          <input
            id="reg-phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            bind:value={phone}
            placeholder={c.phonePlaceholder}
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? 'reg-phone-error' : undefined}
            class="min-h-12 w-full rounded-xl border bg-brand-surface px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan {fieldErrors.phone
              ? 'border-rose-400'
              : 'border-white/10'}"
          />
          {#if fieldErrors.phone}{@render fieldError('reg-phone', fieldErrors.phone)}{/if}
        </div>
      </div>

      <button
        type="button"
        onclick={continueToPaymentMethods}
        class="flex min-h-12 w-full items-center justify-center rounded-xl border border-indigo-300/30 bg-brand-primary px-5 py-3 text-sm font-black text-white shadow-glow-primary transition-colors hover:bg-brand-primaryHover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
      >
        {c.continue}
      </button>
    </div>
  {:else if step === 'method'}
    <div class="space-y-4">
      <div class="flex items-center gap-3 text-xs font-bold">
        <button type="button" onclick={returnToDetails} class="text-brand-cyan hover:text-white">
          01 <span class="text-slate-300">{c.stepDetails}</span>
        </button>
        <span class="h-px flex-1 bg-brand-cyan/40"></span>
        <span class="text-brand-cyan">02 <span class="text-slate-200">{c.stepPayment}</span></span>
      </div>

      <fieldset class="space-y-3">
        <legend class="mb-1 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          {c.payTitle}
        </legend>
        <p class="text-[11px] text-slate-400">{c.payHint}</p>

        {#if methodsLoading}
          <p role="status" class="text-xs font-bold text-slate-400">{c.loadingMethods}</p>
          <PaymentMethodsSkeleton />
        {:else if methodsError}
          <div role="alert" class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
            <p class="text-xs font-semibold text-rose-300">{c.methodsError}</p>
            <p class="mt-1 text-[11px] text-slate-400">{methodsError}</p>
            <button
              type="button"
              onclick={() => variant && loadMethods(String(variant.id))}
              class="mt-3 min-h-11 w-full rounded-xl border border-white/15 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
            >
              {c.retry}
            </button>
          </div>
        {:else if methods.length === 0}
          <div class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p class="text-xs font-semibold text-amber-300">{c.methodsEmpty}</p>
            <button
              type="button"
              onclick={() => variant && loadMethods(String(variant.id))}
              class="mt-3 min-h-11 w-full rounded-xl border border-white/15 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
            >
              {c.retry}
            </button>
          </div>
        {:else}
          <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
            {#each paymentGroupTabs as group (group.id)}
              <button
                type="button"
                aria-pressed={activeMethodGroup === group.id}
                onclick={() => (activeMethodGroup = group.id)}
                class="min-h-10 rounded-lg border px-2 text-left text-[10px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan sm:px-3 sm:text-xs {activeMethodGroup === group.id
                  ? 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan'
                  : 'border-white/10 bg-brand-surface/60 text-slate-400 hover:text-white'}"
              >
                {group.label}
                <span class="ml-1 text-[10px] opacity-70">{group.methods.length}</span>
              </button>
            {/each}
          </div>
          <div class="grid grid-cols-2 gap-1.5 sm:gap-2">
            {#each visiblePaymentMethods as method (method.paymentMethod)}
              {@render methodOption(method)}
            {/each}
          </div>
          {#if fieldErrors.payment}
            <p class="text-xs font-semibold text-rose-300">{fieldErrors.payment}</p>
          {/if}
        {/if}
      </fieldset>

      <!-- Billing summary -->
      <div class="space-y-2 rounded-xl border border-white/10 bg-brand-surface/70 p-3">
        <div class="flex items-center justify-between gap-3 text-sm">
          <span class="text-slate-400">{c.priceRow}</span>
          <span class="font-bold text-slate-300 font-mono">{formatRupiah(basePrice)}</span>
        </div>
        <div class="flex items-center justify-between gap-3 text-sm">
          <span class="text-slate-400">{c.feeRow}</span>
          <span class="font-bold {selectedMethod && fee === 0 ? 'text-brand-cyan' : 'text-slate-300'} font-mono">
            {selectedMethod ? (fee > 0 ? formatRupiah(fee) : c.freeFee) : c.feePlaceholder}
          </span>
        </div>
        <div class="border-t border-white/10 pt-3">
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm font-black text-white">{c.totalRow}</span>
            <span class="text-lg font-black text-white font-mono">{formatRupiah(total)}</span>
          </div>
        </div>
      </div>

      {#if submitError}
        <div
          role="alert"
          class="rounded-xl border p-4 {submitError.kind === 'email'
            ? 'border-amber-500/40 bg-amber-500/10'
            : 'border-rose-500/40 bg-rose-500/10'}"
        >
          <p class="text-xs font-semibold leading-relaxed {submitError.kind === 'email'
            ? 'text-amber-200'
            : 'text-rose-300'}">
            {submitError.kind === 'email'
              ? c.emailTaken
              : submitError.kind === 'signature'
                ? c.signatureHint
                : submitError.message}
          </p>
          {#if submitError.kind === 'signature'}
            <p class="mt-1.5 text-[11px] text-slate-400">{submitError.message}</p>
          {/if}
          {#if submitError.kind === 'email'}
            <a
              href={env.loginUrl}
              class="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              {c.loginCta}
            </a>
          {/if}
        </div>
      {/if}

      <div class="grid grid-cols-[auto_1fr] gap-2">
        <button
          type="button"
          onclick={returnToDetails}
          class="min-h-12 rounded-xl border border-white/15 bg-slate-800 px-4 text-sm font-bold text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
        >
          {c.back}
        </button>
        <button
          type="button"
          onclick={handleSubmit}
          disabled={submitting || methodsLoading || methods.length === 0}
          class="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-indigo-300/30 bg-brand-primary px-4 text-sm font-black text-white shadow-glow-primary transition-all hover:bg-brand-primaryHover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {#if submitting}
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
              <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
            </svg>
            {c.submitting}
          {:else}
            {c.submit}
          {/if}
        </button>
      </div>
    </div>
  {:else if step === 'payment'}
    <div class="flex flex-col items-center px-2 py-3 text-center sm:py-5">
      {#if paymentStatus === 'successful'}
        <div
          class="mb-5 grid size-16 place-items-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan"
          aria-hidden="true"
        >
          <span class="block size-3 -translate-y-0.5 rotate-45 border-b-[3px] border-r-[3px] border-current"></span>
        </div>
      {:else}
        <div
          class="relative mb-5 grid size-16 place-items-center rounded-full border border-amber-300/25 bg-amber-300/10"
          aria-hidden="true"
        >
          <span class="absolute inset-1 rounded-full border border-amber-300/15 motion-safe:animate-pulse"></span>
          <span class="size-8 rounded-full border-[3px] border-amber-300/25 border-t-amber-300 motion-safe:animate-spin motion-reduce:animate-none"></span>
        </div>
      {/if}
      <div role="status" aria-live="polite">
        <h4
          class="text-xl font-black {paymentStatus === 'successful' ? 'text-brand-cyan' : 'text-amber-300'}"
        >
          {paymentStatus === 'successful' ? c.paymentSuccessful : c.waitingPayment}
        </h4>
        <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
          {paymentStatus === 'successful' ? c.paymentSuccessfulDetail : c.waitingPaymentDetail}
        </p>
      </div>
      <button
        type="button"
        onclick={closeModal}
        class="mt-7 flex min-h-12 w-full items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer {paymentStatus === 'successful'
          ? 'border-brand-cyan/35 bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/15'
          : 'border-white/15 bg-slate-800 text-white hover:bg-slate-700'}"
      >
        {c.done}
      </button>
    </div>
  {/if}
</Modal>
