import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileItem } from "./file-item"
import type { UploadedFile } from "../types"

interface UploadedFilesListProps {
  uploadedFiles: UploadedFile[]
  onRemoveFile: (id: string) => void
}

export function UploadedFilesList({
  uploadedFiles,
  onRemoveFile,
}: UploadedFilesListProps) {
  if (uploadedFiles.length === 0) {
    return null
  }

  const pendingCount = uploadedFiles.filter((f) => f.status === "pending").length
  const uploadingCount = uploadedFiles.filter((f) => f.status === "uploading").length
  const successCount = uploadedFiles.filter((f) => f.status === "success").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Dokumen Terpilih</CardTitle>
            <CardDescription>
              {uploadedFiles.length} dokumen dipilih
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <Badge variant="secondary">
                {pendingCount} Menunggu
              </Badge>
            )}
            {uploadingCount > 0 && (
              <Badge variant="default">
                {uploadingCount} Uploading
              </Badge>
            )}
            {successCount > 0 && (
              <Badge variant="default">
                {successCount} Berhasil
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {uploadedFiles.map((uploadedFile) => (
            <FileItem
              key={uploadedFile.id}
              uploadedFile={uploadedFile}
              onRemove={onRemoveFile}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
