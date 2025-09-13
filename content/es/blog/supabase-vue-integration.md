---
title: "Integrar Supabase con Nuxt 4 y Vue 3"
description: "Aprende a integrar Supabase en proyectos Nuxt 3 y Vue 3 para manejar autenticación, base de datos y almacenamiento de manera sencilla."
slug: "integrar-supabase-nuxt-vue"
date: "2025-09-12"
cover:
  src: "/images/blog/supabase-vue-integration.webp"
  alt: "Integración de Supabase con Nuxt y Vue"
categories:
  - Supabase
  - Nuxt
  - Vue
language: "es"
published: true
readingTime: 6
---

Supabase es una alternativa open source a Firebase que permite añadir **autenticación, base de datos en tiempo real y almacenamiento** en tus proyectos de manera sencilla. En este post aprenderás cómo integrarlo en **Nuxt 4** y **Vue 3** para construir aplicaciones modernas y escalables.

### Configuración inicial

Primero, crea un proyecto en Supabase desde la [consola](https://supabase.com/dashboard) y copia tu **URL del proyecto** y la **API Key anónima**.

Instala el SDK de Supabase en tu proyecto:

```bash
pnpm add @supabase/supabase-js
```

---

### Integración con Vue 3

Crea un archivo `lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

En tu `.env`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

En un componente Vue:

```vue
<script setup lang="ts">
import { supabase } from "../lib/supabase";

const { data: posts, error } = await supabase.from("posts").select("*");
</script>
```

---

### Integración con Nuxt 3/4

En Nuxt cambia un poco la manera de integrarlo dado que disponemos de un módulo listo para usar y no debemos instalar ninguna libreria previamente, excepto que desees manejarlo manualmente mediante un plugin:

```bash
npx nuxi@latest module add supabase
```

Una vez instalado el módulo es necesario agregarlo a la lista de `modules` dentro de `nuxt.config.ts`

```nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
})
```

Agregue SUPABASE_URL y SUPABASE_KEY al .env:

```env
SUPABASE_URL="https://example.supabase.co"
SUPABASE_KEY="<your_key>"
```

---

### Autenticación básica - Ejemplo

Iniciar sesión:

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "usuario@ejemplo.com",
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

#### Un ejemplo básico de autenticación usando Vue

Autenticando al usuario (/routes/index.ts):

```ts
const router = createRouter({
    ...,
    {
        path: "/profile",
        name: "/profile",
        component: Profile
    }
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        const session = await authenticateUser();
        if (session) {
            next();
        } else {
            next({ name: "login" });
        }
    }
    else {
        next();
    }
})
```

#### Un ejemplo básico de autenticación usando Nuxt

Autenticando al usuario (/middleware/auth.ts):

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const session = await authenticateUser();

  if (!session) {
    return navigateTo("/");
  }
});
```

Y Dentro de la página que queramos usar ese plugin:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
});
</script>
```

---

### Conclusión

Integrar Supabase en tus proyectos de **Nuxt 4** y **Vue 3** permite manejar la autenticación, base de datos y almacenamiento de manera rápida y segura. Con los ejemplos vistos, puedes construir aplicaciones escalables y modernas sin depender de servicios propietarios, manteniendo control total sobre tus datos y usuarios. La combinación de Nuxt y Vue con Supabase facilita el desarrollo full-stack y reduce el tiempo de implementación significativamente.
