"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Compass,
  PlaySquare,
  Dumbbell,
  PlusSquare,
  User,
  Sparkles,
  Flame,
  UserCheck,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Film,
  Smartphone,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: "/", label: "Keşfet", icon: Compass },
    { href: "/playbook-feed", label: "Playbook Akışı", icon: Smartphone, matchPrefix: "/playbook-feed" },
    { href: "/reels", label: "Reels", icon: Film, matchPrefix: "/reels" },
    { href: "/progress", label: "İlerleme", icon: TrendingUp, matchPrefix: "/progress" },
    { href: "/community", label: "Topluluk", icon: MessageSquare, matchPrefix: "/community" },
    { href: "/studio-builder", label: "+ İçerik Üret", icon: PlusSquare, matchPrefix: "/studio" },
  ];

  return (
    <>
      {/* Üst Bar: Marshmallow White zemin, temiz kenarlık, Galactic Violet & Pembe ikonlar */}
      <header className="sticky top-0 z-40 border-b border-marshmallow-border bg-marshmallow-pure/90 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-galactic to-bubblegum font-black text-white shadow-md shadow-galactic/20">
              G
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tight text-text-primary">
                GYM<span className="text-galactic">DIGI</span>
              </span>
              <span className="hidden rounded-full border border-bubblegum/20 bg-bubblegum/10 px-2 py-0.5 text-[10px] font-bold text-bubblegum sm:inline-block">
                Marshmallow Edition
              </span>
            </div>
          </Link>

          {/* Masaüstü Menü */}
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.matchPrefix && pathname.startsWith(item.matchPrefix));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 text-xs font-bold transition ${
                    isActive
                      ? "text-galactic border-b-2 border-galactic pb-0.5"
                      : "text-text-secondary hover:text-galactic"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-galactic" : "text-text-muted"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/playbook-feed"
              className="flex items-center gap-1.5 rounded-full bg-galactic hover:bg-galactic-dark px-3 py-1.5 text-xs font-extrabold text-white shadow-sm shadow-galactic/25 transition"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Playbook Görünümü</span>
            </Link>

            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-marshmallow-border bg-marshmallow-pure pl-1 pr-3 py-1 text-xs font-bold text-text-primary hover:border-galactic transition shadow-xs"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover border border-marshmallow-border"
                />
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-galactic to-bubblegum px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition flex items-center gap-1 shadow-xs"
              >
                <User className="h-3.5 w-3.5" />
                <span>Giriş</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobil Alt Navigasyon (Marshmallow White zemin + Galactic Violet Aktif Elemanlar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-marshmallow-border bg-marshmallow-pure/95 backdrop-blur-lg md:hidden shadow-lg">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
              pathname === "/" ? "text-galactic" : "text-text-muted"
            }`}
          >
            <Compass className={`h-5 w-5 ${pathname === "/" ? "text-galactic" : ""}`} />
            <span>Keşfet</span>
          </Link>

          <Link
            href="/playbook-feed"
            className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
              pathname.startsWith("/playbook-feed") ? "text-galactic" : "text-text-muted"
            }`}
          >
            <Smartphone className={`h-5 w-5 ${pathname.startsWith("/playbook-feed") ? "text-bubblegum" : ""}`} />
            <span>Playbook</span>
          </Link>

          <Link
            href="/studio-builder"
            className="flex flex-col items-center gap-1 text-[11px] font-bold -mt-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-galactic to-bubblegum text-white shadow-md shadow-galactic/30 border-2 border-marshmallow-pure">
              <PlusSquare className="h-5 w-5" />
            </div>
            <span className="text-galactic font-black text-[10px]">Üret</span>
          </Link>

          <Link
            href="/community"
            className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
              pathname.startsWith("/community") ? "text-galactic" : "text-text-muted"
            }`}
          >
            <MessageSquare
              className={`h-5 w-5 ${pathname.startsWith("/community") ? "text-galactic" : ""}`}
            />
            <span>Topluluk</span>
          </Link>

          <Link
            href={user ? "/profile" : "/login"}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
              pathname.startsWith("/profile") || pathname.startsWith("/login")
                ? "text-galactic"
                : "text-text-muted"
            }`}
          >
            {user ? (
              <img
                src={user.avatar}
                alt="Profil"
                className={`h-5 w-5 rounded-full object-cover border ${
                  pathname.startsWith("/profile") ? "border-galactic ring-1 ring-galactic" : "border-marshmallow-border"
                }`}
              />
            ) : (
              <User className="h-5 w-5" />
            )}
            <span>Profil</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
