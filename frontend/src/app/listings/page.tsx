"use client";

import { useState } from "react";
import { Search, Grid, List, SlidersHorizontal, ChevronDown } from "lucide-react";
import { CATEGORIES, MOCK_PRODUCTS, MOROCCAN_CITIES, CONDITION_LABELS } from "@/lib/constants";
import ProductCard from "@/components/products/ProductCard";
import { type SearchFilters } from "@/lib/types";

export default function ListingsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ sortBy: "newest" });
  const products = MOCK_PRODUCTS;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--antiq-border)] bg-white py-6">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-2xl font-bold text-[var(--antiq-dark)]">
            Toutes les annonces
            <span className="ml-2 text-base font-normal text-[var(--antiq-muted)]">({products.length} résultats)</span>
          </h1>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--antiq-muted)]" />
              <input type="text" placeholder="Rechercher..." className="w-full rounded-xl border border-[var(--antiq-border)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-xl border border-[var(--antiq-border)] px-4 py-2.5 text-sm font-medium text-[var(--antiq-dark)] hover:bg-[var(--cream-dark)] transition-colors">
              <SlidersHorizontal className="h-4 w-4" />Filtres
            </button>
            <select className="rounded-xl border border-[var(--antiq-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]" value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SearchFilters["sortBy"] })}>
              <option value="newest">Plus récents</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="most_viewed">Plus vus</option>
              <option value="highest_rated">Mieux notés</option>
            </select>
            <div className="hidden items-center gap-1 sm:flex">
              <button onClick={() => setView("grid")} className={`rounded-lg p-2 transition-colors ${view === "grid" ? "bg-[var(--gold)]/10 text-[var(--gold-dark)]" : "text-[var(--antiq-muted)] hover:bg-[var(--cream-dark)]"}`}><Grid className="h-4 w-4" /></button>
              <button onClick={() => setView("list")} className={`rounded-lg p-2 transition-colors ${view === "list" ? "bg-[var(--gold)]/10 text-[var(--gold-dark)]" : "text-[var(--antiq-muted)] hover:bg-[var(--cream-dark)]"}`}><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          <aside className={`${showFilters ? "block" : "hidden"} w-64 shrink-0 lg:block`}>
            <div className="sticky top-24 space-y-6 rounded-2xl border border-[var(--antiq-border)] bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[var(--antiq-dark)]">Filtres</h3>
                <button className="text-xs text-[var(--gold-dark)] hover:underline">Réinitialiser</button>
              </div>
              <FilterSection title="Catégorie">
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <label key={cat.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--cream-dark)]">
                      <input type="checkbox" className="rounded accent-[var(--gold-dark)]" />
                      <span className="text-sm text-[var(--antiq-dark)]">{cat.icon} {cat.nameFr}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
              <FilterSection title="Ville">
                <select className="w-full rounded-lg border border-[var(--antiq-border)] px-3 py-2 text-sm outline-none focus:border-[var(--gold)]">
                  <option value="">Toutes les villes</option>
                  {MOROCCAN_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
              </FilterSection>
              <FilterSection title="Prix (MAD)">
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full rounded-lg border border-[var(--antiq-border)] px-3 py-2 text-sm outline-none focus:border-[var(--gold)]" />
                  <span className="text-[var(--antiq-muted)]">–</span>
                  <input type="number" placeholder="Max" className="w-full rounded-lg border border-[var(--antiq-border)] px-3 py-2 text-sm outline-none focus:border-[var(--gold)]" />
                </div>
              </FilterSection>
              <FilterSection title="État">
                <div className="space-y-1.5">
                  {Object.entries(CONDITION_LABELS).map(([key, label]) => (
                    <label key={key} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--cream-dark)]">
                      <input type="checkbox" className="rounded accent-[var(--gold-dark)]" />
                      <span className="text-sm text-[var(--antiq-dark)]">{label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
              <FilterSection title="Options">
                <div className="space-y-2">
                  {[["hasAuction", "Enchères uniquement"], ["isNegotiable", "Prix négociable"], ["shippingAvailable", "Livraison disponible"], ["isVerifiedSeller", "Vendeur vérifié"]].map(([key, label]) => (
                    <label key={key} className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="rounded accent-[var(--gold-dark)]" />
                      <span className="text-sm text-[var(--antiq-dark)]">{label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
              <button className="w-full rounded-xl bg-[var(--antiq-dark)] py-2.5 text-sm font-medium text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)]">Appliquer les filtres</button>
            </div>
          </aside>

          <div className="flex-1">
            <div className={`grid gap-4 ${view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2">
              {[1, 2, 3, "...", 12].map((page, i) => (
                <button key={i} className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${page === 1 ? "bg-[var(--antiq-dark)] text-[var(--gold)] font-medium" : "border border-[var(--antiq-border)] hover:border-[var(--gold)]/50 hover:text-[var(--gold-dark)]"}`}>{page}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-[var(--antiq-border)] pt-4">
      <button onClick={() => setOpen(!open)} className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-[var(--antiq-dark)]">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform text-[var(--antiq-muted)] ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}
