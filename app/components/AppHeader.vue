<script setup lang="ts">
import { en, es } from "@nuxt/ui/locale";
const { locale, setLocale } = useI18n();
</script>

<template>
  <ClientOnly>
    <header class="w-full flex items-center justify-between my-4">
      <div class="flex items-center gap-2">
        <UiLocalWeather />
        <UiLocalTime />
      </div>
      <ULocaleSelect
        :ui="{
          leading: 'font-noto-color-emoji',
          item: '[&_>_span:first-of-type]:font-noto-color-emoji'
        }"
        :model-value="locale"
        :locales="[en, es]"
        @update:model-value="setLocale($event as 'en' | 'es')"
      />
    </header>
  </ClientOnly>
</template>
