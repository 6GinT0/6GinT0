// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "shadcn-nuxt",
    "motion-v/nuxt"
  ],
  css: ["~/assets/css/tailwind.css"],
  icon: {
    mode: "css",
    cssLayer: "base"
  },
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui"
  },
  image: {
    quality: 80,
    format: ["webp"]
  },
  fonts: {
    families: [
      {
        name: "IBM Plex Mono",
        provider: "google"
      },
      {
        name: "Poppins",
        provider: "google"
      },
      {
        name: "Fredoka",
        provider: "google"
      }
    ]
  },
  pinia: {
    storesDirs: ["./app/stores/**"]
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
      },
      {
        code: "br",
        name: "🇧🇷",
        iso: "pt-BR",
        language: "pt-BR",
        file: "br.json"
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
    baseUrl: process.env.NUXT_PULIC_BASE_URL || "http://localhost:3000"
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      baseUrl: process.env.NUXT_PULIC_BASE_URL || "http://localhost:3000"
    }
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
  },
  routeRules: {
    "/**": {
      ssr: false
    },
    "/blog/**": {
      ssr: true
    },
    "/projects/**": {
      ssr: true
    }
  }
});
