"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Heart, MessageCircle, Bell, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/constants";

const navLinks = [
  { label: "Parcourir", href: "/listings" },
  { label: "Enchères", href: "/auctions" },
  { label: "Vendeurs", href: "/sellers" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--antiq-border)] bg-[var(--cream)]/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="hidden border-b border-[var(--antiq-border)] bg-[var(--antiq-dark)] py-1.5 text-xs text-[var(--gold-light)] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <span>🇲🇦 La première marketplace d&apos;antiquités au Maroc</span>
          <div className="flex items-center gap-4">
            <Link href="/help" className="hover:text-[var(--gold)] transition-colors">Aide</Link>
            <Link href="/sell" className="hover:text-[var(--gold)] transition-colors">Vendre</Link>
            <Link href="/login" className="hover:text-[var(--gold)] transition-colors">Connexion</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--antiq-dark)]">
            <span className="text-base font-bold text-[var(--gold)]">A</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold leading-none text-[var(--antiq-dark)]">{APP_CONFIG.name}</div>
            <div className="text-[10px] tracking-widest text-[var(--antiq-muted)] uppercase">Antiquités &amp; Vintage</div>
          </div>
        </Link>

        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--antiq-muted)]" />
            <input
              type="text"
              placeholder="Rechercher antiquités, tapis, bijoux..."
              className="w-full rounded-full border border-[var(--antiq-border)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--antiq-dark)] outline-none transition-all focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
            />
          </div>
          <button className="hidden rounded-full bg-[var(--antiq-dark)] px-5 py-2.5 text-sm font-medium text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)] sm:block">
            Rechercher
          </button>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <NavIcon href="/wishlist" icon={<Heart className="h-5 w-5" />} label="Favoris" />
          <NavIcon href="/messages" icon={<MessageCircle className="h-5 w-5" />} label="Messages" badge={3} />
          <NavIcon href="/notifications" icon={<Bell className="h-5 w-5" />} label="Alertes" />
          <Link href="/sell" className="ml-2 rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--antiq-dark)] transition-all hover:bg-[var(--gold-dark)] hover:text-white">
            + Vendre
          </Link>
          <Link href="/profile" className="ml-1 rounded-full p-2 hover:bg-[var(--cream-dark)] transition-colors">
            <User className="h-5 w-5 text-[var(--antiq-dark)]" />
          </Link>
        </div>

        <button className="rounded-lg p-2 hover:bg-[var(--cream-dark)] md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="hidden border-t border-[var(--antiq-border)] md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-4 py-2 text-sm text-[var(--antiq-dark)] transition-colors hover:bg-[var(--cream-dark)] hover:text-[var(--gold-dark)]">
              {link.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-[var(--antiq-muted)]">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>+15 000 pièces authentiques</span>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--antiq-border)] bg-[var(--cream)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--antiq-dark)] hover:bg-[var(--cream-dark)]" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              <Link href="/login" className="flex-1 rounded-full border border-[var(--antiq-border)] py-2 text-center text-sm font-medium">Connexion</Link>
              <Link href="/sell" className="flex-1 rounded-full bg-[var(--gold)] py-2 text-center text-sm font-semibold text-[var(--antiq-dark)]">+ Vendre</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavIcon({ href, icon, label, badge }: { href: string; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <Link href={href} className="relative rounded-lg p-2 text-[var(--antiq-dark)] transition-colors hover:bg-[var(--cream-dark)] hover:text-[var(--gold-dark)]" title={label}>
      {icon}
      {badge && (
        <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[9px] font-bold text-[var(--antiq-dark)]">{badge}</span>
      )}
    </Link>
  );
}
