import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Enter a valid email address.")),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .max(128, "Use no more than 128 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export type RegisterValues = z.infer<typeof registerSchema>
