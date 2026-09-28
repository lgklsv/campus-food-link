export type Vendor = {
  id: string
  name: string
  image: string
  estimatedMinutes: string
  categories: string[]
}

export const vendors: Vendor[] = [
  {
    id: "green-bowl",
    name: "Green Bowl",
    image: "/vendors/green-bowl.webp",
    estimatedMinutes: "10–15 min",
    categories: ["All", "Bowls"],
  },
  {
    id: "campus-grill",
    name: "Campus Grill",
    image: "/vendors/campus-grill.webp",
    estimatedMinutes: "10–15 min",
    categories: ["All", "Burgers", "Wraps", "Sides"],
  },
  {
    id: "coffee-corner",
    name: "Coffee Corner",
    image: "/vendors/coffee-corner.webp",
    estimatedMinutes: "5–10 min",
    categories: ["All", "Coffee"],
  },
]
