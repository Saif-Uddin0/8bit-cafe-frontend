// Mock data for featured games
const games = [
  {
    id: 1,
    name: "Valorant",
    category: "FPS",
    players: "1.2K playing",
    rating: 4.9,
    accentColor: "#FF4655",
    bgColor: "#FF465522",
    icon: "🎯",
  },
  {
    id: 2,
    name: "League of Legends",
    category: "MOBA",
    players: "2.4K playing",
    rating: 4.8,
    accentColor: "#C89B3C",
    bgColor: "#C89B3C22",
    icon: "⚔️",
  },
  {
    id: 3,
    name: "Counter-Strike 2",
    category: "FPS",
    players: "980 playing",
    rating: 4.7,
    accentColor: "#F0A500",
    bgColor: "#F0A50022",
    icon: "🔫",
  },
  {
    id: 4,
    name: "Dota 2",
    category: "MOBA",
    players: "750 playing",
    rating: 4.6,
    accentColor: "#B23333",
    bgColor: "#B2333322",
    icon: "🏹",
  },
  {
    id: 5,
    name: "Fortnite",
    category: "Battle Royale",
    players: "1.1K playing",
    rating: 4.5,
    accentColor: "#4A90D9",
    bgColor: "#4A90D922",
    icon: "🪂",
  },
  {
    id: 6,
    name: "Apex Legends",
    category: "Battle Royale",
    players: "890 playing",
    rating: 4.7,
    accentColor: "#E05F1B",
    bgColor: "#E05F1B22",
    icon: "🦅",
  },
  {
    id: 7,
    name: "Minecraft",
    category: "Sandbox",
    players: "600 playing",
    rating: 4.9,
    accentColor: "#5E8A3A",
    bgColor: "#5E8A3A22",
    icon: "⛏️",
  },
  {
    id: 8,
    name: "FIFA 25",
    category: "Sports",
    players: "430 playing",
    rating: 4.4,
    accentColor: "#1A73E8",
    bgColor: "#1A73E822",
    icon: "⚽",
  },
];

// --- Star rating renderer ---
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth={2}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="text-text-muted text-xs ml-1">{rating}</span>
    </div>
  );
}

// --- Single game card ---
function GameCard({ game }: { game: typeof games[0] }) {
  return (
    <div className="glass-card card-hover rounded-2xl p-5 flex flex-col gap-4">
      {/* Game icon + category badge */}
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            backgroundColor: game.bgColor,
            border: `1px solid ${game.accentColor}44`,
          }}
        >
          {game.icon}
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: game.bgColor,
            color: game.accentColor,
            border: `1px solid ${game.accentColor}44`,
          }}
        >
          {game.category}
        </span>
      </div>

      {/* Game name */}
      <div>
        <h3 className="text-white font-bold text-base leading-tight">{game.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
          <span className="text-text-muted text-xs">{game.players}</span>
        </div>
      </div>

      {/* Rating and play button */}
      <div className="flex items-center justify-between mt-auto">
        <StarRating rating={game.rating} />
        <button
          type="button"
          className="text-xs font-semibold text-primary-light hover:text-white border border-border hover:border-primary px-3 py-1.5 rounded-full transition-all duration-200"
        >
          Play Now
        </button>
      </div>
    </div>
  );
}

export default function FeaturedGames() {
  return (
    <section id="games" className="py-20 lg:py-28 relative">
      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4 inline-flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Popular Games
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Top <span className="gradient-text">Games</span>
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            Dive into the most popular titles at 8bit Café. High-performance rigs ready for every genre.
          </p>
        </div>

        {/* Games grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-primary-light hover:text-white font-semibold text-sm transition-colors group"
          >
            View All Games
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
