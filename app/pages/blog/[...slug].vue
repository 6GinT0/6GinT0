<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => String(route.params.slug));
const runtimeConfig = useRuntimeConfig();

const { data: page } = await useAsyncData(
  "post",
  async () => {
    const collection = `blog_${locale.value}` as keyof Collections;

    return await queryCollection(collection).where("slug", "=", slug.value).first();
  },
  {
    watch: [locale, slug]
  }
);

if (!page.value) {
  throw createError({ fatal: true, statusCode: 404 });
}

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
  <div class="my-12 max-w-3xl prose dark:prose-invert">
    <template v-if="page">
      <ContentRenderer v-if="page" :value="page" :prose="false" />

      <div class="mt-8 w-full flex justify-end">
        <UButton class="cursor-pointer" variant="soft" @click="$router.back()">
          {{ $t("blog.go_back") }}
        </UButton>
      </div>
    </template>
  </div>
</template>
