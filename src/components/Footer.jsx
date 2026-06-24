"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Top Section: Grid Allocation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-gray-100 dark:border-gray-900">
          
          {/* Brand/Logo Column (Spans 5 cols on desktop) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white tracking-wider">
              <HiSparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>StartupForge</span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed font-medium">
              The ultimate workspace for full-stack innovators. Connecting ambitious founders with elite developers to forge groundbreaking products.
            </p>
          </div>

          {/* Quick Links Column (Spans 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <Link href="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Join as Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines/Legal Column (Spans 4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact & Support
            </h4>
            <p className="text-sm font-medium leading-relaxed">
              Have questions or want to collaborate? Reach out to our community workspace.
            </p>
            {/* Social Icons inside Support column */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400 dark:text-gray-500">
          <p>© {currentYear} StartupForge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}