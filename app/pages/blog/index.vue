<script setup lang="ts">
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const { data: pageContent } = await useAsyncData(`content-${route.path}-${locale.value}`, () => {
  const collectionName = locale.value === "es" ? "es" : "en";

  const path = locale.value === "es" ? route.path : "/en" + route.path;

  return queryCollection(collectionName).path(path).first();
});

useSeoMeta({
  title: pageContent.value?.title,
  description: pageContent.value?.description,
  ogTitle: pageContent.value?.title,
  ogDescription: pageContent.value?.description,
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: pageContent.value?.title,
  twitterDescription: pageContent.value?.description,
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <div>
    <ContentRenderer v-if="pageContent" :value="pageContent" :prose="false" />
  </div>
</template>
