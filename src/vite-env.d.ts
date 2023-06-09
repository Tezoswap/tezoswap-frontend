/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEB3_AUTH_CLIENT_ID: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}