import { Navigate } from "react-router-dom"
import { authService } from "@/lib/auth"

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const isAuthenticated = authService.isAuthenticated()
  const isAdmin = authService.isAdmin()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
