"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Camera,
  Plus,
  Scale,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<"prs" | "streak" | "body">("prs");

  // Kişisel Rekorlar (PR'lar)
  const prList = [
    { exercise: "Incline Dumbbell Press", prWeight: "32.5 kg", reps: "8 Tekrar", increase: "+4.5 kg bu ay", date: "Dün" },
    { exercise: "Romanian Deadlift (RDL)", prWeight: "110 kg", reps: "10 Tekrar", increase: "+10 kg bu ay", date: "3 gün önce" },
    { exercise: "Hack Squat", prWeight: "140 kg", reps: "8 Tekrar", increase: "+15 kg bu ay", date: "Geçen hafta" },
    { exercise: "Cable Lateral Raise", prWeight: "12.5 kg", reps: "15 Tekrar", increase: "+2.5 kg", date: "2 hafta önce" },
  ];

  // Günlük Takvim Isı Haritası (Son 28 gün)
  const daysGrid = Array.from({ length: 28 }, (_, i) => ({
    dayNumber: i + 1,
    completed: [1, 2, 4, 5, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 25, 26].includes(i + 1),
  }));

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Üst İlerleme Özeti */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-neon/15 px-3 py-1 text-xs font-bold text-neon border border-neon/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gelişim Takip Merkezi</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-2">
              İlerleme, Güç & Takvim
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Her setin ağırlık artışını, serilerini ve vücut ölçülerini tek yerden yönet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-black text-neon">
                <Flame className="h-4 w-4" />
                <span>14 Gün</span>
              </div>
              <div className="text-[10px] text-zinc-400">Aktif Seri (Streak)</div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-center">
              <div className="text-lg font-black text-white">16/20</div>
              <div className="text-[10px] text-zinc-400">Bu Ay Antrenman</div>
            </div>
          </div>
        </div>
      </div>

      {/* İlerleme Sekmeleri */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("prs")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "prs"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>Kişisel Rekorlar (PR)</span>
        </button>
        <button
          onClick={() => setActiveTab("streak")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "streak"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Aylık Takvim & Seri</span>
        </button>
        <button
          onClick={() => setActiveTab("body")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "body"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Scale className="h-3.5 w-3.5" />
          <span>Vücut Ölçüleri & Fotoğraflar</span>
        </button>
      </div>

      {/* SEKME 1: PR'LAR VE GÜÇ ARTIŞLARI */}
      {activeTab === "prs" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>Antrenmanlarda Kaydedilen Zirve Ağırlıklar</span>
            <span className="text-indigo-400 font-semibold">1RM Hesaplamalı</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {prList.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.exercise}</h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{item.date} kaydedildi</p>
                  </div>
                  <span className="rounded-full bg-neon/15 px-2.5 py-0.5 text-[10px] font-black text-neon">
                    {item.increase}
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-t border-zinc-900 pt-3">
                  <div>
                    <span className="text-2xl font-black text-white">{item.prWeight}</span>
                    <span className="text-xs text-zinc-400 ml-1.5 font-medium">× {item.reps}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-400">
                    Est. 1RM: {Math.round(parseFloat(item.prWeight) * 1.25)} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEKME 2: AYLIK TAKVİM & STREAK */}
      {activeTab === "streak" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Kasım 2026 Antrenman Isı Haritası</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Yeşil günler antrenmanın tamamlandığı günleri gösterir.</p>
            </div>
            <span className="text-xs font-bold text-neon">16 Gün Tamam</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-zinc-500 mb-1">
                {d}
              </div>
            ))}

            {daysGrid.map((d) => (
              <div
                key={d.dayNumber}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl text-xs font-bold border transition ${
                  d.completed
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-sm shadow-emerald-500/20"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-500"
                }`}
              >
                <span>{d.dayNumber}</span>
                {d.completed && <span className="h-1 w-1 rounded-full bg-emerald-400 mt-0.5" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEKME 3: VÜCUT ÖLÇÜLERİ */}
      {activeTab === "body" && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Vücut Ağırlığı", value: "78.4 kg", change: "-1.8 kg", good: true },
              { label: "Bel Ölçüsü", value: "81 cm", change: "-2.5 cm", good: true },
              { label: "Kol (Biceps)", value: "39.5 cm", change: "+1.2 cm", good: true },
            ].map((metric, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="text-xs text-zinc-400">{metric.label}</div>
                <div className="text-xl font-black text-white mt-1">{metric.value}</div>
                <span className="text-[10px] font-bold text-emerald-400 mt-1 inline-block">
                  {metric.change} (son 30 gün)
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Gelişim Fotoğraf Günlüğü</h3>
              <button className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white">
                <Camera className="h-3.5 w-3.5" />
                <span>Fotoğraf Ekle</span>
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Bu fotoğraflar tamamen gizlidir ve sadece senin ilerleme takibin için saklanır.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80"
                  alt="Önceki"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white">
                  1. Hafta (Başlangıç)
                </span>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80"
                  alt="Güncel"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  4. Hafta (Güncel)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
