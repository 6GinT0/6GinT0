<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { t, locale } = useI18n();
const slug = computed(() => String(route.params.slug));
const runtimeConfig = useRuntimeConfig();

const { data: project } = await useAsyncData(
  "project",
  async () => {
    const collection = `projects_${locale.value}` as keyof Collections;

    return await queryCollection(collection).where("slug", "=", slug.value).first();
  },
  {
    watch: [locale, slug]
  }
);

if (!project.value) {
  throw new Error(t("projects.not_found"));
}

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
  ogTitle: project.value?.title,
  ogDescription: project.value?.description,
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: project.value?.title,
  twitterDescription: project.value?.description,
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <div class="my-12 max-w-3xl prose dark:prose-invert">
    <ContentRenderer v-if="project" :value="project" :prose="false" />

    <div class="mt-8 w-full flex justify-end">
      <UButton class="cursor-pointer" variant="soft" @click="$router.back()">
        {{ $t("projects.go_back") }}
      </UButton>
    </div>
  </div>
</template>
