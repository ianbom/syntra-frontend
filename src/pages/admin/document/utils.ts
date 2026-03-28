import type { UploadedFile } from "./types"

export const simulateFileUpload = (
  fileId: string,
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
) => {
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    if (progress <= 100) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "uploading", progress } : f
        )
      )
    }
    if (progress >= 100) {
      clearInterval(interval)
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "success", progress: 100 } : f
        )
      )
    }
  }, 200)
}

export const createUploadedFile = (file: File): UploadedFile => ({
  id: `${file.name}-${Date.now()}-${Math.random()}`,
  file,
  status: "pending",
  progress: 0,
})
