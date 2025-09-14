<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="relative w-full h-[calc(100dvh-100px)]">
    <div class="bg w-full h-12 flex items-center justify-center">
      <div class="px-4 py-2 bg-black">{{ message }}</div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: linear-gradient(
    135deg,
    #ffcc00 25%,
    #000000 25%,
    #000000 50%,
    #ffcc00 50%,
    #ffcc00 75%,
    #000000 75%,
    #000000 100%
  );
  background-size: 56.57px 56.57px;
}
</style>
