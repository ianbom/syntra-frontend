export interface Document {
  id: string
  title: string
  creator: string
  keywords: string[]
  doi: string
  publishedAt: string | null
  createdAt: string
  status: "published" | "draft" | "pending"
}

export interface UploadedFile {
  id: string
  file: File
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  errorMessage?: string
}

export interface ProcessDocument {
  id: string
  title: string
  creator: string
  uploadedAt: string
  progress: number
  status: "processing" | "completed" | "failed"
}
