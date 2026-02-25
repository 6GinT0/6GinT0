// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ignore: ["pages/**/components/**", "pages/_components/**"],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxtjs/supabase"
  ],
  css: ["~/assets/css/tailwind.css"],
  icon: {
    mode: "css",
    cssLayer: "base"
  },
  image: {
    quality: 80,
    format: ["webp"]
  },
  fonts: {
    families: [
      {
        name: "Instrument Serif",
        provider: "google"
      }
    ]
  },
  i18n: {
    locales: [
      {
        code: "es",
        name: "🇪🇦",
        iso: "es-AR",
        language: "es-AR",
        file: "es.json"
      },
      {
        code: "en",
        name: "🇺🇸",
        iso: "en-US",
        language: "en-US",
        file: "en.json"
      }
    ],
    defaultLocale: "en",
    langDir: "locales/",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      fallbackLocale: "en"
    },
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000"
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png"
        }
      ]
    }
  }
});
