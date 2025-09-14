<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

const { data: posts } = await useAsyncData(
  "blog",
  async () => {
    const collection = ("blog_" + locale.value) as keyof Collections;
    const content = await queryCollection(collection).all();

    if (!content && locale.value !== "en") {
      return await queryCollection("blog_en").all();
    }

    return content;
  },
  {
    watch: [locale]
  }
);

const firstPost: Ref<any> = computed(() => (posts.value ? posts.value[0] : []));

useSeoMeta({
  title: t("pages.blog.title"),
  description: t("pages.blog.description"),
  ogTitle: t("pages.blog.title"),
  ogDescription: t("pages.blog.description"),
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: t("pages.blog.title"),
  twitterDescription: t("pages.blog.description"),
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <SharedCautionTape v-if="!posts || posts.length === 0" :message="t('pages.blog.error-data')" />
  <div v-else class="container mx-auto px-4 py-6">
    <div class="my-8 space-y-12">
      <div class="space-y-4">
        <NuxtImg
          :src="firstPost.cover.src"
          :alt="firstPost.cover.alt"
          class="w-full rounded-lg border max-h-[500px] object-cover"
          quality="50"
          format="webp"
        />
        <NuxtLink
          class="font-black lg:text-2xl underline"
          :to="localePath({ name: 'blog-slug', params: { slug: firstPost.slug } })"
        >
          {{ firstPost.title }}
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <BlogCard v-for="post in posts.slice(1)" :key="post.slug" :post="post" />
      </div>
    </div>
  </div>
</template>
