<script setup lang="ts">
import type { NuxtError } from "#app";

const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps<{ error: NuxtError }>();

useHead({
  title: props.error?.status ?? "404"
});
</script>

<template>
  <div class="flex gap-4 items-center justify-center flex-col h-dvh">
    <h1 class="text-7xl">{{ error?.status ?? "404" }}</h1>
    <p>{{ t("404.message") }}</p>

    <UButton color="primary" variant="soft" :to="localePath('/')">
      {{ t("404.back") }}
    </UButton>
  </div>
</template>
