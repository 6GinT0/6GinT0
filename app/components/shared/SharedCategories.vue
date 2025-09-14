<script setup lang="ts">
defineProps({
  categories: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-wrap gap-1 mb-2 mt-2">
    <span
      v-for="category in categories"
      class="text-xs bg-primary dark:bg-[var(--terciary)]/25 px-2 py-1 rounded-full"
    >
      {{ category }}
    </span>
  </div>
</template>
