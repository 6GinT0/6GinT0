<script setup lang="ts">
const { locale } = useI18n();

const collection = computed(() => (locale.value === "es" ? "projects_es" : "projects_en"));
const props = defineProps<{
  limit?: string;
}>();

const { data: projects } = await useAsyncData(
  props.limit ? "latest-projects" : "projects",
  () => {
    let query = queryCollection(collection.value as any)
      .order("highlight", "DESC")
      .order("date", "DESC");

    if (props.limit) {
      query = query.limit(Number(props.limit));
    }

    return query.all();
  },
  {
    watch: [locale]
  }
);
</script>

<template>
  <div class="w-full">
    <div v-if="projects && projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.slug"
        :slug="project.slug"
        :title="project.title"
        :description="project.short_description"
        :date="formatDate(project.date)"
        :image="project.images?.[0]"
        :highlight="project.highlight"
      />
    </div>

    <UiEmptyContent v-else :message="$t('projects.empty_error')" icon="i-heroicons-folder-open" />
  </div>
</template>
