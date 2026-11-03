"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CREATORS, PROGRAMS } from "@/lib/mock-data";
import {
  User,
  Settings,
  Flame,
  Award,
  Calendar,
  CreditCard,
  LogOut,
  ChevronRight,
  Dumbbell,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"subscriptions" | "history" | "settings">("subscriptions");

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <User className="h-12 w-12 text-zinc-600 mb-3" />
        <h2 className="text-lg font-bold text-white">Giriş Yapılmadı</h2>
        <p className="text-xs text-zinc-400 mt-1 mb-4">Profilini ve antrenmanlarını görmek için giriş yapmalısın.</p>
        <Link
          href="/login"
          className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
        >
          Giriş Yap / Kaydol
        </Link>
      </div>
    );
  }

  // Abone olunan demo antrenör
  const subscribedCreator = CREATORS[0];
  const activeProgram = PROGRAMS[0];

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Profil Başlığı */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500/50 p-0.5"
              />
              <span className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1 border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">{user.name}</h1>
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase">
                  {user.role === "creator" ? "Koç" : "Sporcu"}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              {user.goal && (
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-zinc-300 font-medium">
                    🎯 {user.goal}
                  </span>
                  <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-zinc-300 font-medium">
                    ⚡ {user.fitnessLevel} Seviye
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-semibold text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Sporcu İstatistik Özeti (Playbook Tarzı) */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-900 pt-4 text-center">
          <div className="rounded-2xl bg-zinc-900/50 p-3">
            <div className="flex items-center justify-center gap-1 text-base font-black text-neon">
              <Flame className="h-4 w-4" />
              <span>12 Gün</span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Antrenman Serisi</div>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 p-3">
            <div className="text-base font-black text-white">48 Set</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Bu Hafta Tamamlanan</div>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 p-3">
            <div className="text-base font-black text-indigo-400">1 Aktif</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Kanal Aboneliği</div>
          </div>
        </div>
      </div>

      {/* Profil Sekmeleri */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "subscriptions"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span>Aboneliklerim</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "history"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Antrenman Geçmişi</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "settings"
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Settings className="h-3.5 w-3.5" />
          <span>Ayarlar & Tercihler</span>
        </button>
      </div>

      {/* SEKME 1: ABONELİKLER */}
      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={subscribedCreator.avatar}
                  alt={subscribedCreator.fullName}
                  className="h-12 w-12 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {subscribedCreator.fullName}
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                      AKTİF
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    @{subscribedCreator.username} Kanal Aboneliği (₺{subscribedCreator.monthlyPriceTry}/ay)
                  </p>
                </div>
              </div>

              <Link
                href={`/@${subscribedCreator.username}`}
                className="flex items-center gap-1 rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-bold text-white hover:border-indigo-500 transition"
              >
                <span>Kanala Git</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Aktif Takip Edilen Program */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-400">
                    Şu Anda Takip Ettiğin Program
                  </span>
                  <h4 className="text-sm font-extrabold text-white mt-0.5">
                    {activeProgram.title}
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    Hafta 1 · Gün 1 antrenmanını tamamladın
                  </p>
                </div>
                <Link
                  href="/workout/w-upper-power"
                  className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shrink-0"
                >
                  Sıradaki Antrenman →
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900 pt-3">
              <span>Yenilenme Tarihi: 2 Aralık 2026</span>
              <button className="text-red-400 hover:underline">
                Aboneliği Yönet / İptal Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEKME 2: GEÇMİŞ */}
      {activeTab === "history" && (
        <div className="space-y-3">
          {[
            {
              date: "Bugün, 18:30",
              title: "1. Gün: Üst Vücut (Omuz & Göğüs Odaklı)",
              creator: "@burakfit",
              setsCount: 14,
              duration: "48 dk",
              calories: "420 kcal",
            },
            {
              date: "2 gün önce",
              title: "2. Gün: Alt Vücut Kuvvet & Quad/Hamstring",
              creator: "@burakfit",
              setsCount: 16,
              duration: "55 dk",
              calories: "510 kcal",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div>
                <span className="text-[10px] font-bold text-zinc-500">{item.date} · {item.creator}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                  <span>{item.setsCount} Set</span>
                  <span>{item.duration}</span>
                  <span className="text-amber-400">{item.calories}</span>
                </div>
              </div>
              <Link
                href="/workout/w-upper-power"
                className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Kayıt Detayı
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* SEKME 3: AYARLAR */}
      {activeTab === "settings" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Antrenman Tercihleri</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
              <span className="text-zinc-300">Dinlenme Sayacı Sesi & Titreşim</span>
              <span className="text-neon font-bold">Açık</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
              <span className="text-zinc-300">Ağırlık Birimi</span>
              <span className="text-indigo-400 font-bold">Kilogram (kg)</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
              <span className="text-zinc-300">Antrenman Sırasında Ekranı Açık Tut</span>
              <span className="text-neon font-bold">Açık (WakeLock)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
