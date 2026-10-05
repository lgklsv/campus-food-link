import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { type RegisterValues, registerSchema } from "../model/register-schema"

export function RegisterPage() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  function onSubmit() {
    // Validate the prototype without storing credentials or creating a session.
    form.setError("root", {
      message: "Registration is not available yet.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "register-email-error" : undefined
                  }
                />
                {fieldState.invalid && (
                  <FieldError
                    id="register-email-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            rules={{ deps: "confirmPassword" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="h-11"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "register-password-error" : undefined
                  }
                />
                {fieldState.invalid && (
                  <FieldError
                    id="register-password-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-confirmPassword">
                  Confirm password
                </FieldLabel>
                <Input
                  {...field}
                  id="register-confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="h-11"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid
                      ? "register-confirmPassword-error"
                      : undefined
                  }
                />
                {fieldState.invalid && (
                  <FieldError
                    id="register-confirmPassword-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Button type="submit" size="lg" className="w-full">
            Create account
          </Button>
          {form.formState.errors.root && (
            <p
              role="status"
              className="text-center text-sm text-muted-foreground"
            >
              {form.formState.errors.root.message}
            </p>
          )}
        </FieldGroup>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}
