import { useState, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { IconUpload, IconArrowLeft, IconCheck } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { FileUploadArea, UploadedFilesList } from "./components"
import { simulateFileUpload, createUploadedFile } from "./utils"
import type { UploadedFile } from "./types"

const CreateDocumentPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).map(createUploadedFile)
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
    e.target.value = ""
  }

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleUpload = () => {
    const pendingFiles = uploadedFiles.filter((f) => f.status === "pending")
    if (pendingFiles.length === 0) {
      alert("Tidak ada file yang perlu diupload")
      return
    }

    pendingFiles.forEach((file) => {
      simulateFileUpload(file.id, setUploadedFiles)
    })
  }

  const handleSubmit = () => {
    const allUploaded = uploadedFiles.every((f) => f.status === "success")
    if (!allUploaded) {
      alert("Harap upload semua file terlebih dahulu")
      return
    }

    if (uploadedFiles.length === 0) {
      alert("Harap pilih minimal 1 dokumen")
      return
    }

    console.log("Submitting files:", uploadedFiles.map((f) => f.file))
    alert("Dokumen berhasil disimpan!")
    navigate("/admin/document/list")
  }

  const pendingCount = uploadedFiles.filter((f) => f.status === "pending").length

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
                      Upload Dokumen
                    </h1>
                    <p className="text-muted-foreground">
                      Upload dokumen baru ke dalam sistem
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-4 lg:px-6">
                <div className="mx-auto max-w-3xl space-y-6">
                  {/* Upload Area */}
                  <FileUploadArea
                    fileInputRef={fileInputRef}
                    isDragging={isDragging}
                    onFileInputChange={handleFileInputChange}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  />

                  {/* Uploaded Files List */}
                  <UploadedFilesList
                    uploadedFiles={uploadedFiles}
                    onRemoveFile={handleRemoveFile}
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/admin/document")}
                    >
                      Batal
                    </Button>

                    <div className="flex items-center gap-2">
                      {pendingCount > 0 && (
                        <Button onClick={handleUpload} variant="secondary">
                          <IconUpload className="size-4" />
                          Upload {pendingCount} File
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmit}
                        disabled={uploadedFiles.length === 0 || uploadedFiles.some((f) => f.status !== "success")}
                      >
                        <IconCheck className="size-4" />
                        Simpan Dokumen
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CreateDocumentPage
