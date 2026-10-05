import type { z } from "zod"
import { createMenuItemSchema } from "./create-menu-item-schema"

export const editMenuItemSchema = createMenuItemSchema.extend({
  image: createMenuItemSchema.shape.image.optional(),
})

export type EditMenuItemValues = z.infer<typeof editMenuItemSchema>
