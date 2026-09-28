import { Badge } from "@/shared/ui/badge"

export function VendorCategories({ categories }: { categories: string[] }) {
  return (
    <section
      aria-label="Menu categories"
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
