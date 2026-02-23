<script setup lang="ts">
defineProps<{
  message: string;
  icon: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50"
  >
    <UIcon :name="icon" class="text-4xl text-zinc-300 dark:text-zinc-700 mb-4" />
    <p class="text-zinc-500 dark:text-zinc-400 font-medium">
      {{ message }}
    </p>
  </div>
</template>
