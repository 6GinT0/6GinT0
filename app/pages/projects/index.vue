<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

const { data: projects } = await useAsyncData(
  "projects",
  async () => {
    const collection = ("projects_" + locale.value) as keyof Collections;
    const content = await queryCollection(collection).all();

    if (!content && locale.value !== "en") {
      return await queryCollection("projects_en").all();
    }

    return content;
  },
  {
    watch: [locale]
  }
);

useSeoMeta({
  title: t("pages.projects.title"),
  description: t("pages.projects.description"),
  ogTitle: t("pages.projects.title"),
  ogDescription: t("pages.projects.description"),
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: t("pages.projects.title"),
  twitterDescription: t("pages.projects.description"),
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <SharedCautionTape
    v-if="!projects || projects.length === 0"
    :message="t('pages.projects.error-data')"
  />
  <div v-else class="container mx-auto px-4 py-6">
    <div class="my-8 space-y-12">
      <div class="grid md:grid-cols-2 gap-4">
        <SharedCard
          v-for="project in projects as any"
          :key="project.slug"
          :item="project"
          :categories="project.technologies"
        >
          <template #icon> 🎖 </template>
          <template #title> {{ project.title }} </template>
          <template #description> {{ project.short_description }} </template>
          <template #footer>
            <NuxtLink
              :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
              class="page-actions"
            >
              {{ t("pages.projects.card-button") }}
            </NuxtLink>
          </template>
        </SharedCard>
      </div>
    </div>
  </div>
</template>
