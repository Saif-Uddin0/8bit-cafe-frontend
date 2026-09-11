"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyTransactions } from "@/hooks/useMyTransactions";
import {
  Receipt,
  Loader2,
  LogIn,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BadgeCheck,
  Clock3,
  CircleX,
  Gamepad2,
  Utensils,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import type { ApiTransaction } from "@/types/api";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CopyableId from "@/components/ui/CopyableId";

// Constants

const PAGE_LIMIT = 10;


// Helpers

function formatAmount(amount: number | string): string {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString("en-US");
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTableDate(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


// Status Badge

const STATUS_STYLES: Record<string, string> = {
  SUCCESS:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  PENDING:
    "bg-amber-500/10 text-amber-400 border-amber-500/25",
  FAILED:
    "bg-red-500/10 text-red-400 border-red-500/25",
  CANCELLED:
    "bg-white/5 text-white/40 border-white/10",
};

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status?.toUpperCase() ?? "UNKNOWN";

  const cls =
    STATUS_STYLES[normalizedStatus] ??
    "bg-white/5 text-white/40 border-white/10";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        text-[10px]
        font-bold
        uppercase
        tracking-wider
        border
        whitespace-nowrap
        ${cls}
      `}
    >
      {normalizedStatus === "SUCCESS" && <BadgeCheck size={10} />}
      {normalizedStatus === "PENDING" && <Clock3 size={10} />}
      {normalizedStatus === "FAILED" && <CircleX size={10} />}

      {normalizedStatus}
    </span>
  );
}


// Payment Type Badge

function PaymentTypeBadge({ type }: { type: string }) {
  const normalizedType = type?.toUpperCase() ?? "UNKNOWN";
  const isGame = normalizedType === "GAME";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        text-[10px]
        font-bold
        uppercase
        tracking-wider
        border
        whitespace-nowrap
        ${isGame
          ? "bg-purple-500/10 text-purple-400 border-purple-500/25"
          : "bg-pink-500/10 text-pink-400 border-pink-500/25"
        }
      `}
    >
      {isGame ? <Gamepad2 size={10} /> : <Utensils size={10} />}

      {normalizedType}
    </span>
  );
}

// Skeleton Row
function SkeletonRow() {
  return (
    <div className="bg-[#12091F] border border-[#6C04D7]/20 rounded-2xl p-4 sm:p-5 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-[#6C04D7]/20 rounded-full" />
          <div className="h-6 w-20 bg-white/5 rounded-full" />
        </div>

        <div className="h-5 w-24 bg-[#CD4ECD]/10 rounded" />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="h-8 bg-white/5 rounded" />
        <div className="h-8 bg-white/5 rounded" />
        <div className="h-8 bg-white/5 rounded" />
        <div className="h-8 bg-white/5 rounded" />
      </div>
    </div>
  );
}


