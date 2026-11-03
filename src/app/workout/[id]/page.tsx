"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CREATORS, PROGRAMS, WorkoutItem, ExerciseItem } from "@/lib/mock-data";
import { soundEffects } from "@/lib/sound";
import { wakeLockHelper } from "@/lib/wakelock";
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
  Repeat,
  Volume2,
  VolumeX,
} from "lucide-react";

interface SetLog {
  weightKg: string;
  repsDone: string;
  rpe: string; // Rate of Perceived Exertion (1-10)
  completed: boolean;
  previousWeekWeight?: string;
}

export default function WorkoutPlayerPage() {
  const params = useParams<{ id: string }>();
  const workoutId = params?.id || "w-upper-power";

  let foundWorkout: WorkoutItem | undefined;
  let parentProgram = PROGRAMS[0];

  for (const prog of PROGRAMS) {
    const match = prog.workouts.find((w) => w.id === workoutId);
    if (match) {
      foundWorkout = match;
      parentProgram = prog;
      break;
    }
  }

  const workout = foundWorkout || PROGRAMS[0].workouts[0];
  const creator =
    CREATORS.find((c) => c.username === parentProgram.creatorUsername) ||
    CREATORS[0];

  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [showVideoEmbed, setShowVideoEmbed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  // Set/KG/RPE Kayıtları (Önceki Hafta Hafızasıyla)
  const [logs, setLogs] = useState<Record<string, SetLog[]>>(() => {
    const initial: Record<string, SetLog[]> = {};
    workout.exercises.forEach((ex) => {
      initial[ex.id] = Array.from({ length: ex.sets }, (_, idx) => ({
        weightKg: idx === 0 ? "25" : "27.5",
        repsDone: ex.reps.split("-")[0] || "10",
        rpe: "8",
        completed: false,
        previousWeekWeight: `${22.5 + idx * 2.5} kg × 10`,
      }));
    });
    return initial;
  });

  // Dinlenme Sayacı
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [workoutFinished, setWorkoutFinished] = useState<boolean>(false);

  const currentExercise =
    workout.exercises[activeExerciseIdx] || workout.exercises[0];

  // Ekranın açık kalmasını sağla (WakeLock)
  useEffect(() => {
    wakeLockHelper.requestWakeLock();
    return () => {
      wakeLockHelper.releaseWakeLock();
    };
  }, []);

  // Dinlenme sayacı ve ses efektleri
  useEffect(() => {
    if (!timerRunning) return;
    if (timerSeconds <= 0) {
      setTimerRunning(false);
      if (soundEnabled) {
        soundEffects.playTimerComplete();
      }
      return;
    }

    if (timerSeconds <= 3 && timerSeconds > 0 && soundEnabled) {
      soundEffects.playTick();
    }

    const interval = setInterval(() => {
      setTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, soundEnabled]);

  const toggleSetComplete = (exId: string, setIdx: number, restSec: number) => {
    setLogs((prev) => {
      const copy = [...(prev[exId] || [])];
      const nextCompleted = !copy[setIdx].completed;
      copy[setIdx] = { ...copy[setIdx], completed: nextCompleted };

      if (nextCompleted) {
        setTimerSeconds(restSec);
        setTimerRunning(true);
      }

      return { ...prev, [exId]: copy };
    });
  };

  const updateSetField = (
    exId: string,
    setIdx: number,
    field: "weightKg" | "repsDone" | "rpe",
    value: string
  ) => {
    setLogs((prev) => {
      const copy = [...(prev[exId] || [])];
      copy[setIdx] = { ...copy[setIdx], [field]: value };
      return { ...prev, [exId]: copy };
    });
  };

  const totalSets = Object.values(logs).reduce((acc, arr) => acc + arr.length, 0);
  const completedSets = Object.values(logs).reduce(
    (acc, arr) => acc + arr.filter((s) => s.completed).length,
    0
  );
  const progressPct =
    totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/programs/${parentProgram.slug}`}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Program Takvimine Dön</span>
        </Link>

        <div className="flex-1 max-w-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
            <span>Antrenman İlerlemesi</span>
            <span className="text-neon">
              {completedSets}/{totalSets} Set ({progressPct}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-neon transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setWorkoutFinished(true)}
          className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-emerald-500 transition"
        >
          Bitir
        </button>
      </div>

      {/* Isınma (Warm-up) Bildirimi */}
      <div className="flex items-center justify-between rounded-2xl bg-amber-500/10 border border-amber-500/25 px-4 py-2.5 text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong>5 Dk Isınma:</strong> Omuz rotatör ve hafif ağırlıkla 2 set aktivasyon yapmayı unutma.
          </span>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-zinc-400 hover:text-amber-200"
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      </div>

      {/* Antrenman Başlığı & Hareket Sekmeleri */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              {parentProgram.title} · Hafta 1
            </span>
            <h1 className="text-lg sm:text-xl font-black text-white">
              {workout.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              {workout.durationMinutes} dk
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-400" />~{workout.caloriesBurn} kcal
            </span>
          </div>
        </div>

        {/* Hareket Butonları */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {workout.exercises.map((ex, idx) => {
            const exSets = logs[ex.id] || [];
            const allDone = exSets.length > 0 && exSets.every((s) => s.completed);
            return (
              <button
                key={ex.id}
                onClick={() => {
                  setActiveExerciseIdx(idx);
                  setShowVideoEmbed(false);
                }}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold shrink-0 transition ${
                  activeExerciseIdx === idx
                    ? "border-indigo-500 bg-indigo-600/20 text-white"
                    : allDone
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-black text-neon">
                  {ex.orderLabel}
                </span>
                <span className="truncate max-w-[140px]">{ex.name}</span>
                {allDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Sol Video & Swap | Sağ Set Takibi & Timer */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* SOL: Video & Teknik */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
            {showVideoEmbed ? (
              <iframe
                src={currentExercise.youtubeEmbedUrl}
                title={currentExercise.name}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={currentExercise.videoThumb}
                  alt={currentExercise.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-lg bg-neon px-2.5 py-1 text-xs font-black text-black">
                    {currentExercise.orderLabel}
                  </span>
                  <span className="rounded-lg bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-bold text-white">
                    {currentExercise.muscleGroup}
                  </span>
                </div>

                <button
                  onClick={() => setShowVideoEmbed(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="flex items-center gap-2 rounded-full bg-indigo-600/95 px-5 py-3 text-xs font-extrabold text-white shadow-xl shadow-indigo-600/40 group-hover:scale-105 transition">
                    <Video className="h-4 w-4" />
                    <span>Hareket Videosunu Oynat</span>
                  </div>
                </button>

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs text-zinc-200">
                  <span className="font-bold">
                    Hedef: {currentExercise.sets} Set × {currentExercise.reps} Tekrar
                  </span>
                  {currentExercise.tempo && (
                    <span className="rounded bg-black/70 px-2 py-0.5 text-[11px] text-zinc-300">
                      Tempo: {currentExercise.tempo}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Koç Notu & Alternatif Hareket Değiştirme (Swap) */}
          <div className="flex items-start justify-between gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Info className="h-4 w-4 shrink-0" />
                <span>@{creator.username} Koç Notu</span>
              </div>
              <p className="mt-1.5 text-xs text-zinc-200 leading-relaxed">
                {currentExercise.coachNote}
              </p>
            </div>
            <button
              onClick={() => setSwapModalOpen(true)}
              className="flex items-center gap-1 rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white shrink-0"
            >
              <Repeat className="h-3.5 w-3.5 text-neon" />
              <span>Alternatif</span>
            </button>
          </div>
        </div>

        {/* SAĞ: Set Tablosu + Timer */}
        <div className="lg:col-span-6 space-y-4">
          {/* Dinlenme Sayacı */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-lg font-black ${
                  timerRunning
                    ? "bg-neon text-black animate-pulse"
                    : "bg-zinc-900 text-white border border-zinc-800"
                }`}
              >
                {formatTime(timerSeconds)}
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">
                  Dinlenme Sayacı (Rest Timer)
                </div>
                <div className="text-[11px] text-zinc-400">
                  Seti tamamlayınca başlar ({currentExercise.restSeconds}s önerilir)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTimerSeconds((s) => Math.max(0, s - 15))}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-[11px] font-bold text-zinc-300 hover:text-white"
              >
                -15s
              </button>
              <button
                onClick={() => setTimerSeconds((s) => s + 15)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-[11px] font-bold text-zinc-300 hover:text-white"
              >
                +15s
              </button>
              <button
                onClick={() => setTimerRunning((r) => !r)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
              >
                {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(currentExercise.restSeconds);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Set Çizelgesi */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white">
                {currentExercise.orderLabel} · {currentExercise.name}
              </h2>
              <span className="text-xs text-zinc-400">
                Hedef: {currentExercise.reps} tekrar
              </span>
            </div>

            <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-zinc-500 px-2">
              <div className="col-span-2">Set</div>
              <div className="col-span-4">Ağırlık (KG)</div>
              <div className="col-span-3">Tekrar</div>
              <div className="col-span-2">RPE</div>
              <div className="col-span-1 text-right">✓</div>
            </div>

            <div className="space-y-2">
              {(logs[currentExercise.id] || []).map((setRow, sIdx) => (
                <div
                  key={sIdx}
                  className={`rounded-2xl border p-2.5 transition ${
                    setRow.completed
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-zinc-800/90 bg-zinc-900/50"
                  }`}
                >
                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black text-xs font-extrabold text-zinc-300 border border-zinc-800">
                        #{sIdx + 1}
                      </span>
                    </div>

                    <div className="col-span-4">
                      <input
                        type="text"
                        value={setRow.weightKg}
                        onChange={(e) =>
                          updateSetField(currentExercise.id, sIdx, "weightKg", e.target.value)
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-black px-2 py-1 text-center text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-3">
                      <input
                        type="text"
                        value={setRow.repsDone}
                        onChange={(e) =>
                          updateSetField(currentExercise.id, sIdx, "repsDone", e.target.value)
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-black px-2 py-1 text-center text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2">
                      <input
                        type="text"
                        value={setRow.rpe}
                        onChange={(e) =>
                          updateSetField(currentExercise.id, sIdx, "rpe", e.target.value)
                        }
                        placeholder="8"
                        className="w-full rounded-xl border border-zinc-800 bg-black px-1.5 py-1 text-center text-xs text-zinc-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          toggleSetComplete(
                            currentExercise.id,
                            sIdx,
                            currentExercise.restSeconds
                          )
                        }
                        className={`flex h-7 w-7 items-center justify-center rounded-xl transition ${
                          setRow.completed
                            ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/30"
                            : "border border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-indigo-400 hover:text-white"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>

                  {/* Progressive Overload - Önceki Hafta Hafızası */}
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500 px-1 border-t border-zinc-900/60 pt-1">
                    <span>Önceki hafta: {setRow.previousWeekWeight}</span>
                    <span className="text-indigo-400 font-semibold">Hedef: +1 Tekrar</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hareketler Arası Geçiş */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                disabled={activeExerciseIdx === 0}
                onClick={() => setActiveExerciseIdx((i) => Math.max(0, i - 1))}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-300 disabled:opacity-40"
              >
                ← Önceki
              </button>

              {activeExerciseIdx < workout.exercises.length - 1 ? (
                <button
                  onClick={() => {
                    setActiveExerciseIdx((i) => i + 1);
                    setShowVideoEmbed(false);
                  }}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-extrabold text-white hover:bg-indigo-500 transition"
                >
                  Sonraki Harekete Geç ({workout.exercises[activeExerciseIdx + 1].orderLabel}) →
                </button>
              ) : (
                <button
                  onClick={() => setWorkoutFinished(true)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 text-xs font-extrabold text-black"
                >
                  Antrenmanı Tamamla 🏆
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alternatif Hareket Seçim Modalı (Swap) */}
      {swapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">
              Alternatif Hareket Seç (Ekipman Doluysa)
            </h3>
            <p className="text-xs text-zinc-400">
              Aynı kas grubunu hedefleyen koç onaylı alternatiflerden birini seç:
            </p>
            <div className="space-y-2">
              {[
                { name: "Incline Barbell Bench Press", note: "Serbest bar ile üst göğüs" },
                { name: "Smith Machine Incline Press", note: "Maksimum stabilite & güvenlik" },
                { name: "Low-to-High Cable Fly", note: "Kablo istasyonu ile sabit gerilim" },
              ].map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSwapModalOpen(false)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 text-left hover:border-indigo-500 transition"
                >
                  <div className="text-xs font-bold text-white">{alt.name}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{alt.note}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSwapModalOpen(false)}
              className="w-full rounded-xl bg-zinc-800 py-2 text-xs font-bold text-zinc-300"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}

      {/* Kutlama Modalı */}
      {workoutFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neon/20 border border-neon text-neon">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-white">Antrenman Tamamlandı!</h3>
            <p className="text-xs text-zinc-400">
              {workout.title} antrenmanında{" "}
              <strong className="text-white">{completedSets}/{totalSets} set</strong> kaydettin.
            </p>

            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-zinc-900 p-3 text-center">
              <div>
                <div className="text-base font-black text-white">{workout.durationMinutes} dk</div>
                <div className="text-[10px] text-zinc-400">Süre</div>
              </div>
              <div>
                <div className="text-base font-black text-neon">{completedSets} Set</div>
                <div className="text-[10px] text-zinc-400">Tamamlanan</div>
              </div>
              <div>
                <div className="text-base font-black text-amber-400">{workout.caloriesBurn} kcal</div>
                <div className="text-[10px] text-zinc-400">Kalori</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setWorkoutFinished(false)}
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-xs font-bold text-zinc-300"
              >
                Kayıtlara Bak
              </button>
              <Link
                href="/profile"
                className="flex-1 rounded-xl bg-indigo-600 py-3 text-xs font-extrabold text-white"
              >
                Profilime Kaydet
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
