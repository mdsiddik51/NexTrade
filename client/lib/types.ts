// ─── Service Types ───────────────────────────────────────────────
export type ServiceCategory =
  | "corporate"
  | "criminal"
  | "family"
  | "intellectual-property"
  | "real-estate"
  | "immigration"
  | "employment"
  | "tax";

export interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl?: string;
  lawyerName: string;
  lawyerImage?: string;
  lawyerEmail: string;
  casesHandled: number;
  yearsExperience: number;
  availability: "available" | "busy" | "unavailable";
  createdAt: string;
  userId: string;
}

// ─── User Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "client" | "lawyer" | "admin";
}

// ─── Review Types ────────────────────────────────────────────────
export interface Review {
  _id: string;
  serviceId: string;
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
export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  corporate: "Corporate Law",
  criminal: "Criminal Defense",
  family: "Family Law",
  "intellectual-property": "Intellectual Property",
  "real-estate": "Real Estate",
  immigration: "Immigration Law",
  employment: "Employment Law",
  tax: "Tax Law",
};
