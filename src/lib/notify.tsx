/**
 * notify — 8bit Café notification helper
 *
 * Bridges the call sites to the custom NotificationContext.
 * The API is 100% backwards-compatible with the previous react-toastify-based version.
 *
 * Usage:
 *   notify.success("Title", "Optional message")
 *   notify.error("Title", "Optional message", 5000)
 *   notify.modal.success("Your booking has been confirmed")
 *   notify.modal.error("Log in failed", undefined, 0, "Try again", () => router.push('/login'))
 */

import type { NotifVariant, NotifStyle, NotifItem } from "@/contexts/NotificationContext";

// ─── Internal dispatch ────────────────────────────────────────────────────────
// We use a module-level emitter so notify can be called from anywhere
// without requiring a hook. The NotificationProvider subscribes on mount.

type Handler = (item: Omit<NotifItem, "id" | "exiting">) => void;

let _handler: Handler | null = null;

export function _registerNotifyHandler(fn: Handler) {
  _handler = fn;
}

export function _unregisterNotifyHandler() {
  _handler = null;
}

function dispatch(item: Omit<NotifItem, "id" | "exiting">) {
  if (_handler) {
    _handler(item);
  } else {
    // Fallback: console log during SSR or before hydration
    console.info(`[notify:${item.variant}]`, item.title, item.message ?? "");
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

const notify = {
  /** Small pill toast — bottom-right */
  success(title: string, message?: string, autoClose = 3500) {
    dispatch({ variant: "success", style: "pill", title, message, duration: autoClose });
  },
  error(title: string, message?: string, autoClose = 4000) {
    dispatch({ variant: "error", style: "pill", title, message, duration: autoClose });
  },
  info(title: string, message?: string, autoClose = 4000) {
    dispatch({ variant: "info", style: "pill", title, message, duration: autoClose });
  },
  warning(title: string, message?: string, autoClose = 4000) {
    dispatch({ variant: "warning", style: "pill", title, message, duration: autoClose });
  },

  /** Full-center modal notification */
  modal: {
    success(
      title: string,
      message?: string,
      autoClose = 5000,
      actionLabel?: string,
      onAction?: () => void
    ) {
      dispatch({ variant: "success", style: "modal", title, message, duration: autoClose, actionLabel, onAction });
    },
    error(
      title: string,
      message?: string,
      autoClose = 0,
      actionLabel?: string,
      onAction?: () => void
    ) {
      dispatch({ variant: "error", style: "modal", title, message, duration: autoClose, actionLabel, onAction });
    },
    info(
      title: string,
      message?: string,
      autoClose = 5000,
      actionLabel?: string,
      onAction?: () => void
    ) {
      dispatch({ variant: "info", style: "modal", title, message, duration: autoClose, actionLabel, onAction });
    },
    warning(
      title: string,
      message?: string,
      autoClose = 5000,
      actionLabel?: string,
      onAction?: () => void
    ) {
      dispatch({ variant: "warning", style: "modal", title, message, duration: autoClose, actionLabel, onAction });
    },
  },
};

export default notify;
