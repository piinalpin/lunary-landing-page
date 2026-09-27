import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { env } from '@/utils/env';
import { generateHmacSignature } from '@/utils/crypto';
import type {
  PaymentMethodsResponse,
  RegisterOrderPayload,
  RegisterOrderResponse,
} from '@/types/api';

export const registrationService = {
  async getPaymentMethods(planVariantId: string): Promise<PaymentMethodsResponse> {
    return apiClient.get<PaymentMethodsResponse>(ENDPOINTS.PAYMENT_METHODS, {
      params: { plan_variant_id: planVariantId },
    });
  },

  /**
   * Signs the exact serialized body: axios sends a pre-serialized string untouched,
   * so the signed payload matches the wire body byte for byte.
   */
  async registerOrder(payload: RegisterOrderPayload): Promise<RegisterOrderResponse> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const rawBody = JSON.stringify(payload);
    const signature = await generateHmacSignature(timestamp, rawBody, env.landingPageSecret);

    return apiClient.post<RegisterOrderResponse>(ENDPOINTS.REGISTER, rawBody, {
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
    });
  },
};
