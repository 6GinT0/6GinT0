<script setup lang="ts">
defineProps<{ href: string; text: string }>();
</script>

<template>
  <a
    class="not-prose text-primary underline hover:decoration-wavy decoration-1 underline-offset-2"
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
  >
    {{ text }}
  </a>
</template>
