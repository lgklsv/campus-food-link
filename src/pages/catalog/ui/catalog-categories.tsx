import { useState } from "react"
import { Button } from "@/shared/ui/button"

const categories = ["For you", "Combo", "Pizza", "Snacks", "Drinks", "Desserts"]

export function CatalogCategories() {
  const [selectedCategory, setSelectedCategory] = useState("For you")

  return (
    <section
      aria-label="Food categories"
      className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
    >
      {categories.map((category) => (
        <Button
          key={category}
          type="button"
          variant="secondary"
          size="xs"
          aria-pressed={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </section>
  )
}
