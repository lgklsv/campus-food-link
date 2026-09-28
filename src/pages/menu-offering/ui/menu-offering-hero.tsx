import { Link } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import { buttonVariants } from "@/shared/ui/button"

export function MenuOfferingHero({ offering }: { offering: MenuOffering }) {
  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-b-3xl bg-secondary md:rounded-3xl">
      <img
        src={offering.image}
        alt=""
        width={640}
        height={640}
        className="h-full w-full object-contain p-5 sm:p-8"
      />
      <Link
        to="/"
        aria-label="Back to catalog"
        className={buttonVariants({
          variant: "outline",
          size: "icon-lg",
          className: "absolute left-4 top-4 bg-background/90",
        })}
      >
        <ChevronLeft aria-hidden="true" />
      </Link>
    </div>
  )
}
