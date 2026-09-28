import { Link } from "@tanstack/react-router"
import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"
import { MenuOfferingCard } from "@/entities/menu-offering/ui/menu-offering-card"

export function CatalogGrid() {
  return (
    <section aria-label="Catalog items">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
        {menuOfferings.map((offering, index) => (
          <li key={offering.id}>
            <Link
              to="/menu/$offeringId"
              params={{ offeringId: offering.id }}
              className="block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <MenuOfferingCard offering={offering} priority={index < 2} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