// Transaction Detail Panel
function TransactionDetailPanel({
  txn,
}: {
  txn: ApiTransaction;
}) {
  const isGame = txn.paymentType === "GAME";

  const sharedFields = (
    <>
      {/* Payment Method */}
      <div>
        <span className="text-white/50 block mb-1">
          Payment Method
        </span>

        <span className="text-white/70">
          {txn.paymentMethod ?? "Not Available"}
        </span>
      </div>

      {/* Transaction ID */}
      <div>
        <span className="text-white/50 block mb-1">
          Transaction ID
        </span>

        <CopyableId
          id={txn.transactionId}
          truncate={false}
          label="Transaction ID"
        />
      </div>

      {/* Merchant Transaction ID */}
      <div>
        <span className="text-white/50 block mb-1">
          Merchant Transaction ID
        </span>

        <CopyableId
          id={txn.merchantTxnId}
          truncate={false}
          label="Merchant Transaction ID"
        />
      </div>

      {/* Customer Order ID */}
      <div>
        <span className="text-white/50 block mb-1">
          Customer Order ID
        </span>

        <CopyableId
          id={txn.customerOrderId}
          truncate={false}
          label="Customer Order ID"
        />
      </div>

      {/* Amount */}
      <div>
        <span className="text-white/50 block mb-1">
          Amount
        </span>

        <span className="text-[#CD4ECD] font-bold tabular-nums">
          {formatAmount(txn.amount)} Tk
        </span>
      </div>

      {/* Status */}
      <div>
        <span className="text-white/50 block mb-1">
          Status
        </span>

        <StatusBadge status={txn.status} />
      </div>

      {/* Created Date */}
      <div>
        <span className="text-white/50 block mb-1">
          Created Date
        </span>

        <span className="text-white/70">
          {formatDateTime(txn.createdAt)}
        </span>
      </div>

      {/* Customer Name */}
      {txn.customerName && (
        <div>
          <span className="text-white/50 block mb-1">
            Customer Name
          </span>

          <span className="text-white/70">
            {txn.customerName}
          </span>
        </div>
      )}

      {/* Phone */}
      {txn.customerPhone && (
        <div>
          <span className="text-white/50 block mb-1">
            Phone
          </span>

          <span className="text-white/70">
            {txn.customerPhone}
          </span>
        </div>
      )}

      {/* Address */}
      {txn.customerAddress && (
        <div>
          <span className="text-white/50 block mb-1">
            Address
          </span>

          <span className="text-white/70">
            {txn.customerAddress}
          </span>
        </div>
      )}

      {/* City */}
      {txn.customerCity && (
        <div>
          <span className="text-white/50 block mb-1">
            City
          </span>

          <span className="text-white/70">
            {txn.customerCity}
          </span>
        </div>
      )}
    </>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs text-white/70">
      {/* Type specific ID */}
      <div>
        <span className="text-white/50 block mb-1">
          {isGame ? "Game Booking ID" : "Food Order ID"}
        </span>

        <CopyableId
          id={isGame ? txn.gameBookingId : txn.foodOrderId}
          truncate={false}
          label={isGame ? "Game Booking ID" : "Food Order ID"}
        />
      </div>

      {sharedFields}
    </div>
  );
}

