import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { type LoginValues, loginSchema } from "../model/login-schema"

export function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit() {
    // Validate the prototype without storing credentials or creating a session.
    form.setError("root", {
      message: "Sign-in is not available yet.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "login-email-error" : undefined
                  }
                />
                {fieldState.invalid && (
                  <FieldError
                    id="login-email-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "login-password-error" : undefined
                  }
                />
                {fieldState.invalid && (
                  <FieldError
                    id="login-password-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Button type="submit" size="lg" className="w-full">
            Log in
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
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
