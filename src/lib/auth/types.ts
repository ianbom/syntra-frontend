export interface User {
  name: string
  email: string
  role: "admin" | "user"
}

export interface AuthToken {
  name: string
  email: string
  role: "admin" | "user"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  user?: User
}
