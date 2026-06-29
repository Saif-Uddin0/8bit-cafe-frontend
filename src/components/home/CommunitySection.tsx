// Event data for the community section
const events = [
  {
    id: 1,
    title: "Grand Opening Bash",
    date: "March 2026",
    attendees: 250,
    description: "Our grand opening weekend brought together 250+ gamers for a night of epic gaming and community building.",
    emoji: "🎉",
    highlight: true,
  },
  {
    id: 2,
    title: "Valorant Open",
    date: "April 2026",
    attendees: 128,
    description: "32-team Valorant tournament with live commentary, crowd energy, and a $2,000 prize pool.",
    emoji: "🎯",
    highlight: false,
  },
  {
    id: 3,
    title: "LAN Party Night",
    date: "May 2026",
    attendees: 80,
    description: "All-night LAN party. Gamers from across the city came to play, eat, and make memories.",
    emoji: "🌙",
    highlight: false,
  },
  {
    id: 4,
    title: "Charity Speedrun Marathon",
    date: "May 2026",
    attendees: 180,
    description: "12-hour speedrun marathon raising $8,000 for a local youth tech education program.",
    emoji: "❤️",
    highlight: true,
  },
  {
    id: 5,
    title: "Retro Gaming Day",
    date: "June 2026",
    attendees: 95,
    description: "Classic consoles, pixel art workshops, and nostalgia-packed gameplay from the 80s and 90s.",
    emoji: "👾",
    highlight: false,
  },
  {
    id: 6,
    title: "Summer Gaming Fest",
    date: "June 2026",
    attendees: 320,
    description: "Our biggest event yet — 2 days of tournaments, workshops, cosplay, and live music.",
    emoji: "☀️",
    highlight: true,
  },
];

// Community stats
const communityStats = [
  { value: "10K+", label: "Discord Members", icon: "💬" },
  { value: "50+", label: "Events Hosted", icon: "🎮" },
  { value: "$25K+", label: "Prize Pool Distributed", icon: "🏆" },
  { value: "4.9★", label: "Average Rating", icon: "⭐" },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 lg:py-28 relative">
      {/* Top divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">Community</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Built by <span className="gradient-text">Gamers</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            From epic tournaments to chill gaming nights — our community events bring players together.
          </p>
        </div>

        {/* Community stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-2xl font-black gradient-text mb-1"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {stat.value}
              </div>
              <div className="text-text-muted text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Events grid */}
        <h3 className="text-white text-xl font-bold mb-6">Past Events Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className={`glass-card card-hover rounded-2xl p-6 relative overflow-hidden ${
                event.highlight ? "border-primary/40" : ""
              }`}
            >
              {/* Highlight badge */}
              {event.highlight && (
                <div className="absolute top-3 right-3">
                  <span className="section-tag text-xs py-0.5 px-2">Featured</span>
                </div>
              )}

              {/* Emoji icon */}
              <div className="text-4xl mb-4">{event.emoji}</div>

              {/* Content */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary-light text-xs font-medium">{event.date}</span>
                <span className="text-border">•</span>
                <span className="text-success text-xs font-medium">{event.attendees} attended</span>
              </div>
              <h4 className="text-white font-bold text-base mb-2">{event.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>

        {/* Join community CTA */}
        <div className="mt-14 text-center glass-card rounded-3xl p-10 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🎮</div>
            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Join Our <span className="gradient-text">Community</span>
            </h3>
            <p className="text-text-muted text-base max-w-md mx-auto mb-8">
              Connect with thousands of gamers, get early access to events, and be part of something epic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white"
              >
                {/* Discord icon */}
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Join Discord
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-primary text-text-secondary hover:text-white text-sm font-semibold transition-all duration-300"
              >
                View All Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
