<script setup lang="ts">
import { cn } from "@/lib/utils";
import { motion } from "motion-v";

const props = defineProps({
  number: {
    type: Number,
    default: 20
  },
  class: {
    type: String,
    default: ""
  }
});

const meteors = new Array(props.number || 20).fill(true);
const innerWidth = computed(() => window.innerWidth);
</script>

<template>
  <ClientOnly>
    <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.5 }">
      <span
        v-for="(el, idx) in meteors"
        :key="idx"
        :class="
          cn(
            'animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
            'before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-[\'\']',
            props.class
          )
        "
        :style="{
          top: '-40px',
          left: idx * (innerWidth / meteors.length) + 'px',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + 's'
        }"
      />
    </motion.div>
  </ClientOnly>
</template>
