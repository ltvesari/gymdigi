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
      {/* Üst Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 font-black text-white shadow-md shadow-indigo-500/20">
              G
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white">
                GYM<span className="text-indigo-400">DIGI</span>
              </span>
              <span className="hidden rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400 sm:inline-block">
                Playbook × IG
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
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/playbook-feed"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-sm shadow-indigo-600/30"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Playbook Görünümü</span>
            </Link>

            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 pl-1 pr-3 py-1 text-xs font-bold text-white hover:border-indigo-500 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition flex items-center gap-1"
              >
                <User className="h-3.5 w-3.5" />
                <span>Giriş</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobil Alt Navigasyon (Instagram 5'li Tab Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800/90 bg-black/95 backdrop-blur-lg md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
              pathname === "/" ? "text-white" : "text-zinc-500"
            }`}
          >
            <Compass className={`h-5 w-5 ${pathname === "/" ? "text-indigo-400" : ""}`} />
            <span>Keşfet</span>
          </Link>

          <Link
            href="/playbook-feed"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
              pathname.startsWith("/playbook-feed") ? "text-white" : "text-zinc-500"
            }`}
          >
            <Smartphone className={`h-5 w-5 ${pathname.startsWith("/playbook-feed") ? "text-neon" : ""}`} />
            <span>Playbook</span>
          </Link>

          <Link
            href="/studio-builder"
            className="flex flex-col items-center gap-1 text-[11px] font-medium -mt-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-500/40 border-2 border-black">
              <PlusSquare className="h-5 w-5" />
            </div>
            <span className="text-white font-bold text-[10px]">Üret</span>
          </Link>

          <Link
            href="/community"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
              pathname.startsWith("/community") ? "text-white" : "text-zinc-500"
            }`}
          >
            <MessageSquare
              className={`h-5 w-5 ${pathname.startsWith("/community") ? "text-indigo-400" : ""}`}
            />
            <span>Topluluk</span>
          </Link>

          <Link
            href={user ? "/profile" : "/login"}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
              pathname.startsWith("/profile") || pathname.startsWith("/login")
                ? "text-white"
                : "text-zinc-500"
            }`}
          >
            {user ? (
              <img
                src={user.avatar}
                alt="Profil"
                className={`h-5 w-5 rounded-full object-cover border ${
                  pathname.startsWith("/profile") ? "border-indigo-400" : "border-zinc-700"
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
