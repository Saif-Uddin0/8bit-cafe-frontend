// Features data for the "Why 8bit Café" section
const features = [
  {
    id: 1,
    title: "Lightning Fast PCs",
    description:
      "Top-tier gaming rigs with RTX 4080 GPUs, 360Hz monitors, and mechanical keyboards for an unmatched gaming experience.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-primary-light">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    accentColor: "#A78BFA",
  },
  {
    id: 2,
    title: "Pro Tournaments",
    description:
      "Weekly and monthly tournaments with real prize pools. Compete against the best and prove your skills on our arena stages.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
    accentColor: "#F59E0B",
  },
  {
    id: 3,
    title: "24/7 Community",
    description:
      "Day or night, there's always someone to play with. Join our Discord community of 10,000+ active members.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-success">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    accentColor: "#22C55E",
  },
  {
    id: 4,
    title: "Café & Snacks",
    description:
      "Fuel your gaming sessions with specialty coffee, energy drinks, and a full snack menu prepared fresh daily.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-info">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 10.5l1.75-6.5h12.996l1.754 6.5M3.75 10.5h16.5M3.75 10.5a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25h.75m12.75-6h.75a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25h-.75m-12.75 0h12.75m-12.75 0l.75 6h11.25l.75-6" />
      </svg>
    ),
    accentColor: "#38BDF8",
  },
  {
    id: 5,
    title: "Coaching & Training",
    description:
      "Level up your skills with sessions from pro-level coaches. Personalized plans for all ranks and game genres.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    accentColor: "#8B5CF6",
  },
  {
    id: 6,
    title: "Exclusive Memberships",
    description:
      "Unlock premium perks with our membership plans — priority booking, discounts, exclusive tournaments, and more.",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-error">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    accentColor: "#EF4444",
  },
];

// --- Single feature card ---
function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="glass-card card-hover rounded-2xl p-6 flex flex-col gap-4">
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${feature.accentColor}18`,
          border: `1px solid ${feature.accentColor}30`,
        }}
      >
        {feature.icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
      </div>

      {/* Subtle bottom accent line */}
      <div
        className="h-px w-12 rounded-full mt-2"
        style={{ backgroundColor: feature.accentColor }}
      />
    </div>
  );
}

export default function WhyCafe() {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      {/* Section background accent */}
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">Why Choose Us</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Why <span className="gradient-text">8bit Café?</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            We&apos;re not just a gaming café — we&apos;re a full gaming ecosystem built for passionate players.
          </p>
        </div>

        {/* Features grid — 3 columns on desktop, 2 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
