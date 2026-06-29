import Link from "next/link";

// --- Social media icon helper ---
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-muted hover:border-primary hover:text-primary-light transition-all duration-300 hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
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
            <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:border-primary transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <path
                    d="M6 12H10M8 10V14M15 12H15.01M17 11H17.01M7.2 8H16.8C18.8 8 19.8 8 20.55 8.44C21.18 8.82 21.64 9.4 21.87 10.08C22.13 10.85 21.89 11.82 21.42 13.77L21 15.5C20.6 17.12 20.4 17.94 19.9 18.54C19.46 19.07 18.89 19.47 18.25 19.7C17.52 19.96 16.68 19.9 15 19.78L14 19.7C12.9 19.62 12.35 19.58 11.82 19.63C11.36 19.67 10.91 19.78 10.48 19.95C9.99 20.14 9.55 20.45 8.67 21.05L8.3 21.3C7.53 21.82 7.15 22.08 6.81 22.08C6.51 22.08 6.23 21.95 6.04 21.72C5.81 21.45 5.76 21.01 5.66 20.13L5.5 18.72C5.36 17.56 5.29 16.97 5.12 16.45C4.97 15.99 4.76 15.55 4.5 15.15C4.2 14.69 3.79 14.3 2.96 13.51L2.7 13.26C2.27 12.84 2.06 12.63 1.97 12.44C1.88 12.24 1.88 12.02 1.97 11.82C2.06 11.62 2.27 11.41 2.7 10.98L2.96 10.74C3.79 9.95 4.2 9.55 4.5 9.1C4.76 8.7 4.97 8.26 5.12 7.8C5.29 7.27 5.36 6.69 5.5 5.53L5.66 4.12C5.76 3.24 5.81 2.8 6.04 2.53C6.23 2.3 6.51 2.17 6.81 2.17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
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
