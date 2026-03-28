import { useMemo } from "react"
import {
  IconFileText,
  IconFileCheck,
  IconClock,
  IconAlertCircle,
} from "@tabler/icons-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProcessDocument } from "../types"

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

interface ProcessStatisticsProps {
  documents: ProcessDocument[]
}

export function ProcessStatistics({ documents }: ProcessStatisticsProps) {
  const stats = useMemo(() => {
    const total = documents.length
    const processing = documents.filter((d) => d.status === "processing").length
    const completed = documents.filter((d) => d.status === "completed").length
    const failed = documents.filter((d) => d.status === "failed").length
    return { total, processing, completed, failed }
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
        title="Processing"
        value={stats.processing}
        icon={IconClock}
        description="Sedang diproses"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon={IconFileCheck}
        description="Berhasil diproses"
      />
      <StatCard
        title="Failed"
        value={stats.failed}
        icon={IconAlertCircle}
        description="Gagal diproses"
      />
    </div>
  )
}
