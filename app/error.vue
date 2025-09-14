<script setup lang="ts">
import type { NuxtError } from "#app";

const { t } = useI18n();

const props = defineProps({
  error: Object as () => NuxtError
});

useHead({
  title: props.error?.statusCode ?? "404"
});
</script>

<template>
  <NuxtLayout>
    <div
      class="flex items-center justify-center container mx-auto p-4 h-[calc(100dvh-200px)] flex-col space-y-4"
    >
      <h1 class="text-7xl">{{ error?.statusCode ?? "404" }}</h1>
      <p>{{ t("pages.404.message") }}</p>

      <NuxtLink to="/" class="bg-primary dark:bg-[var(--terciary)]/25 rounded-full px-4 py-2">
        {{ t("pages.404.back") }}
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
