"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BiCodeAlt } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";

export default function BannerSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 px-4 py-12 sm:py-20">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-purple-300 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Content - Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide">
            <HiSparkles className="h-4 w-4 text-amber-500 dark:text-amber-400 animate-pulse" />
            <span>Welcome to the Future of Collaboration</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            Build Your Startup with{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Elite Developers
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Connect as a Founder to bring ideas to life, or join as a Collaborator to contribute to groundbreaking full-stack projects using React, Node.js, and Next.js.
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-14 px-8 rounded-xl shadow-xl shadow-indigo-600/20 transition-all duration-200"
              endContent={<FiArrowRight className="h-5 w-5" />}
              onClick={() => router.push("/register")}
            >
              Get Started Free
            </Button>
            
            <Button
              size="sm"
              variant="bordered"
              className="border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold h-14 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
              startContent={<FaGithub className="h-5 w-5" />}
              onClick={() => router.push("/projects")}
            >
              Explore Projects
            </Button>
          </div>

          {/* Tech Stack Mini Indicator s */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800/60 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-gray-400 dark:text-gray-500 text-sm font-semibold">
            <span className="text-gray-500 dark:text-gray-400">Powering:</span>
            <span>React.js</span>
            <span>Next.js</span>
            <span>Tailwind CSS</span>
            <span>MongoDB</span>
          </div>
        </div>

        {/* Right Content - Interactive Visual Component */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-square rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-8 shadow-2xl shadow-indigo-500/30 flex flex-col justify-between overflow-hidden group">
            
            {/* Overlay Glass Effect Grid */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] pointer-events-none" />
            
            {/* Top Row Visual */}
            <div className="flex justify-between items-start relative z-10">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                <BiCodeAlt className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10">
                Live Platform
              </span>
            </div>

            {/* Middle Big Text/Stats */}
            <div className="space-y-2 relative z-10">
              <h3 className="text-white text-3xl font-black tracking-wide group-hover:scale-105 transition-transform duration-300">
                &lt;StartupForge /&gt;
              </h3>
              <p className="text-indigo-100 text-xs font-medium">
                The ultimate workspace for full-stack innovators.
              </p>
            </div>

            {/* Bottom Tech Card Visual */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-gray-800 shadow-lg relative z-10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Ready to Collaborate
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-4/5 rounded-full" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}