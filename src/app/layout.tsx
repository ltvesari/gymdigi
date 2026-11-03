import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "GymDigi — Türkiye'nin Fitness & Antrenör Abonelik Platformu",
  description:
    "Playbook ve Instagram ilhamlı fitness platformu. Favori antrenörünün programlarına abone ol, set ve tekrarlarını takip et.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-black text-zinc-100 pb-20 md:pb-10 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
