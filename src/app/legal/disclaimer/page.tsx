"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle, HeartPulse } from "lucide-react";

export default function DisclaimerPage() {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Sağlık & Egzersiz Sorumluluk Reddi</h1>
            <p className="text-xs text-zinc-400">Fitness ve Egzersiz Programları Kullanım Beyanı</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3 text-amber-300">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Herhangi bir ağırlık veya kardiyo programına başlamadan önce mutlaka bir uzman hekime danışmanız önerilir.
            </span>
          </div>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">1. Tıbbi Tavsiye Niteliği Taşımaz</h2>
            <p>
              GymDigi üzerinde yer alan antrenman programları, beslenme önerileri ve koç notları genel fitness rehberliği niteliğindedir; teşhis veya tedavi amacı taşımaz.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-sm font-bold text-white">2. Kendi Sorumluluğunuzda Egzersiz</h2>
            <p>
              Egzersizlerin yanlış formda yapılması veya kapasiteyi aşan ağırlıkların seçilmesi sakatlık riski taşır. Kullanıcı kendi fiziksel limitlerini bilmekle ve hareketleri güvenli şekilde icra etmekle yükümlüdür.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
