"use client";

import { useState } from "react";
import Link from "next/link";
import { CREATORS, PROGRAMS, REELS } from "@/lib/mock-data";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Heart,
  Play,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  const categories = [
    "Tümü",
    "Hipertrofi",
    "Evde Dambıl",
    "Sculpt Pilates",
    "Hybrid Athlete",
  ];

  const filteredPrograms =
    selectedCategory === "Tümü"
      ? PROGRAMS
      : PROGRAMS.filter(
          (p) =>
            p.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.equipment.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            CREATORS.find((c) => c.username === p.creatorUsername)?.specialties.some(
              (s) => s.toLowerCase().includes(selectedCategory.toLowerCase())
            )
        );

  return (
    <div className="space-y-8 px-4 py-5">
      {/* 1. Instagram Tarzı Üst Antrenör Hikaye / Vitrin Barı */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Öne Çıkan Antrenörler
          </span>
          <Link
            href="/@burakfit"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>Örnek Vitrini Gör (@burakfit)</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CREATORS.map((creator) => (
            <Link
              key={creator.username}
              href={`/@${creator.username}`}
              className="group flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="ig-ring rounded-full p-[3px] transition-transform group-hover:scale-105">
                <div className="rounded-full bg-black p-[2px]">
                  <img
                    src={creator.avatar}
                    alt={creator.fullName}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-xs font-semibold text-zinc-200">
                <span>@{creator.username}</span>
                {creator.verified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-indigo-400" />
                )}
              </div>
              <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                ₺{creator.monthlyPriceTry}/ay
              </span>
            </Link>
          ))}

          {/* Sen de Katıl Kartı */}
          <Link
            href="/studio"
            className="flex flex-col items-center justify-center gap-1.5 shrink-0"
          >
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-dashed border-zinc-700 bg-zinc-900/50 text-indigo-400 hover:border-indigo-500 transition">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-zinc-300">Kanal Aç</span>
            <span className="text-[10px] text-neon font-semibold">0₺ Başlangıç</span>
          </Link>
        </div>
      </section>

      {/* 2. Playbook Tarzı Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 sm:p-8">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Playbook × Instagram Deneyimi Türkiye&apos;de</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Favori Antrenörünün Sistemine Abone Ol.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Her Seti Kaydet.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            PDF veya WhatsApp tablolarına son. Antrenörünün haftalık programlarını aç,
            hareket videolarını izle, dinlenme sayacını başlat ve ağırlıklarını takip et.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/@burakfit"
              className="rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-extrabold text-black hover:bg-zinc-200 transition"
            >
              @burakfit Kanalını İncele
            </Link>
            <Link
              href="/workout/w-upper-power"
              className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/90 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:border-indigo-500 transition"
            >
              <Play className="h-4 w-4 fill-indigo-400 text-indigo-400" />
              <span>Ücretsiz Antrenmanı Başlat</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Kategori Filtreleri & Playbook Program Kartları */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Popüler Antrenman Programları
            </h2>
            <p className="text-xs text-zinc-400">
              Abone olduğun antrenörün tüm programlarına sınırsız erişirsin
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPrograms.map((program) => {
            const creator = CREATORS.find(
              (c) => c.username === program.creatorUsername
            );
            return (
              <div
                key={program.id}
                className="group overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-950 transition hover:border-zinc-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.coverImage}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                      {program.durationWeeks} Hafta · Haftada {program.workoutsPerWeek} Gün
                    </span>
                    <span className="rounded-full bg-indigo-600/90 px-2.5 py-1 text-[10px] font-bold text-white">
                      {program.level}
                    </span>
                  </div>

                  {creator && (
                    <Link
                      href={`/@${creator.username}`}
                      className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md pr-3 pl-1 py-1 border border-white/10 hover:bg-black"
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.fullName}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-white">
                        @{creator.username}
                      </span>
                      <BadgeCheck className="h-3.5 w-3.5 text-indigo-400" />
                    </Link>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white line-clamp-1">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                      {program.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-900 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="h-3.5 w-3.5 text-zinc-500" />
                        {program.equipment}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-zinc-500" />
                        {program.enrolledCount} sporcu
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        {program.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/@${program.creatorUsername}`}
                      className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 py-2.5 text-center text-xs font-bold text-white hover:bg-zinc-800 transition"
                    >
                      Programı İncele
                    </Link>
                    {program.workouts[0] && (
                      <Link
                        href={`/workout/${program.workouts[0].id}`}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>1. Günü Dene</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Instagram Reels Tarzı 9:16 Ücretsiz Teknik İpuçları Akışı */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Reels & Ücretsiz Antrenman Tüyoları
            </h2>
            <p className="text-xs text-zinc-400">
              Antrenörlerin tarzını keşfet, tek tıkla ücretsiz önizleme antrenmanına geç
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REELS.map((reel) => (
            <Link
              key={reel.id}
              href={
                reel.freeWorkoutId
                  ? `/workout/${reel.freeWorkoutId}`
                  : `/@${reel.creatorUsername}`
              }
              className="group relative aspect-[9/15] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <img
                src={reel.coverImage}
                alt={reel.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              <div className="absolute left-2.5 top-2.5 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-neon border border-white/10">
                {reel.tag}
              </div>

              <div className="absolute inset-x-2.5 bottom-2.5 space-y-1.5">
                <div className="text-[11px] font-bold text-indigo-300">
                  @{reel.creatorUsername}
                </div>
                <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {reel.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-zinc-300 pt-1">
                  <span className="flex items-center gap-1">
                    <Play className="h-3 w-3 fill-white" /> {reel.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />{" "}
                    {reel.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
