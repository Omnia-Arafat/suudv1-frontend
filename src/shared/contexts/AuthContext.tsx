"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { authService } from "@/shared/services/auth.service";
import type { User, LoginRequest, RegisterRequest } from "@/shared/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<string>;
  register: (userData: RegisterRequest) => Promise<string>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const initializeAuth = useCallback(async () => {
    try {
      // Only run auth initialization on client-side to prevent hydration mismatch
      if (typeof window !== "undefined") {
        // First, check if we have stored user data (faster)
        const storedUser = authService.getStoredUser();
        const hasToken = authService.isAuthenticated();

        console.log("Auth initialization:", { storedUser, hasToken });

        if (storedUser && hasToken) {
          // Set user immediately for better UX - don't clear this!
          setUser(storedUser);
          console.log("Set user from localStorage:", storedUser);

          // Try to refresh user data in background, but don't clear user if it fails
          try {
            const currentUser = await authService.getCurrentUser();
            // Only update if we get valid user data with a name
            if (currentUser && currentUser.name && currentUser.name.trim()) {
              setUser(currentUser);
              console.log("Updated user from server:", currentUser);
            } else {
              console.warn(
                "Server returned user without name, keeping stored data:",
                { currentUser, storedUser }
              );
              // Keep using stored user data if server data is incomplete
            }
          } catch (error) {
            console.warn(
              "Failed to refresh user data, keeping stored data:",
              error
            );
            // Keep using stored user data - don't clear it!
            // Only clear auth if it's a 401 error (invalid token)
            if ((error as any).status === 401) {
              console.log("Token expired, clearing auth data");
              await authService.logout();
              setUser(null);
            }
            // For any other error, keep the stored user data
          }
        } else if (hasToken) {
          // Only try to get current user if we have a token but no stored user
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error("Failed to get current user:", error);
            // Clear invalid auth data
            await authService.logout();
            setUser(null);
          }
        } else {
          // No token, ensure user is null
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      // Only clear auth data if there's a critical error
      if (typeof window !== "undefined") {
        const hasToken = authService.isAuthenticated();
        if (hasToken) {
          console.log("Critical auth error, clearing data");
          await authService.logout();
        }
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const login = async (credentials: LoginRequest): Promise<string> => {
    try {
      setIsLoading(true);
      console.log("AuthContext: Starting login process");
      const authResponse = await authService.login(credentials);
      console.log("AuthContext: Login successful, user:", authResponse.user);
      console.log("AuthContext: Redirect URL:", authResponse.redirect_url);
      setUser(authResponse.user);
      return authResponse.redirect_url;
    } catch (error) {
      console.error("AuthContext: Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<string> => {
    try {
      setIsLoading(true);
      const authResponse = await authService.register(userData);
      setUser(authResponse.user);
      return authResponse.redirect_url;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (authService.isAuthenticated()) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error("User refresh failed:", error);
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
