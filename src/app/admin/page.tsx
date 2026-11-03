"use client";

import { useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Coins,
  FileText,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

export default function SuperAdminPage() {
  const [adminTab, setAdminTab] = useState<"creators" | "payouts" | "legal">("creators");

  // Onay Bekleyen Antrenör Başvuruları
  const [coachApplications, setCoachApplications] = useState([
    {
      id: "app-1",
      name: "Caner Vural",
      username: "canervural",
      specialty: "Powerlifting & Güç",
      followers: "42K IG",
      status: "pending",
      iban: "TR55 0006 ...",
    },
    {
      id: "app-2",
      name: "Buse Aktaş",
      username: "busemobility",
      specialty: "Mobilite & Yoga Akışları",
      followers: "18K IG",
      status: "pending",
      iban: "TR12 0001 ...",
    },
  ]);

  // Antrenör Hakediş & Komisyon Takibi (Aylık)
  const payouts = [
    { creator: "@burakfit", gross: 71760, feeRate: "%10", platformFee: 7176, netPayout: 64584, status: "Ödendi" },
    { creator: "@selinpilates", gross: 42330, feeRate: "%10", platformFee: 4233, netPayout: 38097, status: "Hazırlandı" },
    { creator: "@emrehybrid", gross: 26320, feeRate: "%10", platformFee: 2632, netPayout: 23688, status: "Beklemede" },
  ];

  const approveCoach = (id: string) => {
    setCoachApplications((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Üst Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>GymDigi Platform Sahibi Yönetimi</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">
            Süper Admin & Muhasebe Paneli
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Antrenör başvuruları, platform komisyon tahakkukları ve yasal belgeler.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setAdminTab("creators")}
            className={`flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              adminTab === "creators"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
            }`}
          >
            <BadgeCheck className="h-4 w-4" />
            <span>Antrenör Onayları</span>
          </button>
          <button
            onClick={() => setAdminTab("payouts")}
            className={`flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              adminTab === "payouts"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
            }`}
          >
            <Coins className="h-4 w-4" />
            <span>Hakediş / Payout</span>
          </button>
          <button
            onClick={() => setAdminTab("legal")}
            className={`flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              adminTab === "legal"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Yasal Sözleşmeler</span>
          </button>
        </div>
      </div>

      {/* SEKME 1: ANTRENÖR BAŞVURU VE ONAYLARI */}
      {adminTab === "creators" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white">
              Yeni Antrenör Başvuruları (Mavi Tik ve Vitrin Onayı)
            </h2>
            <div className="space-y-3">
              {coachApplications.map((coach) => (
                <div
                  key={coach.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-white">{coach.name}</span>
                      <span className="text-xs font-semibold text-indigo-400">@{coach.username}</span>
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                        {coach.followers}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Uzmanlık: {coach.specialty} · IBAN: {coach.iban}
                    </div>
                  </div>

                  {coach.status === "approved" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Onaylandı & Mavi Tik Verildi
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveCoach(coach.id)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"
                      >
                        Onayla & Yayınla
                      </button>
                      <button className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10">
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEKME 2: HAKEDİŞ / PAYOUT */}
      {adminTab === "payouts" && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Kasım 2026 Platform Komisyon ve Hakediş Tablosu</h2>
            <span className="text-xs font-bold text-neon">Platform Net Geliri: ₺14.041</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Antrenör</th>
                  <th className="pb-3">Brüt Ciro</th>
                  <th className="pb-3">Komisyon (%10)</th>
                  <th className="pb-3">Net Ödenecek</th>
                  <th className="pb-3 text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {payouts.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/30">
                    <td className="py-3 font-bold text-white">{row.creator}</td>
                    <td className="py-3 font-semibold">₺{row.gross.toLocaleString("tr-TR")}</td>
                    <td className="py-3 text-indigo-400 font-bold">₺{row.platformFee.toLocaleString("tr-TR")}</td>
                    <td className="py-3 text-neon font-black">₺{row.netPayout.toLocaleString("tr-TR")}</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-bold text-zinc-300">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEKME 3: YASAL SÖZLEŞMELER */}
      {adminTab === "legal" && (
        <div className="space-y-4">
          {[
            {
              title: "Mesafeli Satış Sözleşmesi (6502 Sayılı Kanun)",
              desc: "Dijital fitness içerik abonelikleri için cayma hakkı istisnaları ve otomatik yenileme şartları.",
            },
            {
              title: "KVKK Aydınlatma Metni & Gizlilik Politikası",
              desc: "Kullanıcı vücut ölçüleri, antrenman logları ve ödeme verilerinin Türkiye kanunlarına göre saklanması.",
            },
            {
              title: "Sağlık ve Egzersiz Sorumluluk Reddi (Disclaimer)",
              desc: "Sporcunun egzersizleri hekim onayıyla yaptığını ve sakatlık sorumluluğunun platforma ait olmadığını belirten zorunlu onay metni.",
            },
          ].map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div>
                <h3 className="text-xs font-bold text-white">{doc.title}</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">{doc.desc}</p>
              </div>
              <button className="flex items-center gap-1 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white shrink-0">
                <span>Metni İncele</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
