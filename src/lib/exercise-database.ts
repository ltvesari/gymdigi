export interface LibraryExercise {
  id: string;
  name: string;
  targetMuscle: "Göğüs" | "Sırt" | "Omuz" | "Biceps" | "Triceps" | "Bacak" | "Core" | "Kondisyon";
  equipment: "Dambıl" | "Barbell" | "Kablo" | "Makine" | "Vücut Ağırlığı" | "Pilates Matı";
  level: "Başlangıç" | "Orta" | "İleri";
  youtubeEmbedUrl: string;
  thumbnail: string;
  coachCue: string;
  tempo: string;
  defaultRest: number;
}

export const EXERCISE_DATABASE: LibraryExercise[] = [
  {
    id: "lib-1",
    name: "Incline Dumbbell Bench Press (30°)",
    targetMuscle: "Göğüs",
    equipment: "Dambıl",
    level: "Orta",
    youtubeEmbedUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    coachCue: "Sehpayı 30 dereceye ayarla, alt noktada 1 saniye esnemeyi hisset, dirsekler gövdeye 45 derece açıda kalsın.",
    tempo: "3-1-1-0",
    defaultRest: 90,
  },
  {
    id: "lib-2",
    name: "Cable Lateral Raise (Bilek Kelepçeli)",
    targetMuscle: "Omuz",
    equipment: "Kablo",
    level: "Tüm Seviyeler" as any,
    youtubeEmbedUrl: "https://www.youtube.com/embed/PPrzBWZDOhA",
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80",
    coachCue: "Makarayı diz hizasına al. Omuz başlarını yukarı çekmeden yana doğru süpür.",
    tempo: "2-0-1-1",
    defaultRest: 60,
  },
  {
    id: "lib-3",
    name: "Romanian Deadlift (RDL)",
    targetMuscle: "Bacak",
    equipment: "Barbell",
    level: "Orta",
    youtubeEmbedUrl: "https://www.youtube.com/embed/JCXUYuzwNrM",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    coachCue: "Dizleri hafif bükülü kilitle, kalçayı arkadaki duvara değdirir gibi it. Hamstring gerilimini hisset.",
    tempo: "3-1-1-0",
    defaultRest: 90,
  },
  {
    id: "lib-4",
    name: "Chest Supported Dumbbell Row",
    targetMuscle: "Sırt",
    equipment: "Dambıl",
    level: "Başlangıç",
    youtubeEmbedUrl: "https://www.youtube.com/embed/H75im9fAUMc",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
    coachCue: "Göğsü sehpadan kaldırmadan dirsekleri kalçaya doğru çek, kürek kemiklerini 1 saniye sıkıştır.",
    tempo: "2-1-1-1",
    defaultRest: 75,
  },
  {
    id: "lib-5",
    name: "Overhead Rope Triceps Extension",
    targetMuscle: "Triceps",
    equipment: "Kablo",
    level: "Orta",
    youtubeEmbedUrl: "https://www.youtube.com/embed/YbX7Wd8jQ-Q",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80",
    coachCue: "Dirsekleri sabit tut, ipi başının arkasından yukarı doğru açarken triceps uzun başını esnet.",
    tempo: "2-1-1-0",
    defaultRest: 60,
  },
  {
    id: "lib-6",
    name: "Incline Dumbbell Biceps Curl",
    targetMuscle: "Biceps",
    equipment: "Dambıl",
    level: "Orta",
    youtubeEmbedUrl: "https://www.youtube.com/embed/soxrZlIl35U",
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80",
    coachCue: "Kolları geride bırakıp biceps'i tam uzat. Dirsekleri öne kaçırmadan sadece ön kolu bük.",
    tempo: "2-1-1-1",
    defaultRest: 60,
  },
  {
    id: "lib-7",
    name: "Hanging Knee / Leg Raise",
    targetMuscle: "Core",
    equipment: "Vücut Ağırlığı",
    level: "Orta",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Pr1ieGZ5atk",
    thumbnail: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&auto=format&fit=crop&q=80",
    coachCue: "Sallanmadan kalçayı öne doğru yuvarlayarak dizleri göğse çek.",
    tempo: "2-0-1-1",
    defaultRest: 45,
  },
  {
    id: "lib-8",
    name: "Bulgarian Split Squat",
    targetMuscle: "Bacak",
    equipment: "Dambıl",
    level: "İleri",
    youtubeEmbedUrl: "https://www.youtube.com/embed/2C-uNgKwPLE",
    thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80",
    coachCue: "Arka ayak parmak ucunu sehpaya koy, öndeki dizin üzerine ağırlık vererek 90 dereceye in.",
    tempo: "3-1-1-0",
    defaultRest: 90,
  },
];
