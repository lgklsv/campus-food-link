import { Search } from "lucide-react"
import { Input } from "@/shared/ui/input"

export function CatalogSearch() {
  return (
    <div className="relative">
      <label htmlFor="catalog-search" className="sr-only">
        Search...
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id="catalog-search"
        type="search"
        placeholder="Search..."
        className="h-10 w-full rounded-xl border-transparent bg-secondary pl-10 text-base shadow-none md:text-base"
      />
    </div>
  )
}
