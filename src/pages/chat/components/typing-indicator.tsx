import { IconRobot } from "@tabler/icons-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[85%] mr-auto">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <IconRobot className="size-4" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
            <span className="size-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
            <span className="size-2 rounded-full bg-foreground/40 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
