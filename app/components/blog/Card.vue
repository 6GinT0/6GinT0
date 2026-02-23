<script setup lang="ts">
defineProps<{
  post: any;
}>();

const localePath = useLocalePath();
</script>

<template>
  <NuxtLink
    class="p-4 flex items-center gap-4 w-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
    :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
  >
    <NuxtImg
      :src="post.cover.src"
      class="h-16 w-16 sm:h-32 sm:w-32 rounded object-cover"
      quality="50"
      format="webp"
    />
    <div class="flex flex-1 justify-between">
      <h2 class="font-semibold leading-tight m-0 text-sm sm:text-md">
        {{ post.title }}
      </h2>
      <time class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400" :datetime="post.date">
        {{ formatDate(post.date) }}
      </time>
    </div>
  </NuxtLink>
</template>
