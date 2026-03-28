import { IconUser, IconRobot } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { Message } from "../types"

interface MessageBubbleProps {
  message: Message
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
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

      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted rounded-bl-md"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
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
