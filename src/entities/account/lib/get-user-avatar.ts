export function getUserAvatar(user: { id: string; image?: string | null }) {
  return (
    user.image ||
    `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(user.id)}`
  )
}
