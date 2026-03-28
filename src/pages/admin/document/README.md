# Document Management Module

Module ini mengelola dokumen dalam aplikasi Syntra FS. Struktur folder telah direfactor untuk mengikuti clean code practices dengan pemisahan komponen yang jelas.

## 📁 Struktur Folder

```
src/pages/admin/document/
├── components/                    # Reusable components
│   ├── document-columns.tsx      # Table column definitions (list)
│   ├── document-statistics.tsx   # Statistics cards component (list)
│   ├── document-table.tsx        # Document table with filters & pagination (list)
│   ├── file-item.tsx             # Individual file item display (create)
│   ├── file-upload-area.tsx      # Drag & drop upload area (create)
│   ├── uploaded-files-list.tsx   # List of uploaded files (create)
│   ├── process-columns.tsx       # Table column definitions (process)
│   ├── process-statistics.tsx    # Statistics cards component (process)
│   ├── process-table.tsx         # Process table with filters & pagination (process)
│   └── index.ts                  # Component exports
├── create.tsx                     # Create document page
├── list.tsx                       # List documents page
├── process-document.tsx           # Process monitoring page
├── data.ts                        # Mock data
├── types.ts                       # TypeScript interfaces
├── utils.ts                       # Utility functions
└── README.md                      # This file
```

## 🎯 Fitur

### List Page (`list.tsx`)
- **Statistics Cards**: Menampilkan total dokumen, published, draft, dan pending
- **Document Table**: Table dengan sorting, filtering, dan pagination
- **Search**: Real-time search untuk mencari dokumen
- **Status Filter**: Filter berdasarkan status (published/draft/pending)
- **Actions**: View, Edit, Delete untuk setiap dokumen

### Create Page (`create.tsx`)
- **Multiple File Upload**: Upload banyak file sekaligus
- **Drag & Drop**: Interface drag and drop untuk kemudahan
- **Progress Tracking**: Menampilkan progress upload untuk setiap file
- **File Validation**: Validasi format dan ukuran file
- **Status Management**: Tracking status (pending/uploading/success/error)

### Process Page (`process-document.tsx`) ✨ NEW
- **Real-time Progress Monitoring**: Monitor progress upload dokumen secara real-time
- **Statistics Cards**: Menampilkan total, processing, completed, dan failed
- **Process Table**: Table dengan kolom title, creator, uploaded at, progress bar
- **Sorting**: Sort berdasarkan semua kolom (title, creator, uploaded at, progress)
- **Searching**: Real-time search untuk mencari dokumen
- **Filtering**: Filter berdasarkan status (processing/completed/failed)
- **Pagination**: Navigate through multiple pages
- **Auto-refresh**: Progress otomatis terupdate setiap 3 detik
- **Manual Refresh**: Tombol refresh untuk update manual
- **Progress Bar**: Visual progress bar dengan color coding
  - 🔴 Red: 0-39%
  - 🟡 Yellow: 40-69%
  - 🔵 Blue: 70-99%
  - 🟢 Green: 100%

## 🧩 Komponen

### DocumentStatistics
Menampilkan card statistik dokumen dengan breakdown berdasarkan status.

**Props:**
- `documents: Document[]` - Array dokumen untuk dihitung statistiknya

### DocumentTable
Table dokumen lengkap dengan fitur filtering, sorting, dan pagination.

**Props:**
- `documents: Document[]` - Array dokumen yang akan ditampilkan

### FileUploadArea
Area upload dengan drag & drop support.

**Props:**
- `fileInputRef: RefObject<HTMLInputElement | null>` - Ref untuk input file
- `isDragging: boolean` - Status dragging
- `onFileInputChange: (e) => void` - Handler file input change
- `onDragOver: (e) => void` - Handler drag over
- `onDragLeave: (e) => void` - Handler drag leave
- `onDrop: (e) => void` - Handler drop

### UploadedFilesList
Menampilkan list file yang sudah dipilih dengan status dan progress.

**Props:**
- `uploadedFiles: UploadedFile[]` - Array file yang sudah diupload
- `onRemoveFile: (id: string) => void` - Handler untuk remove file

### FileItem
Komponen individual untuk menampilkan informasi file.

**Props:**
- `uploadedFile: UploadedFile` - Data file yang diupload
- `onRemove: (id: string) => void` - Handler untuk remove file

### ProcessStatistics ✨ NEW
Menampilkan card statistik proses dokumen dengan breakdown berdasarkan status.

**Props:**
- `documents: ProcessDocument[]` - Array dokumen yang sedang diproses

### ProcessTable ✨ NEW
Table proses dokumen lengkap dengan fitur sorting, filtering, searching, dan pagination.

**Props:**
- `documents: ProcessDocument[]` - Array dokumen yang sedang diproses

## 📝 Types

### Document
```typescript
interface Document {
  id: string
  title: string
  creator: string
  keywords: string[]
  doi: string
  publishedAt: string | null
  createdAt: string
  status: "published" | "draft" | "pending"
}
```

### UploadedFile
```typescript
interface UploadedFile {
  id: string
  file: File
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  errorMessage?: string
}
```

### ProcessDocument ✨ NEW
```typescript
interface ProcessDocument {
  id: string
  title: string
  creator: string
  uploadedAt: string
  progress: number
  status: "processing" | "completed" | "failed"
}
```

## 🛠️ Utilities

### simulateFileUpload
Mensimulasikan proses upload file dengan progress tracking.

**Parameters:**
- `fileId: string` - ID file yang akan diupload
- `setUploadedFiles: Dispatch<SetStateAction<UploadedFile[]>>` - State setter untuk update progress

### createUploadedFile
Membuat object UploadedFile dari File object.

**Parameters:**
- `file: File` - File object dari browser

**Returns:** `UploadedFile` - File object dengan metadata tambahan

## 🚀 Penggunaan

### Import Components
```typescript
import { DocumentStatistics, DocumentTable } from "./components"
```

### Import Data & Types
```typescript
import { mockDocuments } from "./data"
import type { Document, UploadedFile } from "./types"
```

### Import Utilities
```typescript
import { simulateFileUpload, createUploadedFile } from "./utils"
```

## 🎨 UI Components (shadcn/ui)

Module ini menggunakan komponen dari shadcn/ui:
- Card, CardContent, CardDescription, CardHeader, CardTitle
- Button
- Badge
- Input
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- DropdownMenu
- Pagination

## 📦 Dependencies

- `@tabler/icons-react` - Icons
- `@tanstack/react-table` - Table functionality
- `react-router-dom` - Navigation
- `shadcn/ui` - UI components

## 🔄 State Management

State dikelola menggunakan React hooks:
- `useState` - Local state management
- `useCallback` - Memoized callbacks
- `useRef` - DOM references
- `useMemo` - Memoized values

## 🧪 Testing

Untuk menjalankan development server:
```bash
npm run dev
```

Untuk build production:
```bash
npm run build
```

## 📌 Best Practices

1. **Component Separation**: Setiap komponen memiliki file tersendiri
2. **Type Safety**: Menggunakan TypeScript untuk type checking
3. **Reusability**: Komponen dibuat reusable dan configurable
4. **Clean Code**: Mengikuti prinsip SOLID dan DRY
5. **Consistent Naming**: Penamaan file dan komponen konsisten
6. **Index Exports**: Menggunakan index.ts untuk clean imports
