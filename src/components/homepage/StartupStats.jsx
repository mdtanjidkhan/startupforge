"use client";

import { HiOutlineRocketLaunch, HiOutlineUsers, HiOutlineBriefcase, HiOutlineSparkles } from "react-icons/hi2";

export default function StartupStats() {
  const stats = [
    {
      id: 1,
      number: "150+",
      label: "Active Startups",
      icon: <HiOutlineRocketLaunch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      bgIcon: "bg-indigo-50 dark:bg-indigo-950/40"
    },
    {
      id: 2,
      number: "2,500+",
      label: "Talented Collaborators",
      icon: <HiOutlineUsers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bgIcon: "bg-emerald-50 dark:bg-emerald-950/40"
    },
    {
      id: 3,
      number: "450+",
      label: "Open Opportunities",
      icon: <HiOutlineBriefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      bgIcon: "bg-amber-50 dark:bg-amber-950/40"
    },
    {
      id: 4,
      number: "85%",
      label: "Success Match Rate",
      icon: <HiOutlineSparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
      bgIcon: "bg-pink-50 dark:bg-pink-950/40"
    }
  ];

  return (
    <section className="w-full py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-slate-800/40">
      <div className="w-full bg-gradient-to-br from-slate-50 to-gray-100/50 dark:from-[#111827] dark:to-[#0f172a] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-slate-800 shadow-sm">
        
        {/* 📱 এখানে grid-cols-1 এবং gap-6 ও md:gap-8 দেওয়া হয়েছে পারফেক্ট গ্যাপের জন্য */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center text-center space-y-3 p-4 bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-gray-100/70 dark:border-slate-800/50 w-full group"
            >
              {/* আইকন বক্স */}
              <div className={`p-3 ${stat.bgIcon} rounded-2xl group-hover:rotate-12 transition-transform duration-300`}>
                {stat.icon}
              </div>

              {/* সংখ্যা এবং লেবেল */}
              <div className="space-y-1 w-full">
                <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}