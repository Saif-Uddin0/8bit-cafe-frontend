"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, MapPin, Menu, X } from "lucide-react";
import { useCartUI } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

const LOCATION_URL = "https://maps.app.goo.gl/MgfpztgG6WTqMhz28";

/** Section IDs that correspond to hash nav links on the home page */
const HASH_SECTIONS = ["hero", "about", "services", "contact"] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  const { toggleCart } = useCartUI();
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const navLinks = [
    { href: "/#hero", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/foods", label: "Food" },
    ...(user
      ? [
        { href: "/my-bookings", label: "My Bookings" },
        { href: "/my-transactions", label: "My Transactions" },
      ]
      : []),
    { href: "/#contact", label: "Contact" },
  ];

  // Scroll listener
  useEffect(() => {
    setMounted(true);
    const onScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // IntersectionObserver for hash sections — only on the home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.25, 0.5], rootMargin: "-80px 0px -30% 0px" }
    );

    observerRef.current = observer;

    HASH_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  /** Determine if a nav link should be styled as active */
  const isLinkActive = (href: string): boolean => {
    if (href === "/") return pathname === "/" && (activeSection === "" || activeSection === "hero");
    if (href === "/foods") return pathname.startsWith("/foods");
    if (href === "/my-bookings") return pathname.startsWith("/my-bookings");
    if (href === "/my-transactions") return pathname.startsWith("/my-transactions");

    if (href === "/#hero") {
      return pathname === "/" && (activeSection === "hero" || activeSection === "");
    }

    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      return pathname === "/" && activeSection === sectionId;
    }

    return false;
  };

  /** Handle smooth scroll and clean URL hash navigation without double-hash bugs */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.pushState({}, "", href);
        setActiveSection(sectionId);
        return;
      }
    } else if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState({}, "", "/");
        setActiveSection("hero");
        return;
      }
    }
  };

  const linkStyle = (href: string) => ({
    color: isLinkActive(href) ? "#EF3D86" : "rgba(255,255,255,0.85)",
  });

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 lg:px-10 xl:px-16">
      {/* Floating Nav Card */}
      <div
        className="w-full max-w-[1500px] relative transition-all duration-300 h-[72px] sm:h-[80px] lg:h-[88px] rounded-[16px] sm:rounded-[20px]"
        style={{
          background: scrolled ? "rgba(22, 10, 54, 0.92)" : "rgba(41, 17, 101, 0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.55), 0 2px 12px rgba(108,4,215,0.25)"
            : "0 8px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(108,4,215,0.15)",
        }}
      >
        <div className="flex items-center justify-between h-full px-3 sm:px-5 lg:px-6 gap-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="shrink-0 flex items-center"
          >
            <div
              className="relative overflow-hidden w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] lg:w-[68px] lg:h-[68px] rounded-[12px] sm:rounded-[14px]"
            >
              <Image
                src="/logo.png"
                alt="8bit Cafe Logo"
                fill
                sizes="(max-width: 640px) 54px, (max-width: 1024px) 62px, 68px"
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links (centered flex container) */}
          <ul className="hidden lg:flex items-center justify-center flex-1 mx-1 xl:mx-4 gap-0.5 xl:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-2 xl:px-4 py-2 text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap block"
                    style={linkStyle(link.href)}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = "#CD4ECD";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {active && (
                      <span
                        className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[2px] w-[60%] rounded-full"
                        style={{ background: "linear-gradient(90deg, #EF3D86, #CD4ECD)" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right: Icons + Sign In / Out */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-5 shrink-0">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => toggleCart(true)}
              aria-label="Open Cart"
              className="relative transition-colors duration-200 text-white hover:text-[#CD4ECD] p-2"
            >
              <ShoppingCart size={20} strokeWidth={1.8} className="xl:w-[22px] xl:h-[22px]" />
              {mounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF3D86] text-[10px] font-bold text-white shadow-lg animate-pulse-glow">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Location */}
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="View on Google Maps"
              className="text-white hover:text-[#7C3AED] transition p-1.5"
            >
              <MapPin size={20} strokeWidth={1.8} className="xl:w-[24px] xl:h-[24px]" />
            </a>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={() => { logout(); router.push("/login"); }}
                className="btn-secondary text-xs xl:text-sm whitespace-nowrap"
                style={
                  {
                    "--btn-height": "40px",
                    "--btn-radius": "10px",
                    "--btn-px": "24px",
                    "--btn-py": "20px",
                    "--btn-mx": "0px",
                    "--btn-my": "0px",
                  } as React.CSSProperties
                }
              >
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="btn-secondary text-xs xl:text-sm whitespace-nowrap"
                style={
                  {
                    "--btn-height": "40px",
                    "--btn-radius": "10px",
                    "--btn-px": "24px",
                    "--btn-py": "20px",
                    "--btn-mx": "0px",
                    "--btn-my": "0px",
                  } as React.CSSProperties
                }
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile: Cart + Location + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => toggleCart(true)}
              aria-label="Open Cart"
              className="relative p-2 text-white transition-colors duration-200 hover:text-[#CD4ECD]"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />
              {mounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF3D86] text-[9px] font-bold text-white shadow-lg">
                  {totalQuantity}
                </span>
              )}
            </button>

            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Store Location"
              className="p-2 text-white transition-colors duration-200 hover:text-[#CD4ECD]"
            >
              <MapPin size={20} strokeWidth={1.8} />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/20 transition-colors hover:border-[#CD4ECD]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="absolute top-[84px] sm:top-[94px] left-4 right-4 p-4 sm:p-5 max-h-[85vh] overflow-y-auto"
          style={{
            borderRadius: "18px",
            background: "rgba(30, 13, 75, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          }}
        >
          <ul className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      color: active ? "#EF3D86" : "rgba(255,255,255,0.85)",
                      background: active ? "rgba(239, 61, 134, 0.1)" : "transparent",
                    }}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF3D86] shrink-0" />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {user ? (
            <div className="flex items-center justify-between px-4 py-3 bg-[#181426]/80 border border-white/10 rounded-xl">
              <span className="text-sm font-medium text-white/90 max-w-[180px] truncate">
                {user?.firstName
                  ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
                  : user?.name || user?.username || "Gamer"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                  router.push("/login");
                }}
                className="text-xs font-semibold text-[#EF3D86] hover:text-[#CD4ECD] transition-colors cursor-pointer bg-transparent border-none"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full text-center py-3 text-sm block"
              style={{ borderRadius: "14px" }}
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
