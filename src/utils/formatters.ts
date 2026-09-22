/**
 * Currency & number formatting utilities for Lunary
 */

export function formatRupiah(amount: number, options?: { showZeroDecimal?: boolean }): string {
  if (isNaN(amount)) return 'Rp 0';
  
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: options?.showZeroDecimal ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);

  // Clean up format to match fintech standard: Rp 48.500.000
  return formatted.replace(/\s+/g, ' ');
}

export function formatShortRupiah(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1).replace('.', ',')}M`;
  }
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1).replace('.', ',')}Jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)}rb`;
  }
  return formatRupiah(amount);
}

