import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { LandingPageApiResponse, LeadSubmissionResponse } from '@/types/api';

export const landingService = {
  /**
   * Fetch landing page data from Laravel backend /api/landing-page
   */
  async getLandingPageData(): Promise<LandingPageApiResponse> {
    return apiClient.get<LandingPageApiResponse>(ENDPOINTS.LANDING_PAGE);
  },

  /**
   * Submit email lead to waitlist
   */
  async submitWaitlist(email: string): Promise<LeadSubmissionResponse> {
    try {
      return await apiClient.post<LeadSubmissionResponse>(ENDPOINTS.WAITLIST, {
        email,
        source: 'landing_page_final_cta',
      });
    } catch (error) {
      // If endpoint isn't implemented on backend yet, return simulated success in dev
      if (import.meta.env.DEV) {
        console.warn('[LandingService] Waitlist submission fallback for dev:', error);
        return {
          success: true,
          message: 'Terima kasih! Email Anda telah kami catat untuk akses prioritas Lunary.',
        };
      }
      throw error;
    }
  },
};

