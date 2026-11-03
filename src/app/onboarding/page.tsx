"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  Sparkles,
  Dumbbell,
  Target,
  Flame,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "creator" ? "creator" : "athlete";

  const { user, completeOnboarding } = useAuth();
  const [role, setRole] = useState<"athlete" | "creator">(initialRole);

  // Sporcu Onboarding Alanları
  const [goal, setGoal] = useState("Hipertrofi & Kas Kazanımı");
  const [fitnessLevel, setFitnessLevel] = useState("Orta");
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [equipmentPreference, setEquipmentPreference] = useState("Tam Teşekküllü Salon");

  // Antrenör Onboarding Alanları
  const [username, setUsername] = useState(user?.name ? user.name.toLowerCase().replace(/\s+/g, "") : "kocum");
  const [instagramHandle, setInstagramHandle] = useState("@");
  const [specialty, setSpecialty] = useState<string[]>(["Hipertrofi"]);
  const [monthlyPriceTry, setMonthlyPriceTry] = useState(299);
  const [bio, setBio] = useState("");
  const [ibanNumber, setIbanNumber] = useState("TR");

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "athlete") {
      completeOnboarding({
        role: "athlete",
        goal,
        fitnessLevel,
        daysPerWeek,
        equipmentPreference,
      });
      router.push("/profile");
    } else {
      completeOnboarding({
        role: "creator",
        username,
        instagramHandle,
        specialty,
        monthlyPriceTry,
        bio,
        ibanNumber,
      });
      router.push("/studio");
    }
  };

  const toggleSpecialty = (item: string) => {
    setSpecialty((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Adım Göstergesi */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white">
              1
            </div>
            <span className="text-xs font-bold text-white">
              {role === "athlete" ? "Sporcu Profilini Oluştur" : "Antrenör Kanalını Kur"}
            </span>
          </div>
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400">
            Kişiselleştirme
          </span>
        </div>

        <form onSubmit={handleFinish} className="space-y-6">
          {role === "athlete" ? (
            <>
              {/* Hedef Seçimi */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  1. Ana Fitness Hedefin Nedir?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Hipertrofi & Kas Kazanımı",
                    "Yağ Yakımı & Definasyon",
                    "Güç & Kuvvet (Powerlifting)",
                    "Pilates & Esneklik / Postür",
                    "Hybrid / Koşu & Kondisyon",
                    "Evde Hızlı Fit Kalma",
                  ].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`rounded-2xl border p-3 text-left text-xs font-semibold transition ${
                        goal === g
                          ? "border-indigo-500 bg-indigo-500/15 text-white"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seviye Seçimi */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  2. Antrenman Deneyimin?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Başlangıç (0-1 Yıl)", "Orta (1-3 Yıl)", "İleri (3+ Yıl)"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFitnessLevel(lvl.split(" ")[0])}
                      className={`rounded-2xl border py-2.5 text-center text-xs font-semibold transition ${
                        fitnessLevel === lvl.split(" ")[0]
                          ? "border-indigo-500 bg-indigo-500/15 text-white"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Haftalık Gün Sayısı */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  3. Haftada Kaç Gün Antrenman Yapmak İstiyorsun?
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDaysPerWeek(day)}
                      className={`flex-1 rounded-2xl border py-2.5 text-center text-xs font-bold transition ${
                        daysPerWeek === day
                          ? "border-neon bg-neon/10 text-neon"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {day} Gün
                    </button>
                  ))}
                </div>
              </div>

              {/* Ekipman Durumu */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  4. Hangi Ekipmanlara Erişimin Var?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Tam Teşekküllü Salon",
                    "Sadece Dambıl Seti",
                    "Evde Ekipmansız / Mat",
                    "Kettlebell & Barfiks",
                  ].map((eq) => (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => setEquipmentPreference(eq)}
                      className={`rounded-2xl border p-3 text-left text-xs font-semibold transition ${
                        equipmentPreference === eq
                          ? "border-indigo-500 bg-indigo-500/15 text-white"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Antrenör Kurulumu */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Kullanıcı Adı (`/@adiniz` vitrin linkin)
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs">
                    <span className="text-zinc-500">gymdigi.com/@</span>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                      className="w-full bg-transparent pl-1 font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Instagram Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    required
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@ornekcoach"
                    className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Uzmanlık Alanların (Çoklu Seçim)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Hipertrofi",
                      "Vücut Geliştirme",
                      "Sculpt Pilates",
                      "Hybrid Athlete",
                      "HYROX / Koşu",
                      "Powerlifting",
                      "Evde Egzersiz",
                      "Mobilite & Core",
                    ].map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => toggleSpecialty(sp)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          specialty.includes(sp)
                            ? "border-pink-500 bg-pink-500/20 text-pink-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        +{sp}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Aylık Kanal Abonelik Fiyatın (₺)
                  </label>
                  <input
                    type="number"
                    min={149}
                    max={999}
                    value={monthlyPriceTry}
                    onChange={(e) => setMonthlyPriceTry(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2.5 text-xs font-bold text-neon focus:border-neon focus:outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-zinc-500">
                    Önerilen: ₺249 - ₺349 / ay (%90 net kazanç senin)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Kısa Biyografi (Hakkında)
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Eğitim geçmişin, sistemin ve sporcularına sunduğun yaklaşım..."
                    className="w-full rounded-xl border border-zinc-800 bg-black p-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Ödeme Alma IBAN Numaran
                  </label>
                  <input
                    type="text"
                    value={ibanNumber}
                    onChange={(e) => setIbanNumber(e.target.value)}
                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                    className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2.5 text-xs font-mono text-zinc-300 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-xs font-black text-white hover:opacity-95 shadow-lg shadow-indigo-600/25 transition"
          >
            <span>Profili Tamamla ve Panele Geç</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500">Yükleniyor...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
