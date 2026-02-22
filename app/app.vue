<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const isDark = usePreferredDark();

const favicon = computed(() => (isDark.value ? "favicon.png" : "favicon-dark.png"));
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
  htmlAttrs: {
    lang,
    dir
  },
  titleTemplate: "%s | Ulises Saucedo"
});

useFavicon(favicon);
</script>

<template>
  <UApp :locale="locales[locale]">
    <UMain>
      <NuxtLayout>
        <AppHeader />

        <NuxtPage />

        <AppFooter />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
