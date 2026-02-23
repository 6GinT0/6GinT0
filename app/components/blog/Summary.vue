<script setup lang="ts">
const { locale } = useI18n();

const collection = computed(() => (locale.value === "es" ? "blog_es" : "blog_en"));
const props = defineProps<{
  limit?: string;
}>();

const { data: posts } = await useAsyncData(
  props.limit ? "latest-posts" : "posts",
  () => {
    let query = queryCollection(collection.value as any).order("date", "DESC");

    if (props.limit) {
      query = query.limit(Number(props.limit));
    }

    return query.all();
  },
  {
    watch: [locale]
  }
);
</script>

<template>
  <div class="w-full">
    <div v-if="posts && posts.length > 0" class="grid grid-cols-1">
      <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <UiEmptyContent v-else :message="$t('blog.empty_error')" icon="i-heroicons-folder-open" />
  </div>
</template>
