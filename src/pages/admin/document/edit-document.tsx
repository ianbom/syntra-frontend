import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { IconArrowLeft, IconDeviceFloppy, IconLoader } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { DocumentEditForm } from "./components/document-edit-form"
import { DocumentChunksEditor } from "./components/document-chunks-editor"
import type { DocumentDetail } from "./edit-types"

// Mock data for development
const mockDocument: DocumentDetail = {
  id: 1,
  title: "Pengaruh Teknologi AI dalam Pendidikan Modern",
  creator: "Dr. Ahmad Fauzi, Prof. Siti Rahayu",
  keywords: "AI, Pendidikan, Teknologi, Machine Learning",
  description: "Studi komprehensif tentang dampak teknologi AI dalam transformasi pendidikan modern",
  publisher: "Universitas Indonesia Press",
  contributor: "Dr. Budi Santoso",
  date: "2024-03-15",
  type: "journal",
  format: "application/pdf",
  identifier: "syntra-2024-001",
  source: "Journal of Educational Technology",
  language: "id",
  relation: "https://doi.org/10.1234/related-paper",
  coverage: "Indonesia, 2023-2024",
  rights: "© 2024 Universitas Indonesia. All rights reserved.",
  doi: "10.1234/syntra.2024.001",
  abstract: "Penelitian ini mengeksplorasi bagaimana teknologi kecerdasan buatan (AI) telah mengubah lanskap pendidikan modern. Melalui analisis kualitatif dan kuantitatif, kami mengidentifikasi dampak positif dan tantangan yang dihadapi dalam implementasi AI di berbagai tingkat pendidikan.",
  citation_count: 15,
  file_path: "documents/2024/03/ai-education-study.pdf",
  processing_status: "completed",
  processing_error: null,
  is_private: false,
  is_metadata_complete: true,
  created_at: "2024-02-20T10:30:00Z",
  updated_at: "2024-03-15T14:45:00Z",
  chunks: [
    {
      id: 1,
      document_id: 1,
      chunk_index: 0,
      content: "Pengaruh Teknologi AI dalam Pendidikan Modern\n\nOleh: Dr. Ahmad Fauzi dan Prof. Siti Rahayu\n\nUniversitas Indonesia\n2024",
      token_count: 45,
      possibly_questions: [
        "Siapa penulis dari penelitian ini?",
        "Kapan penelitian ini dipublikasikan?",
      ],
      page_number: 1,
      section_title: "Title Page",
      chunk_type: "title",
      chunk_metadata: { is_header: true },
      created_at: "2024-02-20T11:00:00Z",
      updated_at: "2024-02-20T11:00:00Z",
    },
    {
      id: 2,
      document_id: 1,
      chunk_index: 1,
      content: "Penelitian ini mengeksplorasi bagaimana teknologi kecerdasan buatan (AI) telah mengubah lanskap pendidikan modern. Melalui analisis kualitatif dan kuantitatif, kami mengidentifikasi dampak positif dan tantangan yang dihadapi dalam implementasi AI di berbagai tingkat pendidikan. Hasil penelitian menunjukkan bahwa AI dapat meningkatkan personalisasi pembelajaran, efisiensi administratif, dan memberikan akses pendidikan yang lebih luas.",
      token_count: 120,
      possibly_questions: [
        "Apa tujuan dari penelitian ini?",
        "Apa saja dampak positif AI dalam pendidikan?",
        "Metode apa yang digunakan dalam penelitian?",
      ],
      page_number: 1,
      section_title: "Abstract",
      chunk_type: "abstract",
      chunk_metadata: null,
      created_at: "2024-02-20T11:01:00Z",
      updated_at: "2024-02-20T11:01:00Z",
    },
    {
      id: 3,
      document_id: 1,
      chunk_index: 2,
      content: "Kecerdasan buatan (AI) telah menjadi salah satu teknologi paling transformatif di abad ke-21. Dalam konteks pendidikan, AI menawarkan berbagai kemungkinan untuk meningkatkan kualitas pembelajaran, personalisasi pengalaman belajar, dan otomatisasi tugas administratif. Penelitian ini bertujuan untuk menganalisis secara mendalam bagaimana teknologi AI telah dan akan terus mempengaruhi sistem pendidikan modern, dengan fokus khusus pada implementasi di Indonesia.",
      token_count: 135,
      possibly_questions: [
        "Apa yang dimaksud dengan kecerdasan buatan?",
        "Bagaimana AI dapat meningkatkan pendidikan?",
        "Apa fokus penelitian ini?",
      ],
      page_number: 2,
      section_title: "1. Pendahuluan",
      chunk_type: "paragraph",
      chunk_metadata: { section_number: "1" },
      created_at: "2024-02-20T11:02:00Z",
      updated_at: "2024-02-20T11:02:00Z",
    },
  ],
}

const EditDocumentPage = () => {
  const { id } = useParams<{ id: string }>()
  const [document, setDocument] = useState<DocumentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchDocument = async () => {
      setIsLoading(true)
      try {
        // In production, replace with actual API call:
        // const response = await fetch(`/api/documents/${id}`)
        // const data = await response.json()
        
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        setDocument(mockDocument)
      } catch (error) {
        toast.error("Failed to load document")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  const handleUpdateDocument = async (updates: Partial<DocumentDetail>) => {
    if (!document) return

    setDocument({ ...document, ...updates })
    
    // Auto-save would be implemented here
    console.log("Document updated:", updates)
  }

  const handleUpdateChunk = async (chunkId: number, updates: Partial<DocumentDetail["chunks"][0]>) => {
    if (!document) return

    const updatedChunks = document.chunks.map((chunk) =>
      chunk.id === chunkId ? { ...chunk, ...updates } : chunk
    )

    setDocument({ ...document, chunks: updatedChunks })
    
    console.log("Chunk updated:", chunkId, updates)
  }

  const handleDeleteChunk = async (chunkId: number) => {
    if (!document) return

    const updatedChunks = document.chunks.filter((chunk) => chunk.id !== chunkId)

    setDocument({ ...document, chunks: updatedChunks })
    
    toast.success("Chunk deleted successfully")
  }

  const handleSave = async () => {
    if (!document) return

    setIsSaving(true)
    try {
      // In production, replace with actual API call:
      // await fetch(`/api/documents/${id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(document)
      // })
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Document saved successfully")
    } catch (error) {
      toast.error("Failed to save document")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
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
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconLoader className="size-5 animate-spin" />
              <span>Loading document...</span>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (!document) {
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
          <div className="flex flex-1 items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Document Not Found</CardTitle>
                <CardDescription>
                  The document you're looking for doesn't exist or has been deleted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/document">
                  <Button>
                    <IconArrowLeft className="size-4 mr-2" />
                    Back to Documents
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-4">
                  <Link to="/admin/document">
                    <Button variant="ghost" size="icon">
                      <IconArrowLeft className="size-5" />
                    </Button>
                  </Link>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Document</h1>
                    <p className="text-muted-foreground">
                      Modify document metadata and chunks
                    </p>
                  </div>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <IconLoader className="size-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <IconDeviceFloppy className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>

              {/* Content */}
              <div className="px-4 lg:px-6 space-y-6">
                <DocumentEditForm
                  document={document}
                  onUpdate={handleUpdateDocument}
                />

                <DocumentChunksEditor
                  chunks={document.chunks}
                  onUpdateChunk={handleUpdateChunk}
                  onDeleteChunk={handleDeleteChunk}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default EditDocumentPage
