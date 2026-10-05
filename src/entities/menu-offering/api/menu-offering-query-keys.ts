const all = ["menu-items"] as const

export const menuOfferingQueryKeys = {
  all,
  lists: [...all, "list"] as const,
  catalog: [...all, "list", "catalog"] as const,
  managed: [...all, "list", "managed"] as const,
  details: [...all, "detail"] as const,
  detail: (id: number) => [...menuOfferingQueryKeys.details, id] as const,
}
