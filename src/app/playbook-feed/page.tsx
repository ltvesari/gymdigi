"use client";

import { useState } from "react";
import Link from "next/link";
import { SAMPLE_PLAYBOOK_DAY, PlaybookDayWorkout } from "@/lib/playbook-workout-data";
import { CREATORS } from "@/lib/mock-data";
import {
  ArrowLeft,
  Check,
  Info,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function PlaybookFeedWorkoutPage() {
  const creator = CREATORS[0];
  const workout: PlaybookDayWorkout = SAMPLE_PLAYBOOK_DAY;

  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

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
    <div className="min-h-screen bg-marshmallow pb-24 max-w-lg mx-auto border-x border-marshmallow-border">
      {/* 1. ÜST BAR: Marshmallow zemin + Galactic Violet detaylar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-marshmallow-border bg-marshmallow-pure/90 backdrop-blur-md px-4 py-3 shadow-xs">
        <Link
          href={`/@${creator.username}`}
          className="flex items-center gap-1 text-xs font-bold text-galactic hover:text-galactic-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>@{creator.username}</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-bubblegum/15 border border-bubblegum/30 px-2.5 py-0.5 text-[10px] font-black text-bubblegum">
            {workout.dayLabel}
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full p-1.5 text-text-muted hover:text-galactic"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 2. GÜN VE ANA BAŞLIK BANNERI */}
      <div className="relative overflow-hidden border-b border-marshmallow-border bg-marshmallow-pure p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-galactic px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
            {workout.dayLabel}
          </span>
          <span className="text-xs text-text-secondary font-semibold">
            {workout.durationMinutes} Dk · ~{workout.caloriesBurn} kcal
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-text-primary leading-tight">
          {workout.mainTitle}
        </h1>
        <p className="text-xs text-text-secondary leading-relaxed">
          {workout.subtitle}
        </p>

        {/* Antrenör Giriş Notu */}
        <div className="rounded-2xl border border-galactic/20 bg-galactic/5 p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-galactic">
            <Info className="h-3.5 w-3.5 text-bubblegum" />
            <span>@{creator.username} Antrenör Mesajı</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            &ldquo;{workout.coachIntroNote}&rdquo;
          </p>
        </div>
      </div>

      {/* 3. SABİT DİNLENME SAYACI DOCK BAR */}
      <div className="sticky top-12 z-20 mx-3 my-3 rounded-2xl border border-marshmallow-border bg-marshmallow-pure/95 backdrop-blur-md p-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black ${
              timerRunning
                ? "bg-bubblegum text-white animate-pulse shadow-xs"
                : "bg-marshmallow-subtle text-galactic border border-marshmallow-border"
            }`}
          >
            {timerSeconds}s
          </div>
          <div>
            <div className="text-[11px] font-black text-text-primary">Dinlenme Sayacı</div>
            <div className="text-[10px] text-text-muted">Seti tamamlayınca otomatik başlar</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTimerSeconds((s) => Math.max(0, s - 15))}
            className="rounded-lg bg-marshmallow-subtle border border-marshmallow-border px-2 py-1 text-[10px] font-bold text-text-secondary hover:text-galactic"
          >
            -15s
          </button>
          <button
            onClick={() => setTimerSeconds((s) => s + 15)}
            className="rounded-lg bg-marshmallow-subtle border border-marshmallow-border px-2 py-1 text-[10px] font-bold text-text-secondary hover:text-galactic"
          >
            +15s
          </button>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-galactic hover:bg-galactic-dark text-white shadow-xs"
          >
            {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
          </button>
          <button
            onClick={() => {
              setTimerRunning(false);
              setTimerSeconds(60);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-marshmallow-border bg-marshmallow-subtle text-text-muted hover:text-text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 4. ANTRENMAN ALT BAŞLIKLARI VE DİKEY KART AKIŞI */}
      <div className="px-3 space-y-6 mt-3">
        {workout.sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-marshmallow-border pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-galactic" />
                <h2 className="text-sm font-black text-text-primary uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              {section.badge && (
                <span className="rounded-full bg-marshmallow-pure border border-marshmallow-border px-2 py-0.5 text-[10px] font-bold text-galactic shadow-xs">
                  {section.badge}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-marshmallow-border bg-marshmallow-pure overflow-hidden shadow-xs space-y-3 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-bubblegum">
                        {item.type === "warmup" ? "ISINMA HAREKETİ" : item.type === "exercise" ? "ANA EGZERSİZ" : "BİLGİ & NOT"}
                      </span>
                      <h3 className="text-base font-black text-text-primary mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {item.sets && (
                      <span className="rounded-xl bg-galactic/10 border border-galactic/20 px-2.5 py-1 text-xs font-bold text-galactic shrink-0">
                        {item.sets} Set × {item.reps}
                      </span>
                    )}
                  </div>

                  {item.mediaType !== "none" && (
                    <div className="relative aspect-[9/12] w-full rounded-2xl overflow-hidden border border-marshmallow-border bg-marshmallow-darker group shadow-xs">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {item.mediaType === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-marshmallow-pure/80 backdrop-blur-md text-galactic shadow-md group-hover:scale-110 transition">
                            <Play className="h-5 w-5 fill-galactic ml-0.5" />
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-semibold">
                        <span>{item.mediaType === "video" ? "Dikey Video Rehber" : "Teknik Fotoğraf"}</span>
                        {item.tempo && <span>Tempo: {item.tempo}</span>}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl bg-marshmallow-subtle border border-marshmallow-border p-3">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.sets && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-text-muted px-1">
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
                                  ? "border-galactic bg-galactic text-white shadow-xs"
                                  : "border-marshmallow-border bg-marshmallow-subtle text-text-primary hover:border-galactic"
                              }`}
                            >
                              <span>Set #{sIdx + 1} ({item.reps?.split(" ")[0]} tk)</span>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-lg border ${
                                  isDone
                                    ? "bg-bubblegum border-bubblegum text-white"
                                    : "border-marshmallow-border bg-white text-transparent"
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

        {/* 5. GÜNÜ TAMAMLA BUTONU: Galactic Violet Gradient */}
        <div className="pt-4">
          <Link
            href="/progress"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-galactic to-bubblegum py-3.5 text-xs font-black text-white shadow-md shadow-galactic/25 hover:opacity-95"
          >
            <Trophy className="h-4 w-4" />
            <span>Gün 1 İtiş Antrenmanını Tamamla & Kaydet</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
