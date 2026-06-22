"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import toast, { Toaster } from "react-hot-toast";
import { Rocket, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google Sign-In 
  const handleGoogleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  } catch (err) {
    toast.error("Google sign-in failed! Please try again.");
  }
};

  // Email & Password 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("লগইন হচ্ছে...");

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল!", { id: toastId });
      } else {
        toast.success("লগইন সফল হয়েছে!", { id: toastId });
        router.push("/dashboard"); 
      }
    } catch (err) {
      toast.error("কিছু একটা ভুল হয়েছে! আবার চেষ্টা করুন।", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
        
        {/* হেডার ও লোগো */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Rocket className="h-7 w-7" />
            </div>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Log in to manage your startups and applications
          </p>
        </div>

        {/* গুগল ওয়ান-ক্লিক লগইন বাটন */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.69 1.24 6.65l4.026 3.115Z"
              />
              <path
                fill="#4285F4"
                d="M16.04 15.345c-1.077.736-2.423 1.164-4.04 1.164-2.955 0-5.464-1.982-6.355-4.654L1.573 14.97C3.59 19.045 7.79 21.818 12 21.818c3.19 0 6.064-1.045 8.127-2.845l-4.087-3.628Z"
              />
              <path
                fill="#FBBC05"
                d="M5.645 11.855A6.842 6.842 0 0 1 5.645 10.15L1.62 7.035A11.772 11.772 0 0 0 1.09 11c0 1.382.245 2.71.673 3.964l3.882-3.11Z"
              />
              <path
                fill="#34A853"
                d="M23.49 11.273c0-.773-.073-1.555-.21-2.31H12v4.51h6.464a5.53 5.53 0 0 1-2.423 3.627l4.087 3.627c2.39-2.21 3.773-5.464 3.773-9.182Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* ডিভাইডার */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <span className="relative bg-white dark:bg-gray-900 px-3 text-xs text-gray-500 uppercase tracking-wider">
              Or with email
            </span>
          </div>
        </div>

        {/* লগইন ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ইমেইল ফিল্ড */}
          <div className="w-full">
            <Input
              required
              type="email"
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              variant="bordered"
              className="w-full"
              classNames={{
                inputWrapper: "h-12 border-2 focus-within:!border-indigo-500",
              }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div className="w-full">
            <Input
              required
              label="Password"
              name="password"
              placeholder="Enter your password"
              variant="bordered"
              className="w-full"
              classNames={{
                inputWrapper: "h-12 border-2 focus-within:!border-indigo-500",
              }}
              value={formData.password}
              onChange={handleChange}
              endContent={
                <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>

          {/* সাবমিট বাটন */}
          <Button
            isLoading={loading}
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 mt-2"
          >
            Sign In
          </Button>
        </form>

        {/* রেজিস্ট্রেশন লিংক */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}