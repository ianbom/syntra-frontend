import { type ColumnDef } from "@tanstack/react-table"
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Document } from "../types"
import { Link } from "react-router"

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getStatusBadge = (status: Document["status"]) => {
  const variants = {
    published: { variant: "default" as const, label: "Published" },
    draft: { variant: "secondary" as const, label: "Draft" },
    pending: { variant: "outline" as const, label: "Pending" },
  }
  const { variant, label } = variants[status]
  return <Badge variant={variant}>{label}</Badge>
}

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <p className="font-medium truncate">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => <span className="text-sm">{row.original.creator}</span>,
  },
  {
    accessorKey: "keywords",
    header: "Keyword",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-[200px]">
        {row.original.keywords.slice(0, 2).map((keyword) => (
          <Badge key={keyword} variant="secondary" className="text-xs">
            {keyword}
          </Badge>
        ))}
        {row.original.keywords.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{row.original.keywords.length - 2}
          </Badge>
        )}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "doi",
    header: "DOI",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.doi || "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: "publishedAt",
    header: "Dipublish Pada",
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.publishedAt)}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat Pada",
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical className="size-4" />
            <span className="sr-only">Buka menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log("View", row.original.id)}>
            <IconEye className="size-4" />
            Lihat
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/admin/document/edit/${row.original.id}`}>
              <IconEdit className="size-4 mr-2" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => console.log("Delete", row.original.id)}
          >
            <IconTrash className="size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
]
