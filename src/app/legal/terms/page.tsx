"use client";

import Link from "next/link";
import { ArrowLeft, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Mesafeli Satış Sözleşmesi</h1>
            <p className="text-xs text-zinc-400">6502 Sayılı Tüketicinin Korunması Hakkında Kanun Uyarınca</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">Madde 1 – Taraflar ve Tanımlar</h2>
            <p>
              İşbu sözleşme, GymDigi platformu (&quot;Platform&quot;) ile platform üzerinden antrenör kanalına abone olan kullanıcı (&quot;Alıcı/Sporcu&quot;) ve içerik sağlayan fitness eğitmeni (&quot;Satıcı/Antrenör&quot;) arasında akdedilmiştir.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">Madde 2 – Sözleşmenin Konusu</h2>
            <p>
              Alıcı&apos;nın, Satıcı&apos;ya ait dijital fitness içeriklerine (antrenman videoları, haftalık programlar, set takip çizelgeleri ve koç iletişim kanalları) aylık veya 3 aylık periyotlarla erişimini sağlayan dijital abonelik hizmetidir.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">Madde 3 – Cayma Hakkı İstisnası (Önemli)</h2>
            <p>
              Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. Maddesi&apos;nin (ğ) bendi uyarınca; <em>&quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde cayma hakkı kullanılamaz.&quot;</em> Abonelik satın alınıp dijital kilit açıldığı andan itibaren dijital içerik teslim edilmiş sayılır.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">Madde 4 – Abonelik İptali ve Yenileme</h2>
            <p>
              Kullanıcı dilediği zaman profil ekranından bir sonraki dönem için yenilemeyi durdurabilir. Mevcut ödenen dönemin sonuna kadar tüm içeriklere erişim devam eder.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
