"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart, Share2, Flag, MapPin, Eye, Star, Shield, Truck, MessageCircle,
  ChevronLeft, ChevronRight, Gavel, Clock, Package,
} from "lucide-react";
import { MOCK_PRODUCTS, CONDITION_LABELS, CONDITION_COLORS } from "@/lib/constants";
import ProductCard from "@/components/products/ProductCard";
import { cn, formatPrice, formatDate, getInitials } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id) ?? MOCK_PRODUCTS[0];
  const related = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const [activeImage, setActiveImage] = useState(0);
  const [offerAmount, setOfferAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "details" | "seller">("description");
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--antiq-border)] bg-white py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-[var(--antiq-muted)]">
          <Link href="/" className="hover:text-[var(--gold-dark)]">Accueil</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-[var(--gold-dark)]">Annonces</Link>
          <span>/</span>
          <Link href={`/listings?category=${product.category.slug}`} className="hover:text-[var(--gold-dark)]">{product.category.nameFr}</Link>
          <span>/</span>
          <span className="line-clamp-1 text-[var(--antiq-dark)]">{product.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--cream-dark)]">
              <img src={images[activeImage]} alt={product.title} className="h-full w-full object-cover" />
              <button onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white">
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">{activeImage + 1} / {images.length}</div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={cn("h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all", activeImage === i ? "border-[var(--gold)]" : "border-transparent hover:border-[var(--gold)]/40")}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className={cn("rounded-full px-3 py-1 text-xs font-medium", CONDITION_COLORS[product.condition])}>{CONDITION_LABELS[product.condition]}</span>
              {product.seller.isVerified && <span className="flex items-center gap-1 rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-medium text-[var(--gold-dark)]"><Shield className="h-3 w-3" /> Vendeur vérifié</span>}
              {product.hasAuction && <span className="flex items-center gap-1 rounded-full bg-[var(--antiq-dark)] px-3 py-1 text-xs font-bold text-[var(--gold)]"><Gavel className="h-3 w-3" /> Enchère</span>}
            </div>
            <h1 className="mb-2 text-2xl font-bold leading-snug text-[var(--antiq-dark)] md:text-3xl">{product.title}</h1>
            <div className="mb-4 flex items-center gap-3 text-sm text-[var(--antiq-muted)]">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{product.city}</span>
              <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{product.viewCount} vues</span>
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{product.favoriteCount} favoris</span>
              <span>Publié le {formatDate(product.createdAt)}</span>
            </div>

            <div className="mb-5 rounded-2xl border border-[var(--antiq-border)] bg-white p-5">
              {product.hasAuction ? (
                <div>
                  <div className="mb-1 text-xs text-[var(--antiq-muted)]">Offre actuelle</div>
                  <div className="mb-1 text-3xl font-bold text-[var(--antiq-dark)]">{formatPrice(product.currentBid!)}</div>
                  <div className="mb-3 text-sm text-[var(--antiq-muted)]">{product.bidCount} enchère(s) · Prix de départ {formatPrice(product.price)}</div>
                  {product.auctionEndDate && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5">
                      <Clock className="h-4 w-4 text-red-500" />
                      <div>
                        <div className="text-xs text-red-500">Se termine le</div>
                        <div className="text-sm font-semibold text-red-700">{formatDate(product.auctionEndDate)}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <input type="number" placeholder={`Min. ${formatPrice((product.currentBid ?? product.price) + 100)}`} className="flex-1 rounded-xl border border-[var(--antiq-border)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} />
                    <button className="flex-1 rounded-xl bg-[var(--antiq-dark)] py-3 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)] transition-colors">Enchérir</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-1 text-3xl font-bold text-[var(--antiq-dark)]">{formatPrice(product.price)}</div>
                  {product.isNegotiable && <div className="mb-4 text-sm text-[var(--antiq-muted)]">Prix négociable</div>}
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-xl bg-[var(--antiq-dark)] py-3 text-sm font-bold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)] transition-colors">Acheter maintenant</button>
                    {product.isNegotiable && <button className="flex-1 rounded-xl border border-[var(--antiq-border)] py-3 text-sm font-medium text-[var(--antiq-dark)] hover:border-[var(--gold)]/50 transition-colors">Faire une offre</button>}
                  </div>
                </div>
              )}
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--antiq-border)] py-2.5 text-sm font-medium text-[var(--antiq-muted)] hover:border-[var(--gold)]/50 hover:text-[var(--gold-dark)] transition-colors">
                <MessageCircle className="h-4 w-4" /> Contacter le vendeur
              </button>
            </div>

            <div className="mb-5 flex gap-3">
              {product.shippingAvailable && <div className="flex flex-1 items-center gap-2 rounded-xl bg-[var(--cream-dark)] px-3 py-2.5"><Truck className="h-4 w-4 text-[var(--gold-dark)]" /><span className="text-xs text-[var(--antiq-muted)]">Livraison disponible</span></div>}
              {product.pickupAvailable && <div className="flex flex-1 items-center gap-2 rounded-xl bg-[var(--cream-dark)] px-3 py-2.5"><Package className="h-4 w-4 text-[var(--gold-dark)]" /><span className="text-xs text-[var(--antiq-muted)]">Retrait en main propre</span></div>}
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-[var(--antiq-border)] px-4 py-2 text-sm hover:border-red-300 hover:text-red-500 transition-colors"><Heart className="h-4 w-4" /> Favoris</button>
              <button className="flex items-center gap-2 rounded-xl border border-[var(--antiq-border)] px-4 py-2 text-sm hover:bg-[var(--cream-dark)] transition-colors"><Share2 className="h-4 w-4" /> Partager</button>
              <button className="flex items-center gap-2 rounded-xl border border-[var(--antiq-border)] px-4 py-2 text-sm text-[var(--antiq-muted)] hover:border-red-300 hover:text-red-500 transition-colors"><Flag className="h-4 w-4" /> Signaler</button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-10">
          <div className="mb-6 flex gap-1 border-b border-[var(--antiq-border)]">
            {(["description", "details", "seller"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={cn("px-5 py-3 text-sm font-medium capitalize transition-colors", activeTab === tab ? "border-b-2 border-[var(--gold)] text-[var(--gold-dark)]" : "text-[var(--antiq-muted)] hover:text-[var(--antiq-dark)]")}>
                {tab === "description" ? "Description" : tab === "details" ? "Détails" : "Vendeur"}
              </button>
            ))}
          </div>
          {activeTab === "description" && <p className="text-sm leading-relaxed text-[var(--antiq-muted)]">{product.description}</p>}
          {activeTab === "details" && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[["Catégorie", product.category.nameFr], ["État", CONDITION_LABELS[product.condition]], ["Origine", product.origin], ["Année", product.year?.toString()], ["Matériau", product.material], ["Dimensions", product.dimensions], ["Poids", product.weight], ["Ville", product.city]].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[var(--antiq-border)] bg-white p-4">
                  <div className="text-xs text-[var(--antiq-muted)]">{label}</div>
                  <div className="mt-0.5 font-medium text-[var(--antiq-dark)]">{value}</div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "seller" && (
            <div className="max-w-md rounded-2xl border border-[var(--antiq-border)] bg-white p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/10 text-xl font-bold text-[var(--gold-dark)]">{getInitials(product.seller.name)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--antiq-dark)]">{product.seller.name}</span>
                    {product.seller.isVerified && <Shield className="h-4 w-4 text-[var(--gold)]" />}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                    <span className="font-medium">{product.seller.rating}</span>
                    <span className="text-[var(--antiq-muted)]">({product.seller.reviewCount} avis)</span>
                  </div>
                  <div className="text-xs text-[var(--antiq-muted)]">{product.seller.city}</div>
                </div>
              </div>
              <Link href={`/sellers/${product.seller.id}`} className="block w-full rounded-xl border border-[var(--antiq-border)] py-2.5 text-center text-sm font-medium hover:bg-[var(--cream-dark)] transition-colors">Voir le profil du vendeur</Link>
            </div>
          )}
        </div>

        {/* RELATED */}
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[var(--antiq-dark)]">Annonces similaires</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
