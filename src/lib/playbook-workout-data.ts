export interface PlaybookBlockItem {
  id: string;
  orderIndex: number;
  type: "exercise" | "warmup" | "cooldown" | "text_note";
  title: string; // Örn: "Incline DB Press", "Omuz Rotator Aktivasyonu", "Günün Beslenme Notu"
  mediaType: "video" | "image" | "none";
  mediaUrl: string; // Dikey 9:16 video embed veya fotoğraf URL
  mediaAspect: "9:16" | "16:9" | "1:1";
  description: string; // Altındaki açıklama yazısı / form ipucu
  // Egzersiz ise set bilgileri
  sets?: number;
  reps?: string;
  restSeconds?: number;
  tempo?: string;
}

export interface PlaybookSubSection {
  id: string;
  title: string; // Örn: "Isınma (Warm-Up)", "Ana İtiş Bloğu", "Finisher & Karın", "Soğuma (Cool-Down)"
  badge?: string; // Örn: "5 Dakika", "Süperset A1/A2", "İsteğe Bağlı"
  items: PlaybookBlockItem[];
}

export interface PlaybookDayWorkout {
  id: string;
  dayNumber: number; // Gün 1, Gün 2 vb.
  dayLabel: string; // "Pazartesi" veya "Gün 1"
  mainTitle: string; // "İtiş Günü: Üst Göğüs & Yan Omuz Odaklı"
  subtitle: string; // "Mekanik gerilim ve hipertrofi için RPE 8-9 yoğunluk protokolü"
  durationMinutes: number;
  caloriesBurn: number;
  coverImage: string;
  isFreePreview: boolean;
  coachIntroNote: string; // Antrenörün o güne özel ses/yazı mesajı
  sections: PlaybookSubSection[];
}

export const SAMPLE_PLAYBOOK_DAY: PlaybookDayWorkout = {
  id: "pb-day-1",
  dayNumber: 1,
  dayLabel: "Gün 1",
  mainTitle: "İtiş Günü: Göğüs, Ön/Yan Omuz & Triceps",
  subtitle: "Klavikular göğüs liflerini hedefleyen, yüksek mekanik gerilimli hipertrofi seansı.",
  durationMinutes: 48,
  caloriesBurn: 420,
  coverImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=80",
  isFreePreview: true,
  coachIntroNote:
    "Bugün antrenmana başlamadan önce omuz kapsülünü ısıtmayı atlama. Ana pres hareketinde sehpa açısını 30 derecede sabitle. Her sette son tekrarda tükenişe 1 tekrar kala (RIR 1) bırakıyoruz. Başarılar!",
  sections: [
    {
      id: "sec-warmup",
      title: "Isınma & Aktivasyon (Warm-Up)",
      badge: "5-7 Dakika",
      items: [
        {
          id: "w-1",
          orderIndex: 1,
          type: "warmup",
          title: "Bantla Dış Rotasyon & Omuz Açışı",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
          mediaAspect: "9:16",
          description:
            "Hafif bir direnç bandını iki elinle tut, dirseklerini gövdeye yapıştır ve dışa doğru 15 tekrar aç. Omuz eklemini ısıtıp sakatlığı sıfıra indiriyoruz.",
          sets: 2,
          reps: "15 Tekrar",
          restSeconds: 30,
        },
        {
          id: "w-2",
          orderIndex: 2,
          type: "warmup",
          title: "Scapular Push-Up (Kürek Kemiği Aktivasyonu)",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&auto=format&fit=crop&q=80",
          mediaAspect: "9:16",
          description:
            "Şınav pozisyonuna geç, kollarını bükmeden sadece kürek kemiklerini birbirine yaklaştır ve uzaklaştır. 12 yavaş tekrar.",
          sets: 2,
          reps: "12 Tekrar",
          restSeconds: 30,
        },
      ],
    },
    {
      id: "sec-main",
      title: "Ana İtiş Bloğu (Mekanik Gerilim)",
      badge: "A1/B1 Süperset",
      items: [
        {
          id: "m-1",
          orderIndex: 1,
          type: "exercise",
          title: "Incline Dumbbell Press (30° Eğim)",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80",
          mediaAspect: "9:16",
          description:
            "Dambılları göğsünün üst kısmına kontrollü indir, alt noktada 1 saniye esnemeyi hisset. Yukarı patlayıcı basarken dirsekleri tam kitleme.",
          sets: 4,
          reps: "8-10 Tekrar",
          restSeconds: 90,
          tempo: "3-1-1-0",
        },
        {
          id: "m-2",
          orderIndex: 2,
          type: "exercise",
          title: "Cable Lateral Raise (Dikey Çekim)",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
          mediaAspect: "9:16",
          description:
            "Kabloyu kalça/bilek hizasında tut. Trapezleri kasmadan dirseğini yana doğru fırlatır gibi kaldır. Tepe noktada 1 saniye bekle.",
          sets: 4,
          reps: "12-15 Tekrar",
          restSeconds: 60,
          tempo: "2-0-1-1",
        },
      ],
    },
    {
      id: "sec-finisher",
      title: "Finisher & Triceps İzolasyonu",
      badge: "Tükeniş",
      items: [
        {
          id: "f-1",
          orderIndex: 1,
          type: "exercise",
          title: "Overhead Rope Triceps Extension",
          mediaType: "video",
          mediaUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80",
          mediaAspect: "9:16",
          description:
            "Dirsekleri kulak hizasında sabitle. Halatın uçlarını tepe noktada dışa doğru ayırarak uzun başı tam sık.",
          sets: 3,
          reps: "12-15 Tekrar",
          restSeconds: 60,
          tempo: "2-1-1-0",
        },
      ],
    },
    {
      id: "sec-cooldown",
      title: "Soğuma & Antrenör Kapanış Notu",
      badge: "3 Dakika",
      items: [
        {
          id: "c-1",
          orderIndex: 1,
          type: "text_note",
          title: "Günün Toparlanma & Beslenme Protokolü",
          mediaType: "none",
          mediaUrl: "",
          mediaAspect: "9:16",
          description:
            "Tebrikler, itiş gününü tamamladın! Antrenmandan sonraki 1-2 saat içinde en az 35-40g kaliteli protein ve bol su tüketmeyi unutma. Yarın bacak gününde görüşmek üzere!",
        },
      ],
    },
  ],
};
