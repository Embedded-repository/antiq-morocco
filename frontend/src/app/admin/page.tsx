"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, Package, ShoppingBag, TrendingUp, Flag, Shield, CheckCircle,
  XCircle, BarChart3, Bell, Search, Eye,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const ADMIN_STATS = [
  { label: "Utilisateurs", value: "4 821", icon: Users, color: "text-blue-600 bg-blue-50", change: "+47 aujourd'hui" },
  { label: "Annonces actives", value: "15 342", icon: Package, color: "text-emerald-600 bg-emerald-50", change: "+123 aujourd'hui" },
  { label: "Commandes totales", value: "2 089", icon: ShoppingBag, color: "text-purple-600 bg-purple-50", change: "+12 aujourd'hui" },
  { label: "Revenu plateforme", value: formatPrice(284500), icon: TrendingUp, color: "text-[var(--gold-dark)] bg-[var(--gold)]/10", change: "+8.4% ce mois" },
  { label: "Signalements", value: "14", icon: Flag, color: "text-red-600 bg-red-50", change: "7 nouveaux" },
  { label: "Vérifications en attente", value: "9", icon: Shield, color: "text-amber-600 bg-amber-50", change: "À traiter" },
];

const ADMIN_TABS = ["Dashboard", "Utilisateurs", "Annonces", "Commandes", "Signalements", "Vérifications", "Catégories", "Paramètres"];

export default function AdminDashboard() {
  const [tab, setTab] = useState("Dashboard");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[var(--cream-dark)]">
      <div className="border-b border-[var(--antiq-border)] bg-[var(--antiq-dark)]">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Administration</h1>
              <p className="text-sm text-[var(--cream)]/50">Antiq Morocco · Panneau de contrôle</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-full border border-white/20 bg-white/10 py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--gold)]/50" />
              </div>
              <button className="relative rounded-full border border-white/20 p-2 text-white">
                <Bell className="h-5 w-5" />
                <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--antiq-border)] bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4">
          <div className="flex gap-1">
            {ADMIN_TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`shrink-0 px-4 py-3.5 text-sm font-medium transition-colors ${tab === t ? "border-b-2 border-[var(--gold)] text-[var(--gold-dark)]" : "text-[var(--antiq-muted)] hover:text-[var(--antiq-dark)]"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {tab === "Dashboard" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADMIN_STATS.map((stat) => (
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

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-6">
                <h3 className="mb-4 font-semibold text-[var(--antiq-dark)]">Revenus (30 jours)</h3>
                <div className="flex h-40 items-end gap-1.5">
                  {[65,42,78,55,90,71,85,62,94,73,88,79,95,68,84,77,91,63,87,74,92,69,83,76,93,67,89,72,96,80].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-[var(--gold)]/20 hover:bg-[var(--gold)]/40 transition-colors" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-[var(--antiq-muted)]"><span>1 Juil</span><span>15 Juil</span><span>29 Juil</span></div>
              </div>
              <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-6">
                <h3 className="mb-4 font-semibold text-[var(--antiq-dark)]">Nouvelles inscriptions (30 jours)</h3>
                <div className="flex h-40 items-end gap-1.5">
                  {[30,55,40,70,45,80,60,35,75,50,85,65,40,72,55,88,63,45,78,52,90,67,48,82,58,95,70,43,76,53].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-blue-100 hover:bg-blue-200 transition-colors" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-[var(--antiq-muted)]"><span>1 Juil</span><span>15 Juil</span><span>29 Juil</span></div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--antiq-border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--antiq-border)] p-5">
                  <h3 className="font-semibold text-[var(--antiq-dark)]">Nouvelles annonces</h3>
                  <button onClick={() => setTab("Annonces")} className="text-xs text-[var(--gold-dark)] hover:underline">Voir tout</button>
                </div>
                <div className="divide-y divide-[var(--antiq-border)]">
                  {MOCK_PRODUCTS.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-3.5 hover:bg-[var(--cream-dark)]/50 transition-colors">
                      <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium text-[var(--antiq-dark)]">{p.title}</div>
                        <div className="text-xs text-[var(--antiq-muted)]">{p.seller.name} · {p.city}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatPrice(p.price)}</div>
                        <div className="flex gap-1 mt-0.5">
                          <button className="rounded p-0.5 text-emerald-600 hover:bg-emerald-50 transition-colors"><CheckCircle className="h-3.5 w-3.5" /></button>
                          <button className="rounded p-0.5 text-red-500 hover:bg-red-50 transition-colors"><XCircle className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--antiq-border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--antiq-border)] p-5">
                  <h3 className="font-semibold text-[var(--antiq-dark)]">Vérifications en attente</h3>
                  <button onClick={() => setTab("Vérifications")} className="text-xs text-[var(--gold-dark)] hover:underline">Voir tout</button>
                </div>
                <div className="divide-y divide-[var(--antiq-border)]">
                  {["Hassan Benali", "Fatima Zahra", "Omar Tazi", "Khadija Alami"].map((name, i) => (
                    <div key={name} className="flex items-center gap-3 p-3.5 hover:bg-[var(--cream-dark)]/50 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/10 text-sm font-bold text-[var(--gold-dark)]">{name.charAt(0)}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[var(--antiq-dark)]">{name}</div>
                        <div className="text-xs text-[var(--antiq-muted)]">Demande de vérification · il y a {i + 1}h</div>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="rounded-lg bg-emerald-500 px-2.5 py-1 text-xs text-white hover:bg-emerald-600 transition-colors">Approuver</button>
                        <button className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-500 hover:bg-red-50 transition-colors">Refuser</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Annonces" && (
          <div className="rounded-2xl border border-[var(--antiq-border)] bg-white">
            <div className="border-b border-[var(--antiq-border)] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-[var(--antiq-dark)]">Toutes les annonces ({MOCK_PRODUCTS.length})</h2>
                <select className="rounded-lg border border-[var(--antiq-border)] px-3 py-1.5 text-sm outline-none">
                  <option>Toutes</option><option>Actives</option><option>En attente</option><option>Signalées</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-[var(--antiq-border)]">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-[var(--cream-dark)]/50 transition-colors">
                  <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-[var(--antiq-dark)]">{p.title}</div>
                    <div className="text-xs text-[var(--antiq-muted)]">{p.seller.name} · {p.category.nameFr} · {p.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(p.price)}</div>
                    <div className="text-xs text-[var(--antiq-muted)]">{p.viewCount} vues</div>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/listings/${p.id}`} className="rounded-lg p-1.5 text-[var(--antiq-muted)] hover:bg-[var(--cream-dark)] transition-colors"><Eye className="h-4 w-4" /></Link>
                    <button className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 transition-colors"><XCircle className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {["Utilisateurs", "Commandes", "Signalements", "Vérifications", "Catégories", "Paramètres"].includes(tab) && (
          <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-12 text-center">
            <BarChart3 className="mx-auto mb-4 h-12 w-12 text-[var(--gold)]/40" />
            <h3 className="mb-2 font-semibold text-[var(--antiq-dark)]">Section {tab}</h3>
            <p className="text-sm text-[var(--antiq-muted)]">Cette section sera connectée au backend ASP.NET Core dans la phase suivante de développement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
