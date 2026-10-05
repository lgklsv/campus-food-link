import { z } from "zod"
import { createMenuItemSchema } from "./create-menu-item-schema"

export const updateMenuItemSchema = z.strictObject({
  id: z.number().int().positive().max(2147483647),
  changes: z
    .strictObject({
      name: createMenuItemSchema.shape.name.optional(),
      description: createMenuItemSchema.shape.description.nullable().optional(),
      priceCents: z.number().int().min(0).max(2147483647).optional(),
      isAvailable: z.boolean().optional(),
    })
    .refine(
      (changes) => Object.values(changes).some((value) => value !== undefined),
      {
        message: "Choose at least one field to update.",
      }
    ),
})