// Transaction Card - Mobile
function TransactionCard({
  txn,
}: {
  txn: ApiTransaction;
}) {
  const [expanded, setExpanded] = useState(false);

  const showExpand =
    txn.paymentType === "GAME" ||
    txn.paymentType === "FOOD";

  const bookingOrOrderId =
    txn.paymentType === "GAME"
      ? txn.gameBookingId
      : txn.foodOrderId;

  return (
    <div
      className="
        bg-[#12091F]
        border border-[#6C04D7]/25
        hover:border-[#6C04D7]/50
        rounded-2xl
        p-4
        sm:p-5
        transition-all
        duration-200
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <PaymentTypeBadge type={txn.paymentType} />
          <StatusBadge status={txn.status} />
        </div>

        <div className="text-right shrink-0">
          <p
            className="
              text-[#CD4ECD]
              font-bold
              text-lg
              leading-none
              whitespace-nowrap
              tabular-nums
            "
          >
            {formatAmount(txn.amount)} Tk
          </p>

          <p className="text-white/50 text-[10px] mt-1 whitespace-nowrap">
            {txn.paymentMethod ?? "Not Available"}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
        {/* Transaction ID */}
        <div className="min-w-0">
          <span className="text-white/50">
            Transaction ID
          </span>

          <p
            className="text-white/70 font-mono truncate mt-0.5"
            title={txn.transactionId ?? "—"}
          >
            {txn.transactionId ?? "—"}
          </p>
        </div>

        {/* Merchant ID */}
        <div className="min-w-0">
          <span className="text-white/50">
            Merchant Txn ID
          </span>

          <p
            className="text-white/70 font-mono truncate mt-0.5"
            title={txn.merchantTxnId || "—"}
          >
            {txn.merchantTxnId || "—"}
          </p>
        </div>

        {/* Booking / Order */}
        <div className="min-w-0">
          <span className="text-white/50">
            {txn.paymentType === "GAME"
              ? "Game Booking ID"
              : "Food Order ID"}
          </span>

          <p
            className="text-white/70 font-mono truncate mt-0.5"
            title={bookingOrOrderId || "—"}
          >
            {bookingOrOrderId || "—"}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-start gap-1.5">
          <CalendarDays
            size={11}
            className="text-white/50 shrink-0 mt-0.5"
          />

          <span className="text-white/70">
            {formatDateTime(txn.createdAt)}
          </span>
        </div>
      </div>

      {/* Expand Button */}
      {showExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="
            inline-flex
            items-center
            gap-1.5
            text-[10px]
            text-[#CD4ECD]/70
            hover:text-[#CD4ECD]
            font-semibold
            uppercase
            tracking-wider
            transition
          "
        >
          {expanded ? (
            <ChevronUp size={13} />
          ) : (
            <ChevronDown size={13} />
          )}

          {expanded ? "Hide Details" : "View Details"}
        </button>
      )}

      {/* Details */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
          ${expanded
            ? "max-h-[800px] opacity-100 mt-4 pt-4 border-t border-white/5"
            : "max-h-0 opacity-0 pointer-events-none"
          }
        `}
      >
        <TransactionDetailPanel txn={txn} />
      </div>
    </div>
  );
}


// Desktop Table Row

function TransactionTableRow({
  txn,
}: {
  txn: ApiTransaction;
}) {
  const [expanded, setExpanded] = useState(false);

  const showExpand =
    txn.paymentType === "GAME" ||
    txn.paymentType === "FOOD";

  const bookingOrOrderId =
    txn.paymentType === "GAME"
      ? txn.gameBookingId
      : txn.foodOrderId;

  return (
    <>
      <tr
        className="
          border-b border-white/5
          hover:bg-[#6C04D7]/5
          transition-colors
          group
        "
      >
        {/* Type */}
        <td className="py-3.5 px-3 w-[90px]">
          <PaymentTypeBadge type={txn.paymentType} />
        </td>

        {/* Amount */}
        <td className="py-3.5 px-3 w-[105px]">
          <span
            className="
              block
              text-right
              text-[#CD4ECD]
              font-bold
              text-sm
              whitespace-nowrap
              tabular-nums
            "
          >
            {formatAmount(txn.amount)} Tk
          </span>
        </td>

        {/* Method */}
        <td className="py-3.5 px-3 w-[105px]">
          <span
            className="text-white/60 text-xs whitespace-nowrap"
            title={txn.paymentMethod ?? "Not Available"}
          >
            {txn.paymentMethod ?? "Not Available"}
          </span>
        </td>

        {/* Transaction ID */}
        <td className="py-3.5 px-3 max-w-[130px]">
          <span
            className="
              block
              text-white/70
              font-mono
              text-xs
              truncate
            "
            title={txn.transactionId ?? "—"}
          >
            {txn.transactionId ?? "—"}
          </span>
        </td>

        {/* Merchant Txn ID */}
        <td className="py-3.5 px-3 max-w-[140px]">
          <span
            className="
              block
              text-white/70
              font-mono
              text-xs
              truncate
            "
            title={txn.merchantTxnId || "—"}
          >
            {txn.merchantTxnId || "—"}
          </span>
        </td>

        {/* Booking / Order ID */}
        <td className="py-3.5 px-3 max-w-[150px]">
          <span
            className="
              block
              text-white/70
              font-mono
              text-xs
              truncate
            "
            title={bookingOrOrderId || "—"}
          >
            {bookingOrOrderId || "—"}
          </span>
        </td>

        {/* Status */}
        <td className="py-3.5 px-3 w-[110px]">
          <StatusBadge status={txn.status} />
        </td>

        {/* Date */}
        <td className="py-3.5 px-3 min-w-[155px]">
          <span
            className="
              text-white/80
              font-medium
              text-xs
              whitespace-nowrap
            "
            title={formatDateTime(txn.createdAt)}
          >
            {formatTableDate(txn.createdAt)}
          </span>
        </td>

        {/* Expand */}
        <td className="py-3.5 px-2 w-[45px] text-center">
          {showExpand && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`
        inline-flex
        items-center
        justify-center
        w-8
        h-8
        rounded-lg
        border
        transition-all
        duration-200
        ${expanded
                  ? `
              text-[#CD4ECD]
              bg-[#CD4ECD]/10
              border-[#CD4ECD]/30
            `
                  : `
              text-white/40
              bg-white/[0.02]
              border-white/10
              hover:text-[#CD4ECD]
              hover:bg-[#CD4ECD]/10
              hover:border-[#CD4ECD]/30
            `
                }
      `}
              title={expanded ? "Hide transaction details" : "View transaction details"}
              aria-label={
                expanded ? "Hide transaction details" : "View transaction details"
              }
            >
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                className={`
          transition-transform
          duration-200
          ${expanded ? "rotate-180" : ""}
        `}
              />
            </button>
          )}
        </td>

      </tr>

      {/* Expanded Details */}
      {expanded && showExpand && (
        <tr className="bg-[#0A0612]/80">
          <td
            colSpan={9}
            className="
        px-8
        py-6
        border-b
        border-white/5
      "
          >
            <div className="max-w-4xl mx-auto">
              <TransactionDetailPanel txn={txn} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// Pagination
function PaginationControls({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
        mt-6
      "
    >
      {/* Count */}
      <p className="text-white/70 text-xs">
        Showing{" "}
        <span className="text-white/70">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="text-white/70">
          {total}
        </span>{" "}
        transactions
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            text-white/40
            hover:text-white
            hover:border-[#6C04D7]/50
            hover:bg-[#6C04D7]/10
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition
          "
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page */}
        <div
          className="
            min-w-[70px]
            h-9
            px-3
            flex
            items-center
            justify-center
            rounded-lg
            border
            border-white/5
            bg-white/[0.02]
            text-white/70
            text-xs
            font-mono
          "
        >
          <span className="text-white">
            {page}
          </span>

          <span className="mx-1.5 text-white/20">
            /
          </span>

          {totalPages}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            text-white/40
            hover:text-white
            hover:border-[#6C04D7]/50
            hover:bg-[#6C04D7]/10
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition
          "
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Empty State
// ============================================================

function EmptyTransactions() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-6
        py-24
        text-center
      "
    >
      {/* Icon */}
      <div
        className="
          w-24
          h-24
          rounded-2xl
          bg-[#6C04D7]/10
          border
          border-[#6C04D7]/20
          flex
          items-center
          justify-center
        "
      >
        <Receipt
          size={40}
          className="text-[#6C04D7]/60"
          strokeWidth={1.5}
        />
      </div>

      {/* Text */}
      <div>
        <h2
          className="
            text-2xl
            text-white
            uppercase
            tracking-wider
            mb-2
          "
          style={{
            fontFamily: "var(--font-jersey-20)",
            fontWeight: 400,
          }}
        >
          No Transactions Yet
        </h2>

        <p
          className="
            text-white/40
            text-sm
            max-w-[300px]
            leading-relaxed
          "
        >
          You haven&apos;t made any payments yet.
          Book a gaming session or order food to
          get started!
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/game"
          className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-[#6C04D7]
            to-[#CD4ECD]
            text-white
            font-bold
            text-sm
            uppercase
            tracking-wider
            hover:shadow-[0_0_24px_rgba(108,4,215,0.6)]
            hover:scale-[1.02]
            active:scale-95
            transition
          "
        >
          Book a Game
        </Link>

        <Link
          href="/foods"
          className="
            px-6
            py-3
            rounded-xl
            border
            border-[#6C04D7]/40
            text-white/70
            hover:border-[#6C04D7]
            hover:text-white
            font-bold
            text-sm
            uppercase
            tracking-wider
            transition
          "
        >
          Order Food
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// Main Page Content
// ============================================================

function MyTransactionsPageContent() {
  const { user, loading: authLoading } = useAuth();

  const isAuthenticated = !!user;

  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useMyTransactions(page, PAGE_LIMIT);

  // Newest first
  const transactions = [
    ...(data?.transactions ?? []),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const meta = data?.meta ?? null;

  return (
    <ProtectedRoute>
      <div
        className="
          min-h-screen
          bg-[#0A0612]
          pt-28
          pb-20
          px-4
          mt-20
        "
      >
        <div className="max-w-6xl mx-auto">

          {/* ==================================================
              Page Header
          ================================================== */}

          <div className="flex items-center gap-3 mb-8">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#6C04D7]/20
                border
                border-[#6C04D7]/30
                flex
                items-center
                justify-center
              "
            >
              <Receipt
                className="text-[#CD4ECD]"
                size={22}
              />
            </div>

            <div>
              <h1
                className="
                  text-3xl
                  text-white
                  uppercase
                  tracking-wider
                  leading-none
                "
                style={{
                  fontFamily: "var(--font-jersey-20)",
                  fontWeight: 400,
                }}
              >
                My Transactions
              </h1>

              {meta && (
                <p className="text-white/60 text-[12px] mt-1">
                  {meta.total} total transaction
                  {meta.total !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* ==================================================
              Auth Loading
          ================================================== */}

          {authLoading && (
            <div className="flex justify-center py-24">
              <Loader2
                size={32}
                className="
                  animate-spin
                  text-[#6C04D7]
                "
              />
            </div>
          )}

          {/* ==================================================
              Unauthenticated
          ================================================== */}

          {!authLoading && !isAuthenticated && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-6
                py-24
                text-center
              "
            >
              <div
                className="
                  w-24
                  h-24
                  rounded-2xl
                  bg-[#6C04D7]/10
                  border
                  border-[#6C04D7]/20
                  flex
                  items-center
                  justify-center
                "
              >
                <LogIn
                  size={40}
                  className="text-[#6C04D7]/60"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <h2
                  className="
                    text-2xl
                    text-white
                    uppercase
                    tracking-wider
                    mb-2
                  "
                  style={{
                    fontFamily:
                      "var(--font-jersey-20)",
                    fontWeight: 400,
                  }}
                >
                  Sign In Required
                </h2>

                <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
                  Please sign in to view your transaction
                  history.
                </p>
              </div>

              <Link
                href="/login"
                className="
                  px-8
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[#6C04D7]
                  to-[#CD4ECD]
                  text-white
                  font-bold
                  text-sm
                  uppercase
                  tracking-wider
                  hover:shadow-[0_0_24px_rgba(108,4,215,0.6)]
                  hover:scale-[1.02]
                  active:scale-95
                  transition
                "
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Loading Transactions */}

          {!authLoading &&
            isAuthenticated &&
            isLoading && (
              <div className="space-y-3">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            )}

          {/* Error */}

          {!authLoading &&
            isAuthenticated &&
            isError && (
              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-2xl
                  p-8
                  text-center
                "
              >
                <p className="text-red-400 font-bold text-sm mb-1">
                  Failed to load transactions.
                </p>

                <p className="text-white/40 text-xs">
                  Please try refreshing the page.
                </p>
              </div>
            )}

          {/* Empty */}

          {!authLoading &&
            isAuthenticated &&
            !isLoading &&
            !isError &&
            transactions.length === 0 && (
              <EmptyTransactions />
            )}

          {/* Transactions */}

          {!authLoading &&
            isAuthenticated &&
            !isLoading &&
            !isError &&
            transactions.length > 0 && (
              <>
                {/* Mobile Cards */}

                <div className="md:hidden space-y-3">
                  {transactions.map((txn) => (
                    <TransactionCard
                      key={txn.id}
                      txn={txn}
                    />
                  ))}
                </div>

                {/* Desktop Table */}

                <div
                  className="
                    hidden
                    md:block
                    bg-[#12091F]
                    border
                    border-[#6C04D7]/30
                    rounded-2xl
                    overflow-hidden
                    shadow-[0_12px_40px_rgba(0,0,0,0.25)]
                  "
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.015]">

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap w-[90px]">
                            Type
                          </th>

                          <th className="text-right py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap w-[105px]">
                            Amount
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap w-[105px]">
                            Method
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap min-w-[125px]">
                            Transaction ID
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap min-w-[135px]">
                            Merchant Txn ID
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap min-w-[145px]">
                            Booking / Order ID
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap w-[110px]">
                            Status
                          </th>

                          <th className="text-left py-3.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50 whitespace-nowrap min-w-[155px]">
                            Date
                          </th>

                          <th className="w-[45px] py-3.5 px-2 text-center" />
                        </tr>
                      </thead>

                      <tbody>
                        {transactions.map((txn) => (
                          <TransactionTableRow
                            key={txn.id}
                            txn={txn}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {meta && (
                  <PaginationControls
                    page={meta.page}
                    totalPages={meta.totalPages}
                    total={meta.total}
                    limit={meta.limit}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Page

export default function MyTransactionsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="
            min-h-screen
            bg-[#0A0612]
            flex
            items-center
            justify-center
            pt-24
          "
        >
          <Loader2
            className="
              w-8
              h-8
              text-[#CD4ECD]
              animate-spin
            "
          />
        </div>
      }
    >
      <MyTransactionsPageContent />
    </Suspense>
  );
}
