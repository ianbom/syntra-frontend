import { SectionReveal } from "./SectionReveal"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "TechFlow",
    avatar: "SC",
    content: "Syntra has changed how our team approaches problem-solving. The contextual understanding is remarkable."
  },
  {
    name: "Marcus Johnson",
    role: "Creative Director",
    company: "Pixel Studios",
    avatar: "MJ",
    content: "As a creative, I was skeptical about AI. Syntra enhances my work rather than replacing it."
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Lead",
    company: "BioGen Labs",
    avatar: "EW",
    content: "The accuracy and depth of analysis has accelerated our research timeline significantly."
  }
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-32 bg-[var(--landing-bg)]"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <p className="font-outfit text-sm font-medium text-[var(--landing-text-secondary)] uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-[var(--landing-text)]">
            Trusted by thousands
          </h2>
        </SectionReveal>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <SectionReveal key={index} delay={index * 100}>
              <div className="p-6 rounded-2xl bg-[var(--landing-bg-secondary)] border border-[var(--landing-border)] transition-all duration-300 hover:border-[var(--landing-border-hover)]">
                {/* Quote */}
                <p className="font-outfit text-[var(--landing-text)] mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--landing-accent)] flex items-center justify-center font-syne font-semibold text-sm text-[var(--landing-bg)]">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-syne font-medium text-[var(--landing-text)]">
                      {testimonial.name}
                    </div>
                    <div className="font-outfit text-sm text-[var(--landing-text-secondary)]">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
