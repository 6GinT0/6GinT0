<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <Card class="shadow-none">
    <CardHeader>
      <CardTitle>{{ post.title }}</CardTitle>
      <div class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="category in post.categories"
          class="text-xs bg-primary dark:bg-[var(--terciary)]/25 px-2 py-1 rounded-full"
        >
          {{ category }}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <p class="text-sm">{{ post.description }}</p>
    </CardContent>
    <CardFooter class="mt-auto">
      <NuxtLink
        :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
        class="underline flex items-center gap-x-1 group"
      >
        {{ t("pages.blog.card-button") }}
        <Icon
          name="tabler:arrow-right"
          class="group-hover:translate-x-1 ease-in transition-transform duration-300"
        />
      </NuxtLink>
    </CardFooter>
  </Card>
</template>
