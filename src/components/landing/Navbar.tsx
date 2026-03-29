import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { GlowButton } from "./GlowButton"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Testimonials", href: "#testimonials" }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        isScrolled
          ? "py-4 bg-[var(--landing-bg)]/80 backdrop-blur-xl border-b border-[var(--landing-border)]"
          : "py-6 bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          {/* <div className="w-8 h-8 rounded-lg bg-[var(--landing-accent)] flex items-center justify-center">
            <span className="font-syne font-bold text-sm text-[var(--landing-bg)]">S</span>
          </div> */}
          <span className="font-syne font-bold text-xl text-[var(--landing-text)]">
            Syntra AI
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "font-outfit text-sm text-[var(--landing-text-secondary)]",
                "transition-colors duration-200",
                "hover:text-[var(--landing-text)]"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <GlowButton variant="ghost" size="sm" href="/login">
            Sign In
          </GlowButton>
          <GlowButton variant="primary" size="sm" href="/chat/new">
            Get Started
          </GlowButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-[var(--landing-text)]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0",
          "bg-[var(--landing-bg)] border-b border-[var(--landing-border)]",
          "transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-outfit text-[var(--landing-text-secondary)] py-2 text-left hover:text-[var(--landing-text)]"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--landing-border)]">
            <GlowButton variant="secondary" href="/login">
              Sign In
            </GlowButton>
            <GlowButton variant="primary" href="/chat/new">
              Get Started
            </GlowButton>
          </div>
        </div>
      </div>
    </header>
  )
}
