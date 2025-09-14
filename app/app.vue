<script setup lang="ts">
import "vue-sonner/style.css";

const isDark = usePreferredDark();
const favicon = computed(() => (isDark.value ? "favicon-dark.png" : "favicon.png"));

useFavicon(favicon);
</script>

<template>
  <Toaster />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
