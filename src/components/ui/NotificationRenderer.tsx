"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useNotification, type NotifItem, type NotifVariant } from "@/contexts/NotificationContext";

// ─── Per-variant pill visual config ──────────────────────────────────────────

const PILL_CFG: Record<
  NotifVariant,
  { bg: string; border: string; glow: string; iconSrc: string; iconAlt: string; titleColor: string; msgColor: string }
> = {
  success: {
    bg: "rgba(22, 6, 48, 0.92)",
    border: "rgba(139, 62, 200, 0.55)",
    glow: "rgba(108, 4, 215, 0.20)",
    iconSrc: "/clarity_notification.png",
    iconAlt: "notification",
    titleColor: "#e2d9ff",
    msgColor: "rgba(196, 170, 255, 0.68)",
  },
  error: {
    bg: "rgba(52, 4, 4, 0.94)",
    border: "rgba(220, 38, 38, 0.55)",
    glow: "rgba(200, 20, 20, 0.18)",
    iconSrc: "/broken-controller.png",
    iconAlt: "error",
    titleColor: "#fca5a5",
    msgColor: "rgba(255, 180, 180, 0.65)",
  },
  info: {
    bg: "rgba(16, 6, 42, 0.92)",
    border: "rgba(108, 4, 215, 0.55)",
    glow: "rgba(108, 4, 215, 0.18)",
    iconSrc: "/logo.png",
    iconAlt: "8bit cafe",
    titleColor: "#c4b5fd",
    msgColor: "rgba(196, 181, 253, 0.65)",
  },
  warning: {
    bg: "rgba(44, 22, 2, 0.94)",
    border: "rgba(200, 140, 20, 0.55)",
    glow: "rgba(200, 140, 20, 0.18)",
    iconSrc: "/logo.png",
    iconAlt: "warning",
    titleColor: "#fcd34d",
    msgColor: "rgba(253, 211, 100, 0.65)",
  },
};

// ─── Per-variant modal visual config ─────────────────────────────────────────
// All backgrounds use transparent glass (rgba) so backdrop-filter shows through.

const MODAL_CFG: Record<
  NotifVariant,
  { bg: string; border: string; glow: string; iconSrc: string; iconAlt: string; titleColor: string }
> = {
  success: {
    bg: "rgba(14, 6, 32, 0.45)",
    border: "rgba(108, 4, 215, 0.45)",
    glow: "rgba(108, 4, 215, 0.28)",
    iconSrc: "/game-zone.png",
    iconAlt: "game zone",
    titleColor: "#ffffff",
  },
  error: {
    bg: "rgba(48, 4, 4, 0.45)",
    border: "rgba(210, 30, 30, 0.55)",
    glow: "rgba(210, 30, 30, 0.25)",
    iconSrc: "/broken-controller.png",
    iconAlt: "broken controller",
    titleColor: "#FF4D6D",
  },
  info: {
    bg: "rgba(10, 4, 28, 0.45)",
    border: "rgba(140, 60, 255, 0.42)",
    glow: "rgba(108, 4, 215, 0.22)",
    iconSrc: "/logo.png",
    iconAlt: "8bit cafe",
    titleColor: "#a855f7",
  },
  warning: {
    bg: "rgba(40, 18, 2, 0.45)",
    border: "rgba(200, 140, 20, 0.48)",
    glow: "rgba(200, 140, 20, 0.18)",
    iconSrc: "/logo.png",
    iconAlt: "warning",
    titleColor: "#FFB300",
  },
};

// ─── Pill Toast ───────────────────────────────────────────────────────────────
// Shows title + optional backend message subtitle.
// Adapts shape: pure-pill for title-only, rounded-rect when message present.

