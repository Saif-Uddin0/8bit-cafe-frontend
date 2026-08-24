"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyBookings } from "@/hooks/useMyBookings";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import notify from "@/lib/notify";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  Gamepad2,
  Loader2,
  LogIn,
  Clock,
  CalendarDays,
  Ticket,
  Timer,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ApiBooking } from "@/types/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCountdown(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Payment Status Badge ─────────────────────────────────────────────────────

const PAYMENT_STATUS: Record<string, string> = {
  PAID: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PENDING: "bg-amber-500/15  text-amber-400  border-amber-500/30",
  FAILED: "bg-red-500/15    text-red-400    border-red-500/30",
};

function PaymentBadge({ status }: { status: string }) {
  const cls = PAYMENT_STATUS[status] ?? "bg-white/5 text-white/40 border-white/10";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cls}`}>
      {status}
    </span>
  );
}

// ─── Game Status Badge ────────────────────────────────────────────────────────

const GAME_STATUS: Record<string, string> = {
  NOT_STARTED: "bg-blue-500/15  text-blue-400  border-blue-500/30",
  RUNNING: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  COMPLETED: "bg-teal-500/15  text-teal-400  border-teal-500/30",
};

function GameStatusBadge({ status }: { status: string }) {
  const cls = GAME_STATUS[status] ?? "bg-white/5 text-white/40 border-white/10";
  const label = status?.replace(/_/g, " ") ?? status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cls}`}>
      {label}
    </span>
  );
}

// ─── Countdown for PENDING bookings ───────────────────────────────────────────

