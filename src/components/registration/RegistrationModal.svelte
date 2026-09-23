<script lang="ts">
  import axios from 'axios';
  import Modal from '@/components/common/Modal.svelte';
  import PaymentMethodsSkeleton from '@/components/skeletons/PaymentMethodsSkeleton.svelte';
  import { registrationService } from '@/api/services/registrationService';
  import { apiClient } from '@/api/client';
  import { env } from '@/utils/env';
  import { formatRupiah } from '@/utils/formatters';
  import type { OrderDetails, PaymentMethodItem, PlanVariantItem } from '@/types/api';
  import type { Locale } from '@/types/landing';

  interface Props {
    isOpen: boolean;
    variant: PlanVariantItem | null;
    planName?: string;
    locale?: Locale;
    onclose: () => void;
  }

  let { isOpen, variant, planName = '', locale = 'id', onclose }: Props = $props();

  type Step = 'checkout' | 'payment';
  type SubmitErrorKind = 'email' | 'signature' | 'generic';

  let step = $state<Step>('checkout');
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let fieldErrors = $state<Record<string, string>>({});
  let methods = $state<PaymentMethodItem[]>([]);
  let methodsLoading = $state(false);
  let methodsError = $state('');
  let selectedMethodKey = $state('');
  let submitting = $state(false);
  let submitError = $state<{ kind: SubmitErrorKind; message: string } | null>(null);
  let order = $state<OrderDetails | null>(null);
  let paymentUrl = $state('');
  let copyState = $state<{ key: string; ok: boolean } | null>(null);
  let loadSeq = 0;

  const copy = {
    id: {
      modalTitle: 'Langganan',
      paymentTitle: 'Instruksi Pembayaran',
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
      groupWallet: 'E-Wallet & QRIS',
      groupOther: 'Metode Lain',
      freeFee: 'Gratis',
      feePlaceholder: 'Pilih metode dulu',
      priceRow: 'Harga paket',
      feeRow: 'Biaya admin',
      totalRow: 'Total Pembayaran',
      submit: 'Lanjut ke Pembayaran',
      submitting: 'Memproses...',
      loadingMethods: 'Memuat metode pembayaran...',
      methodsError: 'Daftar metode pembayaran gagal dimuat.',
      methodsEmpty: 'Metode pembayaran belum tersedia. Muat ulang daftar ini.',
      retry: 'Muat Ulang',
      emailTaken: 'Email ini sudah terdaftar. Masuk ke akun Anda untuk melanjutkan langganan.',
      loginCta: 'Masuk ke Akun Anda',
      signatureHint: 'Pastikan waktu di perangkat Anda tersinkron otomatis, lalu coba lagi. Masih gagal? Hubungi dukungan Lunary.',
      errGeneric: 'Pendaftaran gagal diproses. Coba beberapa saat lagi.',
      waitingPayment: 'Menunggu Pembayaran',
      invoiceLabel: 'Nomor Invoice',
      methodLabel: 'Metode',
      vaLabel: 'Nomor Virtual Account',
      totalTransfer: 'Total Transfer',
      copy: 'Salin',
      copied: 'Tersalin!',
      copyFail: 'Gagal salin',
      openPayment: 'Buka Halaman Pembayaran',
      paymentGuide: 'Setelah pembayaran diverifikasi, akun Lunary Anda aktif otomatis. Kredensial dan link aktivasi dikirim ke email Anda.',
      done: 'Selesai',
    },
    en: {
      modalTitle: 'Subscription',
      paymentTitle: 'Payment Instructions',
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
      groupWallet: 'E-Wallet & QRIS',
      groupOther: 'Other Methods',
      freeFee: 'Free',
      feePlaceholder: 'Pick a method first',
      priceRow: 'Plan price',
      feeRow: 'Admin fee',
      totalRow: 'Total Payment',
      submit: 'Continue to Payment',
      submitting: 'Processing...',
      loadingMethods: 'Loading payment methods...',
      methodsError: 'Payment methods failed to load.',
      methodsEmpty: 'Payment methods are not available yet. Reload this list.',
      retry: 'Reload',
      emailTaken: 'This email is already registered. Sign in to continue your subscription.',
      loginCta: 'Sign In to Your Account',
      signatureHint: 'Make sure your device time syncs automatically, then try again. Still failing? Contact Lunary support.',
      errGeneric: 'Registration could not be processed. Please try again shortly.',
      waitingPayment: 'Awaiting Payment',
      invoiceLabel: 'Invoice Number',
      methodLabel: 'Method',
      vaLabel: 'Virtual Account Number',
      totalTransfer: 'Total Transfer',
      copy: 'Copy',
      copied: 'Copied!',
      copyFail: 'Copy failed',
      openPayment: 'Open Payment Page',
      paymentGuide: 'Once payment is verified, your Lunary account activates automatically. Credentials and the activation link are sent to your email.',
      done: 'Done',
    },
  } as const;

  const VA_PATTERN = /(bca|mandiri|bri|bni|permata|cimb|maybank|bsi)/i;
  const WALLET_PATTERN = /(qris|shopeepay|dana|ovo|linkaja)/i;

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
    const wallet: PaymentMethodItem[] = [];
    const other: PaymentMethodItem[] = [];
    for (const m of methods) {
      const label = `${m.paymentMethod} ${m.paymentName}`;
      if (VA_PATTERN.test(label)) va.push(m);
      else if (WALLET_PATTERN.test(label)) wallet.push(m);
      else other.push(m);
    }
    return { va, wallet, other };
  });
  const modalTitle = $derived(
    step === 'checkout' ? `${c.modalTitle}: ${planTitle}` : c.paymentTitle
  );

  async function loadMethods(variantId: string) {
    const seq = ++loadSeq;
    methodsLoading = true;
    methodsError = '';
    methods = [];
    try {
      const res = await registrationService.getPaymentMethods(variantId);
      if (seq !== loadSeq) return;
      methods = res.data?.payment_methods ?? [];
    } catch (err) {
      if (seq !== loadSeq) return;
      methodsError = apiClient.formatError(err);
    } finally {
      if (seq === loadSeq) methodsLoading = false;
    }
  }

  $effect(() => {
    if (isOpen && variant) {
      step = 'checkout';
      name = '';
      email = '';
      phone = '';
      fieldErrors = {};
      selectedMethodKey = '';
      submitError = null;
      order = null;
      paymentUrl = '';
      copyState = null;
      void loadMethods(String(variant.id));
    }
  });

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = c.errEmail;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 15) errs.phone = c.errPhone;
    if (!selectedMethod) errs.payment = c.errPayment;
    fieldErrors = errs;
    return Object.keys(errs).length === 0;
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
    if (!validate()) return;
    const method = selectedMethod;
    if (!method) return;
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
      order = res.data.order;
      paymentUrl = res.data.payment_url ?? res.data.order?.payment?.payment_url ?? '';
      copyState = null;
      step = 'payment';
    } catch (err) {
      submitError = classifyError(err);
    } finally {
      submitting = false;
    }
  }

  async function writeClipboard(value: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      try {
        const area = document.createElement('textarea');
        area.value = value;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        return ok;
      } catch {
        return false;
      }
    }
  }

  async function handleCopy(key: string, value: string) {
    const ok = await writeClipboard(value);
    copyState = { key, ok };
    if (ok) {
      setTimeout(() => {
        if (copyState?.key === key && copyState.ok) copyState = null;
      }, 2000);
    }
  }

  function copyLabel(key: string): string {
    if (copyState?.key !== key) return c.copy;
    return copyState.ok ? c.copied : c.copyFail;
  }
