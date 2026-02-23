<script setup lang="ts">
const { latitude, longitude } = await $fetch<IP>("https://ipapi.co/json/");
const data = await $fetch<string>(
  `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`
);
const weather: Weather = JSON.parse(data);
</script>

<template>
  <ClientOnly>
    <div class="flex items-center">
      <UIcon name="tabler:cloud" class="size-4" />
      <div class="text-xs ml-1">{{ weather.dataseries[0]?.temp2m || "--" }}°C</div>
    </div>
  </ClientOnly>
</template>
