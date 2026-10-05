import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useRouter } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { authClient } from "@/entities/account/api/auth-client"
import { getRoleHome } from "@/entities/account/model/role"
import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { type RegisterValues, registerSchema } from "../model/register-schema"

export function RegisterPage() {
  const navigate = useNavigate()
  const router = useRouter()
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterValues) {
    try {
      const { data, error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
      })
      if (error) {
        form.setError("root", { message: error.message || "Please try again." })
        return
      }
      await router.invalidate()
      await navigate({ to: getRoleHome(data.user.role), replace: true })
    } catch {
      form.setError("root", { message: "Unable to connect. Please try again." })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="min-w-0">
          <FieldGroup className="gap-5">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-first-name">
                    First name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "register-first-name-error"
                        : undefined
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id="register-first-name-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-last-name">
                    Last name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "register-last-name-error"
                        : undefined
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id="register-last-name-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
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
              {form.formState.isSubmitting
                ? "Creating account…"
                : "Create account"}
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