</script>

{#snippet methodOption(m: PaymentMethodItem)}
  <label
    class="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all {selectedMethodKey ===
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
      <img src={m.paymentImage} alt="" loading="lazy" class="h-6 w-10 shrink-0 object-contain" />
    {/if}
    <span class="min-w-0 flex-1 truncate text-sm font-bold text-slate-200">{m.paymentName}</span>
    <span class="shrink-0 text-xs font-bold {Number(m.totalFee) > 0 ? 'text-slate-300' : 'text-brand-cyan'}">
      {Number(m.totalFee) > 0 ? formatRupiah(Number(m.totalFee)) : c.freeFee}
    </span>
  </label>
{/snippet}

{#snippet fieldError(id: string, message: string)}
  <p id="{id}-error" class="mt-1.5 text-xs font-semibold text-rose-300">{message}</p>
{/snippet}

<Modal isOpen={isOpen} title={modalTitle} {onclose}>
  {#if step === 'checkout'}
    <div class="space-y-5">
      <!-- Selected package summary -->
      <div class="rounded-2xl border border-white/10 bg-brand-surface/70 p-4 sm:p-5">
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
      <div class="space-y-4">
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

      <!-- Payment channel picker -->
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
          {#if methodGroups.va.length > 0}
            <div>
              <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {c.groupVa}
              </p>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {#each methodGroups.va as m (m.paymentMethod)}
                  {@render methodOption(m)}
                {/each}
              </div>
            </div>
          {/if}
          {#if methodGroups.wallet.length > 0}
            <div>
              <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {c.groupWallet}
              </p>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {#each methodGroups.wallet as m (m.paymentMethod)}
                  {@render methodOption(m)}
                {/each}
              </div>
            </div>
          {/if}
          {#if methodGroups.other.length > 0}
            <div>
              <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {c.groupOther}
              </p>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {#each methodGroups.other as m (m.paymentMethod)}
                  {@render methodOption(m)}
                {/each}
              </div>
            </div>
          {/if}
          {#if fieldErrors.payment}
            <p class="text-xs font-semibold text-rose-300">{fieldErrors.payment}</p>
          {/if}
        {/if}
      </fieldset>

      <!-- Billing summary -->
      <div class="space-y-2 rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
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

      <button
        type="button"
        onclick={handleSubmit}
        disabled={submitting}
        class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-indigo-300/30 bg-brand-primary px-6 py-4 text-sm font-black text-white shadow-glow-primary transition-all hover:bg-brand-primaryHover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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
  {:else if step === 'payment' && order}
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="text-[10px] font-black uppercase tracking-[0.18em] text-brand-cyan">
            {c.invoiceLabel}
          </p>
          <p class="mt-1 break-all font-mono text-sm font-bold text-white">
            {order.invoice_number}
          </p>
        </div>
        <span class="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-black uppercase text-amber-300">
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true"></span>
          {c.waitingPayment}
        </span>
      </div>

      <p class="text-xs font-bold text-slate-400">
        {c.methodLabel}: <span class="text-slate-200">{order.payment.payment_name}</span>
      </p>

      {#if order.payment.payment_code}
        <div class="rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {c.vaLabel}
          </p>
          <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
            <span class="min-w-0 break-all font-mono text-base font-black text-white sm:text-lg">
              {order.payment.payment_code}
            </span>
            <button
              type="button"
              onclick={() => handleCopy('va', order?.payment.payment_code ?? '')}
              class="min-h-11 shrink-0 rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-2.5 text-xs font-black text-brand-cyan hover:bg-brand-cyan/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
            >
              {copyLabel('va')}
            </button>
          </div>
        </div>
      {/if}

      <div class="rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {c.totalTransfer}
        </p>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
          <span class="font-mono text-base font-black text-white sm:text-lg">
            {formatRupiah(order.payment.total_amount)}
          </span>
          <button
            type="button"
            onclick={() => handleCopy('total', String(order?.payment.total_amount ?? ''))}
            class="min-h-11 shrink-0 rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-2.5 text-xs font-black text-brand-cyan hover:bg-brand-cyan/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
          >
            {copyLabel('total')}
          </button>
        </div>
      </div>

      {#if paymentUrl}
        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="flex min-h-12 w-full items-center justify-center rounded-xl border border-indigo-300/30 bg-brand-primary px-6 py-4 text-sm font-black text-white shadow-glow-primary transition-all hover:bg-brand-primaryHover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          {c.openPayment}
        </a>
      {/if}

      <div class="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-4">
        <p class="text-xs font-semibold leading-relaxed text-slate-300">{c.paymentGuide}</p>
      </div>

      <button
        type="button"
        onclick={onclose}
        class="flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-slate-800 px-6 py-3.5 text-sm font-black text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
      >
        {c.done}
      </button>
    </div>
  {/if}
</Modal>
