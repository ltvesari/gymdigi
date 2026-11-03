"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "athlete" | "creator" | "guest";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  username?: string;
  // Sporcu alanları
  goal?: string;
  fitnessLevel?: string;
  daysPerWeek?: number;
  equipmentPreference?: string;
  // Antrenör alanları
  specialty?: string[];
  instagramHandle?: string;
  ibanHolder?: string;
  ibanNumber?: string;
  monthlyPriceTry?: number;
  bio?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: "user-1",
  name: "Ahmet Yılmaz",
  email: "ahmet@gymdigi.com",
  role: "athlete",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
  goal: "Hipertrofi & Kas Kazanımı",
  fitnessLevel: "Orta",
  daysPerWeek: 4,
  equipmentPreference: "Tam Teşekküllü Salon",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gymdigi_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(DEMO_USER);
      }
    } else {
      setUser(DEMO_USER); // Başlangıçta demo kullanıcı hazır gelsin
      localStorage.setItem("gymdigi_user", JSON.stringify(DEMO_USER));
    }
  }, []);

  const login = (email: string, role: UserRole = "athlete") => {
    const newUser: UserProfile = {
      id: "user-" + Date.now(),
      name: email.split("@")[0],
      email,
      role,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    };
    setUser(newUser);
    localStorage.setItem("gymdigi_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gymdigi_user");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem("gymdigi_user", JSON.stringify(updated));
      return updated;
    });
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    updateProfile(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
