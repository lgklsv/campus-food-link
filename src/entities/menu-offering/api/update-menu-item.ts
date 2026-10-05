import { createServerFn } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import {
  findMenuItemById,
  updateMenuItem as updateMenuItemRecord,
} from "@/server/repositories/menu-items.server"
import { findVendorByOwner } from "@/server/repositories/vendors.server"
import {
  deleteMenuItemImage,
  getMenuItemImageExtension,
  uploadMenuItemImage,
} from "@/server/storage/menu-item-images.server"
import { priceToCents } from "../model/create-menu-item-schema"
import { editMenuItemSchema } from "../model/edit-menu-item-schema"
import { updateMenuItemSchema } from "../model/update-menu-item-schema"

export const updateMenuItem = createServerFn({ method: "POST" })
  .middleware([requireVendorMiddleware])
  .validator(async (input: FormData) => {
    if (!(input instanceof FormData)) {
      setResponseStatus(400)
      throw new Error("Expected form data.")
    }
    let data: unknown
    let image: File | undefined
    let imageExtension: "jpg" | "png" | "webp" | null = null
    if (input.has("changes")) {
      try {
        data = {
          id: Number(input.get("id")),
          changes: JSON.parse(String(input.get("changes"))),
        }
      } catch {
        setResponseStatus(400)
        throw new Error("Invalid menu item update.")
      }
    } else {
      const form = editMenuItemSchema.safeParse({
        name: input.get("name"),
        description: input.get("description") ?? "",
        price: input.get("price"),
        isAvailable:
          input.get("isAvailable") === "true"
            ? true
            : input.get("isAvailable") === "false"
              ? false
              : undefined,
        image: input.get("image") ?? undefined,
      })
      if (!form.success) {
        setResponseStatus(400)
        throw new Error(
          form.error.issues[0]?.message ?? "Invalid menu item update."
        )
      }
      data = {
        id: Number(input.get("id")),
        changes: {
          name: form.data.name,
          description: form.data.description,
          priceCents: priceToCents(form.data.price),
          isAvailable: form.data.isAvailable,
        },
      }
      image = form.data.image
      if (image) {
        imageExtension = await getMenuItemImageExtension(image)
        if (!imageExtension) {
          setResponseStatus(400)
          throw new Error("Choose a valid JPEG, PNG or WebP image.")
        }
      }
    }
    const parsed = updateMenuItemSchema.safeParse(data)
    if (!parsed.success) {
      setResponseStatus(400)
      throw new Error(
        parsed.error.issues[0]?.message ?? "Invalid menu item update."
      )
    }
    return { ...parsed.data, image, imageExtension }
  })
  .handler(async ({ context, data }) => {
    const vendor = await findVendorByOwner(context.db, context.user.id)
    if (!vendor) {
      setResponseStatus(403)
      throw new Error("Your account is not assigned to an establishment.")
    }
    const existing = await findMenuItemById(context.db, data.id, vendor.id)
    if (!existing) {
      setResponseStatus(404)
      throw new Error("Menu item not found.")
    }
    const changes: Parameters<typeof updateMenuItemRecord>[3] = {
      ...data.changes,
    }
    if (changes.description === "") changes.description = null
    const imageKey =
      data.image && data.imageExtension
        ? await uploadMenuItemImage(data.image, vendor.id, data.imageExtension)
        : undefined
    if (imageKey) changes.imageKey = imageKey
    try {
      const item = await updateMenuItemRecord(
        context.db,
        data.id,
        vendor.id,
        changes
      )
      if (!item) {
        setResponseStatus(404)
        throw new Error("Menu item not found.")
      }
      return { id: item.id, vendorSlug: vendor.slug }
    } catch (error) {
      if (imageKey) {
        await deleteMenuItemImage(imageKey).catch(() => {
          console.error(
            "Failed to clean up an image after menu item update failed.",
            imageKey
          )
        })
      }
      throw error
    }
  })
