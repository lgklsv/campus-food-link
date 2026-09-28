import { catalogItems } from "@/entities/catalog-item/model/catalog-items"
import { CatalogItemCard } from "@/entities/catalog-item/ui/catalog-item-card"

export function CatalogItemList() {
  return (
    <section aria-label="Catalog items">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
        {catalogItems.map((item, index) => (
          <li key={item.id}>
            <CatalogItemCard item={item} priority={index < 2} />
          </li>
        ))}
      </ul>
    </section>
  )
}
