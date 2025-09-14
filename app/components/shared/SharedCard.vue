<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <Card class="shadow-none">
    <CardHeader>
      <div class="flex items-center gap-x-3">
        <div class="font-noto-color-emoji p-2 bg-background rounded border">
          <slot name="icon" />
        </div>
        <CardTitle>
          <slot name="title" />
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <SharedCategories :categories="categories" />
      <p class="text-sm">
        <slot name="description" />
      </p>
    </CardContent>
    <CardFooter class="mt-auto">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
