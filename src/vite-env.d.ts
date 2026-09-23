/// <reference types="vite/client" />
/// <reference types="svelte" />

declare module '*.svelte' {
  import type { Component } from 'svelte';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: Component<any, any, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_LOGIN_URL: string;
  readonly VITE_APP_REGISTER_URL: string;
  readonly VITE_APP_DEMO_URL: string;
  readonly VITE_LANDING_PAGE_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
