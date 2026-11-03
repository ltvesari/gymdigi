export interface ExerciseItem {
  id: string;
  orderLabel: string; // e.g. "A1", "A2", "B1"
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  restSeconds: number;
  tempo?: string;
  videoThumb: string;
  youtubeEmbedUrl: string;
  coachNote: string;
}

export interface WorkoutItem {
  id: string;
  weekNumber: number;
  dayNumber: number;
  title: string;
  focusArea: string;
  durationMinutes: number;
  caloriesBurn: number;
  isFreePreview: boolean;
  exercises: ExerciseItem[];
}

export interface ProgramItem {
  id: string;
  slug: string;
  creatorUsername: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  durationWeeks: number;
  workoutsPerWeek: number;
  level: "Başlangıç" | "Orta" | "İleri" | "Tüm Seviyeler";
  equipment: string;
  enrolledCount: number;
  rating: number;
  workouts: WorkoutItem[];
}

export interface ReelItem {
  id: string;
  creatorUsername: string;
  title: string;
  caption: string;
  views: string;
  likes: number;
  coverImage: string;
  tag: string;
  freeWorkoutId?: string;
}

export interface StoryHighlight {
  id: string;
  title: string;
  emoji: string;
  coverImage: string;
  slides: {
    title: string;
    text: string;
    metric?: string;
  }[];
}

export interface CreatorProfile {
  username: string;
  fullName: string;
  title: string;
  verified: boolean;
  avatar: string;
  coverBanner: string;
  bio: string;
  instagramHandle: string;
  location: string;
  specialties: string[];
  monthlyPriceTry: number;
  quarterlyPriceTry: number;
  ibanHolder: string;
  ibanNumber: string;
  stats: {
    subscribers: string;
    programs: number;
    workouts: number;
    rating: string;
  };
  highlights: StoryHighlight[];
}

