"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { SERVICES, TIME_SLOTS, type GameService } from "@/components/home/game-services/gameServicesData";

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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingFormData {
  service: GameService;
  duration: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
}

// Internal RHF field shape
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
  initialServiceId?: number;
  onClose: () => void;
  onConfirm: (data: BookingFormData) => void;
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

const fieldCls =
  "w-full bg-[#0A061A] border border-[#6C04D7]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#CD4ECD] transition";

const labelCls = "text-[10px] font-bold uppercase text-white/50 tracking-wider";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * BookingModal — "Book Gaming Session" form.
 *
 * Uses React Hook Form for field management. Validation is intentionally
 * disabled for now; once a backend API is ready, add resolver/rules.
 * Uses react-toastify for any error notifications.
 */
export default function BookingModal({
  isOpen,
  initialServiceId = 1,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const initial = SERVICES.find((s) => s.id === initialServiceId) ?? SERVICES[0];

  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      serviceId: String(initial.id),
      duration: initial.duration,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [timeSlot, setTimeSlot] = useState("10:00 Am");
  const [consent, setConsent] = useState(false);

  const watchedServiceId = watch("serviceId");

  if (!isOpen) return null;

  // Keep duration in sync when service changes
  const handleServiceChange = (id: string) => {
    setValue("serviceId", id);
    const svc = SERVICES.find((s) => s.id === Number(id));
    if (svc) setValue("duration", svc.duration);
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
    const service = SERVICES.find((s) => s.id === Number(fields.serviceId)) ?? SERVICES[0];
    onConfirm({
      service,
      duration: fields.duration,
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      date: selectedDate,
      timeSlot,
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
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition" aria-label="Close">
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
                {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Duration</label>
              <select {...register("duration")} className={fieldCls}>
                <option value="30 Minutes">30:00 Minutes</option>
                <option value="60 Minutes">60:00 Minutes</option>
                <option value="90 Minutes">90:00 Minutes</option>
              </select>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>First Name</label>
              <input {...register("firstName")} type="text" placeholder="Enter first name" className={fieldCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Last Name</label>
              <input {...register("lastName")} type="text" placeholder="Enter last name" className={fieldCls} />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Email</label>
              <input {...register("email")} type="email" placeholder="Enter email" className={fieldCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Phone</label>
              <input {...register("phone")} type="tel" placeholder="Enter phone number" className={fieldCls} />
            </div>
          </div>

          {/* Calendar + Time Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Preferred Date</label>
              <CustomCalendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Availability for {dateLabel}</label>
              <div className="grid grid-cols-3 gap-2 bg-[#0A061A] border border-[#6C04D7]/25 rounded-2xl p-3 max-h-[210px] overflow-y-auto">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot} type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`
                      py-1.5 text-[10px] font-bold rounded-lg transition-all border
                      ${timeSlot === slot
                        ? "bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] border-transparent text-white shadow-md scale-[1.04]"
                        : "bg-[#12091F] border-white/5 hover:border-[#6C04D7]/50 text-white/60"}
                    `}
                  >{slot}</button>
                ))}
              </div>
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
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition text-xs font-bold uppercase tracking-wider">
              Cancel
            </button>
            <button type="submit"
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#6C04D7] to-[#CD4ECD] hover:shadow-[0_0_24px_rgba(108,4,215,0.6)] text-white hover:scale-[1.02] active:scale-95 transition text-xs font-bold uppercase tracking-wider">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
