"use client";

import React, { useState, Suspense } from "react";
import { Search } from "lucide-react";
import GameCategories from "@/components/game/GameCategories";
import GameServiceCard from "@/components/home/game-services/GameServiceCard";
import BookingModal, { type BookingFormData } from "@/components/home/game-services/BookingModal";
import BookingSummaryModal from "@/components/home/game-services/BookingSummaryModal";
import { useGames } from "@/hooks/useGames";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function GameCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center w-full rounded-[24px] border border-white/10 bg-white/5 pt-10 pb-5 px-5 animate-pulse">
      <div className="w-[150px] h-[150px] rounded-full bg-white/10 mb-5" />
      <div className="h-3 w-16 rounded-full bg-white/10 mb-2" />
      <div className="h-5 w-36 rounded-full bg-white/10 mb-4" />
      <div className="flex flex-col gap-2 w-full mb-5">
        <div className="flex justify-between">
          <div className="h-3 w-12 rounded-full bg-white/10" />
          <div className="h-4 w-16 rounded-full bg-white/10" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-12 rounded-full bg-white/10" />
          <div className="h-4 w-16 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="h-10 w-full rounded-md bg-white/10" />
    </div>
  );
}

// ─── Inner page content ───────────────────────────────────────────────────────
function GamesPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  const { data: gamesList, isLoading, isError } = useGames();
  const allGames = gamesList ?? [];

  // Client-side filter: category + search
  const filteredGames = allGames.filter((game) => {
    const matchesCategory =
      activeCategory === "All" ||
      game.category?.name === activeCategory;
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBook = (gameId: string) => {
    setSelectedGameId(gameId);
    setBookingOpen(true);
  };

  const handleBookingConfirm = (data: BookingFormData) => {
    setBookingData(data);
    setBookingOpen(false);
    setSummaryOpen(true);
  };

  const handlePaid = () => {
    setSummaryOpen(false);
    setBookingData(null);
  };

  return (
    <>
      {/* ── Search bar ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-2">
        <div className="relative w-full max-w-[500px] mx-auto">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
          />
          <input
            type="text"
            id="game-search"
            placeholder="Search Games"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full rounded-2xl border border-white/10 bg-[#1A0A38]/60 py-3 pl-11 pr-5
              text-sm text-white placeholder-white/35
              focus:border-[#CD4ECD]/60 focus:outline-none focus:ring-0
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* ── Game Categories Swiper ── */}
      <GameCategories
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* ── Games grid ── */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-20">
        {/* Sub-header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <h2
            className="text-3xl sm:text-4xl bg-gradient-to-r from-[#F862C9] to-[#873CE2] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
          >
            {activeCategory === "All" ? "All Games" : activeCategory}
          </h2>
          <p className="text-xs sm:text-sm text-white/40">
            {isLoading ? "Loading…" : `${filteredGames.length} games found`}
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border border-red-500/20 bg-red-900/10 text-white/50 text-center">
            <p className="text-base font-semibold">Failed to load games</p>
            <p className="text-sm">Please check your connection and try again.</p>
          </div>
        )}

        {/* Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filteredGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border border-white/5 bg-[#12091F]/40 text-white/40 text-center">
            <Search size={44} strokeWidth={1.2} />
            <p className="text-base font-semibold">No games match your search</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-1 text-[#CD4ECD] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Game grid */}
        {!isLoading && !isError && filteredGames.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameServiceCard key={game.id} service={game} isCenter={true} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>

      {/* Booking modals */}
      {bookingOpen && (
        <BookingModal
          isOpen={bookingOpen}
          initialServiceId={selectedGameId}
          onClose={() => setBookingOpen(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
      <BookingSummaryModal
        isOpen={summaryOpen}
        data={bookingData}
        onClose={() => setSummaryOpen(false)}
        onPaid={handlePaid}
      />
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GamesPage() {
  return (
    <div className="relative min-h-screen bg-[#080818] pt-32 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-1/4 h-[600px] w-[600px] rounded-full bg-[#6C04D7]/5 blur-[160px]" />
        <div className="absolute -right-60 bottom-0 h-[600px] w-[600px] rounded-full bg-[#CD4ECD]/4 blur-[160px]" />
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-white/40 text-sm">
            Loading games…
          </div>
        }
      >
        <GamesPageContent />
      </Suspense>
    </div>
  );
}
