import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, 'Password must be at least 8 characters long')
})

export type loginSchemaType = z.infer<typeof loginSchema>
export default loginSchema;
    