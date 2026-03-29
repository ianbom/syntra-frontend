import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  disabled = false
}: GlowButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-outfit font-medium",
    "rounded-full transition-all duration-300 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--landing-accent)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "overflow-hidden group"
  )

  const variants = {
    primary: cn(
      "bg-[var(--landing-accent)] text-[var(--landing-bg)]",
      "hover:opacity-90 active:scale-[0.98]",
      "shadow-sm hover:shadow-md"
    ),
    secondary: cn(
      "bg-transparent border border-[var(--landing-border)]",
      "text-[var(--landing-text)]",
      "hover:border-[var(--landing-border-hover)] hover:bg-[var(--landing-bg-tertiary)]",
      "active:scale-[0.98]"
    ),
    ghost: cn(
      "bg-transparent",
      "text-[var(--landing-text-secondary)]",
      "hover:text-[var(--landing-text)]",
      "hover:bg-[var(--landing-bg-tertiary)]"
    )
  }

  const sizes = {
    sm: "px-5 py-2.5 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-base gap-3"
  }

  const combinedStyles = cn(baseStyles, variants[variant], sizes[size], className)

  const content = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  )

  if (href && !disabled) {
    return (
      <a href={href} className={combinedStyles}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={combinedStyles}>
      {content}
    </button>
  )
}
