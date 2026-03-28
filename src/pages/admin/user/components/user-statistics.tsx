import { useMemo } from "react"
import { IconUsers, IconUserCheck, IconUserX, IconUserPlus } from "@tabler/icons-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "../types"

interface StatCardProps {
  title: string
  value: number
  icon: typeof IconUsers
  description: string
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
    </Card>
  )
}

interface UserStatisticsProps {
  users: User[]
}

export function UserStatistics({ users }: UserStatisticsProps) {
  const stats = useMemo(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const total = users.length
    const active = users.filter((u) => u.status === "active").length
    const inactive = users.filter((u) => u.status === "inactive").length
    const newThisMonth = users.filter(
      (u) => new Date(u.createdAt) >= startOfMonth
    ).length

    return { total, active, inactive, newThisMonth }
  }, [users])

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <StatCard
        title="Total User"
        value={stats.total}
        icon={IconUsers}
        description="Semua user terdaftar"
      />
      <StatCard
        title="User Aktif"
        value={stats.active}
        icon={IconUserCheck}
        description="User dengan status aktif"
      />
      <StatCard
        title="User Tidak Aktif"
        value={stats.inactive}
        icon={IconUserX}
        description="User dengan status tidak aktif"
      />
      <StatCard
        title="User Baru"
        value={stats.newThisMonth}
        icon={IconUserPlus}
        description="Bergabung bulan ini"
      />
    </div>
  )
}
