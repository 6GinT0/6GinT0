<script setup lang="ts">
const isOpen = ref(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);
const { t, locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const mainMenu = computed(() => [
  { label: t("menu.home"), to: localePath("/") },
  { label: t("menu.tools"), to: localePath("/tools") },
  { label: t("menu.projects"), to: localePath("/projects") },
  { label: t("menu.blog"), to: localePath("/blog") }
]);

const currentLocale = ref(locale.value);

watch(currentLocale, (locale) => {
  setLocale(locale);
});
</script>

<template>
  <ClientOnly>
    <header class="py-6 px-4 sticky">
      <div class="container mx-auto flex justify-between items-center">
        <nav class="flex gap-x-4">
          <NuxtImg
            class="h-[50px]"
            :src="isDark ? '/favicon.png' : '/favicon-dark.png'"
            alt="Logo"
            quality="50"
            format="webp"
          />
          <ul class="hidden lg:flex items-center gap-x-4">
            <li v-for="(item, idx) in mainMenu" :key="idx">
              <NuxtLink class="btn-header-link-nav" active-class="text-secondary" :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="hidden lg:flex space-x-4">
          <Button class="btn-header-actions secondary group" variant="ghost">
            {{ t("menu-actions.download") }}
            <Icon
              name="tabler:arrow-up-right"
              class="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Button>
          <Button class="btn-header-actions group">
            {{ t("menu-actions.talk") }}
            <Icon
              name="tabler:arrow-up-right"
              class="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Button>
          <Button class="btn-header-actions" @click="toggleDark()">
            <Icon :name="isDark ? 'tabler:sun' : 'tabler:moon'" />
          </Button>
          <Select v-model="currentLocale">
            <SelectTrigger class="bg-primary shadow-none border-none rounded-full cursor-pointer">
              <SelectValue class="font-noto-color-emoji" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="locale in locales"
                  :key="locale.code"
                  :value="locale.code"
                  class="cursor-pointer font-noto-color-emoji"
                >
                  {{ locale.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-x-4 lg:hidden">
          <Select v-model="currentLocale">
            <SelectTrigger class="bg-primary shadow-none border-none rounded-full cursor-pointer">
              <SelectValue class="font-noto-color-emoji" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="locale in locales"
                  :key="locale.code"
                  :value="locale.code"
                  class="cursor-pointer font-noto-color-emoji"
                >
                  {{ locale.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Sheet v-model:open="isOpen">
            <SheetTrigger as-child>
              <Button variant="ghost">
                <Icon name="tabler:menu" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader class="border-b">
                <NuxtImg
                  class="h-[50px] w-[50px]"
                  :src="isDark ? '/favicon.png' : '/favicon-dark.png'"
                  alt="Logo"
                  quality="50"
                  format="webp"
                />
                <SheetTitle className="sr-only"> Mobile Sidebar Title </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile Sidebar Description
                </SheetDescription>
              </SheetHeader>
              <ul class="mx-4">
                <li
                  class="[&:not(:last-child)]:border-b py-2"
                  v-for="(item, idx) in mainMenu"
                  :key="idx"
                >
                  <NuxtLink class="btn-header-link-nav" active-class="text-secondary" :to="item.to">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
              <SheetFooter>
                <Button class="btn-header-actions secondary group" variant="ghost">
                  {{ t("menu-actions.download") }}
                  <Icon
                    name="tabler:arrow-up-right"
                    class="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button class="btn-header-actions group">
                  {{ t("menu-actions.talk") }}
                  <Icon
                    name="tabler:arrow-up-right"
                    class="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button class="btn-header-actions" @click="toggleDark()">
                  <Icon :name="isDark ? 'tabler:sun' : 'tabler:moon'" />
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  </ClientOnly>
</template>
