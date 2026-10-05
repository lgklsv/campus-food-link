import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "@/shared/lib/utils"

type AvatarProps = {
  className?: string
  name: string
  src?: string
}

export function Avatar({ className, name, src }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xs font-semibold text-primary",
        className
      )}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback>
        {name
          .split(" ")
          .map((part) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
