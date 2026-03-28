import { useMemo } from "react"
import {
  IconFileText,
  IconFileCheck,
  IconFilePencil,
  IconClock,
} from "@tabler/icons-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Document } from "../types"

interface StatCardProps {
  title: string
  value: number
  icon: typeof IconFileText
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

interface DocumentStatisticsProps {
  documents: Document[]
}

export function DocumentStatistics({ documents }: DocumentStatisticsProps) {
  const stats = useMemo(() => {
    const total = documents.length
    const published = documents.filter((d) => d.status === "published").length
    const draft = documents.filter((d) => d.status === "draft").length
    const pending = documents.filter((d) => d.status === "pending").length
    return { total, published, draft, pending }
  }, [documents])

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <StatCard
        title="Total Dokumen"
        value={stats.total}
        icon={IconFileText}
        description="Semua dokumen"
      />
      <StatCard
        title="Published"
        value={stats.published}
        icon={IconFileCheck}
        description="Dokumen terpublikasi"
      />
      <StatCard
        title="Draft"
        value={stats.draft}
        icon={IconFilePencil}
        description="Dokumen draft"
      />
      <StatCard
        title="Pending"
        value={stats.pending}
        icon={IconClock}
        description="Menunggu review"
      />
    </div>
  )
}
