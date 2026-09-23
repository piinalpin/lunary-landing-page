import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { LandingPageApiResponse } from '@/types/api';
import type { Locale } from '@/types/landing';

export const landingService = {
  /**
   * Fetch landing page data from Laravel backend /api/landing-page with lang parameter
   */
  async getLandingPageData(lang: Locale = 'id'): Promise<LandingPageApiResponse> {
    return apiClient.get<LandingPageApiResponse>(ENDPOINTS.LANDING_PAGE, {
      params: { lang },
    });
  },
};
