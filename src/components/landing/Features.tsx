import { 
  Brain, 
  MessageSquare, 
  Shield, 
  Zap, 
  Globe, 
  Layers 
} from "lucide-react"
import { FeatureCard } from "./FeatureCard"
import { SectionReveal } from "./SectionReveal"

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Contextual Understanding",
    description: "Remembers your conversation history and understands nuanced context across sessions."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Sub-50ms response times powered by optimized infrastructure at the edge."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy First",
    description: "End-to-end encryption with zero data retention. Your conversations stay private."
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Natural Dialogue",
    description: "Engage in flowing conversations that feel human, not robotic."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "50+ Languages",
    description: "Communicate with native-level fluency across major world languages."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Integrations",
    description: "Connect your tools and data sources for domain-specific intelligence."
  }
]

export function Features() {
  return (
    <section
      id="features"
      className="relative py-32 bg-[var(--landing-bg-secondary)]"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <p className="font-outfit text-sm font-medium text-[var(--landing-text-secondary)] uppercase tracking-wider mb-4">
            Features
          </p>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-[var(--landing-text)] mb-6">
            Built for how you work
          </h2>
          <p className="max-w-lg mx-auto text-[var(--landing-text-secondary)] font-outfit">
            Everything you need to think faster and accomplish more.
          </p>
        </SectionReveal>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <SectionReveal key={index} delay={index * 80}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 80}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
