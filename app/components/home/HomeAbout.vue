<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();
</script>

<template>
  <section class="md:grid md:grid-cols-3 gap-4 container mx-auto px-4 my-24">
    <motion.div
      :initial="{ opacity: 0, y: 100 }"
      :whileInView="{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }"
    >
      <div class="relative mb-4 md:mb-0 md:sticky md:top-4">
        <NuxtImg
          src="/images/resource.png"
          alt="Me"
          class="absolute -top-3 left-1/2 -translate-x-1/2 z-10 h-8"
          quality="50"
          format="webp"
        />
        <NuxtImg
          src="/images/profile.jpeg"
          alt="Me"
          class="max-h-[350px] object-cover object-[50%_35%] grayscale w-full"
          quality="50"
          format="webp"
        />
      </div>
    </motion.div>
    <div class="col-span-2 space-y-3">
      <h4 class="font-ibm-plex-mono text-[#888] uppercase">{{ t("pages.index.about.title") }}</h4>
      <p>{{ t("pages.index.about.paragraph_1") }}</p>
      <p>{{ t("pages.index.about.paragraph_2") }}</p>
      <p>{{ t("pages.index.about.paragraph_3") }}</p>
      <p>{{ t("pages.index.about.paragraph_4") }}</p>
      <p>{{ t("pages.index.about.paragraph_5") }}</p>
      <p>{{ t("pages.index.about.paragraph_6") }}</p>
    </div>
  </section>
</template>
