// --- User & Auth ---

export type UserRole = "visitor" | "buyer" | "seller" | "verified_dealer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  city?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// --- Product ---

export type ProductCondition = "mint" | "excellent" | "good" | "fair" | "poor";
export type ProductStatus = "active" | "sold" | "pending" | "archived";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  hasAuction: boolean;
  auctionEndDate?: string;
  currentBid?: number;
  bidCount?: number;
  category: Category;
  condition: ProductCondition;
  year?: number;
  origin?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  location: string;
  city: string;
  images: string[];
  seller: SellerSummary;
  viewCount: number;
  favoriteCount: number;
  status: ProductStatus;
  shippingAvailable: boolean;
  pickupAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerSummary {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  city: string;
  memberSince: string;
}

// --- Category ---

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  slug: string;
  icon: string;
  productCount?: number;
}

// --- Auction ---

export interface Bid {
  id: string;
  amount: number;
  bidder: { id: string; name: string };
  createdAt: string;
}

export interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  reservePrice?: number;
  currentBid: number;
  minBidIncrement: number;
  endDate: string;
  bids: Bid[];
  winner?: { id: string; name: string };
}

// --- Order ---

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "disputed";

export interface Order {
  id: string;
  product: Pick<Product, "id" | "title" | "images" | "price">;
  buyer: Pick<User, "id" | "name" | "avatar">;
  seller: Pick<User, "id" | "name" | "avatar">;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Offer ---

export type OfferStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export interface Offer {
  id: string;
  product: Pick<Product, "id" | "title" | "images" | "price">;
  buyer: Pick<User, "id" | "name" | "avatar">;
  amount: number;
  message?: string;
  status: OfferStatus;
  createdAt: string;
}

// --- Message ---

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: Pick<User, "id" | "name" | "avatar">[];
  product?: Pick<Product, "id" | "title" | "images">;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

// --- Review ---

export interface Review {
  id: string;
  reviewer: Pick<User, "id" | "name" | "avatar">;
  rating: number;
  comment: string;
  photos?: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
}

// --- Address ---

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

// --- Search ---

export interface SearchFilters {
  keyword?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition;
  material?: string;
  era?: string;
  hasAuction?: boolean;
  isNegotiable?: boolean;
  shippingAvailable?: boolean;
  isVerifiedSeller?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "most_viewed" | "highest_rated";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// --- Analytics ---

export interface SellerStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  totalViews: number;
  totalFavorites: number;
  pendingOrders: number;
  unreadMessages: number;
  rating: number;
}

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingVerifications: number;
  reportedListings: number;
  newUsersToday: number;
  ordersToday: number;
}
