"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Smartphone,
  Eye,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";

interface SubSectionForm {
  id: string;
  subTitle: string;
  badge: string;
  items: {
    id: string;
    itemTitle: string;
    mediaType: "video" | "image" | "none";
    mediaUrl: string;
    description: string;
    hasSets: boolean;
    sets: number;
    reps: string;
    restSeconds: number;
  }[];
}

export default function MobileCreatorStudioPage() {
  const [dayNumber, setDayNumber] = useState(1);
  const [dayLabel, setDayLabel] = useState("Gün 1 (Pazartesi)");
  const [mainTitle, setMainTitle] = useState("İtiş Günü: Üst Göğüs & Yan Omuz");
  const [coachNote, setCoachNote] = useState("Bugün sehpayı 30 dereceye al, alt noktada 1 saniye esnemeyi hisset.");

  const [sections, setSections] = useState<SubSectionForm[]>([
    {
      id: "sec-1",
      subTitle: "Isınma (Warm-Up)",
      badge: "5 Dakika",
      items: [
        {
          id: "item-1",
          itemTitle: "Bantla Dış Omuz Rotasyonu",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
          description: "Direnç bandını gövdeye yapıştır, dışa doğru 15 yavaş tekrar yap. Omuz eklemini hazırla.",
          hasSets: false,
          sets: 2,
          reps: "15 Tekrar",
          restSeconds: 30,
        },
      ],
    },
    {
      id: "sec-2",
      subTitle: "Ana İtiş Bloğu",
      badge: "A1/B1 Süperset",
      items: [
        {
          id: "item-2",
          itemTitle: "Incline Dumbbell Press (30°)",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80",
          description: "Dikey telefon çekimi: Dirsekleri 45 derece açıda tut, tepe noktada göğsü sık.",
          hasSets: true,
          sets: 4,
          reps: "8-10 Tekrar",
          restSeconds: 90,
        },
      ],
    },
  ]);

  const [savedBanner, setSavedBanner] = useState(false);

  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSection: SubSectionForm = {
      id: "sec-" + Date.now(),
      subTitle: "Yeni Alt Başlık (Örn: Soğuma & Esneme)",
      badge: "İsteğe Bağlı",
      items: [
        {
          id: "item-" + Date.now(),
          itemTitle: "Yeni Hareket veya Isınma",
          mediaType: "video",
          mediaUrl: "",
          description: "Hareket açıklaması veya teknik ipucu...",
          hasSets: true,
          sets: 3,
          reps: "10 Tekrar",
          restSeconds: 60,
        },
      ],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const handleAddItem = (e: React.MouseEvent, sIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items.push({
        id: "item-" + Date.now(),
        itemTitle: "Yeni Egzersiz / Bilgi",
        mediaType: "video",
        mediaUrl: "",
        description: "Teknik kural veya tüyo yazısı...",
        hasSets: true,
        sets: 3,
        reps: "10-12 Tekrar",
        restSeconds: 60,
      });
      return copy;
    });
  };

  const handleToggleHasSets = (sIdx: number, iIdx: number) => {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items[iIdx].hasSets = !copy[sIdx].items[iIdx].hasSets;
      return copy;
    });
  };

  const handleRemoveItem = (e: React.MouseEvent, sIdx: number, iIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items.splice(iIdx, 1);
      return copy;
    });
  };

  const handleRemoveSection = (e: React.MouseEvent, sIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSections((prev) => prev.filter((_, idx) => idx !== sIdx));
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto space-y-6">
      {/* Üst Başlık: Marshmallow Pure zemin + Galactic Violet başlık */}
      <div className="rounded-3xl border border-marshmallow-border bg-marshmallow-pure p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-bubblegum/15 px-3 py-1 text-xs font-bold text-bubblegum border border-bubblegum/25">
            <Smartphone className="h-3.5 w-3.5" />
            <span>Telefon Uyumlu Playbook Stüdyosu</span>
          </div>
          <Link
            href="/playbook-feed"
            className="flex items-center gap-1 rounded-xl bg-galactic hover:bg-galactic-dark px-3 py-1.5 text-xs font-bold text-white transition shadow-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Önizle</span>
          </Link>
        </div>

        <h1 className="text-xl font-black text-text-primary">
          Dikey Video & Günlük Antrenman Editörü
        </h1>
        <p className="text-xs text-text-secondary leading-relaxed">
          Gün, Ana Başlık, Isınma ve Egzersiz alt başlıklarıyla telefonla çektiğiniz videoları yükleyin. Set/tekrar kutucuklarını isteğe bağlı açıp kapatabilirsiniz.
        </p>
      </div>

      {/* 1. GÜN VE ANA BAŞLIK AYARLARI */}
      <div className="rounded-3xl border border-marshmallow-border bg-marshmallow-pure p-5 space-y-4 shadow-xs">
        <div className="text-xs font-black uppercase tracking-wider text-galactic">
          1. Gün ve Ana Başlık
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <label className="block text-[11px] font-bold text-text-secondary mb-1">Gün No</label>
            <input
              type="text"
              value={dayLabel}
              onChange={(e) => setDayLabel(e.target.value)}
              placeholder="Gün 1"
              className="w-full rounded-xl border border-marshmallow-border bg-marshmallow-subtle px-3 py-2 text-xs font-bold text-text-primary focus:border-galactic focus:bg-white focus:outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] font-bold text-text-secondary mb-1">Ana Başlık</label>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              placeholder="Örn: İtiş Günü (Göğüs & Omuz)"
              className="w-full rounded-xl border border-marshmallow-border bg-marshmallow-subtle px-3 py-2 text-xs font-bold text-text-primary focus:border-galactic focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-text-secondary mb-1">
            Antrenör Notu / Günün Özeti (Yazı)
          </label>
          <textarea
            rows={2}
            value={coachNote}
            onChange={(e) => setCoachNote(e.target.value)}
            placeholder="Bugün sporcularına iletmek istediğin motivasyon veya teknik kural..."
            className="w-full rounded-xl border border-marshmallow-border bg-marshmallow-subtle p-3 text-xs text-text-primary placeholder-text-muted focus:border-galactic focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* 2. ALT BAŞLIKLAR VE DİKEY İÇERİK BLOKLARI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-text-primary">
            2. Alt Başlıklar (Isınma, Ana Blok, Finisher)
          </span>
          <button
            type="button"
            onClick={handleAddSection}
            className="flex items-center gap-1 rounded-xl bg-galactic hover:bg-galactic-dark px-3.5 py-1.5 text-xs font-black text-white transition active:scale-95 shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>Alt Başlık Ekle</span>
          </button>
        </div>

        {sections.map((section, sIdx) => (
          <div
            key={section.id}
            className="rounded-3xl border border-marshmallow-border bg-marshmallow-pure p-4 space-y-4 shadow-xs"
          >
            {/* Alt Başlık Düzenleyici & Silme */}
            <div className="flex items-center gap-2 border-b border-marshmallow-border pb-3">
              <input
                type="text"
                value={section.subTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  setSections((prev) => {
                    const copy = [...prev];
                    copy[sIdx].subTitle = val;
                    return copy;
                  });
                }}
                className="flex-1 rounded-xl border border-marshmallow-border bg-marshmallow-subtle px-3 py-1.5 text-xs font-extrabold text-text-primary focus:border-galactic focus:bg-white focus:outline-none"
              />
              <input
                type="text"
                value={section.badge}
                onChange={(e) => {
                  const val = e.target.value;
                  setSections((prev) => {
                    const copy = [...prev];
                    copy[sIdx].badge = val;
                    return copy;
                  });
                }}
                placeholder="Örn: 5 Dk"
                className="w-20 rounded-xl border border-marshmallow-border bg-marshmallow-subtle px-2 py-1.5 text-center text-xs text-text-secondary focus:border-galactic focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={(e) => handleRemoveSection(e, sIdx)}
                className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* İçerik Kartları */}
            <div className="space-y-3">
              {section.items.map((item, iIdx) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-marshmallow-border bg-marshmallow-subtle p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={item.itemTitle}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSections((prev) => {
                          const copy = [...prev];
                          copy[sIdx].items[iIdx].itemTitle = val;
                          return copy;
                        });
                      }}
                      placeholder="Hareket Adı (örn: Incline DB Press veya Isınma)"
                      className="flex-1 rounded-lg border border-marshmallow-border bg-white px-3 py-1 text-xs font-bold text-text-primary mr-2 focus:border-galactic focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleRemoveItem(e, sIdx, iIdx)}
                      className="rounded-lg p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Medya Tipi Seçimi */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-text-muted mb-1 font-bold">Medya Tipi</label>
                      <select
                        value={item.mediaType}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setSections((prev) => {
                            const copy = [...prev];
                            copy[sIdx].items[iIdx].mediaType = val;
                            return copy;
                          });
                        }}
                        className="w-full rounded-lg border border-marshmallow-border bg-white px-2 py-1.5 text-xs text-text-primary"
                      >
                        <option value="video">Dikey Video (9:16)</option>
                        <option value="image">Teknik Fotoğraf</option>
                        <option value="none">Sadece Yazı Notu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-text-muted mb-1 font-bold">Video / Fotoğraf Linki</label>
                      <input
                        type="text"
                        value={item.mediaUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSections((prev) => {
                            const copy = [...prev];
                            copy[sIdx].items[iIdx].mediaUrl = val;
                            return copy;
                          });
                        }}
                        placeholder="YouTube veya görsel URL'si"
                        className="w-full rounded-lg border border-marshmallow-border bg-white px-2.5 py-1.5 text-xs text-text-primary focus:border-galactic focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Alt Yazı & Açıklama */}
                  <div>
                    <label className="block text-[10px] text-text-muted mb-1 font-bold">
                      Alt Yazı / Koç İpucu Metni
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSections((prev) => {
                          const copy = [...prev];
                          copy[sIdx].items[iIdx].description = val;
                          return copy;
                        });
                      }}
                      placeholder="Bu hareketin altındaki detaylı yazı ve form kuralı..."
                      className="w-full rounded-xl border border-marshmallow-border bg-white p-2.5 text-xs text-text-primary focus:border-galactic focus:outline-none"
                    />
                  </div>

                  {/* SET / TEKRAR TOGGLE (DISABLE / ENABLE) */}
                  <div className="border-t border-marshmallow-border pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleToggleHasSets(sIdx, iIdx)}
                      className="flex items-center gap-2 text-xs font-bold text-text-primary hover:text-galactic cursor-pointer"
                    >
                      {item.hasSets ? (
                        <CheckSquare className="h-4 w-4 text-bubblegum" />
                      ) : (
                        <Square className="h-4 w-4 text-text-muted" />
                      )}
                      <span>Set, Tekrar ve Dinlenme Takibi Ekle</span>
                      {!item.hasSets && (
                        <span className="text-[10px] text-text-muted font-normal">
                          (Kapalı: Sadece video ve açıklama)
                        </span>
                      )}
                    </button>

                    {item.hasSets ? (
                      <div className="flex items-center gap-2 pt-1 bg-white p-2.5 rounded-xl border border-marshmallow-border">
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <span>Set:</span>
                          <input
                            type="number"
                            value={item.sets}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSections((prev) => {
                                const copy = [...prev];
                                copy[sIdx].items[iIdx].sets = val;
                                return copy;
                              });
                            }}
                            className="w-12 rounded-lg border border-marshmallow-border bg-marshmallow-subtle py-1 text-center text-xs text-text-primary font-bold"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <span>Tekrar:</span>
                          <input
                            type="text"
                            value={item.reps}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSections((prev) => {
                                const copy = [...prev];
                                copy[sIdx].items[iIdx].reps = val;
                                return copy;
                              });
                            }}
                            className="w-20 rounded-lg border border-marshmallow-border bg-marshmallow-subtle py-1 text-center text-xs text-text-primary"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <span>Dinlenme:</span>
                          <input
                            type="number"
                            value={item.restSeconds}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSections((prev) => {
                                const copy = [...prev];
                                copy[sIdx].items[iIdx].restSeconds = val;
                                return copy;
                              });
                            }}
                            className="w-14 rounded-lg border border-marshmallow-border bg-marshmallow-subtle py-1 text-center text-xs text-text-primary"
                          />
                          <span className="text-[10px]">sn</span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-marshmallow-pure border border-marshmallow-border px-3 py-2 text-[11px] text-text-muted italic">
                        Set kutucukları kapalı. Sporcu sadece videoyu izleyip açıklamayı okuyacaktır.
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={(e) => handleAddItem(e, sIdx)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-galactic/30 bg-galactic/5 py-3 text-xs font-bold text-galactic hover:bg-galactic/10 transition cursor-pointer active:scale-98"
              >
                <Plus className="h-4 w-4" />
                <span>Bu Alt Başlığa Dikey Video/Fotoğraf & Yazı Ekle</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. YAYINLA BUTONU */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={() => {
            setSavedBanner(true);
            setTimeout(() => setSavedBanner(false), 3000);
          }}
          className="w-full rounded-2xl bg-gradient-to-r from-galactic to-bubblegum py-3.5 text-xs font-black text-white shadow-md shadow-galactic/20 hover:opacity-95 transition cursor-pointer"
        >
          {dayLabel} Antrenmanını Playbook Formatında Yayınla
        </button>

        {savedBanner && (
          <div className="rounded-2xl border border-galactic/30 bg-galactic/10 p-3.5 text-xs font-bold text-galactic text-center">
            ✓ Antrenman başarıyla kaydedildi! Sporcularınız bu günü dikey videolar ve altındaki açıklamalarla görüntüleyebilir.
          </div>
        )}
      </div>
    </div>
  );
}
