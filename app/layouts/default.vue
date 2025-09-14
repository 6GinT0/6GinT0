<script setup lang="ts">
const head = useLocaleHead();

useHead({
  titleTemplate: "%s | Ulises Saucedo"
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" class="scroll-smooth">
    <Head>
      <template v-for="link in head.link" :key="link.key">
        <Link :id="link.key" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.key">
        <Meta :id="meta.key" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <Header />
      <slot />
    </Body>
  </Html>
</template>
