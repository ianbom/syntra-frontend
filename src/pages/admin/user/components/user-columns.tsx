import {
  IconArrowUp,
  IconArrowDown,
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "../types"

// Helper: Format date to Indonesian locale
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Helper: Get status badge
export const getStatusBadge = (status: User["status"]) => {
  return status === "active" ? (
    <Badge variant="default">Aktif</Badge>
  ) : (
    <Badge variant="secondary">Tidak Aktif</Badge>
  )
}

// Sortable header component
interface SortableHeaderProps {
  column: {
    getIsSorted: () => false | "asc" | "desc"
    getToggleSortingHandler: () => ((event: unknown) => void) | undefined
  }
  title: string
}

export function SortableHeader({ column, title }: SortableHeaderProps) {
  const sorted = column.getIsSorted()

  return (
    <div
      className="flex cursor-pointer select-none items-center gap-1"
      onClick={column.getToggleSortingHandler()}
    >
      {title}
      <span className="ml-1">
        {sorted === "asc" && <IconArrowUp className="size-3" />}
        {sorted === "desc" && <IconArrowDown className="size-3" />}
        {!sorted && <span className="size-3 opacity-0">↕</span>}
      </span>
    </div>
  )
}

// Action handlers
interface ActionHandlers {
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

// Create columns with action handlers
export function createUserColumns(handlers: ActionHandlers): ColumnDef<User>[] {
  return [
    {
      accessorKey: "nama",
      header: ({ column }) => <SortableHeader column={column} title="Nama" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.nama}</span>
          {/* {getStatusBadge(row.original.status)} */}
        </div>
      ),
    },
    {
      accessorKey: "nrp",
      header: ({ column }) => <SortableHeader column={column} title="NRP" />,
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.nrp}</span>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <SortableHeader column={column} title="Dibuat Pada" />
      ),
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
            <DropdownMenuItem onClick={() => handlers.onView(row.original)}>
              <IconEye className="size-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlers.onEdit(row.original)}>
              <IconEdit className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handlers.onDelete(row.original)}
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
}
