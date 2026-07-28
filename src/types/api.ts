// ─── Category ───────────────────────────────────────────────────────────────

export interface ApiCategory {
  id: string;
  type: string;
  name: string;
  isDelete: boolean;
  createdAt: string;
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
