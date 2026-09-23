export type Locale = 'id' | 'en';

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

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
