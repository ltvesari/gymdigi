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
    <div className="space-y-8 px-4 py-6">
      {/* 1. Öne Çıkan Antrenörler Hikaye Barı */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-text-secondary">
            Öne Çıkan Antrenörler
          </span>
          <Link
            href="/@burakfit"
            className="flex items-center gap-1 text-xs font-bold text-galactic hover:text-galactic-dark"
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
              <div className="ig-ring rounded-full p-[3px] transition-transform group-hover:scale-105 shadow-xs">
                <div className="rounded-full bg-marshmallow-pure p-[2px]">
                  <img
                    src={creator.avatar}
                    alt={creator.fullName}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-xs font-bold text-text-primary">
                <span>@{creator.username}</span>
                {creator.verified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-galactic" />
                )}
              </div>
              <span className="rounded-full bg-marshmallow-pure border border-marshmallow-border px-2 py-0.5 text-[10px] font-bold text-galactic shadow-xs">
                ₺{creator.monthlyPriceTry}/ay
              </span>
            </Link>
          ))}

          {/* Sen de Katıl Kartı */}
          <Link
            href="/studio-builder"
            className="flex flex-col items-center justify-center gap-1.5 shrink-0"
          >
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-dashed border-galactic/30 bg-galactic/5 text-galactic hover:bg-galactic/10 transition">
              <Sparkles className="h-6 w-6 text-bubblegum" />
            </div>
            <span className="text-xs font-bold text-text-primary">Kanal Aç</span>
            <span className="text-[10px] text-bubblegum font-extrabold">0₺ Başlangıç</span>
          </Link>
        </div>
      </section>

      {/* 2. Hero Banner: Marshmallow Pure zemin, Galactic Violet başlık ve Bubblegum pembe vurgular */}
      <section className="relative overflow-hidden rounded-3xl border border-marshmallow-border bg-marshmallow-pure p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-galactic/10 border border-galactic/20 px-3 py-1 text-xs font-bold text-galactic">
            <Flame className="h-3.5 w-3.5 text-bubblegum" />
            <span>Playbook × Instagram Deneyimi Türkiye&apos;de</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-text-primary leading-tight">
            Favori Antrenörünün Sistemine Abone Ol.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-galactic to-bubblegum">
              Her Seti Kaydet.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            PDF veya WhatsApp tablolarına son. Antrenörünün haftalık programlarını aç,
            dikey videolarını izle, dinlenme sayacını başlat ve ağırlıklarını takip et.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/@burakfit"
              className="rounded-2xl bg-galactic hover:bg-galactic-dark px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-galactic/20 transition"
            >
              @burakfit Kanalını İncele
            </Link>
            <Link
              href="/playbook-feed"
              className="flex items-center gap-2 rounded-2xl border border-marshmallow-border bg-marshmallow-subtle hover:bg-marshmallow-darker px-4 py-3 text-xs sm:text-sm font-bold text-text-primary transition shadow-xs"
            >
              <Play className="h-4 w-4 fill-bubblegum text-bubblegum" />
              <span>Dikey Playbook Akışını Gör</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Kategori Filtreleri & Program Kartları */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-text-primary">
              Popüler Antrenman Programları
            </h2>
            <p className="text-xs text-text-secondary">
              Abone olduğun antrenörün tüm programlarına sınırsız erişirsin
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold shrink-0 transition ${
                selectedCategory === cat
                  ? "bg-galactic text-white shadow-xs"
                  : "bg-marshmallow-pure text-text-secondary border border-marshmallow-border hover:border-galactic"
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
                className="group overflow-hidden rounded-3xl border border-marshmallow-border bg-marshmallow-pure transition hover:shadow-md hover:border-galactic/40"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.coverImage}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                      {program.durationWeeks} Hafta · {program.workoutsPerWeek} Gün
                    </span>
                    <span className="rounded-full bg-bubblegum px-2.5 py-1 text-[10px] font-black text-white">
                      {program.level}
                    </span>
                  </div>

                  {creator && (
                    <Link
                      href={`/@${creator.username}`}
                      className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md pr-3 pl-1 py-1 border border-white shadow-xs hover:bg-white"
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.fullName}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-text-primary">
                        @{creator.username}
                      </span>
                      <BadgeCheck className="h-3.5 w-3.5 text-galactic" />
                    </Link>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-black text-text-primary line-clamp-1 group-hover:text-galactic transition">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                      {program.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-muted border-t border-marshmallow-border pt-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="h-3.5 w-3.5 text-galactic" />
                        {program.equipment}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-galactic" />
                        {program.enrolledCount} sporcu
                      </span>
                      <span className="flex items-center gap-1 text-bubblegum font-bold">
                        <Star className="h-3.5 w-3.5 fill-bubblegum" />
                        {program.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="flex-1 rounded-xl bg-marshmallow-subtle border border-marshmallow-border py-2.5 text-center text-xs font-bold text-text-primary hover:bg-marshmallow-darker transition"
                    >
                      Takvimi İncele
                    </Link>
                    <Link
                      href="/playbook-feed"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-galactic hover:bg-galactic-dark px-3.5 py-2.5 text-xs font-bold text-white transition shadow-xs"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Başlat</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Reels & Kısa Tüyolar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-text-primary">
              Reels & Ücretsiz Antrenman Tüyoları
            </h2>
            <p className="text-xs text-text-secondary">
              Dikey formatta antrenör tüyolarını izle
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REELS.map((reel) => (
            <Link
              key={reel.id}
              href="/reels"
              className="group relative aspect-[9/15] overflow-hidden rounded-2xl border border-marshmallow-border bg-white shadow-xs"
            >
              <img
                src={reel.coverImage}
                alt={reel.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute left-2.5 top-2.5 rounded-full bg-bubblegum px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
                {reel.tag}
              </div>

              <div className="absolute inset-x-2.5 bottom-2.5 space-y-1.5">
                <div className="text-[11px] font-bold text-bubblegum-light">
                  @{reel.creatorUsername}
                </div>
                <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {reel.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-zinc-200 pt-1">
                  <span className="flex items-center gap-1">
                    <Play className="h-3 w-3 fill-white" /> {reel.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-bubblegum text-bubblegum" />{" "}
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
