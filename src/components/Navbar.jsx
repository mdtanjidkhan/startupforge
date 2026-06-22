"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@heroui/react"; 
import { Rocket, Sun, Moon, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Better Auth সেশন ডাটা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Hydration Error এড়াতে mounted চেক
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
  };

  const isActive = (path) => pathname === path;

  // পাবলিক লিংকসমূহ
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Startups", href: "/startups" },
    { name: "Browse Opportunities", href: "/opportunities" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80 transition-colors duration-300">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* বাম পাশ: হ্যামবার্গার ও লোগো */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
            <Rocket className="h-6 w-6 animate-pulse" />
            <span>StartupForge</span>
          </Link>
        </div>

        {/* মাঝখান: ডেক্সটপ নেভিগেশন লিংক */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ডান পাশ: থিম টগল এবং লগইন/প্রোফাইল স্টেট */}
        <div className="flex items-center gap-3">
          {/* থিম টগল বাটন */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* কন্ডিশনাল অথ রেন্ডারিং */}
          {isPending ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          ) : user ? (
            /* লগইন থাকা অবস্থার ইউজার ইন্টারফেস */
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              
              {/* ইউজার প্রোফাইল পিকচার এবং লগআউট বাটন */}
              <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-800 pl-3">
                <img
                  src={user.image || "https://avatar.iran.liara.run/public/boy"}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border border-indigo-500"
                />
                <button
                  onClick={handleLogout}
                  className="hidden sm:block p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            /* লগআউট থাকা অবস্থার ইউজার ইন্টারফেস (ডেক্সটপ) */
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* মোবাইল ড্রয়ার মেনু */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-base font-medium ${
                    isActive(link.href)
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* মোবাইল অথ সেকশন */}
            <li className="mt-2 flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
                  >
                    <LayoutDashboard className="h-5 w-5 text-indigo-500" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 px-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout ({user.name ? user.name.split(" ")[0] : "User"})
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-center text-base font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-indigo-600 text-white font-medium">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}