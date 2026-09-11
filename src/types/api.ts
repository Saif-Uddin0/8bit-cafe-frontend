// ─── Category ───────────────────────────────────────────────────────────────

export interface ApiCategory {
  id: string;
  type: string;
  name: string;
  isDelete: boolean;
  createdAt: string;
  image?: string | { url: string };
  images?: Array<string | { url: string }>;
  imageUrl?: string;
}

export interface ApiCategoriesResponse {
  data: {
    meta: { page: number; limit: number; total: number };
    data: ApiCategory[];
  };
}

// ─── Food ────────────────────────────────────────────────────────────────────

export interface ApiImage {
  url: string;
  publicId: string;
}

export interface ApiFood {
  id: string;
  name: string;
  price: number;
  images: ApiImage[];
  delivery_time: number;
  delivery_fee: number;
  short_description: string;
  //  Exact backend field names (note: isDisCount / disCountParcentage)
  isDisCount: boolean;
  disCountParcentage: number;  // backend typo — "Parcentage"
  discountPrice: number;
  status: "AVAILABLE" | "UNAVAILABLE" | string;
  categoryId: string;
  category: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface ApiFoodsResponse {
  data: {
    meta: { page: number; limit: number; total: number };
    data: ApiFood[];
  };
}

// ─── Food Detail ─────────────────────────────────────────────────────────────
// POST /api/foods/foodDetails/:foodId returns: { data: ApiFood, success: boolean, message: string }
export interface ApiFoodDetailResponse {
  data: ApiFood;
  success: boolean;
  message: string;
}

// ─── Game & Schedules ────────────────────────────────────────────────────────
export interface ApiSchedule {
  id: string;
  gameId: string;
  day: string;
  openTime: string;
  endTime: string;
}

export interface ApiGame {
  id: string;
  name: string;
  price30Min: number;
  price60Min: number;
  images: ApiImage[];
  description: string;
  status: "AVAILABLE" | "UNAVAILABLE" | string;
  isDiscount: boolean;
  disCountParcenTage: number | null;
  categoryId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  schedules?: ApiSchedule[];
  category?: {
    id?: string;
    name: string;
  };
}

export interface ApiGamesResponse {
  data: {
    meta: { page: number; limit: number; total: number };
    data: ApiGame[];
  };
}

export interface ApiGameDetailResponse {
  data: ApiGame;
  success: boolean;
  message: string;
}

// ─── Available Booking Slots 
// GET /api/booking/availableSlote
// Body: { gameId: string, date: string (ISO), durationMin: number }
export interface ApiAvailableSlot {
  display: string;          // e.g. "09:00 AM – 09:30 AM"
  startTime: string;        // ISO timestamp
  endTime: string;          // ISO timestamp
  status: "AVAILABLE" | "PENDING" | "BOOKED" | "LOCKED" | string;
  isLocked: boolean;
  lockedByUserId: string | null;
  expiredInSeconds: number | null;
  expiresInSeconds?: number | null;
  expiresAt?: string | null;
}

export interface ApiAvailableSlotsResponse {
  data: ApiAvailableSlot[];
}

// ─── Bookings ────────────────────────────────────────────────────────────────
export interface ApiBooking {
  id: string;
  userId: string;
  gameId: string;
  startTime: string;
  durationMin: number;
  // status = payment status from backend (PAID / PENDING / FAILED)
  status: "PAID" | "PENDING" | "FAILED" | string;
  // gameStatus = game lifecycle (NOT_STARTED / RUNNING / COMPLETED)
  gameStatus: "NOT_STARTED" | "RUNNING" | "COMPLETED" | string;
  expiresAt: string;
  createdAt: string;
  totalAmount: string;
  serviceFee: string;
  game?: ApiGame;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
  };
}

export interface ApiMyBookingsResponse {
  data: ApiBooking[];
  success: boolean;
  message: string;
}

// ─── Food Order ──────────────────────────────────────────────────────────────
export interface ApiFoodOrderItem {
  id: string;
  foodOrderId: string;
  foodId: string;
  quantity: number;
  price: number;
}

export interface ApiFoodOrder {
  id: string;        // foodOrderId — used for payment/initialize
  userId: string;
  totalAmount: number;
  serviceFee: number;
  status: string;
  createdAt: string;
  items: ApiFoodOrderItem[];
}

export interface ApiFoodOrderResponse {
  data: ApiFoodOrder;
  success: boolean;
  message: string;
}

// ─── Transactions ─────────────────────────────────────────────────────────────
export interface ApiTransaction {
  id: string;
  userId?: string;
  paymentType: "GAME" | "FOOD" | string;
  gameBookingId: string | null;
  foodOrderId: string | null;
  amount: number;
  paymentMethod: string | null;
  merchantTxnId: string;
  customerOrderId: string;
  transactionId: string | null;
  transactionTypeId?: number;
  status: "SUCCESS" | "PENDING" | "FAILED" | string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string | null;
  customerCity: string | null;
  customerPostcode?: string | null;
  valueA?: string;
  valueB?: string;
  createdAt: string;
  updatedAt: string;
  // Nested user object returned by the new API
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string | null;
  };
}

export interface ApiTransactionsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// New response shape: { data: { meta: {...}, data: ApiTransaction[] }, success, message }
export interface ApiTransactionsResponse {
  data: {
    meta: ApiTransactionsMeta;
    data: ApiTransaction[];
  };
  success: boolean;
  message: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────
export interface ApiCartItem {
  id: string;          // CartItem database ID (used for deletion)
  quantity: number;
  foodId: string;
  food: ApiFood;       // Nested food details
}

export interface ApiCart {
  id: string;
  createdAt: string;
  CartItems: ApiCartItem[];
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ApiCartResponse {
  data: ApiCart[];     // Backend returns cart inside an array
  success: boolean;
  message: string;
}

export interface ApiCartAddResponse {
  success: boolean;
  message: string;
}

// ─── Banners ─────────────────────────────────────────────────────────────────
// GET /banners/all
export interface ApiBanner {
  id: string;
  image: string; // Cloudinary URL
}

export interface ApiBannersResponse {
  data: ApiBanner[];
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

