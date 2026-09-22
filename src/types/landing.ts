export interface NavItem {
  label: string;
  href: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  colSpan?: string;
  badge?: string;
}

export interface ComparisonRow {
  feature: string;
  spreadsheet: string;
  conventional: string;
  lunary: string;
  lunaryHighlight?: string;
}

export interface NormalizedPricingTier {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: string;
  monthlyRawPrice: number;
  yearlyPrice: string;
  yearlyRawPrice: number;
  lifetimePrice: string;
  lifetimeRawPrice: number;
  featured: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

