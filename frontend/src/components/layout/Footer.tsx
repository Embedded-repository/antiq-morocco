import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { APP_CONFIG, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const featuredCategories = CATEGORIES.slice(0, 8);

  return (
    <footer className="border-t border-[var(--antiq-border)] bg-[var(--antiq-dark)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/40">
                <span className="text-xl font-bold text-[var(--gold)]">A</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{APP_CONFIG.name}</div>
                <div className="text-[10px] tracking-widest text-[var(--gold)]/70 uppercase">Antiquités &amp; Vintage</div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[var(--cream)]/60">
              La première marketplace dédiée aux antiquités, objets vintage et pièces du patrimoine marocain.
            </p>
            <div className="flex gap-3">
              <SocialBtn href="https://facebook.com" label="f" />
              <SocialBtn href="https://instagram.com" label="ig" />
              <SocialBtn href="https://youtube.com" label="yt" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Catégories</h3>
            <ul className="space-y-2">
              {featuredCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/listings?category=${cat.slug}`} className="flex items-center gap-2 text-sm text-[var(--cream)]/60 transition-colors hover:text-[var(--gold)]">
                    <span>{cat.icon}</span><span>{cat.nameFr}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Informations</h3>
            <ul className="space-y-2">
              {[
                { label: "À propos", href: "/about" },
                { label: "Comment vendre ?", href: "/how-to-sell" },
                { label: "Comment acheter ?", href: "/how-to-buy" },
                { label: "Authentification", href: "/authentication" },
                { label: "Frais & Commissions", href: "/fees" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Conditions d'utilisation", href: "/terms" },
              ].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-[var(--cream)]/60 transition-colors hover:text-[var(--gold)]">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[var(--cream)]/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]/60" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--cream)]/60">
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]/60" />
                <a href={`mailto:${APP_CONFIG.supportEmail}`} className="hover:text-[var(--gold)] transition-colors">{APP_CONFIG.supportEmail}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--cream)]/60">
                <Phone className="h-4 w-4 shrink-0 text-[var(--gold)]/60" />
                <span>+212 5XX-XXXXXX</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[var(--cream)]/80">Newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="votre@email.com" className="flex-1 rounded-lg border border-[var(--antiq-border)] bg-white/5 px-3 py-2 text-sm text-white placeholder-[var(--cream)]/40 outline-none focus:border-[var(--gold)]" />
                <button className="rounded-lg bg-[var(--gold)] px-3 py-2 text-sm font-medium text-[var(--antiq-dark)] hover:bg-[var(--gold-dark)] hover:text-white transition-colors">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-[var(--cream)]/40 sm:flex-row">
          <span>© 2026 {APP_CONFIG.name}. Tous droits réservés.</span>
          <span>Paiements sécurisés 🔒 · Livraison partout au Maroc 🇲🇦</span>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-[var(--cream)]/60 transition-all hover:border-[var(--gold)]/50 hover:text-[var(--gold)] uppercase">
      {label}
    </a>
  );
}
