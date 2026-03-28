// User type definitions
export interface User {
  id: string
  nama: string
  nrp: string
  email: string
  createdAt: string
  status: "active" | "inactive"
}

export interface UserStatistics {
  total: number
  active: number
  inactive: number
  newThisMonth: number
}