function PillToast({ item, onDismiss }: { item: NotifItem; onDismiss: (id: string) => void }) {
  const cfg = PILL_CFG[item.variant];
  const hasMsg = !!item.message;

  return (
    <div
      className={`notif-pill-item ${item.exiting ? "notif-pill-exit" : "notif-pill-enter"}`}
      style={{
        borderRadius: hasMsg ? "18px" : "999px",
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
        boxShadow: `0 8px 28px rgba(0,0,0,0.60), 0 2px 8px ${cfg.glow}`,
        padding: hasMsg ? "10px 16px" : "8px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
      onClick={() => onDismiss(item.id)}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon — significantly smaller and vertically centered */}
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        overflow: "hidden", flexShrink: 0, position: "relative",
        background: "rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "relative", width: 13, height: 13 }}>
          <Image src={cfg.iconSrc} alt={cfg.iconAlt} fill sizes="13px" style={{ objectFit: "contain" }} />
        </div>
      </div>

      {/* Text column — centered vertically and horizontally */}
      <div style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        flex: 1, minWidth: 0
      }}>
        <p style={{
          fontFamily: "'Poppins', var(--font-poppins), sans-serif",
          fontSize: "13px", fontWeight: 600,
          color: cfg.titleColor, lineHeight: 1.25,
          margin: 0, wordBreak: "break-word",
          textAlign: "center",
        }}>
          {item.title}
        </p>
        {hasMsg && (
          <p style={{
            fontFamily: "'Poppins', var(--font-poppins), sans-serif",
            fontSize: "11px", fontWeight: 400,
            color: cfg.msgColor, lineHeight: 1.35,
            margin: "2px 0 0", wordBreak: "break-word",
            textAlign: "center",
          }}>
            {item.message}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Welcome Banner ───────────────────────────────────────────────────────────
// Horizontal glassmorphism strip at the bottom — matching Frame 2147242989.
// "Welcome to 8-bit cafe" with purple gradient accent on "8-bit cafe".

function WelcomeBanner({ item, onDismiss }: { item: NotifItem; onDismiss: (id: string) => void }) {
  return createPortal(
    <div
      className={`notif-welcome-banner ${item.exiting ? "notif-welcome-exit" : "notif-welcome-enter"}`}
      onClick={() => onDismiss(item.id)}
      role="status"
      aria-live="polite"
    >
      {/* Purple ambient glow blobs — purely decorative */}
      <div className="notif-welcome-glow-l" />
      <div className="notif-welcome-glow-r" />

      {/* Logo with glowing ring */}
      <div className="notif-welcome-logo-wrap">
        <Image src="/logo.png" alt="8bit cafe" fill sizes="52px" style={{ objectFit: "cover" }} priority />
      </div>

      {/* Text column — centered in the group */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <p className="notif-welcome-title">
          Welcome to{" "}
          <span className="notif-welcome-accent">8-bit cafe</span>
        </p>
        {item.message && (
          <p className="notif-welcome-msg">{item.message}</p>
        )}
      </div>

      {/* Subtle sparkle dots */}
      <div className="notif-welcome-dot notif-welcome-dot-1" />
      <div className="notif-welcome-dot notif-welcome-dot-2" />
      <div className="notif-welcome-dot notif-welcome-dot-3" />
    </div>,
    document.body
  );
}

// ─── Standard Modal (error / success / warning) ───────────────────────────────
// Centered full-overlay modal. Fully responsive via clamp().

function StandardModal({ item, onDismiss }: { item: NotifItem; onDismiss: (id: string) => void }) {
  const cfg = MODAL_CFG[item.variant];
  const isError = item.variant === "error";

  return createPortal(
    <div
      className="notif-modal-overlay"
      onClick={() => onDismiss(item.id)}
      aria-modal="true"
      role="alertdialog"
    >
      <div
        className={`notif-modal-box ${item.exiting ? "notif-modal-exit" : "notif-modal-enter"}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: cfg.bg,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: `1px solid ${cfg.border}`,
          boxShadow: `0 24px 70px ${cfg.glow}, 0 0 0 1px rgba(255,255,255,0.06) inset`,
          gap: isError ? "18px" : "22px",
        }}
      >
        {/* Icon */}
        <div className="notif-modal-icon">
          <Image src={cfg.iconSrc} alt={cfg.iconAlt} fill sizes="120px" style={{ objectFit: "contain" }} />
        </div>

        {/* Title */}
        <p className="notif-modal-title" style={{ color: cfg.titleColor }}>
          {item.title}
        </p>

        {/* Backend / extra message */}
        {item.message && (
          <p className="notif-modal-msg">{item.message}</p>
        )}

        {/* Action button */}
        {item.actionLabel && item.onAction && (
          <button
            className="notif-modal-btn"
            onClick={() => { item.onAction?.(); onDismiss(item.id); }}
          >
            {item.actionLabel}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Root Renderer ────────────────────────────────────────────────────────────

export default function NotificationRenderer() {
  const { items, dismissNotification } = useNotification();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const pills = items.filter((n) => n.style === "pill");
  const modals = items.filter((n) => n.style === "modal");

  // Info modals render as WelcomeBanner; all others as StandardModal
  const welcomes = modals.filter((n) => n.variant === "info");
  const standards = modals.filter((n) => n.variant !== "info");

  return (
    <>
      {/* ── Pill toasts — anchored to bottom-right corner ── */}
      {pills.length > 0 && createPortal(
        <div className="notif-pill-container" aria-label="Notifications" aria-live="polite">
          {pills.map((item) => (
            <PillToast key={item.id} item={item} onDismiss={dismissNotification} />
          ))}
        </div>,
        document.body
      )}

      {/* ── Welcome banner — bottom-center horizontal strip ── */}
      {welcomes.map((item) => (
        <WelcomeBanner key={item.id} item={item} onDismiss={dismissNotification} />
      ))}

      {/* ── Standard modals — centered overlay ── */}
      {standards.map((item) => createPortal(
        <StandardModal key={item.id} item={item} onDismiss={dismissNotification} />,
        document.body
      ))}
    </>
  );
}


