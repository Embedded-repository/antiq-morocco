"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12 bg-[var(--cream-dark)]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--antiq-dark)]">
            <span className="text-xl font-bold text-[var(--gold)]">A</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--antiq-dark)]">Créer un compte</h1>
          <p className="mt-1 text-sm text-[var(--antiq-muted)]">Rejoignez {APP_CONFIG.name} gratuitement</p>
        </div>

        <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-8 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-[var(--cream-dark)] p-1">
            {([["buyer", "Acheteur", "🛒"], ["seller", "Vendeur", "🎨"]] as const).map(([r, label, icon]) => (
              <button key={r} onClick={() => setRole(r as "buyer" | "seller")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  role === r ? "bg-[var(--antiq-dark)] text-[var(--gold)] shadow-sm" : "text-[var(--antiq-muted)] hover:text-[var(--antiq-dark)]"
                }`}>
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prénom" icon={<User className="h-4 w-4" />} placeholder="Mohammed" type="text" />
              <Field label="Nom" icon={<User className="h-4 w-4" />} placeholder="Alami" type="text" />
            </div>
            <Field label="Email" icon={<Mail className="h-4 w-4" />} placeholder="vous@email.com" type="email" />
            <Field label="Téléphone" icon={<Phone className="h-4 w-4" />} placeholder="+212 6XX-XXXXXX" type="tel" />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--antiq-dark)]">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--antiq-muted)]" />
                <input type={show ? "text" : "password"} placeholder="Min. 8 caractères" className="w-full rounded-xl border border-[var(--antiq-border)] py-3 pl-10 pr-10 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--antiq-muted)]">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-[var(--antiq-muted)]">
              <input type="checkbox" className="mt-0.5 rounded accent-[var(--gold-dark)]" required />
              <span>J&apos;accepte les <Link href="/terms" className="text-[var(--gold-dark)] hover:underline">conditions d&apos;utilisation</Link> et la <Link href="/privacy" className="text-[var(--gold-dark)] hover:underline">politique de confidentialité</Link></span>
            </label>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--antiq-dark)] py-3.5 text-sm font-semibold text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)]">
              Créer mon compte <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-4 flex items-center gap-3">
              <div className="flex-1 border-t border-[var(--antiq-border)]" />
              <span className="text-xs text-[var(--antiq-muted)]">ou continuer avec</span>
              <div className="flex-1 border-t border-[var(--antiq-border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon="G" label="Google" />
              <SocialButton icon="f" label="Facebook" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-[var(--antiq-muted)]">
          Déjà membre ?{" "}
          <Link href="/login" className="font-medium text-[var(--gold-dark)] hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, icon, placeholder, type }: { label: string; icon: React.ReactNode; placeholder: string; type: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[var(--antiq-dark)]">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--antiq-muted)]">{icon}</div>
        <input type={type} placeholder={placeholder} className="w-full rounded-xl border border-[var(--antiq-border)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
      </div>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl border border-[var(--antiq-border)] py-2.5 text-sm font-medium text-[var(--antiq-dark)] hover:bg-[var(--cream-dark)] transition-colors">
      <span className="font-bold">{icon}</span> {label}
    </button>
  );
}
