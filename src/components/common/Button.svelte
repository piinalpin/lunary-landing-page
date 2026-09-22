<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'glass' | 'ghost' | 'soft' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children?: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    class: className = '',
    onclick,
    children,
  }: Props = $props();

  const variantStyles = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-glow-primary border border-indigo-400/40 hover:scale-[1.02] active:scale-[0.98]',
    glass:
      'glass-panel text-slate-200 hover:bg-white/10 hover:border-white/20 border border-white/10',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent',
    soft:
      'bg-brand-primary/10 text-brand-cyan border border-brand-cyan/20 hover:bg-brand-cyan/15',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-700 border border-white/10',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl font-medium',
    md: 'px-5 py-2.5 text-sm rounded-full font-semibold',
    lg: 'px-8 py-4 text-base rounded-2xl font-bold',
  };

  let combinedClass = $derived(
    `inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  );
</script>

{#if href}
  <a {href} class={combinedClass} role="button" aria-disabled={disabled}>
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} {onclick} class={combinedClass}>
    {@render children?.()}
  </button>
{/if}

