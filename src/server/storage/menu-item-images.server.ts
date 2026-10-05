import { env } from "cloudflare:workers"
import { fileTypeFromBlob } from "file-type"

export async function getMenuItemImageExtension(
  file: File
): Promise<"jpg" | "png" | "webp" | null> {
  const detected = await fileTypeFromBlob(file).catch(() => undefined)
  if (!detected || detected.mime !== file.type) return null
  return detected.ext === "jpg" ||
    detected.ext === "png" ||
    detected.ext === "webp"
    ? detected.ext
    : null
}

export async function uploadMenuItemImage(
  file: File,
  vendorId: number,
  extension: "jpg" | "png" | "webp"
) {
  const imageKey = `menu-items/${vendorId}/${crypto.randomUUID()}.${extension}`
  await env.IMAGES.put(imageKey, file, {
    httpMetadata: {
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
    },
  })
  return imageKey
}

export function deleteMenuItemImage(imageKey: string) {
  return env.IMAGES.delete(imageKey)
}
