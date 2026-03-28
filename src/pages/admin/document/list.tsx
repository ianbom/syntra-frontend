import { IconFilePencil } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DocumentStatistics, DocumentTable } from "./components"
import { mockDocuments } from "./data"

const DocumentListPage = () => {
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
                    Daftar Dokumen
                  </h1>
                  <p className="text-muted-foreground">
                    Kelola semua dokumen yang ada di sistem
                  </p>
                </div>
                <Button>
                  <IconFilePencil className="size-4" />
                  <a href="/admin/document/create">
                    
                    Tambah Dokumen
                  </a>
                </Button>
              </div>

              {/* Statistics Cards */}
              <DocumentStatistics documents={mockDocuments} />

              {/* Documents Table */}
              <DocumentTable documents={mockDocuments} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DocumentListPage
