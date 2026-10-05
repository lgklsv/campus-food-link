import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { authClient } from "@/entities/account/api/auth-client"
import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { type LoginValues, loginSchema } from "../model/login-schema"

export function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })
      if (error) {
        form.setError("root", { message: error.message || "Please try again." })
        return
      }
      await navigate({ to: "/account" })
    } catch {
      form.setError("root", { message: "Unable to connect. Please try again." })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="min-w-0">
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
              {form.formState.isSubmitting ? "Logging in…" : "Log in"}
            </Button>
            {form.formState.errors.root && (
              <p role="alert" className="text-center text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
          </FieldGroup>
        </fieldset>
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
