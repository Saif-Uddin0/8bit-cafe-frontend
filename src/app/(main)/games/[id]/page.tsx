"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import GameDetails from "@/app/(main)/game/GameDetails";
import { useGameDetail } from "@/hooks/useGameDetail";

// ─── Full-page skeleton ───────────────────────────────────────────────────────
function GameDetailSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 animate-pulse">
      <div className="rounded-[28px] border border-white/10 bg-[#1A0A38] p-8 lg:p-10 grid lg:grid-cols-[320px_1fr] gap-12">
        {/* Image placeholder */}
        <div className="flex justify-center items-start">
          <div className="w-[270px] h-[270px] rounded-full bg-white/10" />
        </div>
        {/* Info placeholder */}
        <div className="space-y-4 pt-2">
          <div className="h-8 w-64 rounded-full bg-white/10" />
          <div className="h-5 w-32 rounded-full bg-white/10" />
          <div className="space-y-2 mt-4">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-4 w-48 rounded-full bg-white/10" />
          </div>
          <div className="h-20 w-full rounded-xl bg-white/10 mt-4" />
          <div className="h-10 w-28 rounded-full bg-white/10 mt-4" />
          <div className="flex gap-4 mt-6">
            <div className="h-12 w-36 rounded-xl bg-white/10" />
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
