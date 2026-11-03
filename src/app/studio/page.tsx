"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Coins,
  Dumbbell,
  ExternalLink,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Video,
} from "lucide-react";

interface DraftExercise {
  orderLabel: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  youtubeUrl: string;
}

interface PendingSubscription {
  id: string;
  subscriberName: string;
  creatorUsername: string;
  planLabel: string;
  amountTry: number;
  senderNote: string;
  status: "pending" | "approved";
}

export default function CreatorStudioPage() {
  const [studioTab, setStudioTab] = useState<
    "builder" | "pricing" | "approvals"
  >("builder");

  // Program oluşturucu state
  const [programTitle, setProgramTitle] = useState(
    "Yeni 6 Haftalık Hipertrofi Bloğu"
  );
  const [workoutTitle, setWorkoutTitle] = useState(
    "1. Gün: Üst Vücut İtiş & Yan Omuz"
  );
  const [exercises, setExercises] = useState<DraftExercise[]>([
    {
      orderLabel: "A1",
      name: "Incline Dumbbell Press",
      sets: 4,
      reps: "8-10",
      restSeconds: 90,
      youtubeUrl: "https://youtu.be/8iPEnn-ltC8",
    },
    {
      orderLabel: "B1",
      name: "Cable Lateral Raise",
      sets: 4,
      reps: "12-15",
      restSeconds: 60,
      youtubeUrl: "https://youtu.be/PPrzBWZDOhA",
    },
  ]);
  const [savedBanner, setSavedBanner] = useState(false);

  // Fiyat & Komisyon simülatörü
  const [monthlyPrice, setMonthlyPrice] = useState(299);
  const [activeSubCount, setActiveSubCount] = useState(50);
  const grossRevenue = monthlyPrice * activeSubCount;
  const platformCommission = Math.round(grossRevenue * 0.1); // %10 GymDigi komisyonu
  const netCreatorPayout = grossRevenue - platformCommission;

  // Manuel Ödeme Onay Listesi (Aşama 1 Sıfır Bütçe Akışı)
  const [pendingSubs, setPendingSubs] = useState<PendingSubscription[]>([
    {
      id: "sub-101",
      subscriberName: "Mert Çelik",
      creatorUsername: "burakfit",
      planLabel: "Aylık Abonelik",
      amountTry: 299,
      senderNote: "Mert Çelik - @burakfit aylık abonelik FAST",
      status: "pending",
    },
    {
      id: "sub-102",
      subscriberName: "Zeynep Aydın",
      creatorUsername: "selinpilates",
      planLabel: "3 Aylık Paket",
      amountTry: 649,
      senderNote: "Zeynep Aydın - Selin Pilates 3 Ay",
      status: "pending",
    },
  ]);

  const addExerciseRow = () => {
    const nextLetter = String.fromCharCode(65 + exercises.length);
    setExercises([
      ...exercises,
      {
        orderLabel: `${nextLetter}1`,
        name: "",
        sets: 3,
        reps: "10-12",
        restSeconds: 60,
        youtubeUrl: "",
      },
    ]);
  };

  const removeExerciseRow = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const approveSub = (id: string) => {
    setPendingSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Üst Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-0.5 text-[11px] font-bold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Playbook Creator Studio + Admin</span>
          </div>
          <h1 className="mt-1.5 text-xl sm:text-2xl font-black text-white">
            Antrenör Stüdyosu & Gelir Paneli
          </h1>
          <p className="text-xs text-zinc-400">
            Programını oluştur, YouTube liste dışı videolarını bağla, abonelik fiyatını
            ve ödemeleri yönet.
          </p>
        </div>

        <Link
          href="/@burakfit"
          className="flex items-center gap-1.5 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white hover:border-indigo-500 shrink-0"
        >
          <span>Canlı Vitrinimi Gör (@burakfit)</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setStudioTab("builder")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition ${
            studioTab === "builder"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-900 text-zinc-400 border border-zinc-800"
          }`}
        >
          <Dumbbell className="h-4 w-4" />
          <span>1. Program & Antrenman Oluşturucu</span>
        </button>

        <button
          onClick={() => setStudioTab("pricing")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition ${
            studioTab === "pricing"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-900 text-zinc-400 border border-zinc-800"
          }`}
        >
          <Coins className="h-4 w-4" />
          <span>2. Abonelik Fiyatı & Gelir Hesaplayıcı</span>
        </button>

        <button
          onClick={() => setStudioTab("approvals")}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition ${
            studioTab === "approvals"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-900 text-zinc-400 border border-zinc-800"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>
            3. Abonelik & Havale Onayları (
            {pendingSubs.filter((p) => p.status === "pending").length})
          </span>
        </button>
      </div>

      {/* SEKME 1: PROGRAM & ANTRENMAN OLUŞTURUCU */}
      {studioTab === "builder" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5">
                Program Adı
              </label>
              <input
                type="text"
                value={programTitle}
                onChange={(e) => setProgramTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5">
                Antrenman Günü Başlığı
              </label>
              <input
                type="text"
                value={workoutTitle}
                onChange={(e) => setWorkoutTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                Antrenman Hareketleri (Süperset, Set, Tekrar, Dinlenme & Video)
              </span>
              <button
                type="button"
                onClick={addExerciseRow}
                className="flex items-center gap-1 rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-bold text-neon hover:border-neon"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Hareket Ekle</span>
              </button>
            </div>

            {exercises.map((ex, idx) => (
              <div
                key={idx}
                className="grid gap-2.5 sm:grid-cols-12 items-center rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-3"
              >
                <div className="sm:col-span-1">
                  <input
                    type="text"
                    value={ex.orderLabel}
                    onChange={(e) => {
                      const next = [...exercises];
                      next[idx].orderLabel = e.target.value;
                      setExercises(next);
                    }}
                    placeholder="A1"
                    className="w-full rounded-lg border border-zinc-800 bg-black px-2 py-2 text-center text-xs font-black text-neon"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={ex.name}
                    onChange={(e) => {
                      const next = [...exercises];
                      next[idx].name = e.target.value;
                      setExercises(next);
                    }}
                    placeholder="Hareket adı (örn: Squat)"
                    className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-1">
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) => {
                      const next = [...exercises];
                      next[idx].sets = Number(e.target.value);
                      setExercises(next);
                    }}
                    className="w-14 rounded-lg border border-zinc-800 bg-black px-2 py-2 text-center text-xs text-white"
                  />
                  <span className="text-[11px] text-zinc-500">set ×</span>
                  <input
                    type="text"
                    value={ex.reps}
                    onChange={(e) => {
                      const next = [...exercises];
                      next[idx].reps = e.target.value;
                      setExercises(next);
                    }}
                    className="w-16 rounded-lg border border-zinc-800 bg-black px-2 py-2 text-center text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-4 flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={ex.youtubeUrl}
                    onChange={(e) => {
                      const next = [...exercises];
                      next[idx].youtubeUrl = e.target.value;
                      setExercises(next);
                    }}
                    placeholder="YouTube Liste Dışı Video Linki"
                    className="w-full rounded-lg border border-zinc-800 bg-black px-2.5 py-2 text-xs text-zinc-300"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeExerciseRow(idx)}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-zinc-500">
              İpucu: Videoları kendi YouTube kanalına &quot;Liste Dışı&quot; yükleyip
              linkini yapıştır (0₺ video maliyeti).
            </span>
            <button
              type="button"
              onClick={() => {
                setSavedBanner(true);
                setTimeout(() => setSavedBanner(false), 2500);
              }}
              className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs font-extrabold text-white hover:bg-indigo-500"
            >
              Programı Yayınla
            </button>
          </div>

          {savedBanner && (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-xs font-bold text-emerald-300">
              ✓ Antrenman taslağı kaydedildi! Supabase bağlantısı yapıldığında
              doğrudan `programs` ve `workout_exercises` tablolarına yazılır.
            </div>
          )}
        </div>
      )}

      {/* SEKME 2: FİYATLANDIRMA & GELİR SİMÜLATÖRÜ */}
      {studioTab === "pricing" && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <h2 className="text-base font-extrabold text-white">
              Kanal Abonelik Fiyatın & Gelir Paylaşımı
            </h2>
            <p className="text-xs text-zinc-400">
              Playbook modelinde sabit yazılım ücreti ödemezsin. Sadece kazandığın
              aboneliklerden %10 platform payı kesilir.
            </p>

            <div>
              <label className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                <span>Aylık Abonelik Ücreti</span>
                <span className="text-neon">₺{monthlyPrice} / ay</span>
              </label>
              <input
                type="range"
                min={149}
                max={999}
                step={25}
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs font-bold text-zinc-300 mb-2">
                <span>Aktif Abone Sayısı</span>
                <span className="text-indigo-400">{activeSubCount} Abone</span>
              </label>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={activeSubCount}
                onChange={(e) => setActiveSubCount(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-black p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-400">
                Aylık Tahmini Kazanç Tablosu
              </span>
              <div className="mt-2 text-3xl font-black text-white">
                ₺{netCreatorPayout.toLocaleString("tr-TR")}{" "}
                <span className="text-xs font-medium text-emerald-400">
                  / ay net antrenör payı (%90)
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Toplam Brüt Abonelik Cirosu:</span>
                <span className="font-bold text-white">
                  ₺{grossRevenue.toLocaleString("tr-TR")}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>GymDigi Platform Komisyonu (%10):</span>
                <span className="font-bold text-indigo-400">
                  ₺{platformCommission.toLocaleString("tr-TR")}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300 font-bold pt-1">
                <span>Yıllık Tekrarlayan Gelir (ARR):</span>
                <span className="text-neon">
                  ₺{(netCreatorPayout * 12).toLocaleString("tr-TR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEKME 3: MANUEL ÖDEME & ABONELİK ONAYLARI (ADMIN / CREATOR) */}
      {studioTab === "approvals" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white">
                Bekleyen Havale / FAST Abonelik Bildirimleri
              </h2>
              <p className="text-xs text-zinc-400">
                Aşama 1&apos;de şirket kurmadan önce gelen ödemeleri buradan tek tıkla
                onaylayıp sporcunun kilidini açabilirsin.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingSubs.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">
                      {sub.subscriberName}
                    </span>
                    <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
                      @{sub.creatorUsername} · {sub.planLabel}
                    </span>
                    <span className="text-xs font-black text-neon">
                      ₺{sub.amountTry}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Dekont / Açıklama Notu: &ldquo;{sub.senderNote}&rdquo;
                  </p>
                </div>

                {sub.status === "approved" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    Onaylandı · Erişim Açık
                  </span>
                ) : (
                  <button
                    onClick={() => approveSub(sub.id)}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-emerald-500 transition"
                  >
                    Ödemeyi Onayla & Erişimi Aç
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
