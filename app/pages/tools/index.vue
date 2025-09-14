<script setup lang="ts">
import toolsData from "~/data/tools.json";

const { t, locale } = useI18n();
const toolsRef: Ref<any> = ref([]);
const runtimeConfig = useRuntimeConfig();

watch(
  locale,
  () => {
    toolsRef.value = toolsData[locale.value].tools;
  },
  {
    immediate: true
  }
);

useSeoMeta({
  title: t("pages.tools.title"),
  description: t("pages.tools.description"),
  ogTitle: t("pages.tools.title"),
  ogDescription: t("pages.tools.description"),
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: t("pages.tools.title"),
  twitterDescription: t("pages.tools.description"),
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="my-8 space-y-12" v-if="toolsRef">
      <div v-for="(tool, idx) in toolsRef" :key="idx" class="space-y-4">
        <h2 class="font-black lg:text-2xl underline">{{ tool.group }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <SharedCard
            v-for="(item, idx) in tool.items"
            :key="idx"
            :item="item"
            :categories="item.categories"
          >
            <template #icon> ⛏️ </template>
            <template #title> {{ item.name }} </template>
            <template #description> {{ item.description }} </template>
            <template #footer>
              <template v-if="item.external">
                <a :href="item.link" target="_blank" rel="noopener noreferrer">
                  <Button class="page-actions">
                    {{ t("pages.tools.card-button-external") }}
                  </Button>
                </a>
              </template>
              <template v-else>
                <NuxtLink :to="item.link">
                  {{ t("pages.tools.card-button-internal") }}
                </NuxtLink>
              </template>
            </template>
          </SharedCard>
        </div>
      </div>
    </div>
  </div>
</template>
