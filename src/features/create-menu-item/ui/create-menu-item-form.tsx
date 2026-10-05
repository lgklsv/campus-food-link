import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { LoaderCircle } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import {
  type CreateMenuItemValues,
  createMenuItemSchema,
  priceToCents,
} from "@/entities/menu-offering/model/create-menu-item-schema"
import { MenuItemImageInput } from "@/entities/menu-offering/ui/menu-item-image-input"
import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { Switch } from "@/shared/ui/switch"
import { Textarea } from "@/shared/ui/textarea"
import { useCreateMenuItem } from "../api/use-create-menu-item"

export function CreateMenuItemForm() {
  const navigate = useNavigate()
  const mutation = useCreateMenuItem()
  const form = useForm<CreateMenuItemValues>({
    resolver: zodResolver(createMenuItemSchema),
    defaultValues: { name: "", description: "", price: "", isAvailable: true },
  })
  const pending = mutation.isPending || form.formState.isSubmitting

  async function onSubmit(values: CreateMenuItemValues) {
    form.clearErrors("root")
    const data = new FormData()
    data.set("name", values.name)
    data.set("description", values.description)
    data.set("price", values.price)
    data.set("isAvailable", String(values.isAvailable))
    data.set("image", values.image)
    try {
      await mutation.mutateAsync(data)
      await navigate({ to: "/vendor/menu" })
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create the menu item. Please try again.",
      })
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        disabled={pending}
        className="grid min-w-0 gap-6 md:grid-cols-2 md:gap-8"
      >
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <MenuItemImageInput
                value={field.value}
                onChange={(file) => {
                  field.onChange(file)
                  if (file) {
                    void form.trigger("image")
                  } else {
                    form.clearErrors("image")
                  }
                }}
                onBlur={field.onBlur}
                inputRef={field.ref}
                disabled={pending}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError
                  id="menu-item-image-error"
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />
        <FieldGroup className="gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-item-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="menu-item-name"
                  placeholder="Menu item name"
                  className="h-11"
                  maxLength={120}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "menu-item-name-error" : undefined
                  }
                />
                {fieldState.invalid ? (
                  <FieldError
                    id="menu-item-name-error"
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-item-description">
                  Description{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="menu-item-description"
                  placeholder="Ingredients or a short description"
                  className="min-h-28"
                  maxLength={2000}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid
                      ? "menu-item-description-error"
                      : undefined
                  }
                />
                {fieldState.invalid ? (
                  <FieldError
                    id="menu-item-description-error"
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="menu-item-price">Price</FieldLabel>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground"
                  >
                    $
                  </span>
                  <Input
                    {...field}
                    id="menu-item-price"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    className="h-11 pl-7 tabular-nums"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid ? "menu-item-price-error" : undefined
                    }
                    onBlur={() => {
                      field.onBlur()
                      const parsed = createMenuItemSchema.shape.price.safeParse(
                        field.value
                      )
                      if (parsed.success)
                        field.onChange(
                          (priceToCents(parsed.data) / 100).toFixed(2)
                        )
                    }}
                  />
                </div>
                {fieldState.invalid ? (
                  <FieldError
                    id="menu-item-price-error"
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="isAvailable"
            control={form.control}
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="rounded-2xl bg-secondary px-4 py-4"
              >
                <FieldLabel htmlFor="menu-item-available" className="flex-1">
                  Available in Menu
                </FieldLabel>
                <Switch
                  id="menu-item-available"
                  name={field.name}
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={pending}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </fieldset>
      {form.formState.errors.root ? (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      ) : null}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:static md:mt-8 md:grid md:grid-cols-2 md:gap-8 md:border-0 md:p-0">
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="mx-auto flex h-11 w-full max-w-md md:col-start-2 md:mx-0 md:max-w-none"
        >
          {pending ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : null}
          {pending ? "Creating…" : "Create Menu Item"}
        </Button>
      </div>
    </form>
  )
}
