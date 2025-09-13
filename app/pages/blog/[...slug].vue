<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const slug = computed(() => String(route.params.slug));

const { data: page, error } = await useAsyncData(
  "page-" + slug.value,
  async () => {
    const collection = ("blog_" + locale.value) as keyof Collections;
    const content = await queryCollection(collection).where("slug", "=", slug.value).first();

    return content;
  },
  {
    watch: [locale]
  }
);

watchEffect(() => {
  if (!page.value) {
    router.push({ path: "/404", replace: true });
  }
});

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  ogImage: "/images/me.png",
  twitterTitle: page.value?.title,
  twitterDescription: page.value?.description,
  twitterImage: "/images/me.png",
  twitterCard: "summary"
});
</script>

<template>
  <div v-if="page" class="container mx-auto px-4 py-6">
    <div class="relative">
      <NuxtImg
        :src="page?.cover?.src"
        class="w-full rounded-lg border max-h-[500px] object-cover"
      />

      <div class="absolute inset-0 bg-black/70 rounded-lg" />

      <h1
        class="font-black lg:text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-lg"
      >
        {{ page.title }}
      </h1>
    </div>
    <div class="flex flex-wrap gap-1 mt-2">
      <span
        v-for="category in page.categories"
        class="text-xs bg-primary dark:bg-[var(--terciary)]/25 px-2 py-1 rounded-full"
      >
        {{ category }}
      </span>
    </div>
    <div class="prose lg:prose-lg dark:prose-invert mb-6 mx-auto">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>
