// ─── Asset Category Types ───────────────────────────────────────
export type AssetCategory =
  | "stocks"
  | "crypto"
  | "real-estate"
  | "commodities"
  | "etf"
  | "forex"
  | "nft"
  | "bonds";

// ─── Asset Types ────────────────────────────────────────────────
export interface Asset {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: AssetCategory;
  pricePerUnit: number;
  rating: number;
  reviewCount: number;
  exchange: string;
  /** Legacy single image URL */
  imageUrl?: string;
  /** Official company/asset logo */
  logoUrl?: string;
  /** Ordered media gallery (charts, photos, etc.) */
  images?: string[];
  assetName: string;
  assetImage?: string;
  assetEmail: string;
  volume24h: number;
  marketCap: number;
  availability: "available" | "limited" | "closed";
  createdAt: string;
  userId: string;
}

// ─── User Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "trader" | "analyst" | "admin";
}

// ─── Review Types ────────────────────────────────────────────────
export interface Review {
  _id: string;
  assetId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── API Response Types ──────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

// ─── Category Metadata ──────────────────────────────────────────
export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  stocks: "Stocks",
  crypto: "Cryptocurrency",
  "real-estate": "Real Estate",
  commodities: "Commodities",
  etf: "ETFs",
  forex: "Forex",
  nft: "NFTs",
  bonds: "Bonds",
};
