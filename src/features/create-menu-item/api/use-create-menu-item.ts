import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMenuItem } from "@/entities/menu-offering/api/create-menu-item"
import { menuOfferingQueryKeys } from "@/entities/menu-offering/api/menu-offering-query-keys"
import { vendorQueryKeys } from "@/entities/vendor/api/vendor-query-keys"

export function useCreateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => createMenuItem({ data }),
    onSuccess: async ({ vendorSlug }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: menuOfferingQueryKeys.lists,
        }),
        queryClient.invalidateQueries({
          queryKey: vendorQueryKeys.detail(vendorSlug),
        }),
      ])
    },
  })
}
