import { mockAccount } from "@/entities/account/model/mock-account"

export function AccountHighlights() {
  return (
    <section
      aria-label="Account overview"
      className="grid grid-cols-2 gap-3 sm:gap-4"
    >
      <div className="flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl bg-emerald-100 p-4 text-emerald-950 sm:min-h-56 sm:p-6 dark:bg-emerald-950 dark:text-emerald-50">
        <img
          src="/account/meal-plan.webp"
          alt=""
          width="80"
          height="80"
          fetchPriority="high"
          className="size-16 object-contain sm:size-20"
        />
        <div>
          <p className="text-sm font-medium leading-tight sm:text-base">
            Meal Plan Balance
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">
            {mockAccount.mealPlanBalance}
          </p>
        </div>
      </div>
      <div className="flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 p-4 text-white sm:min-h-56 sm:p-6 dark:bg-zinc-800">
        <img
          src="/account/order-history.webp"
          alt=""
          width="80"
          height="80"
          fetchPriority="high"
          className="size-16 object-contain sm:size-20"
        />
        <div>
          <p className="text-sm font-medium leading-tight sm:text-base">
            Orders History
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">
            {mockAccount.orderCount}
          </p>
        </div>
      </div>
    </section>
  )
}
