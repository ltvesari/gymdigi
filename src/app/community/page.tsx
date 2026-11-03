"use client";

import { useState } from "react";
import { CREATORS } from "@/lib/mock-data";
import {
  Send,
  MessageSquare,
  Sparkles,
  Radio,
  ThumbsUp,
  HelpCircle,
  Video,
  User,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "coach";
  text: string;
  time: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"broadcast" | "dm">("broadcast");
  const creator = CREATORS[0]; // @burakfit

  // Canlı Yayın / Duyuru Kanalı Gönderileri (Instagram Broadcast Channel)
  const broadcastPosts = [
    {
      id: "b-1",
      coachName: creator.fullName,
      coachAvatar: creator.avatar,
      title: "🔥 Yeni 4 Haftalık Omuz & Sırt Bloğu Yayında!",
      text: "Selam ekip! 1. gün antrenmanına eklediğim 'Cable Lateral Raise' varyasyonunda dirsek açısına çok dikkat edin. RIR 1-2 seviyesinde tükenişe yakın bırakıyoruz. Sorularınızı DM'den bana gönderebilirsiniz.",
      time: "2 saat önce",
      likesCount: 142,
    },
    {
      id: "b-2",
      coachName: creator.fullName,
      coachAvatar: creator.avatar,
      title: "🎙️ Haftalık Motivasyon & Beslenme Hatırlatması",
      text: "Bu hafta ağırlık artıramadıysanız panik yok; setler arası 90 saniye dinlenmeyi tam uyguladığınızdan ve günlük proteininizi aldığınızdan emin olun. Yarın bacak günü!",
      time: "Dün",
      likesCount: 98,
    },
  ];

  // Birebir DM Form Kontrolü Mesajları
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "coach",
      text: "Selam Ahmet! Estetik Hipertrofi programına hoş geldin. Herhangi bir harekette formundan emin olamazsan video linkini veya sorunu buradan bana yazabilirsin.",
      time: "14:20",
    },
    {
      id: "m-2",
      sender: "user",
      text: "Hocam Incline DB Press'te sehpayı 45 dereceye alınca omzum ağrıyor, 30 dereceye indirmem yeterli olur mu?",
      time: "15:05",
    },
    {
      id: "m-3",
      sender: "coach",
      text: "Kesinlikle! 30 derece klavikular göğüs liflerini çok daha izole çalıştırır ve ön omuza binen aşırı stresi keser. 30 dereceyle devam et.",
      time: "15:10",
    },
  ]);

  const [inputVal, setInputVal] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: "m-" + Date.now(),
      sender: "user",
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Otomatik Koç Yanıt Simülasyonu
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "m-reply-" + Date.now(),
          sender: "coach",
          text: "Harika, kaydettim! Akşam antrenmanından sonra ağırlık artışını grafikten kontrol edeceğim.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-400 border border-pink-500/30">
            <Radio className="h-3.5 w-3.5" />
            <span>Topluluk & Koç İletişimi</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">
            @{creator.username} Kanal Panosu
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Duyuruları takip et, anketlere katıl veya koçuna doğrudan form videosu danış.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("broadcast")}
            className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "broadcast"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
            }`}
          >
            <Radio className="h-4 w-4" />
            <span>Yayın Kanalı</span>
          </button>
          <button
            onClick={() => setActiveTab("dm")}
            className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === "dm"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Birebir Koç DM</span>
          </button>
        </div>
      </div>

      {/* SEKME 1: YAYIN KANALI (BROADCAST CHANNEL) */}
      {activeTab === "broadcast" && (
        <div className="space-y-4">
          {broadcastPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.coachAvatar}
                    alt={post.coachName}
                    className="h-10 w-10 rounded-full object-cover border border-zinc-700"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{post.coachName}</h3>
                    <span className="text-[10px] text-zinc-500">{post.time} paylaşıldı</span>
                  </div>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400">
                  Duyuru
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">{post.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">{post.text}</p>
              </div>

              <div className="flex items-center gap-4 border-t border-zinc-900 pt-3 text-xs text-zinc-400">
                <button className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likesCount} Beğeni</span>
                </button>
                <button
                  onClick={() => setActiveTab("dm")}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Koça Soru Sor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEKME 2: BİREBİR DM & FORM KONTROLÜ */}
      {activeTab === "dm" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 flex flex-col h-[520px]">
          {/* DM Üst Bilgisi */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={creator.avatar}
                alt={creator.fullName}
                className="h-9 w-9 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h3 className="text-xs font-bold text-white">{creator.fullName}</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Abone Özel Danışma Hattı
                </span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500">Ortalama yanıt süresi: ~2 saat</span>
          </div>

          {/* Mesaj Akışı */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => {
              const isMe = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* Mesaj Gönderme Çubuğu */}
          <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2 border-t border-zinc-900 pt-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Antrenörüne bir soru sor veya video linki gönder..."
              className="flex-1 rounded-2xl border border-zinc-800 bg-black px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white hover:bg-indigo-500 transition shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
