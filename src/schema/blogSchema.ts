
import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(3, "Description is required"),
  content: z.string().min(2, "Content is required"),
  image: z.any(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
})


export type BlogPostFormData = z.infer<typeof blogPostSchema>
