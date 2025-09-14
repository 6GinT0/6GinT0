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

const projectSchema = z.object({
  title: z.string().min(5, "El título es obligatorio y debe tener al menos 5 caracteres"),
  slug: z.string(),
  short_description: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  type: z.string(),
  under_construction: z.boolean().default(false),
  repository: z.string().url().optional(),
  demo: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  date: z.string().datetime().optional(),
  highlight: z.boolean().default(false)
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
    }),
    projects_en: defineCollection({
      type: "data",
      source: "en/projects/**.json",
      schema: projectSchema
    }),
    projects_es: defineCollection({
      type: "data",
      source: "es/projects/**.json",
      schema: projectSchema
    }),
    projects_br: defineCollection({
      type: "data",
      source: "br/projects/**.json",
      schema: projectSchema
    })
  }
});
