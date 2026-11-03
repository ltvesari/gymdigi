"use client";

import { useState } from "react";
import { CreatorProfile } from "@/lib/mock-data";
import { CheckCircle2, Copy, Check, ShieldCheck, Sparkles, X, Zap } from "lucide-react";

interface SubscribeModalProps {
  creator: CreatorProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscribeModal({
  creator,
  isOpen,
  onClose,
  onSuccess,
}: SubscribeModalProps) {
  const [plan, setPlan] = useState<"monthly" | "quarterly">("monthly");
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const price = plan === "monthly" ? creator.monthlyPriceTry : creator.quarterlyPriceTry;

  const copyIban = () => {
    navigator.clipboard.writeText(creator.ibanNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = (instantDemo: boolean) => {
    localStorage.setItem(`gymdigi_sub_${creator.username}`, "active");
    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
      setSubmitted(false);
      onClose();
    }, instantDemo ? 500 : 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="relative w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Başlık */}
        <div className="flex items-center gap-3">
          <div className="ig-ring rounded-full p-0.5">
            <img
              src={creator.avatar}
              alt={creator.fullName}
              className="h-12 w-12 rounded-full object-cover border-2 border-black"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {creator.fullName} Kanalına Abone Ol
            </h3>
            <p className="text-xs text-zinc-400">
              Tüm programlara, haftalık antrenmanlara ve videolara tam erişim
            </p>
          </div>
        </div>

        {/* Plan Seçimi */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPlan("monthly")}
            className={`rounded-2xl border p-3.5 text-left transition ${
              plan === "monthly"
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            }`}
          >
            <div className="text-xs font-medium text-zinc-400">Aylık Erişim</div>
            <div className="mt-1 text-xl font-extrabold text-white">
              ₺{creator.monthlyPriceTry}
              <span className="text-xs font-normal text-zinc-400">/ay</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">İstediğin an iptal et</div>
          </button>

          <button
            type="button"
            onClick={() => setPlan("quarterly")}
            className={`relative rounded-2xl border p-3.5 text-left transition ${
              plan === "quarterly"
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            }`}
          >
            <span className="absolute -top-2.5 right-3 rounded-full bg-neon px-2 py-0.5 text-[10px] font-extrabold text-black">
              %17 İNDİRİM
            </span>
            <div className="text-xs font-medium text-zinc-400">3 Aylık Paket</div>
            <div className="mt-1 text-xl font-extrabold text-white">
              ₺{creator.quarterlyPriceTry}
              <span className="text-xs font-normal text-zinc-400">/3 ay</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-400">
              Aylık ₺{Math.round(creator.quarterlyPriceTry / 3)}&apos;ye gelir
            </div>
          </button>
        </div>

        {/* Avantajlar */}
        <div className="mt-4 space-y-2 rounded-2xl bg-zinc-900/70 p-3.5 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong>{creator.stats.programs} Program</strong> ve{" "}
              <strong>{creator.stats.workouts} Antrenman</strong> anında açılır
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Playbook tarzı set/tekrar/kg kaydı ve dinlenme sayacı</span>
          </div>
        </div>

        {/* Aşama 1: Sıfır Bütçe Manuel IBAN / Havale Akışı */}
        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">
              Aşama 1: Hızlı Havale / FAST ile Ödeme
            </span>
            <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
              ₺{price} Gönder
            </span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400">
            Alıcı: <strong className="text-zinc-200">{creator.ibanHolder}</strong>
          </p>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-black px-3 py-2 border border-zinc-800">
            <code className="text-[11px] text-zinc-200">{creator.ibanNumber}</code>
            <button
              type="button"
              onClick={copyIban}
              className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-[11px] font-medium text-white hover:bg-zinc-700"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" /> Kopyalandı
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Kopyala
                </>
              )}
            </button>
          </div>

          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Gönderen Ad Soyad / Dekont Notu"
            className="mt-2.5 w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {submitted ? (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 py-3 text-sm font-bold text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Abonelik Aktif Edildi! Tüm Kilitler Açılıyor...
          </div>
        ) : (
          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => handleConfirm(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition"
            >
              Ödeme Bildir & Aboneliği Başlat (₺{price})
            </button>
            <button
              type="button"
              onClick={() => handleConfirm(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-neon hover:bg-zinc-800 transition"
            >
              <Zap className="h-3.5 w-3.5" />
              Demo Modu: Tek Tıkla Kilidi Aç (Test İçin)
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
          <span>Aşama 2&apos;de iyzico Kredi Kartı ile Otomatik Abonelik Eklenecek</span>
        </div>
      </div>
    </div>
  );
}
