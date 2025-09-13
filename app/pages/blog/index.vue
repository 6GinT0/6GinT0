<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const { t, locale } = useI18n();
const localePath = useLocalePath();

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
  ogImage: "/images/me.png",
  twitterTitle: t("pages.blog.title"),
  twitterDescription: t("pages.blog.description"),
  twitterImage: "/images/me.png",
  twitterCard: "summary"
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="my-8 space-y-12" v-if="posts">
      <div class="space-y-4">
        <NuxtImg
          :src="firstPost.cover.src"
          class="w-full rounded-lg border max-h-[500px] object-cover"
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
