<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  date: string;
  image?: string;
  slug: string;
  highlight?: boolean;
}>();

const localePath = useLocalePath();
</script>

<template>
  <article
    class="group overflow-hidden rounded-lg dark:bg-zinc-800 bg-white border border-zinc-300 dark:border-0"
  >
    <div class="p-4 space-y-4 relative">
      <UIcon
        v-if="highlight"
        name="tabler:star-filled"
        class="size-4 text-yellow-600 absolute top-6 right-6"
      />

      <NuxtImg
        :src="
          image ||
          'http://noigsrnwtqtwtrkqymrd.supabase.co/storage/v1/object/public/DX/projects/ascii-art-text.png'
        "
        :alt="title"
        class="h-full w-full object-cover rounded-lg"
        loading="lazy"
        format="webp"
      />
      <div class="flex items-center justify-between gap-4 mb-3">
        <h3 class="text-xl font-bold leading-tight m-0">
          {{ title }}
        </h3>
        <time
          class="shrink-0 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-md"
          :datetime="date"
        >
          {{ date }}
        </time>
      </div>
      <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
        {{ description }}
      </p>

      <UButton
        color="primary"
        variant="soft"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        :ui="{
          base: 'group/button cursor-pointer',
          trailingIcon: 'size-3 group-hover/button:translate-x-1 transition-all'
        }"
        :to="localePath(`/projects/${slug}`)"
      >
        {{ $t("projects.anchor_text") }}
      </UButton>
    </div>
  </article>
</template>
