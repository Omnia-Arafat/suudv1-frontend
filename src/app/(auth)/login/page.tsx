"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const { login, isLoading } = useAuth();
  const { t, direction, language } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Get redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      router.push(redirectUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
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
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-indigo-600 mb-2"
              >                SU&apos;UD - صعود
              </motion.h1>
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
                    ? "Don&apos;t have an account?"
                    : "ليس لديك حساب؟"}{" "}
                  <button
                    onClick={() => router.push("/register")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t("auth.register")}
                  </button>
                </p>
              </div>

              {/* Demo Accounts Section */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                  {language === "en" ? "Demo Accounts" : "حسابات تجريبية"}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setFormData({
                        email: "employee@suud.com",
                        password: "password",
                      })
                    }
                    className="w-full text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                  >
                    <div className="font-medium text-blue-800">👤 Employee</div>
                    <div className="text-blue-600">employee@suud.com</div>
                  </button>
                  <button
                    onClick={() =>
                      setFormData({
                        email: "employer@suud.com",
                        password: "password",
                      })
                    }
                    className="w-full text-left p-2 text-xs bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
                  >
                    <div className="font-medium text-green-800">
                      🏢 Employer
                    </div>
                    <div className="text-green-600">employer@suud.com</div>
                  </button>
                  <button
                    onClick={() =>
                      setFormData({
                        email: "admin@suud.com",
                        password: "password",
                      })
                    }
                    className="w-full text-left p-2 text-xs bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                  >
                    <div className="font-medium text-purple-800">👑 Admin</div>
                    <div className="text-purple-600">admin@suud.com</div>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {language === "en"
                    ? "Click any account to auto-fill credentials"
                    : "انقر على أي حساب لملء البيانات تلقائياً"}
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
