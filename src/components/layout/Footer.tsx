import Link from "next/link";
import Image from "next/image";

// --- Social media icon helper ---
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-muted hover:border-primary hover:text-primary-light transition-all duration-300 hover:shadow-[0_0_12px_rgba(108,4,215,0.45)]"
    >
      {children}
    </a>
  );
}

// --- Footer navigation columns ---
const footerLinks = {
  company: [
    { href: "#about", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press Kit" },
    { href: "#contact", label: "Contact" },
  ],
  services: [
    { href: "#games", label: "Games" },
    { href: "#tournaments", label: "Tournaments" },
    { href: "#leaderboard", label: "Leaderboard" },
    { href: "#", label: "Memberships" },
  ],
  support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit">
              <div
                className="relative overflow-hidden"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  border: "2px solid rgba(108,4,215,0.45)",
                  boxShadow: "0 0 14px rgba(108,4,215,0.3)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="8bit Cafe Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="font-display text-xl font-bold tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
                <span className="text-white">8bit</span>
                <span className="text-primary-light"> café</span>
              </span>
            </Link>

            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              The ultimate gaming lounge experience. Top-tier PCs, epic tournaments,
              and a community that levels up together.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <SocialIcon href="#" label="Discord">
                {/* Discord icon */}
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter / X">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-text-muted text-sm hover:text-primary-light transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-text-muted text-sm hover:text-primary-light transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-text-muted text-sm hover:text-primary-light transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} 8bit Café. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Crafted with ♥ for gamers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
