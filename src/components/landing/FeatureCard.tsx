import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  delay = 0
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-8 rounded-2xl",
        "bg-[var(--landing-bg)] border border-[var(--landing-border)]",
        "transition-all duration-300 ease-out",
        "hover:border-[var(--landing-border-hover)]",
        "hover:shadow-[0_8px_30px_var(--landing-glow)]",
        "hover:-translate-y-1",
        className
      )}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 mb-6 rounded-xl",
          "bg-[var(--landing-bg-tertiary)]",
          "flex items-center justify-center",
          "transition-all duration-300",
          "group-hover:bg-[var(--landing-accent)]",
          "group-hover:text-[var(--landing-bg)]"
        )}
      >
        <div className="text-[var(--landing-text)] group-hover:text-[var(--landing-bg)] transition-colors">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-syne font-semibold text-xl mb-3 text-[var(--landing-text)]">
        {title}
      </h3>

      <p className="font-outfit text-[var(--landing-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
