"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12 bg-[var(--cream-dark)]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--antiq-dark)]">
            <span className="text-xl font-bold text-[var(--gold)]">A</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--antiq-dark)]">Bon retour !</h1>
          <p className="mt-1 text-sm text-[var(--antiq-muted)]">Connectez-vous à votre compte {APP_CONFIG.name}</p>
        </div>

        <div className="rounded-2xl border border-[var(--antiq-border)] bg-white p-8 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--antiq-dark)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--antiq-muted)]" />
                <input type="email" placeholder="vous@email.com" className="w-full rounded-xl border border-[var(--antiq-border)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-[var(--antiq-dark)]">Mot de passe</label>
                <Link href="/forgot-password" className="text-xs text-[var(--gold-dark)] hover:underline">Oublié ?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--antiq-muted)]" />
                <input type={show ? "text" : "password"} placeholder="Votre mot de passe" className="w-full rounded-xl border border-[var(--antiq-border)] py-3 pl-10 pr-10 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--antiq-muted)]">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--antiq-muted)]">
              <input type="checkbox" className="rounded accent-[var(--gold-dark)]" />
              Se souvenir de moi
            </label>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--antiq-dark)] py-3.5 text-sm font-semibold text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-[var(--antiq-dark)]">
              Se connecter <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-4 flex items-center gap-3">
              <div className="flex-1 border-t border-[var(--antiq-border)]" />
              <span className="text-xs text-[var(--antiq-muted)]">ou continuer avec</span>
              <div className="flex-1 border-t border-[var(--antiq-border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-[var(--antiq-border)] py-2.5 text-sm font-medium hover:bg-[var(--cream-dark)] transition-colors">
                <span className="font-bold">G</span> Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-[var(--antiq-border)] py-2.5 text-sm font-medium hover:bg-[var(--cream-dark)] transition-colors">
                <span className="font-bold">f</span> Facebook
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-[var(--antiq-muted)]">
          Pas encore membre ?{" "}
          <Link href="/register" className="font-medium text-[var(--gold-dark)] hover:underline">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
