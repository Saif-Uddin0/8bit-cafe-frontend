// Mock data for upcoming tournaments
const tournaments = [
  {
    id: 1,
    name: "Valorant Champions Cup",
    game: "Valorant",
    gameIcon: "🎯",
    prizePool: "$5,000",
    date: "July 15, 2026",
    time: "6:00 PM",
    slots: 32,
    filledSlots: 24,
    status: "Open",
    statusColor: "#22C55E",
    accentColor: "#FF4655",
    format: "5v5",
    type: "Online",
  },
  {
    id: 2,
    name: "CS2 Pro League",
    game: "Counter-Strike 2",
    gameIcon: "🔫",
    prizePool: "$3,500",
    date: "July 20, 2026",
    time: "7:00 PM",
    slots: 16,
    filledSlots: 16,
    status: "Full",
    statusColor: "#EF4444",
    accentColor: "#F0A500",
    format: "5v5",
    type: "LAN",
  },
  {
    id: 3,
    name: "LoL Clash Season 4",
    game: "League of Legends",
    gameIcon: "⚔️",
    prizePool: "$2,000",
    date: "July 28, 2026",
    time: "5:00 PM",
    slots: 64,
    filledSlots: 38,
    status: "Open",
    statusColor: "#22C55E",
    accentColor: "#C89B3C",
    format: "5v5",
    type: "Online",
  },
  {
    id: 4,
    name: "Apex Predator Tournament",
    game: "Apex Legends",
    gameIcon: "🦅",
    prizePool: "$1,500",
    date: "August 5, 2026",
    time: "8:00 PM",
    slots: 20,
    filledSlots: 8,
    status: "Open",
    statusColor: "#22C55E",
    accentColor: "#E05F1B",
    format: "Trios",
    type: "Online",
  },
];

// --- Progress bar for filled slots ---
function SlotBar({ filled, total }: { filled: number; total: number }) {
  const percent = Math.round((filled / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-text-muted mb-1.5">
        <span>{filled}/{total} slots filled</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-light overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: percent >= 100
              ? "linear-gradient(90deg, #EF4444, #DC2626)"
              : "linear-gradient(90deg, #7C3AED, #A78BFA)",
          }}
        />
      </div>
    </div>
  );
}

// --- Single tournament card ---
function TournamentCard({ tournament }: { tournament: typeof tournaments[0] }) {
  const isFull = tournament.status === "Full";

  return (
    <div className="glass-card card-hover rounded-2xl overflow-hidden">
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${tournament.accentColor}, ${tournament.accentColor}44)`,
        }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                backgroundColor: `${tournament.accentColor}22`,
                border: `1px solid ${tournament.accentColor}44`,
              }}
            >
              {tournament.gameIcon}
            </div>
            <div>
              <div className="text-text-muted text-xs">{tournament.game}</div>
              <div
                className="text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 inline-flex"
                style={{
                  backgroundColor: `${tournament.statusColor}22`,
                  color: tournament.statusColor,
                }}
              >
                {tournament.status}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
              {tournament.prizePool}
            </div>
            <div className="text-xs text-text-muted">Prize Pool</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base mb-4 leading-tight">{tournament.name}</h3>

        {/* Slot progress */}
        <SlotBar filled={tournament.filledSlots} total={tournament.slots} />

        {/* Info row */}
        <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {tournament.date}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tournament.time}
          </span>
          <span className="ml-auto flex items-center gap-1">
            {tournament.format} • {tournament.type}
          </span>
        </div>

        {/* Join button */}
        <button
          type="button"
          disabled={isFull}
          className={`w-full mt-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isFull
              ? "bg-surface-light text-text-muted cursor-not-allowed border border-border"
              : "btn-primary text-white"
          }`}
        >
          {isFull ? "Tournament Full" : "Register Now →"}
        </button>
      </div>
    </div>
  );
}

export default function TournamentsSection() {
  return (
    <section id="tournaments" className="py-20 lg:py-28 relative">
      {/* Decorative glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
            Tournaments
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Upcoming <span className="gradient-text">Tournaments</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            Compete for glory and real prize pools. Register now before slots run out!
          </p>
        </div>

        {/* Tournament cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-primary-light hover:text-white font-semibold text-sm transition-colors group"
          >
            View All Tournaments
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
