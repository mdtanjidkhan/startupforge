
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import toast, { Toaster } from "react-hot-toast";
import { Rocket, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";

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
    const toastId = toast.loading("Login...");

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Email or Password is Incorrect!", { id: toastId });
      } else {
        toast.success("Login was successful!", { id: toastId });
        router.push("/dashboard"); 
      }
    } catch (err) {
      toast.error("Something went wrong! try again", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      <Toaster position="top-center" />
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Card Wrapper with Gradient Border */}
      <div className="relative w-full max-w-md p-[1.5px] rounded-3xl bg-gradient-to-b from-purple-500/40 via-indigo-500/25 to-blue-500/20 dark:from-purple-500 dark:via-indigo-500/30 dark:to-blue-500/20 shadow-xl dark:shadow-2xl dark:shadow-purple-950/40 backdrop-blur-xl">
        <div className="w-full bg-white dark:bg-slate-900/90 rounded-[23px] p-8 space-y-6 relative overflow-hidden transition-colors duration-300">
          
          {/* Header */}
          <div className="text-center relative space-y-1">
            <div className="flex justify-center mb-1">
              <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-500/20">
                <Rocket className="h-6 w-6" />
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Log in to manage your startups and applications
            </p>

            {/* Decorative Sub-line */}
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-2" />
          </div>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-slate-700/80 rounded-xl bg-white dark:bg-slate-800/60 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-purple-500/50 transition-all shadow-sm cursor-pointer"
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

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-gray-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest absolute">
                Or with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-slate-300 block ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-purple-600 dark:text-purple-400 h-5 w-5 pointer-events-none" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-slate-300 block ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-purple-600 dark:text-purple-400 h-5 w-5 pointer-events-none" />
                <input
                  required
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3.5 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition focus:outline-none cursor-pointer"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition duration-200 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 dark:text-slate-400 pt-1">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 hover:underline">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}