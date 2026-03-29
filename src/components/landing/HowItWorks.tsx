import { SectionReveal } from "./SectionReveal"

const steps = [
  {
    number: "01",
    title: "Ask anything",
    description: "Type your question naturally. No special commands needed."
  },
  {
    number: "02",
    title: "AI processes",
    description: "Our model analyzes context and retrieves relevant knowledge."
  },
  {
    number: "03",
    title: "Get answers",
    description: "Receive accurate, well-structured responses instantly."
  }
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-[var(--landing-bg)]"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <SectionReveal className="text-center mb-20">
          <p className="font-outfit text-sm font-medium text-[var(--landing-text-secondary)] uppercase tracking-wider mb-4">
            How it works
          </p>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-[var(--landing-text)]">
            Simple by design
          </h2>
        </SectionReveal>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <SectionReveal key={index} delay={index * 150}>
                <div className="relative text-center md:text-left">
                  {/* Number */}
                  <div className="font-syne font-bold text-6xl text-[var(--landing-bg-tertiary)] mb-4">
                    {step.number}
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-syne font-semibold text-xl text-[var(--landing-text)] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-outfit text-[var(--landing-text-secondary)]">
                    {step.description}
                  </p>

                  {/* Connector line (hidden on last item and mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-[var(--landing-border)]" />
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Demo preview */}
        <SectionReveal delay={500}>
          <div className="max-w-3xl mx-auto mt-20">
            <div className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-bg-secondary)] p-8 md:p-12">
              {/* Chat mockup */}
              <div className="space-y-6">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-[var(--landing-accent)] text-[var(--landing-bg)] rounded-2xl rounded-br-md px-4 py-3 font-outfit">
                    How do I optimize React performance?
                  </div>
                </div>
                
                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-[var(--landing-bg)] border border-[var(--landing-border)] rounded-2xl rounded-bl-md px-4 py-3 font-outfit text-[var(--landing-text)]">
                    <p className="mb-3">Here are the key strategies for React optimization:</p>
                    <ul className="space-y-1 text-[var(--landing-text-secondary)]">
                      <li>• Use React.memo for expensive components</li>
                      <li>• Implement code splitting with lazy loading</li>
                      <li>• Optimize re-renders with useMemo and useCallback</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
