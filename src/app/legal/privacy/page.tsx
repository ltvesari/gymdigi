"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">KVKK & Gizlilik Politikası</h1>
            <p className="text-xs text-zinc-400">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">1. İşlenen Kişisel Veriler</h2>
            <p>
              GymDigi platformunu kullanırken ad, soyad, e-posta adresi, antrenman set/tekrar/ağırlık kayıtları ve isteğe bağlı girilen vücut ölçüleri (kilo, bel, kol) sistemlerimizde güvenle saklanır.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">2. Gelişim Fotoğraflarının Gizliliği</h2>
            <p>
              Sporcuların profil veya ilerleme sekmesinde yüklediği fotoğraflar <strong>kesinlikle gizlidir</strong>. Açık rıza verilmedikçe hiçbir antrenör, diğer kullanıcı veya üçüncü taraf ile paylaşılmaz.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">3. Veri Güvenliği ve Silme Hakkı</h2>
            <p>
              Kullanıcılar KVKK&apos;nın 11. maddesi kapsamında diledikleri zaman hesaplarının ve tüm antrenman geçmişlerinin silinmesini talep edebilir. Veriler şifrelenmiş sunucularda korunmaktadır.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
