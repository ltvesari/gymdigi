"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Dumbbell, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<"athlete" | "creator">("athlete");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    login(email, role);
    if (isRegister) {
      router.push(`/onboarding?role=${role}`);
    } else {
      router.push(role === "creator" ? "/studio" : "/profile");
    }
  };

  const handleQuickDemo = (demoRole: "athlete" | "creator") => {
    login(demoRole === "creator" ? "burak@gymdigi.com" : "ahmet@gymdigi.com", demoRole);
    router.push(demoRole === "creator" ? "/studio" : "/profile");
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Logo & Başlık */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-black text-xl shadow-lg shadow-indigo-500/25">
            G
          </div>
          <h1 className="text-2xl font-black text-white">
            {isRegister ? "GymDigi'ye Katıl" : "Tekrar Hoş Geldin"}
          </h1>
          <p className="text-xs text-zinc-400">
            {isRegister
              ? "Favori antrenörlerinle çalış veya kendi antrenman kanalını aç"
              : "Antrenmanlarına ve kayıtlarına kaldığın yerden devam et"}
          </p>
        </div>

        {/* Rol Seçimi (Kayıtta veya Hızlı Girişte) */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-zinc-900/80 p-1 border border-zinc-800">
          <button
            type="button"
            onClick={() => setRole("athlete")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              role === "athlete"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Dumbbell className="h-4 w-4" />
            <span>Sporcuyum</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("creator")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              role === "creator"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Antrenörüm</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  className="w-full rounded-xl border border-zinc-800 bg-black py-2.5 pl-10 pr-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@gymdigi.com"
                className="w-full rounded-xl border border-zinc-800 bg-black py-2.5 pl-10 pr-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-800 bg-black py-2.5 pl-10 pr-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs font-black text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition mt-2"
          >
            <span>{isRegister ? "Hesap Oluştur ve Başla" : "Giriş Yap"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Hızlı Demo Giriş Butonları */}
        <div className="mt-6 border-t border-zinc-900 pt-5 space-y-2">
          <div className="text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Hızlı Test / Demo Modu
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("athlete")}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 py-2 text-[11px] font-semibold text-zinc-300 hover:text-white hover:border-zinc-700"
            >
              🏃 Sporcu Olarak Gir
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("creator")}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 py-2 text-[11px] font-semibold text-pink-300 hover:text-white hover:border-pink-500/50"
            >
              🏋️ Koç Olarak Gir
            </button>
          </div>
        </div>

        {/* Geçiş Linki */}
        <div className="mt-5 text-center text-xs text-zinc-400">
          {isRegister ? (
            <span>
              Zaten hesabın var mı?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-indigo-400 hover:underline"
              >
                Giriş Yap
              </button>
            </span>
          ) : (
            <span>
              Hesabın yok mu?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-indigo-400 hover:underline"
              >
                Hemen Kaydol
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
