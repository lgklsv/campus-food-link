import { env } from "cloudflare:workers"

export function getImageUrl(imageKey: string) {
  return `${env.IMAGE_BASE_URL.replace(/\/$/, "")}/${imageKey}`
}
