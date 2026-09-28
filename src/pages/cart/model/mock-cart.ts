import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"

const mockOfferingIds = new Set(["teriyaki-chicken-bowl", "grain-bowl"])

export const mockCartItems = menuOfferings
  .filter((offering) => mockOfferingIds.has(offering.id))
  .map((offering) => ({ offering, quantity: 1 }))
