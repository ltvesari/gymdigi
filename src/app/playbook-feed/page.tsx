"use client";

import { useState } from "react";
import Link from "next/link";
import { SAMPLE_PLAYBOOK_DAY, PlaybookDayWorkout, PlaybookSubSection, PlaybookBlockItem } from "@/lib/playbook-workout-data";
import { CREATORS } from "@/lib/mock-data";
import { soundEffects } from "@/lib/sound";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Info,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Video,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
} from "lucide-react";

export default function PlaybookFeedWorkoutPage() {
  const creator = CREATORS[0];
  const workout: PlaybookDayWorkout = SAMPLE_PLAYBOOK_DAY;

  // Dinlenme Sayacı State
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Set / KG Tamamlama State
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [userWeights, setUserWeights] = useState<Record<string, string>>({
    "m-1-1": "25",
    "m-1-2": "27.5",
    "m-1-3": "27.5",
    "m-1-4": "30",
  });

  const toggleSet = (key: string, restSec: number = 60) => {
    setCompletedMap((prev) => {
      const nextVal = !prev[key];
      if (nextVal) {
        setTimerSeconds(restSec);
        setTimerRunning(true);
      }
      return { ...prev, [key]: nextVal };
    });
  };

  return (
    <div className="min-h-screen bg-black pb-24 max-w-lg mx-auto border-x border-zinc-900">
      {/* 1. ÜST BAR: Geri Dönüş + Gün Etiketi */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-900 bg-black/90 backdrop-blur-md px-4 py-3">
        <Link
          href={`/@${creator.username}`}
          className="flex items-center gap-1 text-xs font-bold text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>@{creator.username}</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-neon/15 px-2.5 py-0.5 text-[10px] font-black text-neon">
            {workout.dayLabel}
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full p-1.5 text-zinc-400 hover:text-white"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 2. GÜN VE ANA BAŞLIK BANNERI */}
      <div className="relative overflow-hidden border-b border-zinc-900 bg-zinc-950 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">
            {workout.dayLabel}
          </span>
          <span className="text-xs text-zinc-400">{workout.durationMinutes} Dk · ~{workout.caloriesBurn} kcal</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
          {workout.mainTitle}
        </h1>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {workout.subtitle}
        </p>

        {/* Antrenör Giriş Notu (Playbook Tarzı Koç Mesajı) */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
            <Info className="h-3.5 w-3.5" />
            <span>@{creator.username} Antrenör Mesajı</span>
          </div>
          <p className="text-[11px] text-zinc-200 leading-relaxed">
            &ldquo;{workout.coachIntroNote}&rdquo;
          </p>
        </div>
      </div>

      {/* 3. SABİT DİNLENME SAYACI DOCK BAR */}
      <div className="sticky top-12 z-20 mx-3 my-3 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-3 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black ${
              timerRunning
                ? "bg-neon text-black animate-pulse"
                : "bg-zinc-900 text-white border border-zinc-800"
            }`}
          >
            {timerSeconds}s
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-white">Dinlenme Sayacı</div>
            <div className="text-[10px] text-zinc-400">Seti tamamlayınca otomatik başlar</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTimerSeconds((s) => Math.max(0, s - 15))}
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-2 py-1 text-[10px] font-bold text-zinc-300"
          >
            -15s
          </button>
          <button
            onClick={() => setTimerSeconds((s) => s + 15)}
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-2 py-1 text-[10px] font-bold text-zinc-300"
          >
            +15s
          </button>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"
          >
            {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
          </button>
          <button
            onClick={() => {
              setTimerRunning(false);
              setTimerSeconds(60);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 4. ANTRENMAN ALT BAŞLIKLARI VE DİKEY KART AKIŞI (Playbook Stili) */}
      <div className="px-3 space-y-6 mt-3">
        {workout.sections.map((section) => (
          <div key={section.id} className="space-y-3">
            {/* Alt Başlık Barı (Örn: "Isınma (Warm-Up)", "Ana İtiş Bloğu") */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              {section.badge && (
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400">
                  {section.badge}
                </span>
              )}
            </div>

            {/* Bu alt başlıktaki dikey bloklar */}
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-lg space-y-3 p-4"
                >
                  {/* Başlık ve Tür */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-neon">
                        {item.type === "warmup" ? "ISINMA HAREKETİ" : item.type === "exercise" ? "ANA EGZERSİZ" : "BİLGİ & NOT"}
                      </span>
                      <h3 className="text-base font-extrabold text-white mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {item.sets && (
                      <span className="rounded-xl bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-bold text-white shrink-0">
                        {item.sets} Set × {item.reps}
                      </span>
                    )}
                  </div>

                  {/* DİKEY 9:16 VİDEO VEYA FOTOĞRAF KARTI (Telefon Çekimi Playbook Görünümü) */}
                  {item.mediaType !== "none" && (
                    <div className="relative aspect-[9/12] w-full rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-900 group">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Video Oynat İkonu */}
                      {item.mediaType === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl group-hover:scale-110 transition">
                            <Play className="h-5 w-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 font-semibold">
                        <span>{item.mediaType === "video" ? "Dikey Video Rehber" : "Teknik Fotoğraf"}</span>
                        {item.tempo && <span>Tempo: {item.tempo}</span>}
                      </div>
                    </div>
                  )}

                  {/* ALT YAZI & DETAYLI AÇIKLAMA METNİ */}
                  <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/60 p-3">
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* SET VE AĞIRLIK İŞARETLEME KUTULARI (Varsa) */}
                  {item.sets && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-1">
                        Set Kayıtları (Tamamlananları İşaretle)
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: item.sets }, (_, sIdx) => {
                          const setKey = `${item.id}-${sIdx + 1}`;
                          const isDone = completedMap[setKey];
                          return (
                            <button
                              key={setKey}
                              onClick={() => toggleSet(setKey, item.restSeconds || 60)}
                              className={`flex items-center justify-between rounded-xl border p-2.5 text-xs font-bold transition ${
                                isDone
                                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                                  : "border-zinc-800 bg-black text-zinc-300 hover:border-zinc-700"
                              }`}
                            >
                              <span>Set #{sIdx + 1} ({item.reps?.split(" ")[0]} tk)</span>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-lg border ${
                                  isDone
                                    ? "bg-emerald-500 border-emerald-500 text-black"
                                    : "border-zinc-700 bg-zinc-900 text-transparent"
                                }`}
                              >
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 5. GÜNÜ TAMAMLA BUTONU */}
        <div className="pt-4">
          <Link
            href="/progress"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-black text-black shadow-lg shadow-emerald-500/20 hover:opacity-95"
          >
            <Trophy className="h-4 w-4" />
            <span>Gün 1 İtiş Antrenmanını Tamamla & Kaydet</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
