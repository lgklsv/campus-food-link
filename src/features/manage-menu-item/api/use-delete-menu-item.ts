import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMenuItem } from "@/entities/menu-offering/api/delete-menu-item"
import { menuOfferingQueryKeys } from "@/entities/menu-offering/api/menu-offering-query-keys"
import { vendorQueryKeys } from "@/entities/vendor/api/vendor-query-keys"

export function useDeleteMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteMenuItem({ data: { id } }),
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
