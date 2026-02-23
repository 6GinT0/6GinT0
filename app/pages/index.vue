<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const { locale, t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const { data: pageContent } = await useAsyncData(`content-${route.path}-${locale.value}`, () => {
  const collectionName = locale.value === "es" ? "es" : "en";

  const path = locale.value === "es" ? route.path : "/en" + route.path;

  return queryCollection(collectionName as keyof Collections)
    .path(path)
    .first();
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
    <section>
      <h1 class="text-7xl leading-24 font-instrument-serif">Ulises</h1>
      <div class="flex items-center justify-between">
        <p>{{ t("index.job") }}</p>

        <span>📍 Argentina</span>
      </div>
    </section>
    <div class="my-12">
      <ContentRenderer v-if="pageContent" :value="pageContent" :prose="false" />
    </div>
    <UiWrapperSection :title="$t('contact_form.title')">
      <ContactForm />
    </UiWrapperSection>
  </div>
</template>
