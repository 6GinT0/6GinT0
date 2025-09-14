<script setup lang="ts">
const { t, tm, rt } = useI18n();
</script>

<template>
  <section class="container mx-auto px-4 space-y-8 my-64">
    <h2 class="font-fredoka leading-none text-4xl md:text-5xl lg:text-6xl font-black">
      {{ t("pages.index.interests.title") }}
    </h2>
    <div class="grid md:grid-cols-2 gap-4">
      <p class="text-current/75">
        {{ t("pages.index.interests.paragraph") }}
      </p>
      <div>
        <ul>
          <li v-for="item in tm('pages.index.interests.items') as string[]" :key="item">
            {{ rt(item) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
ul li {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
ul li:before {
  content: "";
  background-color: #dfb44b;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}
</style>
