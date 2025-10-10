"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui";
import { Navbar, Footer } from "@/shared/components";
import { useAuth, useI18n } from "@/shared/contexts";
import type { LoginRequest } from "@/shared/types";

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const { t, direction, language } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);

      // Redirect based on user role from login result
      const roleDashboards = {
        admin: "/admin/dashboard",
        employee: "/employee/dashboard",
        employer: "/employer/dashboard",
      };

      // Get user role from context after login
      const userRole = user?.role;
      const dashboardPath =
        roleDashboards[userRole as keyof typeof roleDashboards] || "/dashboard";
      router.push(dashboardPath);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center mb-2"
              >
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform duration-200">
                    ص
                  </div>
                  <span>SU&apos;UD - صعود</span>
                </button>
              </motion.div>
              <CardTitle>{t("auth.login")}</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: direction === "rtl" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium text-gray-700 mb-2 ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                    placeholder={
                      language === "en"
                        ? "Enter your email"
                        : "أدخل بريدك الإلكتروني"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium text-gray-700 mb-2 ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("auth.password")}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                    placeholder={
                      language === "en"
                        ? "Enter your password"
                        : "أدخل كلمة المرور"
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t("auth.login")}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {language === "en"
                    ? "Don't have an account?"
                    : "ليس لديك حساب؟"}{" "}
                  <button
                    onClick={() => router.push("/auth/register")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t("auth.register")}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
