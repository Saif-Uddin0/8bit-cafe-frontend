"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import GameDetails from "@/app/(main)/game/GameDetails";
import { useGameDetail } from "@/hooks/useGameDetail";

// ─── Full-page skeleton ───────────────────────────────────────────────────────
function GameDetailSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="rounded-[32px] border border-white/10 bg-[#1A0A38] p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery image stage placeholder */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl bg-white/10" />
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-xl bg-white/10" />
              <div className="w-20 h-20 rounded-xl bg-white/10" />
              <div className="w-20 h-20 rounded-xl bg-white/10" />
            </div>
          </div>
          {/* Info column placeholder */}
          <div className="lg:col-span-6 space-y-5 pt-2">
            <div className="flex gap-2">
              <div className="h-6 w-24 rounded-full bg-white/10" />
              <div className="h-6 w-36 rounded-full bg-white/10" />
            </div>
            <div className="h-10 w-4/5 rounded-2xl bg-white/10" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-24 rounded-2xl bg-white/10" />
              <div className="h-24 rounded-2xl bg-white/10" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded-full bg-white/10" />
              <div className="h-4 w-3/4 rounded-full bg-white/10" />
            </div>
            <div className="h-14 w-full rounded-2xl bg-white/10 pt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inner component that uses the hook ──────────────────────────────────────
function GamePageContent({ id }: { id: string }) {
  const { data: game, isLoading, isError } = useGameDetail(id);

  if (isLoading) return <GameDetailSkeleton />;

  if (isError || !game) return notFound();

  return <GameDetails game={game} />;
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <main className="bg-[#080818] min-h-screen pt-32 pb-20">
      <GamePageContent id={id} />
    </main>
  );
}
