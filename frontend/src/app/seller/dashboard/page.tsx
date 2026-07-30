"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package, ShoppingBag, TrendingUp, MessageCircle, Star, Eye,
  Heart, Plus, Bell, BarChart3, CheckCircle, Clock, XCircle,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const STATS = [
  { label: "Produits actifs", value: "24", icon: Package, color: "text-blue-600 bg-blue-50", change: "+2 ce mois" },
  { label: "Ventes totales", value: "18", icon: ShoppingBag, color: "text-emerald-600 bg-emerald-50", change: "+5 ce mois" },
  { label: "Revenu total", value: formatPrice(84500), icon: TrendingUp, color: "text-[var(--gold-dark)] bg-[var(--gold)]/10", change: "+12% ce mois" },
  { label: "Messages", value: "7", icon: MessageCircle, color: "text-purple-600 bg-purple-50", change: "3 non lus" },
  { label: "Note moyenne", value: "4.8/5", icon: Star, color: "text-amber-600 bg-amber-50", change: "127 avis" },
  { label: "Vues totales", value: "3 240", icon: Eye, color: "text-slate-600 bg-slate-50", change: "+18% ce mois" },
];

const TABS = ["Aperçu", "Mes annonces", "Commandes", "Messages", "Analytique", "Profil"];

export default function SellerDashboard() {
  const [tab, setTab] = useState("Aperçu");

  return (
    <div className="min-h-screen bg-[var(--cream-dark)]">
      <div className="border-b border-[var(--antiq-border)] bg-[var(--antiq-dark)]">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Tableau de bord Vendeur</h1>
              <p className="text-sm text-[var(--cream)]/50">Hassan Benali · <span className="text-[var(--gold)]">Vendeur vérifié ✔</span></p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full border border-white/20 p-2 text-white hover:border-[var(--gold)]/50 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[var(--gold)]" />
              </button>
              <Link href="/sell/new" className="flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-[var(--antiq-dark)] hover:bg-[var(--gold-dark)] hover:text-white transition-colors">
                <Plus className="h-4 w-4" /> Nouvelle annonce
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--antiq-border)] bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4">
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`shrink-0 px-4 py-3.5 text-sm font-medium transition-colors ${tab === t ? "border-b-2 border-[var(--gold)] text-[var(--gold-dark)]" : "text-[var(--antiq-muted)] hover:text-[var(--antiq-dark)]"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {tab === "Aperçu" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--antiq-border)] bg-white p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[var(--antiq-muted)]">{stat.label}</span>
                    <div className={`rounded-xl p-2 ${stat.color}`}><stat.icon className="h-4 w-4" /></div>
                  </div>
                  <div className="text-2xl font-bold text-[var(--antiq-dark)]">{stat.value}</div>
                  <div className="mt-1 text-xs text-[var(--antiq-muted)]">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--antiq-border)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--antiq-border)] p-5">
                <h2 className="font-semibold text-[var(--antiq-dark)]">Annonces récentes</h2>
                <button onClick={() => setTab("Mes annonces")} className="text-sm text-[var(--gold-dark)] hover:underline">Voir toutes</button>
              </div>
              <div className="divide-y divide-[var(--antiq-border)]">
                {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-[var(--cream-dark)]/50 transition-colors">
                    <img src={product.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-medium text-[var(--antiq-dark)]">{product.title}</div>
                      <div className="text-xs text-[var(--antiq-muted)]">{product.city} · {product.viewCount} vues</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[var(--antiq-dark)]">{formatPrice(product.price)}</div>
                      <StatusBadge status={product.status} />
                    </div>
                    <Link href={`/listings/${product.id}`} className="rounded-lg p-1.5 text-[var(--antiq-muted)] hover:bg-[var(--cream-dark)] transition-colors"><Eye className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: "📦", title: "Gérer les commandes", desc: "3 commandes en attente", href: "/seller/orders" },
                { icon: "📊", title: "Voir les statistiques", desc: "Performance du mois", href: "/seller/analytics" },
                { icon: "⚙️", title: "Paramètres du profil", desc: "Informations & vérification", href: "/seller/settings" },
              ].map((action) => (
                <Link key={action.title} href={action.href} className="flex items-center gap-4 rounded-2xl border border-[var(--antiq-border)] bg-white p-5 transition-all hover:border-[var(--gold)]/50 hover:shadow-md">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <div className="font-medium text-[var(--antiq-dark)]">{action.title}</div>
                    <div className="text-xs text-[var(--antiq-muted)]">{action.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tab === "Mes annonces" && (
          <div className="rounded-2xl border border-[var(--antiq-border)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--antiq-border)] p-5">
              <h2 className="font-semibold text-[var(--antiq-dark)]">Toutes mes annonces</h2>
              <Link href="/sell/new" className="flex items-center gap-1.5 rounded-lg bg-[var(--antiq-dark)] px-3 py-1.5 text-sm text-[var(--gold)]"><Plus className="h-3.5 w-3.5" /> Nouvelle</Link>
            </div>
            <div className="divide-y divide-[var(--antiq-border)]">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-[var(--cream-dark)]/50">
                  <img src={product.images[0]} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-[var(--antiq-dark)]">{product.title}</div>
                    <div className="mt-0.5 text-xs text-[var(--antiq-muted)]">{product.category.nameFr} · {product.city}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-[var(--antiq-muted)]">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{product.viewCount}</span>
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{product.favoriteCount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--antiq-dark)]">{formatPrice(product.price)}</div>
                    <StatusBadge status={product.status} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link href={`/listings/${product.id}`} className="rounded-lg border border-[var(--antiq-border)] px-2.5 py-1 text-xs hover:bg-[var(--cream-dark)]">Voir</Link>
                    <button className="rounded-lg border border-[var(--antiq-border)] px-2.5 py-1 text-xs hover:bg-[var(--cream-dark)]">Modifier</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Analytique" && (
          <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-6 text-center">
            <BarChart3 className="mx-auto mb-3 h-12 w-12 text-[var(--gold)]/40" />
            <p className="text-[var(--antiq-muted)]">Graphiques analytiques disponibles dans la version complète avec backend connecté.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    active: { label: "Actif", icon: CheckCircle, cls: "text-emerald-600 bg-emerald-50" },
    sold: { label: "Vendu", icon: ShoppingBag, cls: "text-blue-600 bg-blue-50" },
    pending: { label: "En attente", icon: Clock, cls: "text-amber-600 bg-amber-50" },
    archived: { label: "Archivé", icon: XCircle, cls: "text-slate-500 bg-slate-50" },
  }[status] ?? { label: status, icon: Clock, cls: "text-slate-500 bg-slate-50" };

  return (
    <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.cls}`}>
      <config.icon className="h-2.5 w-2.5" />{config.label}
    </span>
  );
}
