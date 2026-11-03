"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CREATORS, PROGRAMS, ProgramItem } from "@/lib/mock-data";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Info,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Unlock,
  Users,
} from "lucide-react";
import SubscribeModal from "@/components/SubscribeModal";

export default function ProgramDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "estetik-hipertrofi-8-hafta";

  const program =
    PROGRAMS.find((p) => p.slug === slug || p.id === slug) || PROGRAMS[0];
  const creator =
    CREATORS.find((c) => c.username === program.creatorUsername) || CREATORS[0];

  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 7 günlük takvim simülasyonu
  const daysOfWeek = [
    { dayNumber: 1, dayName: "Pazartesi", isRest: false, workout: program.workouts[0] },
    { dayNumber: 2, dayName: "Salı", isRest: false, workout: program.workouts[1] },
    { dayNumber: 3, dayName: "Çarşamba", isRest: true, title: "Aktif Toparlanma & Mobilite" },
    { dayNumber: 4, dayName: "Perşembe", isRest: false, workout: program.workouts[2] || program.workouts[0] },
    { dayNumber: 5, dayName: "Cuma", isRest: false, workout: program.workouts[1] },
    { dayNumber: 6, dayName: "Cumartesi", isRest: true, title: "Hafta Sonu Dinlenme & Yürüyüş" },
    { dayNumber: 7, dayName: "Pazar", isRest: true, title: "Dinlenme & Beslenme Hazırlığı" },
  ];

  return (
    <div className="px-4 py-5 space-y-6 max-w-4xl mx-auto">
      {/* Üst Geri Butonu */}
      <Link
        href={`/@${creator.username}`}
        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>@{creator.username} Kanalına Dön</span>
      </Link>

      {/* Program Hero Başlığı */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                {program.durationWeeks} Hafta Blok
              </span>
              <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                Haftada {program.workoutsPerWeek} Gün
              </span>
              <span className="rounded-full bg-neon/15 px-3 py-1 text-xs font-bold text-neon">
                {program.level}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {program.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {program.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-900 pt-3">
              <span className="flex items-center gap-1">
                <Dumbbell className="h-4 w-4 text-zinc-500" />
                {program.equipment}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4 text-zinc-500" />
                {program.enrolledCount} Sporcu
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="h-4 w-4 fill-amber-400" />
                {program.rating}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-5 py-3 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Program Aktif (Tüm Haftalar Açık)</span>
                </div>
              ) : (
                <button
                  onClick={() => setSubModalOpen(true)}
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-indigo-600/25 hover:opacity-95"
                >
                  Programa Başla — ₺{creator.monthlyPriceTry}/ay
                </button>
              )}

              {program.workouts[0] && (
                <Link
                  href={`/workout/${program.workouts[0].id}`}
                  className="flex items-center gap-1.5 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:border-indigo-500"
                >
                  <Play className="h-4 w-4 fill-neon text-neon" />
                  <span>1. Günü Ücretsiz Dene</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:col-span-5 relative aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden border border-zinc-800">
            <img
              src={program.coverImage}
              alt={program.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Playbook Çok Haftalı Seçici (1. Hafta ... 8. Hafta) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-300">
            Haftalık Antrenman Takvimi
          </h2>
          <span className="text-xs text-indigo-400 font-semibold">
            {program.durationWeeks} Haftalık Periodizasyon
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {Array.from({ length: program.durationWeeks }, (_, i) => i + 1).map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`rounded-2xl px-4 py-2 text-xs font-bold shrink-0 transition ${
                selectedWeek === week
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              {week}. Hafta {week === 1 ? "(Adaptasyon)" : week === 4 ? "(Deload)" : "(Hipertrofi)"}
            </button>
          ))}
        </div>
      </div>

      {/* Günlük Takvim Görünümü (Pazartesi - Pazar) */}
      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const unlocked = (day.workout?.isFreePreview && selectedWeek === 1) || isSubscribed;

          if (day.isRest) {
            return (
              <div
                key={day.dayNumber}
                className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/60 px-4 py-3 text-xs text-zinc-500"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-zinc-400">{day.dayName}</span>
                  <span>🛌 {day.title}</span>
                </div>
                <span className="text-[11px] font-medium text-zinc-600">Toparlanma</span>
              </div>
            );
          }

          return (
            <div
              key={day.dayNumber}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition ${
                unlocked
                  ? "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                  : "border-zinc-900 bg-zinc-950/70 opacity-90"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-extrabold text-xs shrink-0">
                  G{day.dayNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      {day.dayName}
                    </span>
                    {day.workout?.isFreePreview && selectedWeek === 1 && !isSubscribed && (
                      <span className="rounded bg-neon/20 px-1.5 py-0.5 text-[9px] font-extrabold text-neon">
                        ÜCRETSİZ ÖNİZLEME
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {day.workout?.title || "Programlı Antrenman"}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span>{day.workout?.focusArea || "Full Body"}</span>
                    <span>·</span>
                    <span>{day.workout?.durationMinutes || 45} dk</span>
                    <span>·</span>
                    <span>{day.workout?.exercises.length || 4} Hareket</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {unlocked && day.workout ? (
                  <Link
                    href={`/workout/${day.workout.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Antrenmanı Aç</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setSubModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-indigo-500 hover:text-white"
                  >
                    <Lock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Kilidi Aç</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Abonelik Modalı */}
      <SubscribeModal
        creator={creator}
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        onSuccess={() => setIsSubscribed(true)}
      />
    </div>
  );
}
