import { IconX, IconFileText, IconCheck } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UploadedFile } from "../types"

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

interface FileItemProps {
  uploadedFile: UploadedFile
  onRemove: (id: string) => void
}

export function FileItem({ uploadedFile, onRemove }: FileItemProps) {
  const { file, status, progress, errorMessage } = uploadedFile

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <IconFileText className="size-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-medium text-sm">{file.name}</p>
          {status === "success" && (
            <Badge variant="default" className="shrink-0">
              <IconCheck className="size-3 mr-1" />
              Berhasil
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="destructive" className="shrink-0">
              Gagal
            </Badge>
          )}
          {status === "uploading" && (
            <Badge variant="secondary" className="shrink-0">
              {progress}%
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </span>
          {errorMessage && (
            <span className="text-xs text-destructive">{errorMessage}</span>
          )}
        </div>
        {status === "uploading" && (
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {status !== "uploading" && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemove(uploadedFile.id)}
          className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <IconX className="size-4" />
        </Button>
      )}
    </div>
  )
}
