import { Link } from "@tanstack/react-router"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import { MenuOfferingCard } from "@/entities/menu-offering/ui/menu-offering-card"

export function MenuOfferingGrid({
  offerings,
  label,
}: {
  offerings: MenuOffering[]
  label: string
}) {
  return (
    <section aria-label={label}>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
        {offerings.map((offering, index) => (
          <li key={offering.id}>
            <Link
              to="/menu/$offeringId"
              params={{ offeringId: offering.id }}
              className="block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <MenuOfferingCard offering={offering} priority={index < 4} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
