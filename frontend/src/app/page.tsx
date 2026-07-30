"use client";

import Link from "next/link";
import { Search, ChevronRight, Star, Shield, Truck, Award, ArrowRight, Gavel } from "lucide-react";
import { CATEGORIES, MOCK_PRODUCTS } from "@/lib/constants";
import ProductCard from "@/components/products/ProductCard";

export default function HomePage() {
  const featuredCategories = CATEGORIES.slice(0, 12);
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);
  const auctionProducts = MOCK_PRODUCTS.filter((p) => p.hasAuction);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--antiq-dark)]">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-sm text-[var(--gold)]">
            <span>🇲🇦</span>
            <span>La première marketplace d&apos;antiquités au Maroc</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Découvrez le <span className="gold-text">Patrimoine Marocain</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base text-[var(--cream)]/60 md:text-lg">
            Antiquités, objets vintage, bijoux berbères et trésors du Maroc — achetez et vendez en toute confiance.
          </p>
          <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--antiq-muted)]" />
              <input type="text" placeholder="Tapis berbère, montre ancienne, bijoux..." className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-base text-[var(--antiq-dark)] shadow-lg outline-none focus:ring-2 focus:ring-[var(--gold)]" />
            </div>
            <button className="rounded-2xl bg-[var(--gold)] px-8 py-4 text-base font-semibold text-[var(--antiq-dark)] shadow-lg transition-all hover:bg-[var(--gold-dark)] hover:text-white hover:shadow-xl">Rechercher</button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--cream)]/50">
            {[["15 000+", "Pièces"], ["2 800+", "Vendeurs"], ["29", "Catégories"], ["100%", "Authentique"]].map(([v, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="font-bold text-[var(--gold)]">{v}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-[var(--antiq-border)] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[var(--antiq-border)] px-4 md:grid-cols-4">
          {[
            { icon: <Shield className="h-5 w-5" />, title: "Achat Sécurisé", desc: "Paiements protégés" },
            { icon: <Award className="h-5 w-5" />, title: "Authenticité Garantie", desc: "Pièces vérifiées" },
            { icon: <Truck className="h-5 w-5" />, title: "Livraison au Maroc", desc: "Partout au royaume" },
            { icon: <Star className="h-5 w-5" />, title: "Vendeurs Notés", desc: "Avis vérifiés" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-6 py-4">
              <div className="text-[var(--gold)]">{item.icon}</div>
              <div>
                <div className="text-sm font-semibold text-[var(--antiq-dark)]">{item.title}</div>
                <div className="text-xs text-[var(--antiq-muted)]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader title="Parcourir par catégorie" subtitle="29 catégories d'antiquités et objets vintage" href="/listings" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {featuredCategories.map((cat) => (
            <Link key={cat.id} href={`/listings?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--antiq-border)] bg-white p-4 text-center transition-all hover:border-[var(--gold)]/50 hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl">{cat.icon}</span>
              <span className="line-clamp-2 text-xs font-medium text-[var(--antiq-dark)] group-hover:text-[var(--gold-dark)] transition-colors">{cat.nameFr}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/listings" className="text-sm font-medium text-[var(--gold-dark)] hover:underline">Voir toutes les catégories ({CATEGORIES.length}) →</Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="border-t border-[var(--antiq-border)] bg-[var(--cream-dark)] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Pièces en Vedette" subtitle="Sélection de nos meilleures antiquités du moment" href="/listings" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AUCTIONS */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Enchères en Cours" subtitle="Participez avant la fin du compte à rebours" href="/auctions" badge={<span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">LIVE</span>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {auctionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <Link href="/auctions" className="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[var(--gold)]/40 bg-[var(--cream-dark)] p-8 text-center transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/10 group-hover:bg-[var(--gold)]/20 transition-colors">
                <Gavel className="h-7 w-7 text-[var(--gold-dark)]" />
              </div>
              <div>
                <div className="font-semibold text-[var(--antiq-dark)]">Voir toutes les enchères</div>
                <div className="text-sm text-[var(--antiq-muted)]">Participez et gagnez des pièces uniques</div>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--gold)]" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[var(--antiq-border)] bg-[var(--antiq-dark)] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Comment ça <span className="gold-text">fonctionne</span> ?</h2>
          <p className="mb-10 text-[var(--cream)]/50">Simple, sécurisé et authentique</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: "🔍", title: "Parcourez", desc: "Explorez des milliers de pièces authentiques filtrées par catégorie, ville, prix et époque." },
              { step: "02", icon: "💬", title: "Contactez", desc: "Discutez directement avec le vendeur, faites une offre ou participez aux enchères." },
              { step: "03", icon: "🤝", title: "Achetez", desc: "Finalisez l'achat en toute sécurité avec livraison au Maroc ou retrait en main propre." },
            ].map((item) => (
              <div key={item.step}>
                <div className="mb-3 text-4xl">{item.icon}</div>
                <div className="mb-1 text-xs font-bold tracking-widest text-[var(--gold)]/50">{item.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--cream)]/50">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/listings" className="rounded-full bg-[var(--gold)] px-8 py-3 font-semibold text-[var(--antiq-dark)] transition-all hover:bg-[var(--gold-dark)] hover:text-white">Commencer à explorer</Link>
            <Link href="/sell" className="rounded-full border border-[var(--gold)]/40 px-8 py-3 text-sm font-medium text-[var(--cream)]/70 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">Vendre une pièce</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title="Ce que disent nos membres" subtitle="Des milliers d'acheteurs et vendeurs satisfaits" />
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-[var(--antiq-border)] bg-white p-6">
                <div className="mb-3 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--antiq-muted)]">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)]/10 text-sm font-bold text-[var(--gold-dark)]">{t.name.charAt(0)}</div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--antiq-dark)]">{t.name}</div>
                    <div className="text-xs text-[var(--antiq-muted)]">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-4 mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--antiq-dark)] via-[#2D1F0A] to-[var(--antiq-dark)] md:mx-8">
        <div className="flex flex-col items-center justify-between gap-6 px-8 py-12 text-center md:flex-row md:text-left">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">Vous avez des pièces à vendre ?</h2>
            <p className="text-[var(--cream)]/60">Rejoignez nos 2 800+ vendeurs et touchez des milliers d&apos;acheteurs passionnés.</p>
          </div>
          <Link href="/sell" className="shrink-0 rounded-full bg-[var(--gold)] px-8 py-3.5 font-semibold text-[var(--antiq-dark)] transition-all hover:bg-[var(--gold-dark)] hover:text-white">Créer mon annonce gratuitement</Link>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, href, badge }: { title: string; subtitle?: string; href?: string; badge?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <div className="mb-0.5 flex items-center gap-2">
          <h2 className="text-xl font-bold text-[var(--antiq-dark)] md:text-2xl">{title}</h2>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-[var(--antiq-muted)]">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-sm font-medium text-[var(--gold-dark)] hover:underline">
          Voir tout <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Youssef Mansouri", role: "Acheteur", city: "Casablanca", rating: 5, text: "J'ai trouvé un plateau en cuivre du 18ème siècle en parfait état. Le vendeur était très professionnel et la livraison rapide. Je recommande vivement !" },
  { name: "Aicha Benkirane", role: "Vendeuse vérifiée", city: "Marrakech", rating: 5, text: "En tant que vendeuse, la plateforme est excellente. Interface intuitive, bonnes statistiques et les acheteurs sont sérieux. Mes ventes ont doublé en 3 mois." },
  { name: "Mehdi El Fassi", role: "Collectionneur", city: "Fès", rating: 5, text: "La meilleure sélection de montres vintage au Maroc. J'ai participé à plusieurs enchères et remporté des pièces introuvables ailleurs." },
];
