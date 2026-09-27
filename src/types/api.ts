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

export interface PaymentMethodItem {
  paymentMethod: string;
  paymentName: string;
  paymentImage: string;
  totalFee: number | string;
}

export interface PaymentMethodsResponse {
  status: string;
  data: {
    variant: PlanVariantItem;
    payment_methods: PaymentMethodItem[];
  };
}

export interface RegisterOrderPayload {
  name: string;
  email: string;
  phone: string;
  plan_variant_id: string;
  payment_method: string;
  payment_name: string;
  fee: number;
}

export interface PaymentDetails {
  reference_code: string;
  payment_method: string;
  payment_name: string;
  payment_code?: string;
  payment_url?: string;
  amount: number;
  fee: number;
  total_amount: number;
  status: string;
}

export interface OrderDetails {
  id: string;
  invoice_number: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  plan: { id: string | number; name?: string };
  variant: { id: string | number; name?: string; billing_cycle?: string };
  payment: PaymentDetails;
}

export interface RegisterOrderResponse {
  status: string;
  message: string;
  data: {
    payment_url?: string;
    landing_payment_channel: string;
    order: OrderDetails;
  };
}
