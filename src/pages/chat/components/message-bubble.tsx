import { useState } from "react"
import { IconUser, IconRobot, IconFileText, IconChevronDown, IconChevronUp, IconExternalLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Message, DocumentReference } from "../types"

interface MessageBubbleProps {
  message: Message
}

interface ReferenceCardProps {
  reference: DocumentReference
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-start gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <IconFileText className="size-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-1">{reference.title}</h4>
          <p className="text-xs text-muted-foreground">Halaman {reference.pageNumber}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3 italic border-l-2 border-primary/30 pl-2">
        "{reference.excerpt}"
      </p>
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-1"
        onClick={() => window.open(reference.documentUrl, "_blank")}
      >
        <IconExternalLink className="size-3.5 mr-1.5" />
        Lihat Dokumen
      </Button>
    </div>
  )
}

function DocumentReferences({ references }: { references: DocumentReference[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
      >
        {isExpanded ? (
          <IconChevronUp className="size-3.5" />
        ) : (
          <IconChevronDown className="size-3.5" />
        )}
        <span>Referensi ({references.length} dokumen)</span>
      </button>

      {isExpanded && (
        <div className="grid gap-2 sm:grid-cols-2">
          {references.map((ref) => (
            <ReferenceCard key={ref.id} reference={ref} />
          ))}
        </div>
      )}
    </div>
  )
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const hasReferences = !isUser && message.references && message.references.length > 0

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "ml-auto max-w-[85%] flex-row-reverse" : "mr-auto max-w-[95%]"
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? (
          <IconUser className="size-4" />
        ) : (
          <IconRobot className="size-4" />
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "bg-muted rounded-br-md"
              : "bg-muted rounded-bl-md"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {hasReferences && (
          <DocumentReferences references={message.references!} />
        )}

        <span
          className={cn(
            "text-xs text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
