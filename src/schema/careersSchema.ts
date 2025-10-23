
import { z } from "zod"

export const careersSchema = z.object({
  title: z.string().min(1, "Title is required"),
  position: z.string().min(1, "Position is required"),
  description: z.string().min(3, "Description is required"),
  document: z.any(),
  location: z.string().min(1, "Location is required"),
  requirements: z.array(z.string()).min(1, "Requirements are required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  isActive: z.boolean().optional(),
})


export type CareersFormData = z.infer<typeof careersSchema>
