/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_UNSPLASH_API_KEY: string
  readonly VITE_UNSPLASH_API_BASE_URL: string
  readonly VITE_PHOTOS_PER_PAGE: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
