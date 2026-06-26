"use client";

import { Card } from "@heroui/react";
import { HiOutlineShieldCheck, HiOutlineCpuChip, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function WhyJoin() {
  const features = [
    {
      id: 1,
      title: "Verified Startups",
      description: "Every startup profile and job posting is thoroughly vetted to ensure legitimate and highly secure opportunities.",
      icon: <HiOutlineShieldCheck className="size-6 text-indigo-600 dark:text-indigo-400" />,
      bgIcon: "bg-indigo-50 dark:bg-indigo-950/40",
      borderColor: "hover:border-indigo-500/50 dark:hover:border-indigo-500/40"
    },
    {
      id: 2,
      title: "Smart Skill Matching",
      description: "Connect directly with tech squads and founders that align perfectly with your exact stack and professional expertise.",
      icon: <HiOutlineCpuChip className="size-6 text-emerald-600 dark:text-emerald-400" />,
      bgIcon: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "hover:border-emerald-500/50 dark:hover:border-emerald-500/40"
    },
    {
      id: 3,
      title: "Direct Interaction",
      description: "Skip the heavy bureaucratic HR process. Chat, pitch, and collaborate with core decision makers instantly.",
      icon: <HiOutlineChatBubbleLeftRight className="size-6 text-amber-600 dark:text-amber-400" />,
      bgIcon: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "hover:border-amber-500/50 dark:hover:border-amber-500/40"
    }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-slate-800/40">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          ⚡ Why Join StartupForge?
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
          We bridge the gap between visionary founders and exceptional talent, engineering the future of collaborative innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => (
          <Card
            key={item.id}
            className={`p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm transition-all duration-300 ${item.borderColor} space-y-4 group`}
          >
       
            <div className={`p-3.5 ${item.bgIcon} rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}