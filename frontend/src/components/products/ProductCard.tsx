import Link from "next/link";
import { Heart, Eye, MapPin, Clock, Gavel } from "lucide-react";
import { type Product } from "@/lib/types";
import { CONDITION_LABELS, CONDITION_COLORS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const hasAuction = product.hasAuction && product.auctionEndDate;
  const timeLeft = hasAuction ? getTimeLeft(product.auctionEndDate!) : null;

  return (
    <Link href={`/listings/${product.id}`} className={cn("group block", className)}>
      <div className="overflow-hidden rounded-2xl border border-[var(--antiq-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--gold)]/10">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream-dark)]">
          <img src={product.images[0] || "/placeholder.jpg"} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
            {hasAuction && (
              <span className="flex items-center gap-1 rounded-full bg-[var(--antiq-dark)] px-2.5 py-1 text-[10px] font-bold text-[var(--gold)]">
                <Gavel className="h-2.5 w-2.5" />Enchère
              </span>
            )}
            {product.seller.isVerified && (
              <span className="rounded-full bg-[var(--gold)] px-2.5 py-1 text-[10px] font-bold text-[var(--antiq-dark)]">✔ Vérifié</span>
            )}
          </div>
          <button className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--antiq-muted)] shadow-sm transition-all hover:bg-[var(--gold)] hover:text-white" onClick={(e) => { e.preventDefault(); }}>
            <Heart className="h-3.5 w-3.5" />
          </button>
          {timeLeft && (
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <div className="flex items-center justify-between rounded-full bg-[var(--antiq-dark)]/90 px-3 py-1.5">
                <span className="flex items-center gap-1 text-[10px] text-[var(--cream)]/70"><Clock className="h-2.5 w-2.5" />Se termine dans</span>
                <span className="text-xs font-bold text-[var(--gold)]">{timeLeft}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-3.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CONDITION_COLORS[product.condition])}>{CONDITION_LABELS[product.condition]}</span>
            <span className="text-[10px] text-[var(--antiq-muted)]">{product.year || ""}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-[var(--antiq-dark)] group-hover:text-[var(--gold-dark)] transition-colors">{product.title}</h3>
          <div className="mb-3">
            {hasAuction ? (
              <div>
                <div className="text-[10px] text-[var(--antiq-muted)]">Offre actuelle</div>
                <div className="text-lg font-bold text-[var(--gold-dark)]">{formatPrice(product.currentBid!)}</div>
                <div className="text-[10px] text-[var(--antiq-muted)]">{product.bidCount} enchères</div>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-[var(--antiq-dark)]">{formatPrice(product.price)}</span>
                {product.isNegotiable && <span className="text-[10px] text-[var(--antiq-muted)]">Négociable</span>}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-[var(--antiq-border)] pt-2.5">
            <div className="flex items-center gap-1 text-[10px] text-[var(--antiq-muted)]">
              <MapPin className="h-2.5 w-2.5" /><span>{product.city}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] text-[var(--antiq-muted)]">
              <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" />{product.viewCount}</span>
              <span className="flex items-center gap-0.5"><Heart className="h-2.5 w-2.5" />{product.favoriteCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getTimeLeft(endDate: string): string {
  const diffMs = new Date(endDate).getTime() - Date.now();
  if (diffMs <= 0) return "Terminé";
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  if (days > 0) return `${days}j ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
