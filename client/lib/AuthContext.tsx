"use client";

import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { authClient, useSession } from "./auth-client";
import toast from "react-hot-toast";

interface AuthUser {
  name: string;
  email: string;
  initials: string;
  id: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (session?.user) {
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
      };

      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role || "trader",
        initials: getInitials(session.user.name),
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const logout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading: isPending,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
