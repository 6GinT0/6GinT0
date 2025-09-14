<script setup lang="ts">
import type { CarouselApi } from "@/components/ui/carousel";

defineProps({
  images: {
    type: Array<string>,
    required: true
  }
});

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
  <div class="w-full sm:w-auto">
    <Carousel class="relative w-full" @init-api="(val) => (emblaMainApi = val)">
      <CarouselContent>
        <CarouselItem v-for="(src, index) in images" :key="index">
          <div class="p-1">
            <NuxtImg
              :src="src"
              :alt="'Image: ' + index"
              class="w-full h-[350px] rounded-lg border object-cover"
              quality="50"
              format="webp"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <Carousel
      v-if="images.length > 1"
      class="relative w-full"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(src, index) in images"
          :key="index"
          class="pl-0 basis-1/4 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <NuxtImg
              :src="src"
              :alt="'Image: ' + index"
              class="w-full h-[100px] rounded-lg border object-cover"
              quality="50"
              format="webp"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
