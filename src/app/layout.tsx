import type { Metadata } from "next";
import { Inter, Orbitron, Jersey_20 } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// --- Body font: Inter (clean, modern, readable) ---
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// --- Display / logo font: Orbitron (retro-futuristic, perfect for gaming) ---
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// --- Jersey 20 Font (pixel gaming font) ---
const jersey20 = Jersey_20({
  variable: "--font-jersey-20",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "8bit Café — Your Ultimate Gaming Lounge",
  description:
    "Step into 8bit Café — the ultimate gaming lounge with top-tier PCs, tournaments, and a thriving gaming community.",
  keywords: ["gaming cafe", "8bit", "esports", "tournaments", "gaming lounge"],
  openGraph: {
    title: "8bit Café — Your Ultimate Gaming Lounge",
    description:
      "Step into 8bit Café — the ultimate gaming lounge with top-tier PCs, tournaments, and a thriving gaming community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jersey20.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={4500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastStyle={{ background: "#12091F", border: "1px solid rgba(108,4,215,0.4)", borderRadius: "16px" }}
        />
      </body>
    </html>
  );
}
