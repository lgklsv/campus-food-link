import { z } from "zod"

export const menuItemImageTypes = ["image/jpeg", "image/png", "image/webp"]
export const menuItemImageMaxBytes = 5 * 1024 * 1024

export const createMenuItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter a name.")
    .max(120, "Use up to 120 characters."),
  description: z.string().trim().max(2000, "Use up to 2,000 characters."),
  price: z
    .string()
    .trim()
    .regex(
      /^\d{1,7}(?:[.,]\d{1,2})?$/,
      "Enter a price with up to two decimal places."
    ),
  isAvailable: z.boolean(),
  image: z
    .file({ error: "Choose an image." })
    .min(1, "Choose an image.")
    .max(menuItemImageMaxBytes, "Choose an image up to 5 MB.")
    .mime(menuItemImageTypes, "Choose a JPEG, PNG or WebP image."),
})

export type CreateMenuItemValues = z.infer<typeof createMenuItemSchema>

export function priceToCents(price: string) {
  const [dollars, cents = ""] = price.replace(",", ".").split(".")
  return Number(dollars) * 100 + Number(cents.padEnd(2, "0"))
}
