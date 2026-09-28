import { Badge } from "@/shared/ui/badge"

const categories = ["For you", "Combo", "Pizza", "Snacks", "Drinks", "Desserts"]

export function CatalogCategories() {
  return (
    <section
      aria-label="Food categories"
      className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
    >
      {categories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="h-7 px-2.5 text-xs"
        >
          {category}
        </Badge>
      ))}
    </section>
  )
}
