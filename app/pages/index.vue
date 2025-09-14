<script setup lang="ts">
import Meteors from "~/components/ui/Meteors.vue";

import { motion } from "motion-v";

const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  title: "pages.index.title"
});

useSeoMeta({
  title: t("pages.index.title"),
  description: t("pages.index.description"),
  ogTitle: t("pages.index.title"),
  ogDescription: t("pages.index.description"),
  ogImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterTitle: t("pages.index.title"),
  twitterDescription: t("pages.index.description"),
  twitterImage: `${runtimeConfig.public.baseUrl}/images/me.png`,
  twitterCard: "summary"
});
</script>

<template>
  <section class="h-[calc(100dvh-125px)] flex items-center container mx-auto px-4">
    <div class="hidden md:block">
      <Meteors :number="20" />
    </div>

    <div>
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{
          opacity: 1
        }"
      >
        <NuxtImg src="/images/me.png" alt="Me" class="w-[100px] mb-5" quality="50" format="webp" />
      </motion.div>
      <motion.h2
        :initial="{ opacity: 0, y: 100 }"
        :animate="{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 1.3, ease: 'easeInOut' }
        }"
        class="font-fredoka leading-none text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#888]"
      >
        {{ t("pages.index.hero.first_line") }}
      </motion.h2>
      <motion.h2
        :initial="{ opacity: 0, y: 100 }"
        :animate="{
          opacity: 1,
          y: 0,
          transition: { delay: 0.9, duration: 1.9, ease: 'easeInOut' }
        }"
        class="font-fredoka leading-none text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black"
      >
        {{ t("pages.index.hero.second_line") }}
      </motion.h2>
    </div>
  </section>

  <HomeAbout />

  <HomeSkills />

  <HomeContactForm />
</template>
