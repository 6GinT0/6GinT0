<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { t, locale } = useI18n();
const slug = computed(() => String(route.params.slug));
const runtimeConfig = useRuntimeConfig();

const { data: page, error } = await useAsyncData(
  "project",
  async () => {
    const collection = `projects_${locale.value}` as keyof Collections;
    const content = await queryCollection(collection)
      .where("slug", "=", slug.value)
      .where("under_construction", "=", false)
      .first();

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
  <div v-if="page" class="container mx-auto px-4 py-6 max-w-3xl space-y-6">
    <section class="space-y-2">
      <h2 class="text-3xl md:text-4xl">
        {{ page.title }}
      </h2>
      <SharedCategories :categories="page.technologies" />
    </section>
    <section class="relative">
      <div v-if="page.highlight" class="px-2 py-1 bg-black/50 rounded z-20 absolute top-4 right-4">
        <span class="font-noto-color-emoji">⭐</span>
      </div>
      <ProjectCarousel :images="page.images" />
    </section>
    <p>{{ page.description }}</p>
    <div class="flex flex-wrap gap-1">
      <a v-if="page.repository" :href="page.repository" class="page-actions">
        {{ t("pages.projects.repository") }}
      </a>
      <a v-if="page.demo" :href="page.demo" class="page-actions">
        {{ t("pages.projects.demo") }}
      </a>
    </div>
  </div>
</template>
