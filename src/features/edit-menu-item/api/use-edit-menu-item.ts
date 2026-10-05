import { useMutation, useQueryClient } from "@tanstack/react-query"
import { menuOfferingQueryKeys } from "@/entities/menu-offering/api/menu-offering-query-keys"
import { updateMenuItem } from "@/entities/menu-offering/api/update-menu-item"
import { vendorQueryKeys } from "@/entities/vendor/api/vendor-query-keys"

export function useEditMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => updateMenuItem({ data }),
    onSuccess: async ({ id, vendorSlug }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: menuOfferingQueryKeys.lists,
        }),
        queryClient.invalidateQueries({
          queryKey: menuOfferingQueryKeys.detail(id),
        }),
        queryClient.invalidateQueries({
          queryKey: vendorQueryKeys.detail(vendorSlug),
        }),
      ])
    },
  })
}
