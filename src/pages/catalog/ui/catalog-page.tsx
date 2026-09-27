import { CatalogHeader } from "./catalog-header"

export function CatalogPage() {
  return (
    <>
      <CatalogHeader />
      <h1 className="sr-only md:hidden">Catalog</h1>
      <div className="hidden md:block">
        <h1 className="text-3xl font-semibold tracking-tight">Catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Explore food available on campus.
        </p>
      </div>
    </>
  )
}
