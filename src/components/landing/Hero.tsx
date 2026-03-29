import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowButton } from "./GlowButton"
import { AnimatedText, TypewriterText } from "./AnimatedText"
import { NeuralBackground } from "./NeuralBackground"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--landing-bg)]" />
      
      {/* Subtle gradient orb */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[800px] h-[800px] rounded-full",
          "bg-[var(--landing-bg-tertiary)]",
          "blur-3xl opacity-60"
        )}
      />

      {/* Grid background */}
      <NeuralBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-8",
            "px-4 py-2 rounded-full",
            "border border-[var(--landing-border)]",
            "text-sm font-outfit text-[var(--landing-text-secondary)]",
            "animate-fade-in-up"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--landing-accent)]" />
          Now in Public Beta
        </div>

        {/* Main headline */}
        <h1 className="font-syne font-bold text-5xl md:text-7xl lg:text-8xl mb-8 text-[var(--landing-text)] tracking-tight">
          <AnimatedText text="Think faster." delay={100} />
          <br />
          <span className="text-[var(--landing-text-secondary)]">
            <AnimatedText text="Build smarter." delay={300} />
          </span>
        </h1>

        {/* Subtitle */}
        <div className="max-w-xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-[var(--landing-text-secondary)] font-outfit leading-relaxed">
            <TypewriterText
              text="Syntra is your AI assistant that understands context and delivers precise answers instantly."
              speed={25}
              delay={800}
            />
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <GlowButton variant="primary" size="lg" href="/chat/new">
            Start for free
            <ArrowRight className="w-4 h-4" />
          </GlowButton>
          <GlowButton variant="secondary" size="lg" href="#features">
            See how it works
          </GlowButton>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "grid grid-cols-3 gap-12 max-w-lg mx-auto mt-24",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: "1.5s", animationFillMode: "both" }}
        >
          {[
            { value: "10M+", label: "Messages" },
            { value: "50ms", label: "Latency" },
            { value: "99.9%", label: "Uptime" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-syne font-bold text-2xl md:text-3xl text-[var(--landing-text)] mb-1">
                {stat.value}
              </div>
              <div className="font-outfit text-sm text-[var(--landing-text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-[var(--landing-border)] flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--landing-text-tertiary)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
