import { Link } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useManagedMenuOfferings } from "@/entities/menu-offering/api/use-managed-menu-offerings"
import { buttonVariants } from "@/shared/ui/button"
import { VendorMenuItemCard } from "./vendor-menu-item-card"

export function VendorMenuPage() {
  const { data: offerings } = useManagedMenuOfferings()

  return (
    <>
      <header className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Menu</h1>
        <Link to="/vendor/menu/new" className={buttonVariants()}>
          <Plus aria-hidden="true" />
          Add Menu Item
        </Link>
      </header>
      {offerings.length ? (
        <section aria-label="Your menu items">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {offerings.map((offering, index) => (
              <li key={offering.id}>
                <VendorMenuItemCard offering={offering} priority={index < 4} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-muted-foreground">No menu items yet.</p>
      )}
    </>
  )
}
