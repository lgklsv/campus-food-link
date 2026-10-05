import { createFileRoute } from "@tanstack/react-router"
import { RegisterPage } from "@/pages/register/ui/register-page"

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
})
