import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#" },
    { label: "API", href: "#" }
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" }
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" }
  ]
}

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--landing-bg-secondary)] border-t border-[var(--landing-border)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--landing-accent)] flex items-center justify-center">
                <span className="font-syne font-bold text-sm text-[var(--landing-bg)]">S</span>
              </div>
              <span className="font-syne font-bold text-xl text-[var(--landing-text)]">
                syntra
              </span>
            </a>
            <p className="font-outfit text-sm text-[var(--landing-text-secondary)] mb-6 max-w-xs">
              AI that understands you. Built for the way you work.
            </p>
            
            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--landing-text-secondary)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-bg-tertiary)] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-syne font-semibold text-[var(--landing-text)] mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-outfit text-sm text-[var(--landing-text-secondary)] hover:text-[var(--landing-text)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--landing-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-outfit text-sm text-[var(--landing-text-tertiary)]">
            © {currentYear} Syntra. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm font-outfit text-[var(--landing-text-tertiary)]">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
