/**
 * Utility for persisting booking form state across auth redirects.
 * Uses sessionStorage so data is only alive for the current browser session.
 */

export interface PendingBookingData {
  gameId: string;
  duration: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** ISO date string */
  selectedDate: string;
  /** startTime from ApiAvailableSlot — null if no slot was chosen */
  selectedSlotStartTime: string | null;
  /** Flag so the page knows to auto-open the booking modal */
  openModal: true;
}

const STORAGE_KEY = "8bit_pendingBooking";

export function savePendingBooking(data: PendingBookingData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore – incognito / storage quota exceeded
  }
}

export function loadPendingBooking(): PendingBookingData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingBookingData;
  } catch {
    return null;
  }
}

export function clearPendingBooking(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}
