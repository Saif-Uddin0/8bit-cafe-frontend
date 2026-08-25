"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { _registerNotifyHandler, _unregisterNotifyHandler } from "@/lib/notify";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotifVariant = "success" | "error" | "info" | "warning";

/** "pill" = small inline pill toast (bottom-right) */
/** "modal" = large center modal-style notification */
export type NotifStyle = "pill" | "modal";

export interface NotifItem {
  id: string;
  variant: NotifVariant;
  style: NotifStyle;
  title: string;
  message?: string;
  /** ms until auto-dismiss — 0 = no auto dismiss */
  duration: number;
  /** Optional callback for the action button (modal style) */
  actionLabel?: string;
  onAction?: () => void;
  /** If true, the item is playing its exit animation */
  exiting?: boolean;
}

// ─── Context shape ────────────────────────────────────────────────────────────

interface NotificationContextValue {
  items: NotifItem[];
  addNotification: (item: Omit<NotifItem, "id" | "exiting">) => string;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside NotificationProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotifItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissNotification = useCallback((id: string) => {
    // Mark as exiting for animation
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, exiting: true } : item))
    );
    // Remove after animation completes
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      timers.current.delete(id);
    }, 400);
  }, []);

  const addNotification = useCallback(
    (payload: Omit<NotifItem, "id" | "exiting">): string => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const item: NotifItem = { ...payload, id, exiting: false };

      setItems((prev) => {
        // Limit pill queue to 4, modal queue to 1
        const pills = prev.filter((n) => n.style === "pill");
        const modals = prev.filter((n) => n.style === "modal");

        if (payload.style === "pill" && pills.length >= 4) {
          const oldest = pills[0];
          if (oldest) {
            clearTimeout(timers.current.get(oldest.id));
            timers.current.delete(oldest.id);
            return [...prev.filter((n) => n.id !== oldest.id), item];
          }
        }
        if (payload.style === "modal" && modals.length >= 1) {
          const existing = modals[0];
          if (existing) {
            clearTimeout(timers.current.get(existing.id));
            timers.current.delete(existing.id);
            return [...prev.filter((n) => n.id !== existing.id), item];
          }
        }
        return [...prev, item];
      });

      if (payload.duration > 0) {
        const timer = setTimeout(() => dismissNotification(id), payload.duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [dismissNotification]
  );

  // ── Connect the module-level notify() helper to this context ──────────────
  useEffect(() => {
    _registerNotifyHandler(addNotification);
    return () => {
      _unregisterNotifyHandler();
    };
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ items, addNotification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
