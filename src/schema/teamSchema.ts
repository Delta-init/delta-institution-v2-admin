
import { z } from "zod"

export const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any(),
  position: z.string().min(1, "Position is required"),
  showingPosition: z.number().min(1, "Showing position is required"),
  isActive: z.boolean().optional(),
})


export type TeamFormData = z.infer<typeof teamSchema>
