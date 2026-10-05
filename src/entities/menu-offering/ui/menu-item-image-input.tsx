import { cn } from "cn"
import { ImagePlus, X } from "lucide-react"
import { type Ref, useEffect, useState } from "react"
import {
  createMenuItemSchema,
  menuItemImageTypes,
} from "@/entities/menu-offering/model/create-menu-item-schema"
import { Button } from "@/shared/ui/button"

export function MenuItemImageInput({
  value,
  imageUrl,
  onChange,
  onBlur,
  inputRef,
  disabled,
  invalid,
}: {
  value: File | undefined
  imageUrl?: string
  onChange: (file: File | undefined) => void
  onBlur: () => void
  inputRef: Ref<HTMLInputElement>
  disabled: boolean
  invalid: boolean
}) {
  const [preview, setPreview] = useState<string>()
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!value || !createMenuItemSchema.shape.image.safeParse(value).success) {
      setPreview(undefined)
      return
    }
    const url = URL.createObjectURL(value)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  return (
    <div className="relative">
      <label
        htmlFor="menu-item-image"
        className={cn(
          "relative flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-border bg-secondary transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 md:aspect-square md:h-auto",
          dragging && "border-primary bg-primary/5",
          invalid && "border-destructive",
          disabled && "cursor-default opacity-60"
        )}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          if (!disabled) {
            const file = event.dataTransfer.files[0]
            if (file) onChange(file)
          }
        }}
      >
        {preview || imageUrl ? (
          <img
            src={preview || imageUrl}
            alt="Menu item preview"
            className="size-full object-contain p-4"
          />
        ) : (
          <span className="flex flex-col items-center gap-2 px-6 text-center">
            <ImagePlus
              aria-hidden="true"
              className="mb-1 size-8 text-muted-foreground"
            />
            <span className="font-medium">Upload Image</span>
            <span className="text-sm text-muted-foreground">
              Drop an image or tap to choose
            </span>
            <span className="text-xs text-muted-foreground">
              JPEG, PNG or WebP · Up to 5 MB
            </span>
          </span>
        )}
        <input
          ref={inputRef}
          id="menu-item-image"
          name="image"
          type="file"
          accept={menuItemImageTypes.join(",")}
          disabled={disabled}
          aria-label={
            value || imageUrl
              ? "Change menu item image"
              : "Upload menu item image"
          }
          aria-invalid={invalid}
          aria-describedby={invalid ? "menu-item-image-error" : undefined}
          className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-default"
          onBlur={onBlur}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onChange(file)
            event.target.value = ""
          }}
        />
      </label>
      {value ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          aria-label="Remove image"
          className="absolute right-3 top-3"
          onClick={() => onChange(undefined)}
        >
          <X aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}
