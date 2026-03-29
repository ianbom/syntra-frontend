

import "@/styles/landing.css"
import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Capabilities,
  Testimonials,
  CTASection,
  Footer
} from "@/components/landing"
import { useEffect } from "react"

export default function Welcome() {
  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (systemDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  return (
    <div className="min-h-screen bg-[var(--landing-bg)] font-outfit antialiased">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero section with neural background */}
        <Hero />

        {/* Features grid */}
        <Features />

        {/* How it works timeline */}
        <HowItWorks />

        {/* AI capabilities showcase */}
        <Capabilities />

        {/* Testimonials */}
        <Testimonials />

        {/* Call to action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}