
"use client";

import { HiOutlineRocketLaunch, HiOutlineUsers, HiOutlineBriefcase, HiOutlineSparkles } from "react-icons/hi2";

const StartupStats= () => {
  const stats = [
    {
      id: 1,
      name: "Active Startups",
      value: "150+",
      icon: <HiOutlineRocketLaunch className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 2,
      name: "Talented Collaborators",
      value: "2,500+",
      icon: <HiOutlineUsers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 3,
      name: "Open Opportunities",
      value: "450+",
      icon: <HiOutlineBriefcase className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    },
    {
      id: 4,
      name: "Success Match Rate",
      value: "85%",
      icon: <HiOutlineSparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-zinc-900 border-t border-b border-zinc-100 dark:border-zinc-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-3 md:gap-4 p-4 md:p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm group-hover:scale-105 group-hover:rotate-6 transition-transform duration-200 compact-icon">
                {stat.icon}
              </div>
              
         
              <div className="space-y-0.5">
                <p className="text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-[11px] md:text-xs font-medium text-zinc-500 dark:text-zinc-400 leading-tight">
                  {stat.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupStats;