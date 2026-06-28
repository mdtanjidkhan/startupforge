"use client";

import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-zinc-950 px-6 transition-colors duration-200">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
    
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center">
              <HiOutlineExclamationTriangle className="w-12 h-12 text-indigo-500 dark:text-indigo-400 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text text-transparent select-none">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 group w-full sm:w-auto justify-center"
          >
            <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home Page
          </Link>
        </div>

      </div>
    </div>
  );
}