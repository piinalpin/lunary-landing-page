/**
 * API Response Interfaces for Lunary Backend Integration
 */

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string;
  avatar?: string;
  quote?: string;
  review?: string;
  rating?: number;
}

export interface FaqItem {
  id?: string | number;
  question: string;
  answer: string;
  sequence?: number;
  lang?: string;
  category?: string;
}

export interface ModuleItem {
  id: string | number;
  name: string;
  code?: string;
  description?: string;
}

export interface ModulePlanItem {
  id: string | number;
  name: string;
  code?: string;
  description?: string;
  is_featured?: boolean;
  modules?: ModuleItem[];
}

export interface PlanVariantItem {
  id: string | number;
  module_plan_id?: string | number;
  plan?: { id: string | number; name: string };
  name?: string;
  expires_in?: number;
  discount?: number | string;
  active?: boolean;
  is_best_value?: boolean;
  billing_cycle?: 'monthly' | 'yearly' | 'lifetime' | string;
  price: number | string;
  final_price?: number | string;
  formatted_price?: string;
  discount_percentage?: number | string;
}

export interface LandingPageApiResponse {
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  module_plans: ModulePlanItem[];
  plan_variants: PlanVariantItem[];
}

export interface LeadSubmissionPayload {
  email: string;
  source?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
}
