import { SectionReveal } from "./SectionReveal"
import { useEffect, useState, useRef } from "react"

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
}

function Counter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const capabilities = [
  {
    title: "Code",
    description: "Write, debug, and optimize code in 50+ languages",
    preview: "function optimize(data) {\n  return data.filter(Boolean);\n}"
  },
  {
    title: "Analysis",
    description: "Extract insights from complex datasets",
    preview: "Revenue ↑ 23% | Churn ↓ 8%"
  },
  {
    title: "Writing",
    description: "Draft emails, docs, and creative content",
    preview: "Dear team, I'm pleased to share..."
  }
]

const stats = [
  { value: 50, suffix: "+", label: "Languages" },
  { value: 99, suffix: "%", label: "Accuracy" },
  { value: 10, suffix: "M", label: "Users" }
]

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-32 bg-[var(--landing-bg-secondary)]"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <p className="font-outfit text-sm font-medium text-[var(--landing-text-secondary)] uppercase tracking-wider mb-4">
            Capabilities
          </p>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-[var(--landing-text)] mb-6">
            One tool, endless uses
          </h2>
          <p className="max-w-lg mx-auto text-[var(--landing-text-secondary)] font-outfit">
            From code to creative writing, Syntra adapts to your workflow.
          </p>
        </SectionReveal>

        {/* Capability cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {capabilities.map((cap, index) => (
            <SectionReveal key={index} delay={index * 100}>
              <div className="group p-6 rounded-2xl bg-[var(--landing-bg)] border border-[var(--landing-border)] transition-all duration-300 hover:border-[var(--landing-border-hover)] hover:shadow-[0_8px_30px_var(--landing-glow)]">
                <h3 className="font-syne font-semibold text-xl text-[var(--landing-text)] mb-2">
                  {cap.title}
                </h3>
                <p className="font-outfit text-sm text-[var(--landing-text-secondary)] mb-4">
                  {cap.description}
                </p>
                
                {/* Code preview */}
                <div className="p-4 rounded-lg bg-[var(--landing-bg-tertiary)] font-mono text-sm text-[var(--landing-text-secondary)] overflow-hidden">
                  <pre className="whitespace-pre-wrap">{cap.preview}</pre>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Stats row */}
        <SectionReveal>
          <div className="flex justify-center gap-16 md:gap-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-syne font-bold text-4xl md:text-5xl text-[var(--landing-text)] mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-outfit text-sm text-[var(--landing-text-tertiary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
