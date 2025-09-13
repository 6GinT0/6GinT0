import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const blogSchema = z.object({
  title: z.string().min(5, "El título es obligatorio y debe tener al menos 5 caracteres"),
  description: z.string().min(20, "La descripción debe ser más descriptiva"),
  slug: z.string(),
  date: z.string().datetime().optional(),
  cover: z
    .object({
      src: z.string().url(),
      alt: z.string()
    })
    .optional(),
  categories: z.array(z.string()).default([]),
  language: z.enum(["en", "es", "br"]),
  published: z.boolean().default(true),
  readingTime: z.number().optional()
});

export default defineContentConfig({
  collections: {
    blog_en: defineCollection({
      type: "page",
      source: "en/blog/**.md",
      schema: blogSchema
    }),
    blog_es: defineCollection({
      type: "page",
      source: "es/blog/**.md",
      schema: blogSchema
    }),
    blog_br: defineCollection({
      type: "page",
      source: "br/blog/**.md",
      schema: blogSchema
    })
  }
});
