// Mock data for top players
const topPlayers = [
  {
    id: 1,
    rank: 1,
    name: "ShadowByte",
    username: "@shadowbyte",
    avatar: "SB",
    avatarColor: "#7C3AED",
    level: 98,
    score: 48_200,
    game: "Valorant",
    badge: "Legendary",
    badgeColor: "#F59E0B",
    wins: 234,
    winRate: "78%",
  },
  {
    id: 2,
    rank: 2,
    name: "NeonStrike",
    username: "@neonstrike",
    avatar: "NS",
    avatarColor: "#EF4444",
    level: 94,
    score: 45_100,
    game: "CS2",
    badge: "Diamond",
    badgeColor: "#38BDF8",
    wins: 198,
    winRate: "73%",
  },
  {
    id: 3,
    rank: 3,
    name: "PixelKnight",
    username: "@pixelknight",
    avatar: "PK",
    avatarColor: "#22C55E",
    level: 91,
    score: 42_800,
    game: "League of Legends",
    badge: "Platinum",
    badgeColor: "#6EE7B7",
    wins: 176,
    winRate: "69%",
  },
  {
    id: 4,
    rank: 4,
    name: "CyberRex",
    username: "@cyberrex",
    avatar: "CR",
    avatarColor: "#F59E0B",
    level: 88,
    score: 40_300,
    game: "Dota 2",
    badge: "Gold",
    badgeColor: "#FCD34D",
    wins: 152,
    winRate: "65%",
  },
  {
    id: 5,
    rank: 5,
    name: "VoidRunner",
    username: "@voidrunner",
    avatar: "VR",
    avatarColor: "#EC4899",
    level: 85,
    score: 38_600,
    game: "Fortnite",
    badge: "Gold",
    badgeColor: "#FCD34D",
    wins: 138,
    winRate: "62%",
  },
  {
    id: 6,
    rank: 6,
    name: "GlitchHunter",
    username: "@glitchhunter",
    avatar: "GH",
    avatarColor: "#14B8A6",
    level: 82,
    score: 36_900,
    game: "Apex Legends",
    badge: "Silver",
    badgeColor: "#CBD5E1",
    wins: 124,
    winRate: "59%",
  },
];

// --- Rank badge colors for top 3 ---
const rankColors: Record<number, string> = {
  1: "#F59E0B",
  2: "#94A3B8",
  3: "#CD7F32",
};

// --- Single player card ---
function PlayerCard({ player }: { player: typeof topPlayers[0] }) {
  const isTopThree = player.rank <= 3;

  return (
    <div
      className={`glass-card card-hover rounded-2xl p-5 relative overflow-hidden ${
        isTopThree ? "border-opacity-60" : ""
      }`}
      style={
        isTopThree
          ? { borderColor: `${rankColors[player.rank]}44` }
          : undefined
      }
    >
      {/* Top-3 crown overlay */}
      {isTopThree && (
        <div
          className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${rankColors[player.rank]}18 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
          style={{
            backgroundColor: `${rankColors[player.rank] ?? "#7E78A3"}22`,
            color: rankColors[player.rank] ?? "#7E78A3",
            border: `1px solid ${rankColors[player.rank] ?? "#7E78A3"}44`,
          }}
        >
          #{player.rank}
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${player.badgeColor}22`,
            color: player.badgeColor,
          }}
        >
          {player.badge}
        </span>
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
          style={{ backgroundColor: player.avatarColor }}
        >
          {player.avatar}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{player.name}</div>
          <div className="text-text-muted text-xs">{player.username}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-surface-light mb-4">
        <div className="text-center">
          <div className="text-white text-sm font-bold">{player.level}</div>
          <div className="text-text-muted text-xs">Level</div>
        </div>
        <div className="text-center border-x border-border">
          <div className="text-white text-sm font-bold">{player.wins}</div>
          <div className="text-text-muted text-xs">Wins</div>
        </div>
        <div className="text-center">
          <div className="text-success text-sm font-bold">{player.winRate}</div>
          <div className="text-text-muted text-xs">Win Rate</div>
        </div>
      </div>

      {/* Favorite game */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">Playing</span>
        <span className="text-xs font-semibold text-primary-light">{player.game}</span>
      </div>
    </div>
  );
}

export default function TopPlayers() {
  return (
    <section id="leaderboard" className="py-20 lg:py-28 relative">
      {/* Background glow strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Leaderboard
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Top <span className="gradient-text">Players</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            Our most legendary gamers. Can you claim your spot at the top?
          </p>
        </div>

        {/* Players grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* CTA to full leaderboard */}
        <div className="text-center mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border hover:border-primary text-text-secondary hover:text-white text-sm font-semibold transition-all duration-300"
          >
            View Full Leaderboard
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
