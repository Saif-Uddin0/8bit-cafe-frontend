"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyTransactions } from "@/hooks/useMyTransactions";
import { useMyBookings } from "@/hooks/useMyBookings";
import {
  Receipt,
  Loader2,
  LogIn,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BadgeCheck,
  Gamepad2,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import type { ApiTransaction } from "@/types/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  SUCCESS: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PENDING: "bg-amber-500/15  text-amber-400  border-amber-500/30",
  FAILED: "bg-red-500/15    text-red-400    border-red-500/30",
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-white/5 text-white/40 border-white/10";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cls}`}>
      {status === "SUCCESS" && <BadgeCheck size={10} />}
      {status}
    </span>
  );
}

// ─── Payment Type Badge ───────────────────────────────────────────────────────

function PaymentTypeBadge({ type }: { type: string }) {
  const isGame = type === "GAME";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isGame
          ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
          : "bg-pink-500/15 text-pink-400 border-pink-500/30"
        }`}
    >
      {isGame ? <Gamepad2 size={10} /> : <Utensils size={10} />}
      {type}
    </span>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="bg-[#12091F] border border-[#6C04D7]/20 rounded-2xl p-4 sm:p-5 animate-pulse">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-[#6C04D7]/20 rounded-full" />
          <div className="h-5 w-14 bg-[#6C04D7]/10 rounded-full" />
        </div>
        <div className="h-4 w-24 bg-white/5 rounded" />
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="h-3 bg-white/5 rounded" />
        <div className="h-3 bg-white/5 rounded" />
        <div className="h-3 bg-white/5 rounded" />
      </div>
    </div>
  );
}

// ─── Transaction Detail Expand Panel (supports GAME & FOOD) ───────────────────

function TransactionDetailPanel({ txn }: { txn: ApiTransaction }) {
  const isGame = txn.paymentType === "GAME";
  const { data: bookings = [] } = useMyBookings();
  const booking = isGame
    ? bookings.find((b) => b.id === txn.gameBookingId || b.id === txn.customerOrderId)
    : null;

  if (isGame) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/50">
        <div>
          <span className="text-white/30 block mb-0.5">Game Name</span>
          <span className="text-white/70 font-semibold">{booking?.game?.name ?? "Gaming Session"}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Booking ID</span>
          <span className="text-white/70 font-mono break-all">{txn.gameBookingId || "—"}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Payment Method</span>
          <span className="text-white/70">{txn.paymentMethod}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Transaction ID</span>
          <span className="text-white/70 font-mono break-all">{txn.transactionId || "—"}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Merchant Transaction ID</span>
          <span className="text-white/70 font-mono break-all">{txn.merchantTxnId || "—"}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Amount</span>
          <span className="text-[#CD4ECD] font-bold">{txn.amount} Tk</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Status</span>
          <span className="text-white/70 uppercase font-semibold">{txn.status}</span>
        </div>
        <div>
          <span className="text-white/30 block mb-0.5">Created Date</span>
          <span className="text-white/70">{formatDateTime(txn.createdAt)}</span>
        </div>
        {booking?.startTime && (
          <div>
            <span className="text-white/30 block mb-0.5">Start Time</span>
            <span className="text-white/70">{formatDateTime(booking.startTime)}</span>
          </div>
        )}
        {booking?.durationMin && (
          <div>
            <span className="text-white/30 block mb-0.5">Duration</span>
            <span className="text-white/70">{booking.durationMin} min</span>
          </div>
        )}
      </div>
    );
  }

  // FOOD transaction details
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/50">
      <div>
        <span className="text-white/30 block mb-0.5">Food Order ID</span>
        <span className="text-white/70 font-mono break-all">{txn.foodOrderId || txn.customerOrderId || "—"}</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Payment Method</span>
        <span className="text-white/70">{txn.paymentMethod}</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Transaction ID</span>
        <span className="text-white/70 font-mono break-all">{txn.transactionId || "—"}</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Merchant Transaction ID</span>
        <span className="text-white/70 font-mono break-all">{txn.merchantTxnId || "—"}</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Amount</span>
        <span className="text-[#CD4ECD] font-bold">{txn.amount} Tk</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Status</span>
        <span className="text-white/70 uppercase font-semibold">{txn.status}</span>
      </div>
      <div>
        <span className="text-white/30 block mb-0.5">Created Date</span>
        <span className="text-white/70">{formatDateTime(txn.createdAt)}</span>
      </div>
    </div>
  );
}

// ─── Transaction Card ─────────────────────────────────────────────────────────

function TransactionCard({ txn }: { txn: ApiTransaction }) {
  const [expanded, setExpanded] = useState(false);
  const showExpand = txn.paymentType === "GAME" || txn.paymentType === "FOOD";

  return (
    <div className="bg-[#12091F] border border-[#6C04D7]/30 hover:border-[#6C04D7]/60 rounded-2xl p-4 sm:p-5 transition-all duration-200">
      {/* Top row: type + status + amount */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <PaymentTypeBadge type={txn.paymentType} />
          <StatusBadge status={txn.status} />
        </div>
        <div className="text-right">
          <p className="text-[#CD4ECD] font-bold text-lg leading-none">{txn.amount} Tk</p>
          <p className="text-white/30 text-[10px] mt-0.5">{txn.paymentMethod}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-3">
        <div>
          <span className="text-white/30">Transaction ID</span>
          <p className="text-white/70 font-mono truncate">{txn.transactionId || "—"}</p>
        </div>
        <div>
          <span className="text-white/30">Merchant Txn ID</span>
          <p className="text-white/70 font-mono truncate">{txn.merchantTxnId || "—"}</p>
        </div>
        <div>
          <span className="text-white/30">{txn.paymentType === "GAME" ? "Customer Booking ID" : "Customer Order ID"}</span>
          <p className="text-white/70 font-mono truncate">{txn.customerOrderId || "—"}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays size={10} className="text-white/30 flex-shrink-0" />
          <span className="text-white/50">{formatDateTime(txn.createdAt)}</span>
        </div>
      </div>

      {/* Expand button */}
      {showExpand && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-[10px] text-[#CD4ECD]/70 hover:text-[#CD4ECD] font-semibold uppercase tracking-wider transition"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "Hide Details" : "View Details"}
        </button>
      )}

      {/* Expandable details container with smooth height animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "max-h-[500px] opacity-100 mt-3 pt-3 border-t border-white/5 animate-fadeIn" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <TransactionDetailPanel txn={txn} />
      </div>
    </div>
  );
}

// ─── Desktop Table Row ────────────────────────────────────────────────────────

function TransactionTableRow({ txn }: { txn: ApiTransaction }) {
  const [expanded, setExpanded] = useState(false);
  const showExpand = txn.paymentType === "GAME" || txn.paymentType === "FOOD";

  return (
    <>
      <tr className="border-b border-white/5 hover:bg-[#6C04D7]/5 transition group">
        <td className="py-3 px-4">
          <PaymentTypeBadge type={txn.paymentType} />
        </td>
        <td className="py-3 px-4 text-[#CD4ECD] font-bold">{txn.amount} Tk</td>
        <td className="py-3 px-4 text-white/60 text-xs">{txn.paymentMethod}</td>
        <td className="py-3 px-4 text-white/50 font-mono text-xs max-w-[120px] truncate">
          {txn.transactionId || "—"}
        </td>
        <td className="py-3 px-4 text-white/50 font-mono text-xs max-w-[120px] truncate">
          {txn.merchantTxnId || "—"}
        </td>
        <td className="py-3 px-4 text-white/50 font-mono text-xs max-w-[120px] truncate">
          {txn.customerOrderId || "—"}
        </td>
        <td className="py-3 px-4">
          <StatusBadge status={txn.status} />
        </td>
        <td className="py-3 px-4 text-white/40 text-xs whitespace-nowrap">
          {formatDateTime(txn.createdAt)}
        </td>
        <td className="py-3 px-4">
          {showExpand ? (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-[#CD4ECD]/60 hover:text-[#CD4ECD] transition"
              title="View transaction details"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          ) : null}
        </td>
      </tr>
      {expanded && showExpand && (
        <tr className="bg-[#0A0612]/50">
          <td colSpan={9} className="px-4 py-3">
            <div className="animate-fadeIn">
              <TransactionDetailPanel txn={txn} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyTransactions() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="w-24 h-24 rounded-2xl bg-[#6C04D7]/10 border border-[#6C04D7]/20 flex items-center justify-center">
        <Receipt size={40} className="text-[#6C04D7]/60" strokeWidth={1.5} />
      </div>
      <div>
        <h2
          className="text-2xl text-white uppercase tracking-wider mb-2"
          style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
        >
          No Transactions Yet
        </h2>
        <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
          You haven&apos;t made any payments yet. Book a gaming session or order food to get started!
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/game"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] text-white font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_24px_rgba(108,4,215,0.6)] hover:scale-[1.02] active:scale-95 transition"
        >
          Book a Game
        </Link>
        <Link
          href="/foods"
          className="px-6 py-3 rounded-xl border border-[#6C04D7]/40 text-white/70 hover:border-[#6C04D7] hover:text-white font-bold text-sm uppercase tracking-wider transition"
        >
          Order Food
        </Link>
      </div>
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
          Please sign in to view your transaction history.
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyTransactionsPage() {
  const { user, loading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  const { data: transactions = [], isLoading, isError } = useMyTransactions();

  return (
    <div className="min-h-screen bg-[#0A0612] pt-28 pb-20 px-4 mt-20">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#6C04D7]/20 border border-[#6C04D7]/30 flex items-center justify-center">
            <Receipt className="text-[#CD4ECD]" size={22} />
          </div>
          <div>
            <h1
              className="text-3xl text-white uppercase tracking-wider leading-none"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              My Transactions
            </h1>
            <p className="text-white/40 text-xs mt-0.5">Your payment history</p>
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

        {/* Authenticated — loading */}
        {!authLoading && isAuthenticated && isLoading && (
          <div className="space-y-3">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        )}

        {/* Authenticated — error */}
        {!authLoading && isAuthenticated && isError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
            <p className="text-red-400 font-bold text-sm mb-1">Failed to load transactions.</p>
            <p className="text-white/40 text-xs">Please try refreshing the page.</p>
          </div>
        )}

        {/* Authenticated — empty */}
        {!authLoading && isAuthenticated && !isLoading && !isError && transactions.length === 0 && (
          <EmptyTransactions />
        )}

        {/* Authenticated — Mobile Cards */}
        {!authLoading && isAuthenticated && !isLoading && !isError && transactions.length > 0 && (
          <>
            {/* Mobile: cards */}
            <div className="md:hidden space-y-3">
              {transactions.map((txn) => (
                <TransactionCard key={txn.id} txn={txn} />
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block bg-[#12091F] border border-[#6C04D7]/30 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Type", "Amount", "Method", "Transaction ID", "Merchant Txn ID", "Order ID", "Status", "Date", ""].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-white/30"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <TransactionTableRow key={txn.id} txn={txn} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
