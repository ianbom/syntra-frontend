import { type RefObject } from "react"
import { IconUpload, IconFile } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadAreaProps {
  fileInputRef: RefObject<HTMLInputElement | null>
  isDragging: boolean
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

export function FileUploadArea({
  fileInputRef,
  isDragging,
  onFileInputChange,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileUploadAreaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Dokumen</CardTitle>
        <CardDescription>
          Upload satu atau lebih dokumen. Format yang didukung: PDF, DOC, DOCX
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/5"
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={onFileInputChange}
            className="hidden"
          />

          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <IconUpload className="size-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Drag & drop file disini
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            atau klik tombol dibawah untuk memilih file
          </p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            <IconFile className="size-4" />
            Pilih File
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Max 10MB per file • PDF, DOC, DOCX
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
