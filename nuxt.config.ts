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
        code: "ar",
        language: "es-AR"
      },
      {
        code: "en",
        language: "en-US"
      },
      {
        code: "br",
        language: "pt-BR"
      }
    ],
    defaultLocale: "ar"
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
