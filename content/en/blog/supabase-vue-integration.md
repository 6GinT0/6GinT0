---
title: "Integrate Supabase with Nuxt 4 and Vue 3"
description: "Learn how to integrate Supabase in Nuxt 3 and Vue 3 projects to handle authentication, database, and storage easily."
slug: "integrate-supabase-nuxt-vue"
date: "2025-09-12"
cover:
  src: "/images/blog/supabase-vue-integration.webp"
  alt: "Supabase integration with Nuxt and Vue"
categories:
  - Supabase
  - Nuxt
  - Vue
language: "en"
published: true
readingTime: 6
---

Supabase is an open-source alternative to Firebase that allows you to add **authentication, real-time database, and storage** to your projects easily. In this post, you will learn how to integrate it into **Nuxt 4** and **Vue 3** to build modern and scalable applications.

### Initial setup

First, create a project in Supabase through the [console](https://supabase.com/dashboard) and copy your **project URL** and **anon API Key**.

Install the Supabase SDK in your project:

```bash
pnpm add @supabase/supabase-js
```

---

### Vue 3 integration

Create the file `lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

In your `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

In a Vue component:

```vue
<script setup lang="ts">
import { supabase } from "../lib/supabase";

const { data: posts, error } = await supabase.from("posts").select("*");
</script>
```

---

### Nuxt 3/4 integration

In Nuxt, you can use the official module:

```bash
npx nuxi@latest module add supabase
```

Add the module to the `modules` array in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"]
});
```

Add SUPABASE_URL and SUPABASE_KEY to `.env`:

```env
SUPABASE_URL="https://example.supabase.co"
SUPABASE_KEY="<your_key>"
```

---

### Basic authentication - Example

Login:

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "123456"
});
```

`lib/authUser.ts`:

```ts
export const authenticateUser = () => {
  return new Promise((resolve, reject) => {
    const { data: listener, error } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        resolve(session);
      } else {
        resolve(null);
      }
    });

    if (error) {
      reject(error);
    }

    return listener;
  });
};
```

#### Basic authentication example with Vue

```ts
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    const session = await authenticateUser();
    if (session) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
```

#### Basic authentication example with Nuxt

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const session = await authenticateUser();

  if (!session) {
    return navigateTo("/");
  }
});
```

In the page where you want to use the middleware:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
});
</script>
```

---

### Conclusion

Integrating Supabase into your **Nuxt 4** and **Vue 3** projects allows you to handle authentication, database, and storage quickly and securely. With the examples provided, you can build scalable and modern applications without relying on proprietary services, maintaining full control over your data and users. Combining Nuxt and Vue with Supabase facilitates full-stack development and significantly reduces implementation time.
