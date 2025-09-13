---
title: "Integrar Supabase com Nuxt 4 e Vue 3"
description: "Aprenda a integrar o Supabase em projetos Nuxt 3 e Vue 3 para gerenciar autenticação, banco de dados e armazenamento de forma simples."
slug: "integrar-supabase-nuxt-vue"
date: "2025-09-12"
cover:
  src: "/images/blog/supabase-vue-integration.webp"
  alt: "Integração do Supabase com Nuxt e Vue"
categories:
  - Supabase
  - Nuxt
  - Vue
language: "br"
published: true
readingTime: 6
---

Supabase é uma alternativa open source ao Firebase que permite adicionar **autenticação, banco de dados em tempo real e armazenamento** em seus projetos de forma simples. Neste post você aprenderá como integrá-lo no **Nuxt 4** e **Vue 3** para construir aplicações modernas e escaláveis.

### Configuração inicial

Primeiro, crie um projeto no Supabase através do [console](https://supabase.com/dashboard) e copie sua **URL do projeto** e a **API Key anônima**.

Instale o SDK do Supabase no seu projeto:

```bash
pnpm add @supabase/supabase-js
```

---

### Integração com Vue 3

Crie o arquivo `lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

No seu `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

Em um componente Vue:

```vue
<script setup lang="ts">
import { supabase } from "../lib/supabase";

const { data: posts, error } = await supabase.from("posts").select("*");
</script>
```

---

### Integração com Nuxt 3/4

No Nuxt, você pode usar o módulo oficial:

```bash
npx nuxi@latest module add supabase
```

Adicione o módulo na lista de `modules` dentro de `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"]
});
```

Adicione SUPABASE_URL e SUPABASE_KEY no `.env`:

```env
SUPABASE_URL="https://example.supabase.co"
SUPABASE_KEY="<sua_chave>"
```

---

### Autenticação básica - Exemplo

Fazendo login:

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "usuario@exemplo.com",
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

#### Exemplo básico de autenticação com Vue

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

#### Exemplo básico de autenticação com Nuxt

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const session = await authenticateUser();

  if (!session) {
    return navigateTo("/");
  }
});
```

Dentro da página que deseja usar o middleware:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
});
</script>
```

---

### Conclusão

Integrar o Supabase em seus projetos de **Nuxt 4** e **Vue 3** permite gerenciar autenticação, banco de dados e armazenamento de forma rápida e segura. Com os exemplos apresentados, você pode construir aplicações escaláveis e modernas sem depender de serviços proprietários, mantendo total controle sobre seus dados e usuários. A combinação de Nuxt e Vue com Supabase facilita o desenvolvimento full-stack e reduz significativamente o tempo de implementação.
