const all = ["vendors"] as const

export const vendorQueryKeys = {
  all,
  details: [...all, "detail"] as const,
  detail: (slug: string) => [...vendorQueryKeys.details, slug] as const,
}
