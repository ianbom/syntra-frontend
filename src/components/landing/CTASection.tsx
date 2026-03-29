import { SectionReveal } from "./SectionReveal"
import { GlowButton } from "./GlowButton"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-32 bg-[var(--landing-accent)]">
      <div className="container mx-auto px-6 text-center">
        <SectionReveal>
          <h2 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--landing-bg)]">
            Ready to get started?
          </h2>

          <p className="max-w-md mx-auto text-lg text-[var(--landing-bg)]/70 font-outfit mb-10">
            Join thousands of professionals using Syntra to work smarter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton
              variant="secondary"
              size="lg"
              href="/chat/new"
              className="bg-[var(--landing-bg)] text-[var(--landing-accent)] border-transparent hover:bg-[var(--landing-bg)]/90"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </GlowButton>
            <GlowButton
              variant="ghost"
              size="lg"
              href="/login"
              className="text-[var(--landing-bg)] hover:bg-[var(--landing-bg)]/10"
            >
              Sign in
            </GlowButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[var(--landing-bg)]/60 text-sm font-outfit">
            <span>✓ Free tier available</span>
            <span>✓ No credit card</span>
            <span>✓ Cancel anytime</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
