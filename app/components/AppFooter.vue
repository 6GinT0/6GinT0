<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { t } = useI18n();
const localePath = useLocalePath();

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t("menu.home"),
    to: localePath("/"),
    active: route.path === localePath("/"),
    icon: "tabler:home"
  },
  {
    label: t("menu.projects"),
    to: localePath("/projects"),
    active: route.path === localePath("/projects"),
    icon: "tabler:folder"
  },
  {
    label: t("menu.blog"),
    to: localePath("/blog"),
    active: route.path === localePath("/blog"),
    icon: "tabler:book"
  }
]);

const socials = ref<DropdownMenuItem[]>([
  {
    label: "GitHub",
    to: "https://github.com/6GinT0",
    icon: "tabler:brand-github"
  },
  {
    label: "LinkedIn",
    to: "https://www.linkedin.com/in/ulises-saucedo",
    icon: "tabler:brand-linkedin"
  }
]);
</script>

<template>
  <footer
    class="flex gap-2 items-center fixed bottom-8 w-fit left-1/2 -translate-x-1/2 bg-zinc-200/60 dark:bg-zinc-800/60 backdrop-blur border border-zinc-200/20 dark:border-zinc-800/50 rounded-full px-4 py-2 z-50"
  >
    <UTooltip v-for="item in items" :key="item.label" :text="item.label">
      <UButton
        :to="item.to"
        variant="link"
        :icon="item.icon"
        class="hover:bg-zinc-100 dark:hover:bg-zinc-700"
      />
    </UTooltip>
    <UPopover mode="hover">
      <UButton
        class="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
        icon="tabler:user"
        color="neutral"
        variant="link"
      />

      <template #content>
        <div class="flex flex-col gap-2 p-2">
          <UButton
            v-for="social in socials"
            :key="social.label"
            :to="social.to"
            color="neutral"
            variant="link"
            :icon="social.icon"
            class="hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            {{ social.label }}
          </UButton>
        </div>
      </template>
    </UPopover>
    <UButton
      class="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
      variant="ghost"
      :icon="isDark ? 'tabler:sun' : 'tabler:moon'"
      @click="toggleDark()"
    />
  </footer>
</template>
