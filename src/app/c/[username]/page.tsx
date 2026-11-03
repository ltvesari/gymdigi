"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CREATORS,
  PROGRAMS,
  REELS,
  StoryHighlight,
} from "@/lib/mock-data";
import SubscribeModal from "@/components/SubscribeModal";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Grid,
  Lock,
  MapPin,
  Play,
  PlaySquare,
  Share2,
  Sparkles,
  Star,
  Unlock,
  X,
} from "lucide-react";

export default function CreatorProfilePage() {
  const params = useParams<{ username: string }>();
  const rawUsername = (params?.username || "burakfit").replace(/^@/, "");

  const creator =
    CREATORS.find((c) => c.username === rawUsername) || CREATORS[0];
  const creatorPrograms = PROGRAMS.filter(
    (p) => p.creatorUsername === creator.username
  );
  const creatorReels = REELS.filter(
    (r) => r.creatorUsername === creator.username
  );
  const allWorkouts = creatorPrograms.flatMap((p) =>
    p.workouts.map((w) => ({ ...w, programTitle: p.title }))
  );

  const [activeTab, setActiveTab] = useState<"programs" | "workouts" | "reels">(
    "programs"
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<StoryHighlight | null>(
    null
  );
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(`gymdigi_sub_${creator.username}`);
    if (status === "active") {
      setIsSubscribed(true);
    }
  }, [creator.username]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pb-12">
      {/* Kapak Görseli */}
      <div className="relative h-36 sm:h-48 w-full overflow-hidden">
        <img
          src={creator.coverBanner}
          alt={creator.fullName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Instagram × Playbook Profil Üst Alanı */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Avatar + İsim */}
          <div className="flex items-end gap-4">
            <div className="ig-ring rounded-full p-1 shadow-xl">
              <img
                src={creator.avatar}
                alt={creator.fullName}
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-black"
              />
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {creator.fullName}
                </h1>
                {creator.verified && (
                  <BadgeCheck className="h-5 w-5 text-indigo-400 shrink-0" />
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium text-zinc-400">
                @{creator.username} · {creator.title}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  {creator.location}
                </span>
                <span className="text-indigo-400 font-medium">
                  IG: {creator.instagramHandle}
                </span>
              </div>
            </div>
          </div>

          {/* Instagram Tarzı Sayaçlar */}
          <div className="grid grid-cols-4 gap-2 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 px-4 py-2.5 text-center">
            <div>
              <div className="text-base font-extrabold text-white">
                {creator.stats.programs}
              </div>
              <div className="text-[11px] text-zinc-400">Program</div>
            </div>
            <div>
              <div className="text-base font-extrabold text-white">
                {creator.stats.workouts}
              </div>
              <div className="text-[11px] text-zinc-400">Antrenman</div>
            </div>
            <div>
              <div className="text-base font-extrabold text-white">
                {creator.stats.subscribers}
              </div>
              <div className="text-[11px] text-zinc-400">Abone</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-0.5 text-base font-extrabold text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                {creator.stats.rating}
              </div>
              <div className="text-[11px] text-zinc-400">Puan</div>
            </div>
          </div>
        </div>

        {/* Bio & Etiketler */}
        <p className="mt-4 max-w-2xl text-xs sm:text-sm text-zinc-200 leading-relaxed">
          {creator.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {creator.specialties.map((spec) => (
            <span
              key={spec}
              className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-300"
            >
              #{spec}
            </span>
          ))}
        </div>

        {/* Ana Aksiyon Butonları (Abone Ol + Ücretsiz Antrenman + Paylaş) */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {isSubscribed ? (
            <div className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>Aktif Abonesin (Tüm İçerikler Açık)</span>
            </div>
          ) : (
            <button
              onClick={() => setSubModalOpen(true)}
              className="flex-1 sm:flex-initial rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition"
            >
              Kanalıma Abone Ol — ₺{creator.monthlyPriceTry}/ay
            </button>
          )}

          {allWorkouts[0] && (
            <Link
              href={`/workout/${allWorkouts[0].id}`}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:border-indigo-500 transition"
            >
              <Play className="h-4 w-4 fill-neon text-neon" />
              <span>Ücretsiz Önizleme Antrenmanı</span>
            </Link>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-2xl border border-zinc-800 bg-zinc-900 px-3.5 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            <span>{copiedLink ? "Link Kopyalandı!" : "Profili Paylaş"}</span>
          </button>
        </div>

        {/* Instagram Tarzı Öne Çıkan Hikayeler (Story Highlights) */}
        {creator.highlights.length > 0 && (
          <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {creator.highlights.map((hl) => (
              <button
                key={hl.id}
                onClick={() => setActiveHighlight(hl)}
                className="group flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="rounded-full border-2 border-zinc-700 p-0.5 group-hover:border-indigo-400 transition">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <img
                      src={hl.coverImage}
                      alt={hl.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-lg">
                      {hl.emoji}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-zinc-300">
                  {hl.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Instagram × Playbook 3 Sekmeli İçerik Navigasyonu */}
        <div className="mt-6 grid grid-cols-3 border-b border-zinc-800 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab("programs")}
            className={`flex items-center justify-center gap-2 border-b-2 py-3 transition ${
              activeTab === "programs"
                ? "border-indigo-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Dumbbell className="h-4 w-4" />
            <span>Programlar ({creatorPrograms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("workouts")}
            className={`flex items-center justify-center gap-2 border-b-2 py-3 transition ${
              activeTab === "workouts"
                ? "border-indigo-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Flame className="h-4 w-4" />
            <span>Günlük Antrenmanlar ({allWorkouts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center justify-center gap-2 border-b-2 py-3 transition ${
              activeTab === "reels"
                ? "border-indigo-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Reels & Tüyolar ({creatorReels.length})</span>
          </button>
        </div>

        {/* SEKME 1: PROGRAMLAR (Playbook Yapılandırılmış Program Kartları) */}
        {activeTab === "programs" && (
          <div className="mt-5 space-y-5">
            {creatorPrograms.map((program) => (
              <div
                key={program.id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
              >
                <div className="grid md:grid-cols-5">
                  <div className="relative h-52 md:h-auto md:col-span-2">
                    <img
                      src={program.coverImage}
                      alt={program.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                    <div className="absolute left-3 top-3 flex gap-1.5">
                      <span className="rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-bold text-white">
                        {program.durationWeeks} Hafta
                      </span>
                      <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white">
                        {program.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:col-span-3 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-white">
                        {program.title}
                      </h2>
                      <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Hafta 1 Antrenman Listesi */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        1. Hafta Antrenman Planı
                      </div>
                      {program.workouts.map((workout) => {
                        const unlocked = workout.isFreePreview || isSubscribed;
                        return (
                          <div
                            key={workout.id}
                            className="flex items-center justify-between rounded-2xl border border-zinc-800/90 bg-zinc-900/60 px-3.5 py-2.5"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-extrabold ${
                                  unlocked
                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    : "bg-zinc-800 text-zinc-500"
                                }`}
                              >
                                G{workout.dayNumber}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white">
                                    {workout.title}
                                  </span>
                                  {workout.isFreePreview && !isSubscribed && (
                                    <span className="rounded bg-neon/20 px-1.5 py-0.5 text-[10px] font-extrabold text-neon">
                                      ÜCRETSİZ DENE
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-zinc-400">
                                  {workout.focusArea} · {workout.durationMinutes} dk ·{" "}
                                  {workout.exercises.length} Hareket
                                </div>
                              </div>
                            </div>

                            {unlocked ? (
                              <Link
                                href={`/workout/${workout.id}`}
                                className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition shrink-0"
                              >
                                <Play className="h-3 w-3 fill-white" />
                                <span>Başlat</span>
                              </Link>
                            ) : (
                              <button
                                onClick={() => setSubModalOpen(true)}
                                className="flex items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-indigo-500 hover:text-white shrink-0"
                              >
                                <Lock className="h-3 w-3 text-amber-400" />
                                <span>Kilidi Aç</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SEKME 2: GÜNLÜK ANTRENMANLAR */}
        {activeTab === "workouts" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {allWorkouts.map((w) => {
              const unlocked = w.isFreePreview || isSubscribed;
              return (
                <div
                  key={w.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-indigo-400">
                        {w.programTitle}
                      </span>
                      <h3 className="mt-0.5 text-sm font-bold text-white">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400">
                        {w.focusArea} · {w.durationMinutes} dk · ~{w.caloriesBurn} kcal
                      </p>
                    </div>
                    {unlocked ? (
                      <Unlock className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                  </div>

                  {unlocked ? (
                    <Link
                      href={`/workout/${w.id}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Antrenmanı Aç</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSubModalOpen(true)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-zinc-300 hover:border-indigo-500"
                    >
                      <Lock className="h-3.5 w-3.5 text-amber-400" />
                      <span>Abone Ol & Kilidi Aç (₺{creator.monthlyPriceTry}/ay)</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SEKME 3: REELS 9:16 IZGARASI (Instagram Grid) */}
        {activeTab === "reels" && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {creatorReels.map((reel) => (
              <Link
                key={reel.id}
                href={
                  reel.freeWorkoutId
                    ? `/workout/${reel.freeWorkoutId}`
                    : `/workout/w-upper-power`
                }
                className="group relative aspect-[9/15] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              >
                <img
                  src={reel.coverImage}
                  alt={reel.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 space-y-1">
                  <span className="rounded bg-neon px-1.5 py-0.5 text-[10px] font-extrabold text-black">
                    {reel.tag}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2">
                    {reel.title}
                  </p>
                  <p className="text-[11px] text-zinc-300">{reel.views} izlenme</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Story Highlight Modal */}
      {activeHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-pink-500" />
            </div>
            <button
              onClick={() => setActiveHighlight(null)}
              className="absolute right-4 top-6 rounded-full bg-zinc-900 p-1.5 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{activeHighlight.emoji}</span>
              <div>
                <div className="text-sm font-bold text-white">
                  {activeHighlight.title}
                </div>
                <div className="text-[11px] text-zinc-400">
                  @{creator.username} Öne Çıkan Hikaye
                </div>
              </div>
            </div>

            {activeHighlight.slides.map((slide, idx) => (
              <div key={idx} className="mt-5 space-y-3">
                <h3 className="text-lg font-extrabold text-white">
                  {slide.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {slide.text}
                </p>
                {slide.metric && (
                  <div className="rounded-xl bg-indigo-500/15 border border-indigo-500/30 px-3.5 py-2 text-xs font-bold text-indigo-300">
                    {slide.metric}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => {
                setActiveHighlight(null);
                setSubModalOpen(true);
              }}
              className="mt-6 w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500"
            >
              Bu Sisteme Katıl — ₺{creator.monthlyPriceTry}/ay
            </button>
          </div>
        </div>
      )}

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
