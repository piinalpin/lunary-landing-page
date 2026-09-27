/**
 * Type-safe environment variable utility
 */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  appName: import.meta.env.VITE_APP_NAME || 'Lunary',
  loginUrl: import.meta.env.VITE_APP_LOGIN_URL || 'http://localhost:8000/login',
  landingPageSecret: import.meta.env.VITE_LANDING_PAGE_SECRET || '',
  reverbAppKey: import.meta.env.VITE_REVERB_APP_KEY || '',
  reverbHost: import.meta.env.VITE_REVERB_HOST || '',
  reverbPort: Number(import.meta.env.VITE_REVERB_PORT) || 443,
  reverbScheme: import.meta.env.VITE_REVERB_SCHEME || 'https',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

