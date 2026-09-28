import {
  Link,
  type LinkProps,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router"
import { cn } from "cn"
import { ChevronLeft } from "lucide-react"
import type { MouseEvent } from "react"
import { buttonVariants } from "@/shared/ui/button"

export function BackButton({
  fallbackTo,
  className,
  label = "Go back",
}: {
  fallbackTo: NonNullable<LinkProps["to"]>
  className?: string
  label?: string
}) {
  const canGoBack = useCanGoBack()
  const router = useRouter()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      !canGoBack ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    router.history.back()
  }

  return (
    <Link
      to={fallbackTo}
      aria-label={label}
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-lg" }),
        className
      )}
    >
      <ChevronLeft aria-hidden="true" />
    </Link>
  )
}
