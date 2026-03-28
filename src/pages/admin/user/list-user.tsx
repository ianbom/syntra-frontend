import { useCallback } from "react"
import { IconUserPlus } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { UserStatistics, UserTable } from "./components"
import type { User } from "./types"

// Mock data - Replace with API call
const mockUsers: User[] = [
  {
    id: "1",
    nama: "Ahmad Fauzi",
    nrp: "2024001",
    email: "ahmad.fauzi@example.com",
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    nama: "Siti Rahayu",
    nrp: "2024002",
    email: "siti.rahayu@example.com",
    createdAt: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    nama: "Budi Santoso",
    nrp: "2024003",
    email: "budi.santoso@example.com",
    createdAt: "2024-03-10",
    status: "inactive",
  },
  {
    id: "4",
    nama: "Lisa Wulandari",
    nrp: "2024004",
    email: "lisa.wulandari@example.com",
    createdAt: "2024-03-15",
    status: "active",
  },
  {
    id: "5",
    nama: "Andi Wijaya",
    nrp: "2024005",
    email: "andi.wijaya@example.com",
    createdAt: "2024-03-18",
    status: "active",
  },
  {
    id: "6",
    nama: "Maya Putri",
    nrp: "2024006",
    email: "maya.putri@example.com",
    createdAt: "2024-03-20",
    status: "inactive",
  },
  {
    id: "7",
    nama: "Rudi Hartono",
    nrp: "2024007",
    email: "rudi.hartono@example.com",
    createdAt: "2024-03-22",
    status: "active",
  },
  {
    id: "8",
    nama: "Dian Sari",
    nrp: "2024008",
    email: "dian.sari@example.com",
    createdAt: "2024-03-25",
    status: "active",
  },
  {
    id: "9",
    nama: "Eko Prasetyo",
    nrp: "2024009",
    email: "eko.prasetyo@example.com",
    createdAt: "2024-03-26",
    status: "active",
  },
  {
    id: "10",
    nama: "Fitri Handayani",
    nrp: "2024010",
    email: "fitri.handayani@example.com",
    createdAt: "2024-03-27",
    status: "active",
  },
  {
    id: "11",
    nama: "Galih Purnama",
    nrp: "2024011",
    email: "galih.purnama@example.com",
    createdAt: "2024-03-27",
    status: "inactive",
  },
  {
    id: "12",
    nama: "Hana Permata",
    nrp: "2024012",
    email: "hana.permata@example.com",
    createdAt: "2024-03-28",
    status: "active",
  },
]

const UserListPage = () => {
  // Action handlers
  const handleView = useCallback((user: User) => {
    console.log("View user:", user.id)
    // Navigate to user detail page
  }, [])

  const handleEdit = useCallback((user: User) => {
    console.log("Edit user:", user.id)
    // Navigate to edit page or open modal
  }, [])

  const handleDelete = useCallback((user: User) => {
    console.log("Delete user:", user.id)
    // Show confirmation dialog
  }, [])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-4 md:py-6">
              {/* Page Header */}
              <div className="flex items-center justify-between px-4 lg:px-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Daftar User
                  </h1>
                  <p className="text-muted-foreground">
                    Kelola semua user yang terdaftar di sistem
                  </p>
                </div>
                <Button>
                  <IconUserPlus className="size-4" />
                  Tambah User
                </Button>
              </div>

              {/* Statistics Cards */}
              <UserStatistics users={mockUsers} />

              {/* User Table */}
              <UserTable
                users={mockUsers}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default UserListPage
