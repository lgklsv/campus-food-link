export type CatalogItem = {
  id: string
  name: string
  priceCents: number
  image: string
}

export const catalogItems: CatalogItem[] = [
  {
    id: "teriyaki-chicken-bowl",
    name: "Teriyaki Chicken Bowl",
    priceCents: 899,
    image: "/catalog/teriyaki-chicken-bowl.webp",
  },
  {
    id: "classic-burger",
    name: "Classic Burger",
    priceCents: 850,
    image: "/catalog/classic-burger.webp",
  },
  {
    id: "chicken-wrap",
    name: "Chicken Wrap",
    priceCents: 725,
    image: "/catalog/chicken-wrap.webp",
  },
  {
    id: "french-fries",
    name: "French Fries",
    priceCents: 350,
    image: "/catalog/french-fries.webp",
  },
  {
    id: "grain-bowl",
    name: "Grain Bowl",
    priceCents: 925,
    image: "/catalog/grain-bowl.webp",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    priceCents: 425,
    image: "/catalog/cappuccino.webp",
  },
]
