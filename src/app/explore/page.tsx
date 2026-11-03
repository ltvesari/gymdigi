"use client";

import { useState } from "react";
import { EXERCISE_DATABASE, LibraryExercise } from "@/lib/exercise-database";
import {
  Search,
  Dumbbell,
  Play,
  Video,
  Filter,
  Flame,
  Info,
  Clock,
  ChevronRight,
  Layers,
} from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("Tümü");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("Tümü");
  const [activeModalExercise, setActiveModalExercise] = useState<LibraryExercise | null>(null);

  const muscleGroups = ["Tümü", "Göğüs", "Sırt", "Omuz", "Biceps", "Triceps", "Bacak", "Core"];
  const equipmentList = ["Tümü", "Dambıl", "Barbell", "Kablo", "Vücut Ağırlığı"];

  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.coachCue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === "Tümü" || ex.targetMuscle === selectedMuscle;
    const matchesEquipment = selectedEquipment === "Tümü" || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Başlık ve Arama */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
            <Layers className="h-3.5 w-3.5" />
            <span>Resmi Egzersiz & Teknik Kütüphanesi</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">
            Egzersiz Rehberi & Doğru Form
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            100+ egzersizin profesyonel teknik videosu, hedef kas grubu ve koç ipuçları.
          </p>
        </div>

        {/* Arama Inputu */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Egzersiz adı veya kas grubu ara (örn: Lateral Raise, Göğüs)..."
            className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-10 pr-4 text-xs font-semibold text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Kas Grubu Filtreleri */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Hedef Kas Grubu
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {muscleGroups.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold shrink-0 transition ${
                  selectedMuscle === m
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Ekipman Filtreleri */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Ekipman Tipi
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {equipmentList.map((eq) => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 transition ${
                  selectedEquipment === eq
                    ? "bg-neon text-black font-extrabold"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Egzersiz Listesi Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            onClick={() => setActiveModalExercise(ex)}
            className="group cursor-pointer rounded-2xl border border-zinc-800/90 bg-zinc-950 p-3.5 transition hover:border-indigo-500/60 hover:bg-zinc-900/40 space-y-3"
          >
            <div className="flex gap-3">
              <div className="relative h-20 w-24 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                <img
                  src={ex.thumbnail}
                  alt={ex.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="h-5 w-5 fill-white text-white drop-shadow" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300 uppercase">
                    {ex.targetMuscle}
                  </span>
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-medium text-zinc-400">
                    {ex.equipment}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white mt-1 truncate group-hover:text-indigo-300 transition">
                  {ex.name}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {ex.coachCue}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-zinc-900 pt-2">
              <span>Tempo: {ex.tempo}</span>
              <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                Videoyu İzle <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video & Detay Modalı */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                  {activeModalExercise.targetMuscle} · {activeModalExercise.equipment}
                </span>
                <h2 className="text-base font-extrabold text-white mt-1">
                  {activeModalExercise.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalExercise(null)}
                className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black">
              <iframe
                src={activeModalExercise.youtubeEmbedUrl}
                title={activeModalExercise.name}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Koç Notu & Tempo */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <Info className="h-4 w-4" />
                <span>Teknik Form & İpucu</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {activeModalExercise.coachCue}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-1 border-t border-indigo-500/20">
                <span>Önerilen Tempo: <strong className="text-white">{activeModalExercise.tempo}</strong></span>
                <span>Dinlenme: <strong className="text-neon">{activeModalExercise.defaultRest} sn</strong></span>
              </div>
            </div>

            <button
              onClick={() => setActiveModalExercise(null)}
              className="w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