export const CREATORS: CreatorProfile[] = [
  {
    username: "burakfit",
    fullName: "Burak Yılmaz",
    title: "Hipertrofi & Vücut Geliştirme Koçu",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
    coverBanner: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80",
    bio: "10+ yıl doğal hipertrofi & güç koçluğu. Bilimsel set/tekrar kurgusu, sıfır sakatlık, maksimum kas kütlesi. Her hafta yeni antrenman bloğu yayında.",
    instagramHandle: "@burakfit.tr",
    location: "İstanbul",
    specialties: ["Hipertrofi", "Push/Pull/Legs", "Güç & Kondisyon", "Doğal Atlet"],
    monthlyPriceTry: 299,
    quarterlyPriceTry: 749,
    ibanHolder: "Burak Yılmaz",
    ibanNumber: "TR42 0006 4000 0011 2345 6789 01",
    stats: {
      subscribers: "2.4B",
      programs: 4,
      workouts: 86,
      rating: "4.9",
    },
    highlights: [
      {
        id: "h1",
        title: "Sistemim",
        emoji: "⚡",
        coverImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80",
        slides: [
          {
            title: "Neden Playbook Tarzı Takip?",
            text: "Rastgele antrenman yapmayı bırak. Her setin ağırlığını ve tekrarını uygulama içinde kaydederek haftalık Progressive Overload yapıyoruz.",
            metric: "Haftada 4-5 Gün Yapılandırılmış Blok",
          },
        ],
      },
      {
        id: "h2",
        title: "Değişimler",
        emoji: "🔥",
        coverImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=80",
        slides: [
          {
            title: "12 Haftada +4.2 kg Kas Kütlesi",
            text: "Abone olan üyelerimiz ilk 8 haftada temel bileşik hareketlerde ortalama %22 güç artışı yakaladı.",
            metric: "94% Tamamlama Oranı",
          },
        ],
      },
      {
        id: "h3",
        title: "Ekipman",
        emoji: "🏋️",
        coverImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format&fit=crop&q=80",
        slides: [
          {
            title: "Ev & Salon Seçenekleri",
            text: "Standart bir spor salonu veya sadece ayarlanabilir dambıl seti ile tüm programları uygulayabilirsin.",
            metric: "Alternatif Hareket Destekli",
          },
        ],
      },
      {
        id: "h4",
        title: "S.S.S.",
        emoji: "💬",
        coverImage: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&auto=format&fit=crop&q=80",
        slides: [
          {
            title: "Abonelik Neleri Kapsar?",
            text: "Tek abonelikle profilimdeki tüm programlara, yeni eklenen haftalık antrenmanlara ve teknik videolara sınırsız erişirsin.",
            metric: "İstediğin Zaman İptal",
          },
        ],
      },
    ],
  },
  {
    username: "selinpilates",
    fullName: "Selin Kaya",
    title: "Fonksiyonel Güç & Sculpt Pilates",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
    coverBanner: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&auto=format&fit=crop&q=80",
    bio: "Evde veya stüdyoda 30 dakikada sıkılaşma, core gücü ve mobilite. Ekipmansız ve mini bant serileriyle her gün enerjik uyan.",
    instagramHandle: "@selinsculpt",
    location: "İzmir",
    specialties: ["Sculpt Pilates", "Core & Kalça", "Evde Antrenman", "Mobilite"],
    monthlyPriceTry: 249,
    quarterlyPriceTry: 649,
    ibanHolder: "Selin Kaya",
    ibanNumber: "TR19 0006 2000 0044 5566 7788 99",
    stats: {
      subscribers: "3.1B",
      programs: 3,
      workouts: 64,
      rating: "5.0",
    },
    highlights: [
      {
        id: "sh1",
        title: "30 Dk Kuralı",
        emoji: "✨",
        coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&auto=format&fit=crop&q=80",
        slides: [
          {
            title: "Günde Sadece 30 Dakika",
            text: "Uzun saatler harcamadan yüksek tekrarlı kontrollü akışlarla postürünü ve core gücünü dönüştür.",
            metric: "Ekipmansız Seçenekli",
          },
        ],
      },
    ],
  },
  {
    username: "emrehybrid",
    fullName: "Emre Demir",
    title: "Hybrid Athlete · Güç + Koşu / HYROX",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&auto=format&fit=crop&q=80",
    coverBanner: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&auto=format&fit=crop&q=80",
    bio: "Hem ağır kaldır hem 10K koş. HYROX hazırlık, fonksiyonel kondisyon ve patlayıcı kuvvet programları.",
    instagramHandle: "@emrehybrid",
    location: "Ankara",
    specialties: ["Hybrid Athlete", "HYROX", "Kondisyon", "Kuvvet"],
    monthlyPriceTry: 329,
    quarterlyPriceTry: 849,
    ibanHolder: "Emre Demir",
    ibanNumber: "TR88 0001 5001 5800 7299 1122 33",
    stats: {
      subscribers: "1.6B",
      programs: 3,
      workouts: 52,
      rating: "4.9",
    },
    highlights: [],
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: "prog-aesthetic-hypertrophy",
    slug: "estetik-hipertrofi-8-hafta",
    creatorUsername: "burakfit",
    title: "Estetik Hipertrofi: Üst/Alt Bölünmüş 8 Hafta",
    subtitle: "Omuz genişliği, V-taper sırt ve yoğun kas hacmi için bilimsel RIR/RPE odaklı program.",
    description:
      "Bu 8 haftalık Playbook programı, gereksiz çöp hacmi ortadan kaldırıp mekanik gerilimi maksimuma çıkarır. Her antrenmanda süperset etiketleri (A1/A2), dinlenme sayacı ve hedef tekrar aralıkları adım adım seni yönlendirir.",
    coverImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=80",
    durationWeeks: 8,
    workoutsPerWeek: 4,
    level: "Orta",
    equipment: "Spor Salonu",
    enrolledCount: 1840,
    rating: 4.9,
    workouts: [
      {
        id: "w-upper-power",
        weekNumber: 1,
        dayNumber: 1,
        title: "1. Gün: Üst Vücut (Omuz & Göğüs Odaklı) — Ücretsiz Önizleme",
        focusArea: "Göğüs · Yan Omuz · Triceps",
        durationMinutes: 48,
        caloriesBurn: 420,
        isFreePreview: true,
        exercises: [
          {
            id: "ex-1",
            orderLabel: "A1",
            name: "Incline Dumbbell Press (30° Eğim)",
            muscleGroup: "Üst Göğüs & Ön Omuz",
            sets: 4,
            reps: "8-10",
            restSeconds: 90,
            tempo: "3-1-1-0",
            videoThumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/8iPEnn-ltC8?rel=0&modestbranding=1",
            coachNote: "Sehpayı 30 dereceye ayarla. Alt noktada 1 saniye esnemeyi hisset, dirsekleri 45 derece açıyla tut.",
          },
          {
            id: "ex-2",
            orderLabel: "B1",
            name: "Cable Lateral Raise (Bilek Kelepçesi ile)",
            muscleGroup: "Yan Omuz (Medial Deltoid)",
            sets: 4,
            reps: "12-15",
            restSeconds: 60,
            tempo: "2-0-1-1",
            videoThumb: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/PPrzBWZDOhA?rel=0&modestbranding=1",
            coachNote: "Kabloyu kalça hizasına al. Trapezleri devreye sokmadan dirseğini yana doğru süpür.",
          },
          {
            id: "ex-3",
            orderLabel: "B2",
            name: "Chest Supported Row (Göğüs Destekli Çekiş)",
            muscleGroup: "Orta Sırt & Kanat",
            sets: 3,
            reps: "10-12",
            restSeconds: 75,
            tempo: "2-1-1-1",
            videoThumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/H75im9fAUMc?rel=0&modestbranding=1",
            coachNote: "B1 hareketinden sonra 15 sn soluklanıp B2'ye geç. Kürek kemiklerini tepe noktada sıkıştır.",
          },
          {
            id: "ex-4",
            orderLabel: "C1",
            name: "Overhead Rope Triceps Extension",
            muscleGroup: "Triceps (Uzun Baş)",
            sets: 3,
            reps: "12-15",
            restSeconds: 60,
            tempo: "2-1-1-0",
            videoThumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/YbX7Wd8jQ-Q?rel=0&modestbranding=1",
            coachNote: "Dirsekleri sabit tut, alt noktada triceps uzun başındaki tam gerilimi yakala.",
          },
        ],
      },
      {
        id: "w-lower-hypertrophy",
        weekNumber: 1,
        dayNumber: 2,
        title: "2. Gün: Alt Vücut Kuvvet & Quad/Hamstring",
        focusArea: "Quadriceps · Hamstring · Kalça",
        durationMinutes: 55,
        caloriesBurn: 510,
        isFreePreview: false,
        exercises: [
          {
            id: "ex-5",
            orderLabel: "A1",
            name: "Hack Squat veya Barbell Squat",
            muscleGroup: "Quadriceps",
            sets: 4,
            reps: "6-8",
            restSeconds: 120,
            videoThumb: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/ultWZbUMPL8?rel=0&modestbranding=1",
            coachNote: "Tam derinlik, dizler ayak parmak ucu yönünde ilerlesin.",
          },
          {
            id: "ex-6",
            orderLabel: "B1",
            name: "Romanian Deadlift (RDL)",
            muscleGroup: "Hamstring & Kalça",
            sets: 4,
            reps: "8-10",
            restSeconds: 90,
            videoThumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/JCXUYuzwNrM?rel=0&modestbranding=1",
            coachNote: "Kalçayı geriye iterken barı bacaklarına yakın tut.",
          },
        ],
      },
      {
        id: "w-pull-vtaper",
        weekNumber: 1,
        dayNumber: 4,
        title: "4. Gün: V-Taper Sırt & Arka Omuz + Biceps",
        focusArea: "Latissimus · Arka Omuz · Biceps",
        durationMinutes: 50,
        caloriesBurn: 440,
        isFreePreview: false,
        exercises: [],
      },
    ],
  },
  {
    id: "prog-dumbbell-only",
    slug: "evde-dambil-kas-insasi-6-hafta",
    creatorUsername: "burakfit",
    title: "Sadece Dambıl: Evde & Salonda 6 Haftalık Kas İnşası",
    subtitle: "Kalabalık salonlarda makine beklemeden veya evde tek çift dambıl ile tam vücut dönüşümü.",
    description:
      "Sadece ayarlanabilir bir çift dambıl ile uygulayabileceğin, mekanik drop-set ve tempo teknikleriyle yoğunlaştırılmış 6 haftalık program.",
    coverImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&auto=format&fit=crop&q=80",
    durationWeeks: 6,
    workoutsPerWeek: 4,
    level: "Tüm Seviyeler",
    equipment: "Sadece Dambıl",
    enrolledCount: 920,
    rating: 4.8,
    workouts: [
      {
        id: "w-db-1",
        weekNumber: 1,
        dayNumber: 1,
        title: "1. Gün: Dambıl Full Body Push & Core",
        focusArea: "Göğüs · Omuz · Core",
        durationMinutes: 40,
        caloriesBurn: 360,
        isFreePreview: true,
        exercises: [
          {
            id: "ex-db-1",
            orderLabel: "A1",
            name: "Dumbbell Floor / Bench Press",
            muscleGroup: "Göğüs",
            sets: 4,
            reps: "10-12",
            restSeconds: 60,
            videoThumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/VmB1G1K7v94?rel=0&modestbranding=1",
            coachNote: "Tepe noktada dambılları birbirine çarpmadan göğsü sık.",
          },
        ],
      },
    ],
  },
  {
    id: "prog-sculpt-pilates",
    slug: "30-gunde-sculpt-core-kalca",
    creatorUsername: "selinpilates",
    title: "30 Günde Sculpt Pilates: Core, Kalça & Postür",
    subtitle: "Günde 30 dakika mat üzerinde ekipmansız sıkılaşma ve esneklik serisi.",
    description:
      "Her sabah veya akşam 30 dakikada tamamlayabileceğin, derin karın kaslarını ve kalçayı hedefleyen akıcı pilates-sculpt antrenmanları.",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop&q=80",
    durationWeeks: 4,
    workoutsPerWeek: 5,
    level: "Başlangıç",
    equipment: "Mat (Ekipmansız)",
    enrolledCount: 2310,
    rating: 5.0,
    workouts: [
      {
        id: "w-pil-1",
        weekNumber: 1,
        dayNumber: 1,
        title: "1. Gün: Derin Core Ateşleyici & Kalça Aktivasyonu",
        focusArea: "Core · Kalça · Postür",
        durationMinutes: 28,
        caloriesBurn: 240,
        isFreePreview: true,
        exercises: [
          {
            id: "ex-pil-1",
            orderLabel: "A1",
            name: "Pilates Hundred & Deadbug Akışı",
            muscleGroup: "Derin Core (TVA)",
            sets: 3,
            reps: "45 sn",
            restSeconds: 30,
            videoThumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
            youtubeEmbedUrl: "https://www.youtube.com/embed/K56Z12XNQ5c?rel=0&modestbranding=1",
            coachNote: "Bel boşluğunu mata bastır, nefesini tutmadan kontrollü ritimle devam et.",
          },
        ],
      },
    ],
  },
  {
    id: "prog-hybrid-engine",
    slug: "hybrid-athlete-kuvvet-ve-kondisyon",
    creatorUsername: "emrehybrid",
    title: "Hybrid Engine: Kuvvet + 5K/10K Kondisyon",
    subtitle: "Kas kaybetmeden dayanıklılığını zirveye taşıyan 6 haftalık hibrit atlet protokolü.",
    description:
      "Ağırlık antrenmanlarıyla interval koşu ve fonksiyonel kondisyon istasyonlarını birleştiren modern hibrit program.",
    coverImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&auto=format&fit=crop&q=80",
    durationWeeks: 6,
    workoutsPerWeek: 5,
    level: "İleri",
    equipment: "Salon + Koşu",
    enrolledCount: 1120,
    rating: 4.9,
    workouts: [],
  },
];

