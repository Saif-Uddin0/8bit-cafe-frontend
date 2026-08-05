"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { X, Gamepad2, ChevronLeft, ChevronRight, Loader2, CalendarX } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGames } from "@/hooks/useGames";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { useQueryClient } from "@tanstack/react-query";
import type { ApiGame, ApiAvailableSlot } from "@/types/api";
import { savePendingBooking, clearPendingBooking, type PendingBookingData } from "@/utils/pendingBooking";

// ─── Mini Calendar ─────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function CustomCalendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const [current, setCurrent] = useState(new Date());
  const year = current.getFullYear();
  const month = current.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    const t = new Date();
    if (year === t.getFullYear() && month === t.getMonth()) return;
    setCurrent(new Date(year, month - 1, 1));
  };
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const isFuture = (d: Date) => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d.getTime() >= t.getTime();
  };
  const isSel = (d: Date) =>
    !!selected &&
    d.getDate() === selected.getDate() &&
    d.getMonth() === selected.getMonth() &&
    d.getFullYear() === selected.getFullYear();
  const isToday = (d: Date) => {
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  };

  const cells: (Date | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div className="w-full bg-[#0A061A] border border-white/8 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition">
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          {MONTH_NAMES[month]} {year}
        </span>
        <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-white/30 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((date, i) => {
          if (!date) return <div key={`p-${i}`} />;
          const disabled = !isFuture(date);
          const sel = isSel(date);
          const today = isToday(date);
          return (
            <button
              key={`d-${date.getDate()}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`
                h-7 w-7 mx-auto flex items-center justify-center rounded-full
                text-[11px] font-semibold transition-all
                ${disabled ? "text-white/15 cursor-not-allowed" : "text-white/70 hover:bg-[#6C04D7]/25"}
                ${sel ? "bg-gradient-to-br from-[#F862C9] to-[#6C04D7] text-white shadow-md scale-110" : ""}
                ${!sel && today ? "ring-1 ring-[#CD4ECD] text-[#CD4ECD]" : ""}
              `}
            >{date.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slot grid skeleton ───────────────────────────────────────────────────────

function SlotSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 bg-[#0A061A] border border-[#6C04D7]/25 rounded-2xl p-3.5 h-[255px] sm:h-[285px] overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-11 rounded-xl bg-white/5 animate-pulse"
        />
      ))}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingFormData {
  service: ApiGame;
  duration: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
  selectedSlot: ApiAvailableSlot;
}

interface FormFields {
  serviceId: string;
  duration: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookingModalProps {
  isOpen: boolean;
  initialServiceId?: string;
  /** Pending booking data restored from sessionStorage after login redirect */
  initialData?: PendingBookingData;
  onClose: () => void;
  onConfirm: (data: BookingFormData) => void;
}

// Shared style helpers 

const fieldCls =
  "w-full bg-[#0A061A] border border-[#6C04D7]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#CD4ECD] transition";

const fieldErrorCls =
  "w-full bg-[#0A061A] border border-red-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-400 transition";

const labelCls = "text-[10px] font-bold uppercase text-white/50 tracking-wider";

// Duration → durationMin mapping 
function durationToMin(dur: string): number {
  if (dur === "30 Minutes") return 30;
  if (dur === "60 Minutes") return 60;
  if (dur === "90 Minutes") return 90;
  return 30;
}

// Shared slot timer helpers 

function getSlotExpiresAt(s: ApiAvailableSlot): number | null {
  if (s.expiresAt) return new Date(s.expiresAt).getTime();
  const secs = s.expiresInSeconds ?? s.expiredInSeconds;
  if (secs !== undefined && secs !== null) return Date.now() + secs * 1000;
  return null;
}

/** Formats seconds as MM:SS */
function formatCountdown(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Component

export default function BookingModal({
  isOpen,
  initialServiceId = "",
  initialData,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { profile, user } = useAuth();
  const { data: gamesList } = useGames();
  const games = gamesList ?? [];

  // Tracks whether we have already attempted to restore the saved slot
  const hasRestoredSlot = useRef(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormFields>({
    defaultValues: {
      serviceId: initialServiceId || games[0]?.id || "",
      duration: "30 Minutes",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<ApiAvailableSlot | null>(null);
  const [consent, setConsent] = useState(false);
  const [slotInfoOpen, setSlotInfoOpen] = useState(false);
  const [clickedSlotInfo, setClickedSlotInfo] = useState<ApiAvailableSlot | null>(null);

  const watchedServiceId = watch("serviceId");
  const watchedDuration = watch("duration");
  const durationMin = durationToMin(watchedDuration);

  // Dynamic Pricing Calculation
  const selectedGame = games.find((g) => g.id === watchedServiceId);
  const originalPrice = selectedGame
    ? (watchedDuration === "30 Minutes" ? selectedGame.price30Min : selectedGame.price60Min)
    : 0;
  const discountPct = selectedGame?.disCountParcenTage ?? 0;
  const hasDiscount = selectedGame?.isDiscount === true && discountPct > 0;
  const discountPrice = hasDiscount ? originalPrice - (originalPrice * discountPct / 100) : originalPrice;

  // Fetch available slots from backend 
  const {
    data: slots = [],
    isLoading: slotsLoading,
    isError: slotsError,
  } = useAvailableSlots({
    gameId: watchedServiceId,
    date: selectedDate,
    durationMin,
  });

  // Auto-select slot when slots refresh.
  // On first load (after a login redirect), try to restore the saved slot.
  // On subsequent date changes, fall back to the first available slot.
  useEffect(() => {
    if (slots.length > 0) {
      const savedStartTime = initialData?.selectedSlotStartTime;
      if (savedStartTime && !hasRestoredSlot.current) {
        hasRestoredSlot.current = true;
        const savedSlot = slots.find(
          (s) => s.startTime === savedStartTime && s.status === "AVAILABLE"
        );
        if (savedSlot) {
          setSelectedSlot(savedSlot);
        } else {
          toast.warn(
            "Your previously selected time slot is no longer available. Please choose another.",
            { theme: "dark", autoClose: 5000, position: "top-right" }
          );
          const firstAvail = slots.find((s) => s.status === "AVAILABLE");
          setSelectedSlot(firstAvail || null);
        }
      } else {
        const firstAvail = slots.find((s) => s.status === "AVAILABLE");
        setSelectedSlot(firstAvail || null);
      }
    } else {
      setSelectedSlot(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  // Sync initial service id / games list
  useEffect(() => {
    if (initialServiceId) {
      setValue("serviceId", initialServiceId);
    } else if (games.length > 0) {
      setValue("serviceId", games[0].id);
    }
  }, [initialServiceId, games, setValue]);

  // Autofill user profile when logged in
  // Handles both camelCase and snake_case field variants the backend may return
  useEffect(() => {
    if (profile) {
      const firstName = profile.firstName || profile.first_name || profile.name?.split(" ")[0] || "";
      const lastName = profile.lastName || profile.last_name || profile.name?.split(" ").slice(1).join(" ") || "";
      const email = profile.email || "";
      const phone = profile.phone || profile.phoneNumber || profile.contact_number || profile.mobile || "";

      if (firstName) setValue("firstName", firstName);
      if (lastName) setValue("lastName", lastName);
      if (email) setValue("email", email);
      if (phone) setValue("phone", phone);
    }
  }, [profile, setValue]);

  // Restore saved booking form data (game, duration, personal info, date)
  // after the user returns from the login redirect.
  // Profile effect runs afterwards and will correctly override email/phone.
  useEffect(() => {
    if (!initialData) return;
    if (initialData.gameId) setValue("serviceId", initialData.gameId);
    if (initialData.duration) setValue("duration", initialData.duration);
    if (initialData.firstName) setValue("firstName", initialData.firstName);
    if (initialData.lastName) setValue("lastName", initialData.lastName);
    if (initialData.email) setValue("email", initialData.email);
    if (initialData.phone) setValue("phone", initialData.phone);
    if (initialData.selectedDate) setSelectedDate(new Date(initialData.selectedDate));
  // Run once on mount (initialData is stable)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;

  /** Clears any pending booking state and calls the parent's onClose */
  const handleClose = () => {
    clearPendingBooking();
    onClose();
  };

  const handleServiceChange = (id: string) => {
    setValue("serviceId", id);
  };

  const onSubmit = (fields: FormFields) => {
    if (!consent) {
      toast.error("Please agree to the consent checkbox to proceed.", {
        position: "top-right", autoClose: 4000, theme: "dark",
      });
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a preferred date.", {
        position: "top-right", autoClose: 4000, theme: "dark",
      });
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select an available time slot.", {
        position: "top-right", autoClose: 4000, theme: "dark",
      });
      return;
    }
    const service = games.find((s) => s.id === fields.serviceId);
    if (!service) {
      toast.error("Please select a valid service.", {
        position: "top-right", autoClose: 4000, theme: "dark",
      });
      return;
    }

    // ── Auth gate ── save form to sessionStorage and redirect to login
    if (!user) {
      savePendingBooking({
        gameId: fields.serviceId,
        duration: fields.duration,
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phone: fields.phone,
        selectedDate: selectedDate.toISOString(),
        selectedSlotStartTime: selectedSlot.startTime,
        openModal: true,
      });
      toast.info(
        "Please sign in to continue. Your booking details have been saved.",
        { theme: "dark", autoClose: 3500, position: "top-right" }
      );
      setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }, 1200);
      return;
    }

    clearPendingBooking();
    onConfirm({
      service,
      duration: fields.duration,
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      date: selectedDate,
      timeSlot: selectedSlot.display,
      selectedSlot,
    });
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "Selected Date";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm">
      <div
        className="w-full max-w-[820px] max-h-[92vh] overflow-y-auto bg-[#12091F] border border-[#6C04D7]/80 rounded-[24px] shadow-[0_20px_60px_rgba(108,4,215,0.4)] p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-[#CD4ECD]" size={24} />
            <h3
              className="text-xl sm:text-2xl text-white uppercase tracking-wider"
              style={{ fontFamily: "var(--font-jersey-20)", fontWeight: 400 }}
            >
              Book Gaming Session
            </h3>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Service + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Service Name</label>
              <select
                value={watchedServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className={fieldCls}
              >
                {games.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Duration</label>
              <select {...register("duration")} className={fieldCls}>
                <option value="30 Minutes">30:00 Minutes</option>
                <option value="60 Minutes">60:00 Minutes</option>
              </select>
            </div>
          </div>

          {/* Dynamic Pricing */}
          <div className="bg-[#0A061A]/80 border border-[#6C04D7]/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className={labelCls}>Session Price</span>
              <span className="text-[10px] text-white/30 font-medium tracking-wide">For {watchedDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-white/40 line-through">৳{originalPrice.toFixed(0)}</span>
                  <span className="text-xl font-bold text-[#EF3D86]">৳{discountPrice.toFixed(0)}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    {discountPct}% OFF
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#CD4ECD]">৳{originalPrice.toFixed(0)}</span>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelCls}>First Name <span className="text-red-400">*</span></label>
              <input
                {...register("firstName", { required: "First name is required" })}
                type="text"
                placeholder="Enter first name"
                className={errors.firstName ? fieldErrorCls : fieldCls}
              />
              {errors.firstName && (
                <p className="text-red-400 text-[10px] font-medium mt-0.5">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Last Name <span className="text-red-400">*</span></label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Enter last name"
                className={errors.lastName ? fieldErrorCls : fieldCls}
              />
              {errors.lastName && (
                <p className="text-red-400 text-[10px] font-medium mt-0.5">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Email <span className="text-red-400">*</span></label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Enter a valid email address" },
                })}
                type="email"
                placeholder="Enter email"
                className={errors.email ? fieldErrorCls : fieldCls}
              />
              {errors.email && (
                <p className="text-red-400 text-[10px] font-medium mt-0.5">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Phone <span className="text-red-400">*</span></label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9+\-\s]{7,15}$/, message: "Enter a valid phone number" },
                })}
                type="tel"
                placeholder="Enter phone number"
                className={errors.phone ? fieldErrorCls : fieldCls}
              />
              {errors.phone && (
                <p className="text-red-400 text-[10px] font-medium mt-0.5">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Calendar + Time Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
            {/* Calendar */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Preferred Date</label>
              <CustomCalendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>

            {/* Available Slots */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className={labelCls}>Availability for {dateLabel}</label>
                {/* Duration hint pill */}
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#CD4ECD]/70 bg-[#CD4ECD]/10 px-2 py-0.5 rounded-full">
                  {watchedDuration}
                </span>
              </div>

              {/* Loading */}
              {slotsLoading && <SlotSkeleton />}

              {/* Error — suggest off day */}
              {slotsError && !slotsLoading && (
                <div className="flex flex-col items-center justify-center gap-3 bg-[#0A061A] border border-amber-500/20 rounded-2xl p-6 text-center min-h-[130px]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10">
                    <CalendarX size={20} strokeWidth={1.5} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">🚫 Off Day</p>
                    <p className="text-white/50 text-[11px] leading-relaxed">
                      No sessions available on this date.<br />
                      <span className="text-white/30">Please select a different day.</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Empty — Off Day */}
              {!slotsLoading && !slotsError && slots.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 bg-[#0A061A] border border-amber-500/20 rounded-2xl p-6 text-center min-h-[130px]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10">
                    <CalendarX size={20} strokeWidth={1.5} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">🚫 Off Day</p>
                    <p className="text-white/50 text-[11px] leading-relaxed">
                      No sessions available on this date.<br />
                      <span className="text-white/30">Please select a different day.</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Slots grid */}
              {!slotsLoading && !slotsError && slots.length > 0 && (
                <div className="grid grid-cols-2 gap-2.5 bg-[#0A061A] border border-[#6C04D7]/25 rounded-2xl p-3.5 h-[255px] sm:h-[285px] overflow-y-auto">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot?.startTime === slot.startTime;
                    return (
                      <SlotButton
                        key={slot.startTime}
                        slot={slot}
                        isSelected={isSelected}
                        onClick={() => {
                          if (slot.status === "AVAILABLE") {
                            setSelectedSlot(slot);
                          } else if (slot.status === "PENDING" || slot.status === "LOCKED") {
                            setClickedSlotInfo(slot);
                            setSlotInfoOpen(true);
                          }
                        }}
                        onExpire={() => {
                          queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-start gap-3 bg-[#0A061A]/60 border border-white/5 rounded-xl p-3.5">
            <input
              type="checkbox" id="consent"
              checked={consent} onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-[#CD4ECD] cursor-pointer"
            />
            <label htmlFor="consent" className="text-[11px] leading-relaxed text-white/40 cursor-pointer select-none">
              I agree to receive booking confirmations, updates, and support messages from 8bit Café.
              Msg &amp; data rates may apply. Reply STOP to opt out.
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/8 gap-4">
            <button type="button" onClick={handleClose}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition text-xs font-bold uppercase tracking-wider">
              Cancel
            </button>
            <button type="submit"
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] hover:shadow-[0_0_24px_rgba(108,4,215,0.6)] text-white hover:scale-[1.02] active:scale-95 transition text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              {slotsLoading && <Loader2 size={13} className="animate-spin" />}
              Book Now
            </button>
          </div>
        </form>
      </div>

      {/* Info modal for non-selectable slots */}
      <SlotInfoModal
        slot={clickedSlotInfo}
        isOpen={slotInfoOpen}
        onClose={() => {
          setSlotInfoOpen(false);
          setClickedSlotInfo(null);
        }}
        onExpire={() => {
          queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
        }}
      />
    </div>
  );
}

// ─── Slot Button Subcomponent ──────────────────────────────────────────────────
function SlotButton({
  slot,
  isSelected,
  onClick,
  onExpire,
}: {
  slot: ApiAvailableSlot;
  isSelected: boolean;
  onClick: () => void;
  onExpire: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (slot.status !== "PENDING") return;
    const expiresAt = getSlotExpiresAt(slot);
    if (!expiresAt) return;

    const updateTimer = () => {
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        onExpire();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [slot, onExpire]);

  if (slot.status === "BOOKED") {
    return (
      <button
        type="button"
        disabled
        className="h-11 py-1 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-xl border bg-red-950/20 border-red-500/30 text-red-400 cursor-not-allowed text-center flex flex-col items-center justify-center whitespace-nowrap"
      >
        <div className="font-semibold text-[10px] sm:text-[11px] leading-none">{slot.display}</div>
        <div className="text-[8px] opacity-70 uppercase tracking-widest mt-0.5">Booked</div>
      </button>
    );
  }

  if (slot.status === "LOCKED") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="h-11 py-1 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-xl border bg-gray-900/60 border-gray-700/40 text-gray-400 hover:border-gray-500 transition text-center flex flex-col items-center justify-center cursor-pointer whitespace-nowrap"
      >
        <div className="font-semibold text-[10px] sm:text-[11px] leading-none">{slot.display}</div>
        <div className="text-[8px] opacity-70 uppercase tracking-widest mt-0.5">Locked</div>
      </button>
    );
  }

  if (slot.status === "PENDING") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="h-11 py-1 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-xl border bg-amber-950/20 border-amber-500/40 text-amber-300 hover:border-amber-500 transition text-center flex flex-col items-center justify-center cursor-pointer whitespace-nowrap"
      >
        <div className="font-semibold text-[10px] sm:text-[11px] leading-none">{slot.display}</div>
        <div className="text-[8px] uppercase tracking-wider mt-0.5 text-amber-500/90 font-extrabold animate-pulse">
          Pending {timeLeft > 0 ? `(${formatCountdown(timeLeft)})` : ""}
        </div>
      </button>
    );
  }

  // AVAILABLE
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-11 py-1 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all border text-center leading-none flex items-center justify-center cursor-pointer whitespace-nowrap
        ${isSelected
          ? "bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] border-transparent text-white shadow-md scale-[1.02]"
          : "bg-[#12091F] border-white/10 hover:border-[#6C04D7] text-white/80 hover:text-white"}
      `}
    >
      {slot.display}
    </button>
  );
}

// ─── Slot Info Modal Subcomponent ────────────────────────────────────────────────
function SlotInfoModal({
  slot,
  isOpen,
  onClose,
  onExpire,
}: {
  slot: ApiAvailableSlot | null;
  isOpen: boolean;
  onClose: () => void;
  onExpire: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!isOpen || !slot || slot.status !== "PENDING") return;
    const expiresAt = getSlotExpiresAt(slot);
    if (!expiresAt) return;

    const updateTimer = () => {
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        onExpire();
        onClose();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [slot, isOpen, onExpire, onClose]);

  if (!isOpen || !slot) return null;

  const isPending = slot.status === "PENDING";
  const title = isPending ? "Slot Temporarily Reserved" : "Slot Unavailable";
  const message = isPending
    ? "This slot has been temporarily reserved by another player."
    : "This slot is currently unavailable.";

  const hasExpires = !!slot.expiresAt || slot.expiresInSeconds !== undefined || slot.expiredInSeconds !== undefined;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-[420px] bg-[#12091F] border border-amber-500/50 rounded-[20px] p-6 shadow-[0_10px_40px_rgba(245,158,11,0.2)] text-center animate-scaleUp">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
            <span className="text-xl font-bold">⚠️</span>
          </div>

          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            {title}
          </h3>

          <p className="text-white/60 text-xs leading-relaxed">
            {message}
          </p>

          {isPending && hasExpires && (
            <div className="bg-[#0A061A] border border-white/5 px-6 py-3 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">Time Remaining</p>
              <p className="text-2xl font-mono font-bold text-amber-500 tracking-widest">
                {formatCountdown(timeLeft)}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition"
            >
              Choose Another Slot
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-wider active:scale-95 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
