import { useEffect, useState } from "react"
import { IconRefresh, IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ProcessStatistics, ProcessTable } from "./components"
import { mockProcessDocuments } from "./data"
import type { ProcessDocument } from "./types"

const ProcessDocumentPage = () => {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState<ProcessDocument[]>(mockProcessDocuments)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.status === "processing" && doc.progress < 100) {
            const newProgress = Math.min(doc.progress + Math.floor(Math.random() * 20), 100)
            return {
              ...doc,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "processing",
            }
          }
          return doc
        })
      )
      setIsRefreshing(false)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.status === "processing" && doc.progress < 100) {
            const newProgress = Math.min(doc.progress + Math.floor(Math.random() * 5), 100)
            return {
              ...doc,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "processing",
            }
          }
          return doc
        })
      )
    }, 3000)

    return () => clearInterval(interval)
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
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/admin/document")}
                  >
                    <IconArrowLeft className="size-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      Process Dokumen
                    </h1>
                    <p className="text-muted-foreground">
                      Monitor progress upload dan pemrosesan dokumen
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  variant="outline"
                >
                  <IconRefresh
                    className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>

              {/* Statistics Cards */}
              <ProcessStatistics documents={documents} />

              {/* Process Table */}
              <ProcessTable documents={documents} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ProcessDocumentPage
