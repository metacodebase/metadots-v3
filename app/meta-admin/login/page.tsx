"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/meta-admin/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      router.push("/meta-admin/dashboard");
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-slate-800 to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-slate-800 to-gray-900 px-4 py-8 relative overflow-hidden">
      {/* Background ceiling design with circular light fixtures */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circular fixtures - matching the ceiling pattern */}
        <div className="absolute top-[8%] left-[12%] w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-white to-white rounded-full opacity-85 shadow-lg"></div>
        <div className="absolute top-[15%] right-[8%] w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br  rounded-full opacity-80 shadow-lg"></div>
        {/* <div className="absolute top-[25%] left-[25%] w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white to-white rounded-full opacity-75 shadow-lg"></div> */}

        {/* Medium circular fixtures */}
        <div className="absolute top-[35%] right-[15%] w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-whiteto-white rounded-full opacity-70 shadow-lg"></div>
        <div className="absolute top-[45%] left-[8%] w-22 h-22 sm:w-30 sm:h-30 bg-gradient-to-br from-white to-white rounded-full opacity-75 shadow-lg"></div>
        <div className="absolute top-[55%] right-[25%] w-18 h-18 sm:w-26 sm:h-26 bg-gradient-to-br from-whiteto-white rounded-full opacity-65 shadow-lg"></div>

        {/* Small circular fixtures */}
        <div className="absolute top-[18%] left-[45%] w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-white rounded-full opacity-60 shadow-lg"></div>
        <div className="absolute top-[65%] left-[18%] w-16 h-16 sm:w-22 sm:h-22 bg-gradient-to-br from-whiteto-white rounded-full opacity-70 shadow-lg"></div>
        <div className="absolute top-[75%] right-[12%] w-12 h-12 sm:w-18 sm:h-18 bg-gradient-to-br from-white to-white rounded-full opacity-55 shadow-lg"></div>

        {/* Additional scattered fixtures for authentic ceiling look */}
        <div className="absolute top-[32%] right-[35%] w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-whiteto-white rounded-full opacity-50 shadow-lg"></div>
        <div className="absolute top-[42%] left-[35%] w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-br from-white to-white rounded-full opacity-45 shadow-lg"></div>
        <div className="absolute top-[68%] left-[42%] w-12 h-12 sm:w-18 sm:h-18 bg-gradient-to-br rounded-full opacity-55 shadow-lg"></div>
        <div className="absolute top-[85%] left-[28%] w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-white rounded-full opacity-60 shadow-lg"></div>

        {/* Extra small fixtures for detail */}
        <div className="absolute top-[22%] right-[45%] w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br  rounded-full opacity-40 shadow-lg"></div>
        <div className="absolute top-[52%] right-[8%] w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-white to-white rounded-full opacity-45 shadow-lg"></div>
        <div className="absolute top-[78%] right-[35%] w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br  rounded-full opacity-50 shadow-lg"></div>

        {/* Tiny accent fixtures */}
        <div className="absolute top-[12%] left-[38%] w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-white to-white rounded-full opacity-35 shadow-lg"></div>
        <div className="absolute top-[38%] left-[52%] w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br  rounded-full opacity-40 shadow-lg"></div>
        <div className="absolute top-[62%] right-[48%] w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-white to-white rounded-full opacity-35 shadow-lg"></div>
        <div className="absolute top-[88%] left-[15%] w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br  rounded-full opacity-45 shadow-lg"></div>
      </div>

      {/* Left side content - hidden on mobile */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-start lg:text-white lg:px-12 lg:max-w-2xl relative z-10">
        <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight text-white">
          Welcome to metadots
        </h1>
        <p className="text-lg xl:text-xl opacity-90 leading-relaxed text-white">
          Experience modern design with our innovative ceiling-inspired
          interface. Access your admin dashboard with the same elegance as
          architectural lighting.
        </p>
      </div>

      {/* Right side login form */}
      <div className="w-full max-w-md lg:max-w-lg relative z-10">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm text-black border border-blue-200 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@metadots.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 pr-10 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 h-12"
                disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
