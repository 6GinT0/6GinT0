<script setup lang="ts">
defineProps({
  tool: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();
</script>

<template>
  <Card class="shadow-none">
    <CardHeader>
      <div class="flex items-center gap-x-3">
        <div class="font-noto-color-emoji p-2 bg-background rounded border">⛏️</div>
        <CardTitle>{{ tool.name }}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <SharedCategories :categories="tool.categories" />
      <p class="text-sm">{{ tool.description }}</p>
    </CardContent>
    <CardFooter class="mt-auto">
      <div>
        <template v-if="tool.external">
          <a :href="tool.link" target="_blank" rel="noopener noreferrer">
            <Button class="page-actions">
              {{ t("pages.tools.card-button-external") }}
            </Button>
          </a>
        </template>
        <template v-else>
          <NuxtLink :to="tool.link">
            {{ t("pages.tools.card-button-internal") }}
          </NuxtLink>
        </template>
      </div>
    </CardFooter>
  </Card>
</template>
