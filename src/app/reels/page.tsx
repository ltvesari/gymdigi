"use client";

import { useState } from "react";
import Link from "next/link";
import { REELS, CREATORS } from "@/lib/mock-data";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Play,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Sparkles,
} from "lucide-react";

export default function ReelsFeedPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(true);

  const reel = REELS[currentIdx] || REELS[0];
  const creator = CREATORS.find((c) => c.username === reel.creatorUsername) || CREATORS[0];

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string) => {
    setSavedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex justify-center py-2 sm:py-6">
      <div className="relative w-full max-w-sm sm:rounded-3xl overflow-hidden border border-zinc-800 bg-black aspect-[9/16] shadow-2xl flex flex-col justify-between">
        {/* Video Arka Planı & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={reel.coverImage}
            alt={reel.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        </div>

        {/* Üst Bar: Başlık & Ses Aç/Kapa */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white tracking-wide">REELS</span>
            <span className="rounded-full bg-neon/20 px-2 py-0.5 text-[10px] font-extrabold text-neon">
              {reel.tag}
            </span>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full bg-black/60 backdrop-blur-md p-2 text-white"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Sağ Taraf Instagram Etkileşim Butonları */}
        <div className="relative z-10 self-end mr-3 flex flex-col items-center gap-4 mb-20">
          <button
            onClick={() => toggleLike(reel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition ${
              likedMap[reel.id] ? "bg-pink-600/30 text-pink-500" : "bg-black/50 text-white"
            }`}>
              <Heart className={`h-6 w-6 ${likedMap[reel.id] ? "fill-pink-500" : ""}`} />
            </div>
            <span className="text-[11px] font-bold text-white shadow-black drop-shadow-md">
              {likedMap[reel.id] ? reel.likes + 1 : reel.likes}
            </span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold text-white">48</span>
          </button>

          <button
            onClick={() => toggleSave(reel.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition ${
              savedMap[reel.id] ? "bg-amber-500/30 text-amber-400" : "bg-black/50 text-white"
            }`}>
              <Bookmark className={`h-6 w-6 ${savedMap[reel.id] ? "fill-amber-400" : ""}`} />
            </div>
            <span className="text-[11px] font-bold text-white">Kaydet</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white">
              <Share2 className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold text-white">Paylaş</span>
          </button>
        </div>

        {/* Alt Bilgi & Antrenman Kancası */}
        <div className="relative z-10 p-4 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          {/* Antrenör Başlığı */}
          <Link
            href={`/@${creator.username}`}
            className="flex items-center gap-2.5 group"
          >
            <div className="ig-ring rounded-full p-0.5">
              <img
                src={creator.avatar}
                alt={creator.fullName}
                className="h-9 w-9 rounded-full object-cover border-2 border-black"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white group-hover:underline">
                  @{creator.username}
                </span>
                <span className="rounded bg-indigo-500/30 px-1.5 py-0.2 text-[9px] font-bold text-indigo-300">
                  KOÇ
                </span>
              </div>
              <p className="text-[10px] text-zinc-300">{creator.title}</p>
            </div>
          </Link>

          {/* Açıklama */}
          <div>
            <h3 className="text-xs font-bold text-white leading-snug">{reel.title}</h3>
            <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">{reel.caption}</p>
          </div>

          {/* Antrenmana Geç Kancası (Call to Action) */}
          {reel.freeWorkoutId && (
            <Link
              href={`/workout/${reel.freeWorkoutId}`}
              className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition"
            >
              <span className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>Bu Hareketin Tam Antrenmanını Aç</span>
              </span>
              <span className="rounded-full bg-neon text-black text-[9px] font-black px-2 py-0.5">
                ÜCRETSİZ
              </span>
            </Link>
          )}

          {/* Önceki / Sonraki Reels Geçiş Çubuğu */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="flex items-center gap-1 disabled:opacity-30 hover:text-white"
            >
              <ChevronUp className="h-4 w-4" /> Önceki
            </button>
            <span className="text-[10px] text-zinc-500 font-bold">
              {currentIdx + 1} / {REELS.length}
            </span>
            <button
              disabled={currentIdx === REELS.length - 1}
              onClick={() => setCurrentIdx((i) => Math.min(REELS.length - 1, i + 1))}
              className="flex items-center gap-1 disabled:opacity-30 hover:text-white"
            >
              Sonraki <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
