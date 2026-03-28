import Cookies from "js-cookie"
import type { AuthToken, LoginCredentials, LoginResponse, User } from "./types"

// Dummy users database
const USERS = [
  {
    email: "admin@syntra.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    email: "user@syntra.com",
    password: "user123",
    name: "Regular User",
    role: "user" as const,
  },
]

const AUTH_TOKEN_KEY = "auth_token"

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    )

    if (!user) {
      return {
        success: false,
        message: "Email atau password salah",
      }
    }

    // Create token (in real app, this would be JWT from backend)
    const token: AuthToken = {
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // Save to cookie (expires in 7 days)
    Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(token), { expires: 7 })

    return {
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  },

  logout: () => {
    Cookies.remove(AUTH_TOKEN_KEY)
  },

  getCurrentUser: (): User | null => {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY)
      if (!token) return null

      const authToken: AuthToken = JSON.parse(token)
      return {
        name: authToken.name,
        email: authToken.email,
        role: authToken.role,
      }
    } catch {
      return null
    }
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(AUTH_TOKEN_KEY)
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser()
    return user?.role === "admin"
  },

  isUser: (): boolean => {
    const user = authService.getCurrentUser()
    return user?.role === "user"
  },
}
