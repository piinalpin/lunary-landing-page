/**
 * Type-safe environment variable utility
 */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  appName: import.meta.env.VITE_APP_NAME || 'Lunary',
  loginUrl: import.meta.env.VITE_APP_LOGIN_URL || 'http://localhost:8000/login',
  registerUrl: import.meta.env.VITE_APP_REGISTER_URL || 'http://localhost:8000/register',
  demoUrl: import.meta.env.VITE_APP_DEMO_URL || 'http://localhost:8000/demo',
  landingPageSecret: import.meta.env.VITE_LANDING_PAGE_SECRET || '',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