export const REELS: ReelItem[] = [
  {
    id: "reel-1",
    creatorUsername: "burakfit",
    title: "Yan Omuz Büyüt는 Tek Kablo Ayarı",
    caption: "Lateral raise yaparken kabloyu en alta değil bilek/diz hizasına alırsan ilk 30 derecede maksimum gerilim yakalarsın! 🔥",
    views: "84.2B",
    likes: 6420,
    coverImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80",
    tag: "Teknik İpucu",
    freeWorkoutId: "w-upper-power",
  },
  {
    id: "reel-2",
    creatorUsername: "selinpilates",
    title: "Sabah 10 Dk Göbek Düzleştiren Vakum & Core",
    caption: "Mekik çekerek belini ağrıtma! Derin karın kasını (TVA) aktive eden 3 hareketlik sabah serisi ✨",
    views: "142B",
    likes: 11300,
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
    tag: "Ücretsiz Seri",
    freeWorkoutId: "w-pil-1",
  },
  {
    id: "reel-3",
    creatorUsername: "burakfit",
    title: "Incline Press'te Üst Göğsü %40 Daha Fazla Aktive Et",
    caption: "Sehpa açısını 45 yerine 30 dereceye indir, ön omuz yerine doğrudan klavikular göğüs liflerini hedefle.",
    views: "61.8B",
    likes: 4890,
    coverImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    tag: "Hipertrofi",
    freeWorkoutId: "w-upper-power",
  },
  {
    id: "reel-4",
    creatorUsername: "emrehybrid",
    title: "Ağırlık Sonrası Kardiyo Kas Yakar Mı?",
    caption: "Zone 2 koşuyu doğru gün ve şiddette planlarsan toparlanmanı hızlandırır ve iş kapasiteni artırır.",
    views: "39.5B",
    likes: 2910,
    coverImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=80",
    tag: "Hybrid Athlete",
  },
];
