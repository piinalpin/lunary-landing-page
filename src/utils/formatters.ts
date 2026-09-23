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

/**
 * Masks a person's name for privacy.
 * - If 1 word: firstChar***lastChar, e.g. "Dimas" -> "D***s"
 * - If >= 2 words: firstName firstChar***lastChar, e.g.
 *   - "Dimas Prasetyo" -> "Dimas P***o"
 *   - "Sarah Annisa Putri" -> "Sarah A***i"
 */
export function maskLastName(fullName: string): string {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';

  if (parts.length === 1) {
    const word = parts[0];
    if (word.length <= 1) return `${word.toUpperCase()}***`;
    const firstChar = word[0].toUpperCase();
    const lastChar = word.slice(-1).toLowerCase();
    return `${firstChar}***${lastChar}`;
  }

  const firstName = parts[0];
  const firstChar = parts[1][0].toUpperCase();
  const lastWord = parts[parts.length - 1];

  if (parts.length === 2 && lastWord.length <= 1) {
    return `${firstName} ${firstChar}***`;
  }

  const lastChar = lastWord.slice(-1).toLowerCase();
  return `${firstName} ${firstChar}***${lastChar}`;
}

