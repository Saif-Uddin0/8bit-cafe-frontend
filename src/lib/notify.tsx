import { toast, type ToastOptions } from "react-toastify";
import { Check, X, Info, AlertTriangle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info" | "warning";

interface ToastPayload {
  title: string;
  message?: string;
}

// ─── Per-type visual config ───────────────────────────────────────────────────
const CONFIG = {
  success: {
    accent: "linear-gradient(135deg, #00C896 0%, #00E5A0 100%)",
    accentColor: "#00C896",
    icon: Check,
    glow: "rgba(0, 200, 150, 0.25)",
  },
  error: {
    accent: "linear-gradient(135deg, #FF4D6D 0%, #FF6B6B 100%)",
    accentColor: "#FF4D6D",
    icon: X,
    glow: "rgba(255, 77, 109, 0.25)",
  },
  info: {
    accent: "linear-gradient(135deg, #7E00FF 0%, #CD4ECD 100%)",
    accentColor: "#7E00FF",
    icon: Info,
    glow: "rgba(126, 0, 255, 0.25)",
  },
  warning: {
    accent: "linear-gradient(135deg, #FFB300 0%, #FFCC02 100%)",
    accentColor: "#FFB300",
    icon: AlertTriangle,
    glow: "rgba(255, 179, 0, 0.25)",
  },
};

// ─── Custom toast body component ─────────────────────────────────────────────
function ToastBody({
  type,
  title,
  message,
}: {
  type: ToastType;
  title: string;
  message?: string;
}) {
  const { accent, icon: IconComponent, glow, accentColor } = CONFIG[type];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* OS-style mini header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          paddingBottom: "5px",
          marginBottom: "7px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: accentColor,
              boxShadow: `0 0 6px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontSize: "8.5px",
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            8BIT CAFÉ
          </span>
        </div>
        <span
          style={{
            fontSize: "8.5px",
            color: "rgba(255, 255, 255, 0.3)",
          }}
        >
          now
        </span>
      </div>

      {/* Main Toast Content */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: `0 0 10px ${glow}`,
          }}
        >
          <IconComponent size={14} strokeWidth={3} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            {title}
          </p>
          {message && (
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "10.5px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.35,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Base options ─────────────────────────────────────────────────────────────
function baseOptions(type: ToastType, autoClose = 3000): ToastOptions {
  const { accentColor } = CONFIG[type];
  return {
    type,
    autoClose,
    closeButton: false,
    icon: false,
    style: {
      background: "rgba(10, 5, 22, 0.85)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderLeft: `4px solid ${accentColor}`,
      borderRadius: 12,
      padding: "10px 12px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      minWidth: "280px",
      maxWidth: "380px",
    },
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────
const notify = {
  success(title: string, message?: string, autoClose = 3000) {
    toast(
      <ToastBody type="success" title={title} message={message} />,
      baseOptions("success", autoClose)
    );
  },
  error(title: string, message?: string, autoClose = 4000) {
    toast(
      <ToastBody type="error" title={title} message={message} />,
      baseOptions("error", autoClose)
    );
  },
  info(title: string, message?: string, autoClose = 4000) {
    toast(
      <ToastBody type="info" title={title} message={message} />,
      baseOptions("info", autoClose)
    );
  },
  warning(title: string, message?: string, autoClose = 4000) {
    toast(
      <ToastBody type="warning" title={title} message={message} />,
      baseOptions("warning", autoClose)
    );
  },
};

export default notify;

