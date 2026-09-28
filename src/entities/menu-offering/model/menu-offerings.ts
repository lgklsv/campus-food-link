export type MenuOffering = {
  id: string
  name: string
  priceCents: number
  image: string
  description: string
  vendorId: string
  portionGrams?: number
}

export const menuOfferings: MenuOffering[] = [
  {
    id: "teriyaki-chicken-bowl",
    name: "Teriyaki Chicken Bowl",
    priceCents: 899,
    image: "/catalog/teriyaki-chicken-bowl.webp",
    description:
      "Grilled chicken, rice, broccoli, carrots, and teriyaki sauce.",
    vendorId: "green-bowl",
    portionGrams: 300,
  },
  {
    id: "classic-burger",
    name: "Classic Burger",
    priceCents: 850,
    image: "/catalog/classic-burger.webp",
    description: "Beef burger with lettuce and tomato.",
    vendorId: "campus-grill",
  },
  {
    id: "chicken-wrap",
    name: "Chicken Wrap",
    priceCents: 725,
    image: "/catalog/chicken-wrap.webp",
    description: "Grilled chicken wrap with vegetables.",
    vendorId: "campus-grill",
  },
  {
    id: "french-fries",
    name: "French Fries",
    priceCents: 350,
    image: "/catalog/french-fries.webp",
    description: "Crispy seasoned fries.",
    vendorId: "campus-grill",
  },
  {
    id: "grain-bowl",
    name: "Grain Bowl",
    priceCents: 925,
    image: "/catalog/grain-bowl.webp",
    description: "Rice, roasted vegetables, and avocado.",
    vendorId: "green-bowl",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    priceCents: 425,
    image: "/catalog/cappuccino.webp",
    description: "Espresso with steamed milk.",
    vendorId: "coffee-corner",
  },
]
