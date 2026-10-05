import { createServerFn } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import { insertMenuItem } from "@/server/repositories/menu-items.server"
import { findVendorByOwner } from "@/server/repositories/vendors.server"
import {
  deleteMenuItemImage,
  getMenuItemImageExtension,
  uploadMenuItemImage,
} from "@/server/storage/menu-item-images.server"
import {
  createMenuItemSchema,
  priceToCents,
} from "../model/create-menu-item-schema"

export const createMenuItem = createServerFn({ method: "POST" })
  .middleware([requireVendorMiddleware])
  .validator(async (formData: FormData) => {
    if (!(formData instanceof FormData)) {
      setResponseStatus(400)
      throw new Error("Expected form data.")
    }
    const parsed = createMenuItemSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description") ?? "",
      price: formData.get("price"),
      isAvailable:
        formData.get("isAvailable") === "true"
          ? true
          : formData.get("isAvailable") === "false"
            ? false
            : undefined,
      image: formData.get("image"),
    })
    if (!parsed.success) {
      setResponseStatus(400)
      throw new Error(parsed.error.issues[0]?.message ?? "Invalid menu item.")
    }
    const imageExtension = await getMenuItemImageExtension(parsed.data.image)
    if (!imageExtension) {
      setResponseStatus(400)
      throw new Error("Choose a valid JPEG, PNG or WebP image.")
    }
    return { ...parsed.data, imageExtension }
  })
  .handler(async ({ context, data }) => {
    const vendor = await findVendorByOwner(context.db, context.user.id)
    if (!vendor) {
      setResponseStatus(403)
      throw new Error("Your account is not assigned to an establishment.")
    }

    const imageKey = await uploadMenuItemImage(
      data.image,
      vendor.id,
      data.imageExtension
    )
    try {
      const item = await insertMenuItem(context.db, {
        vendorId: vendor.id,
        name: data.name,
        description: data.description || null,
        priceCents: priceToCents(data.price),
        isAvailable: data.isAvailable,
        imageKey,
      })
      return { id: item.id, vendorSlug: vendor.slug }
    } catch (error) {
      await deleteMenuItemImage(imageKey).catch(() => {
        console.error(
          "Failed to clean up an image after menu item creation failed.",
          imageKey
        )
      })
      throw error
    }
  })