function PendingCountdown({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const target = new Date(expiresAt).getTime();
    const update = () => setTimeLeft(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (timeLeft <= 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-amber-400">
      <Clock size={12} className="animate-pulse" />
      <span className="font-mono text-xs font-bold">{formatCountdown(timeLeft)}</span>
    </div>
  );
}

// ─── Live Booking Countdown component (uses expiresAt) ──────────────────────────

function BookingCountdown({ expiresAt }: { expiresAt: string }) {
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const hasRefetched = useRef(false);

  useEffect(() => {
    const target = new Date(expiresAt).getTime();
    const update = () => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeLeft(diff);

      if (diff <= 0 && !hasRefetched.current) {
        hasRefetched.current = true;
        queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt, queryClient]);

  if (timeLeft === null) return <span className="text-white/40">Calculating...</span>;

  if (timeLeft <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
        Session Expired
      </span>
    );
  }

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  let timeString = "";
  if (hours > 0) {
    timeString = `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  } else {
    timeString = `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  }

  return (
    <span className="text-[#CD4ECD] font-bold font-mono text-xs sm:text-sm">
      {timeString}
    </span>
  );
}

// ─── Loading Skeleton Card ────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-[#12091F] border border-[#6C04D7]/20 rounded-2xl p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl bg-[#6C04D7]/20 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between gap-2">
            <div className="h-4 bg-[#6C04D7]/20 rounded w-2/5" />
            <div className="h-5 bg-[#6C04D7]/10 rounded-full w-16" />
          </div>
          <div className="h-3 bg-white/5 rounded w-4/5" />
          <div className="h-3 bg-white/5 rounded w-3/5" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 bg-[#6C04D7]/10 rounded-full w-20" />
            <div className="h-5 bg-[#6C04D7]/10 rounded-full w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({ booking }: { booking: ApiBooking }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isPaying, setIsPaying] = useState(false);

  const isPending = booking.status === "PENDING";
  const gameImageUrl = booking.game?.images?.[0]?.url ?? "/banner-2.png";
  const gameName = booking.game?.name ?? "Gaming Session";
  const description = booking.game?.description ?? "";

  const handleContinuePayment = async () => {
    if (isPaying) return;
    setIsPaying(true);
    try {
      const paymentRes = await axiosSecure.post("/api/payment/initialize", {
        bookingId: booking.id,
        paymentType: "GAME",
      });

      const paymentData = paymentRes.data?.data;
      const redirectUrl =
        paymentData?.RedirectURL ||
        paymentData?.redirectUrl ||
        paymentData?.paymentUrl ||
        paymentData?.url ||
        paymentRes.data?.RedirectURL ||
        paymentRes.data?.redirectUrl;

      if (!redirectUrl) throw new Error("Payment URL not found in response.");

      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      window.location.href = redirectUrl;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Payment initialization failed.";
      notify.error("Payment Failed", msg, 5000);
      setIsPaying(false);
    }
  };

  return (
    <div className="group bg-[#12091F] border border-[#6C04D7]/30 hover:border-[#6C04D7]/70 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,4,215,0.15)]">
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Game Image */}
        <div className="relative sm:w-44 h-36 sm:h-auto flex-shrink-0">
          <Image
            src={gameImageUrl}
            alt={gameName}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/banner-2.png"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#12091F] hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#12091F] sm:hidden" />
        </div>

        {/* Details */}
        <div className="flex-1 p-5">
          {/* Name + Badges */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-white text-base leading-tight">{gameName}</h3>
            <div className="flex flex-wrap gap-1.5">
              <PaymentBadge status={booking.status} />
              {booking.gameStatus && <GameStatusBadge status={booking.gameStatus} />}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/50 mb-3">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
              <span>{formatDate(booking.startTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
              <span>Start: {formatTime(booking.startTime)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
              <span>Duration: {booking.durationMin} min</span>
            </div>
            {booking.expiresAt && (
              <>
                <div className="flex items-center gap-1.5">
                  <Zap size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
                  <span>Expires: {formatTime(booking.expiresAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2 border-t border-white/5 pt-1.5 mt-0.5">
                  <Timer size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
                  <span className="text-white/40">Time Remaining:</span>
                  <BookingCountdown expiresAt={booking.expiresAt} />
                </div>
              </>
            )}
          </div>

          {/* Amount */}
          {booking.totalAmount && (
            <div className="flex items-center gap-1.5 mb-3">
              <Ticket size={11} className="text-[#CD4ECD]/60 flex-shrink-0" />
              <span className="text-xs text-white/50">
                Total:{" "}
                <span className="text-[#CD4ECD] font-bold">{booking.totalAmount} Tk</span>
                {booking.serviceFee && (
                  <span className="text-white/30"> (incl. {booking.serviceFee} Tk service fee)</span>
                )}
              </span>
            </div>
          )}

          {/* PENDING: countdown + continue payment */}
          {isPending && (
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              {booking.expiresAt ? (
                <PendingCountdown expiresAt={booking.expiresAt} />
              ) : (
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Awaiting Payment
                </span>
              )}
              <button
                onClick={handleContinuePayment}
                disabled={isPaying}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] text-white font-bold text-[10px] uppercase tracking-wider hover:shadow-[0_0_15px_rgba(108,4,215,0.5)] hover:scale-[1.03] active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPaying && <Loader2 size={10} className="animate-spin" />}
                Continue Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="w-24 h-24 rounded-2xl bg-[#6C04D7]/10 border border-[#6C04D7]/20 flex items-center justify-center">
        <Gamepad2 size={40} className="text-[#6C04D7]/60" strokeWidth={1.5} />
      </div>
      <div>
        <h2
          className="text-2xl text-white uppercase tracking-wider mb-2"
          style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
        >
          No Bookings Yet
        </h2>
        <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
          You haven&apos;t made any gaming session bookings. Browse our games and reserve your slot!
        </p>
      </div>
      <Link
        href="/game"
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] text-white font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(108,4,215,0.6)] hover:scale-[1.02] active:scale-95 transition"
      >
        Browse Games
      </Link>
    </div>
  );
}

// ─── Sign In Prompt ───────────────────────────────────────────────────────────

function SignInPrompt() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="w-24 h-24 rounded-2xl bg-[#6C04D7]/10 border border-[#6C04D7]/20 flex items-center justify-center">
        <LogIn size={40} className="text-[#6C04D7]/60" strokeWidth={1.5} />
      </div>
      <div>
        <h2
          className="text-2xl text-white uppercase tracking-wider mb-2"
          style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
        >
          Sign In Required
        </h2>
        <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
          Please sign in to your 8bit Café account to view your booking history.
        </p>
      </div>
      <Link
        href="/login"
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] text-white font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(108,4,215,0.6)] hover:scale-[1.02] active:scale-95 transition"
      >
        Sign In
      </Link>
    </div>
  );
}

// Page

function MyBookingsPageContent() {
  const { user, loading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  const { data: bookings = [], isLoading, isError } = useMyBookings({
    enabled: isAuthenticated,
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0A0612] pt-28 pb-20 px-4 mt-20">
        <div className="max-w-3xl mx-auto">

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#6C04D7]/20 border border-[#6C04D7]/30 flex items-center justify-center">
              <Gamepad2 className="text-[#CD4ECD]" size={22} />
            </div>
            <div>
              <h1
                className="text-3xl text-white uppercase tracking-wider leading-none"
                style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
              >
                My Bookings
              </h1>
              <p className="text-white/40 text-xs mt-0.5">Your gaming session history</p>
            </div>
          </div>

          {/* Auth loading */}
          {authLoading && (
            <div className="flex justify-center py-24">
              <Loader2 size={32} className="animate-spin text-[#6C04D7]" />
            </div>
          )}

          {/* Unauthenticated */}
          {!authLoading && !isAuthenticated && <SignInPrompt />}

          {/* Authenticated — loading skeletons */}
          {!authLoading && isAuthenticated && isLoading && (
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Authenticated — error */}
          {!authLoading && isAuthenticated && isError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
              <p className="text-red-400 font-bold text-sm mb-1">Failed to load bookings.</p>
              <p className="text-white/40 text-xs">Please try refreshing the page.</p>
            </div>
          )}

          {/* Authenticated — empty */}
          {!authLoading && isAuthenticated && !isLoading && !isError && bookings.length === 0 && (
            <EmptyBookings />
          )}

          {/* Authenticated — list */}
          {!authLoading && isAuthenticated && !isLoading && !isError && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0612] flex items-center justify-center pt-24">
        <Loader2 className="w-8 h-8 text-[#CD4ECD] animate-spin" />
      </div>
    }>
      <MyBookingsPageContent />
    </Suspense>
  );
}
