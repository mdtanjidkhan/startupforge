"use client";

import React from 'react';
import { HiOutlineBriefcase, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

const TrackStatus = () => {
  const stats = [
    {
      id: 1,
      title: "Applied",
      count: "12",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-100 dark:border-blue-900/50",
      icon: <HiOutlineBriefcase className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Interviews",
      count: "3",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-100 dark:border-amber-900/50",
      icon: <HiOutlineCheckCircle className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Rejections",
      count: "2",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
      borderColor: "border-rose-100 dark:border-rose-900/50",
      icon: <HiOutlineXCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border ${stat.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {stat.title}
              </p>
              <p className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                {stat.count}
              </p>
            </div>
            
            <div className={`p-3 ${stat.bgColor} ${stat.color} rounded-xl`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 rounded-full inline-block select-none">
          No more data available
        </p>
      </div>
    </div>
  );
};

export default TrackStatus;