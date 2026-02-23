<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const date = ref("");

const updateDate = () => {
  date.value = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

let interval: ReturnType<typeof setInterval> | undefined = undefined;

onMounted(() => {
  updateDate();

  interval = setInterval(updateDate, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <ClientOnly>
    <div class="flex items-center">
      <UIcon name="tabler:clock" class="size-4" />
      <div class="text-xs ml-1">{{ date || "--:--" }}</div>
    </div>
  </ClientOnly>
</template>
