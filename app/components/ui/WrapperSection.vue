<script setup lang="ts">
const props = defineProps<{ class?: string; title: string }>();

const cl = computed(() => {
  const base = props.class + " my-24";

  return base;
});
</script>

<template>
  <section :class="cl">
    <h2 class="text-sm text-zinc-600 dark:text-zinc-500 uppercase font-light mb-4">{{ title }}</h2>
    <slot />
  </section>
</template>
