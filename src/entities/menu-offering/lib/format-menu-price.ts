const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export function formatMenuPrice(priceCents: number) {
  return priceFormatter.format(priceCents / 100)
}
