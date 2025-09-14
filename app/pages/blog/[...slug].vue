<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => String(route.params.slug));
const runtimeConfig = useRuntimeConfig();

const { data: page, error } = await useAsyncData(
  "post",
  async () => {
    const collection = `blog_${locale.value}` as keyof Collections;
    const content = await queryCollection(collection).where("slug", "=", slug.value).first();

    if (!content) {
      throw new Error();
    }

    return content;
  },
  {
    watch: [locale, slug]
  }
);

if (error.value) {
  throw createError({ fatal: true, statusCode: 404 });
}

watch(error, () => {
  if (error.value) {
    throw createError({ fatal: true, statusCode: 404 });
  }
});

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: page.value?.title,
  twitterDescription: page.value?.description,
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <div v-if="page" class="container mx-auto px-4 py-6 max-w-3xl">
    <div class="relative">
      <NuxtImg
        :src="page?.cover?.src"
        :alt="page?.cover?.alt"
        class="w-full rounded-lg border max-h-[500px] object-cover"
        quality="50"
        format="webp"
      />

      <div class="absolute inset-0 bg-black/70 rounded-lg" />

      <h1
        class="font-black lg:text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-lg"
      >
        {{ page.title }}
      </h1>
    </div>
    <SharedCategories :categories="page.categories as string[]" />
    <div class="prose lg:prose-lg dark:prose-invert mb-6 mx-auto">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>
