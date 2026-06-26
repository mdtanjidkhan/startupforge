"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { 
  HiOutlineUsers, 
  HiOutlineRocketLaunch, 
  HiOutlineBriefcase, 
  HiOutlineCurrencyDollar,
  HiOutlineArrowPath
} from "react-icons/hi2";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStartups: 0,
    totalOpportunities: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/analytics");
      const data = await res.json();
      if (data.success) {
        setStats({
          totalUsers: data.totalUsers,
          totalStartups: data.totalStartups,
          totalOpportunities: data.totalOpportunities,
          totalRevenue: data.totalRevenue,
        });
      }
    } catch (error) {
      console.error("Error fetching admin analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);
  const chartData = [
    { name: "Total Users", value: stats.totalUsers, color: "#3b82f6" }, 
    { name: "Total Startups", value: stats.totalStartups, color: "#10b981" }, 
    { name: "Total Opportunities", value: stats.totalOpportunities, color: "#6366f1" }, 
    { name: "Total Revenue ($)", value: stats.totalRevenue, color: "#f59e0b" }, 
  ];

  const statItems = [
    {
      title: "Total Users",
      value: loading ? "..." : stats.totalUsers,
      icon: <HiOutlineUsers className="size-6 text-blue-600 dark:text-blue-400" />,
      bgClass: "from-blue-500/10 to-transparent",
      borderClass: "hover:border-blue-500/30 dark:hover:border-blue-500/40",
      glowClass: "group-hover:bg-blue-500/5"
    },
    {
      title: "Total Startups",
      value: loading ? "..." : stats.totalStartups,
      icon: <HiOutlineRocketLaunch className="size-6 text-emerald-600 dark:text-emerald-400" />,
      bgClass: "from-emerald-500/10 to-transparent",
      borderClass: "hover:border-emerald-500/30 dark:hover:border-emerald-500/40",
      glowClass: "group-hover:bg-emerald-500/5"
    },
    {
      title: "Total Opportunities",
      value: loading ? "..." : stats.totalOpportunities,
      icon: <HiOutlineBriefcase className="size-6 text-indigo-600 dark:text-indigo-400" />,
      bgClass: "from-indigo-500/10 to-transparent",
      borderClass: "hover:border-indigo-500/30 dark:hover:border-indigo-500/40",
      glowClass: "group-hover:bg-indigo-500/5"
    },
    {
      title: "Total Revenue",
      value: loading ? "..." : `$${stats.totalRevenue}`,
      icon: <HiOutlineCurrencyDollar className="size-6 text-amber-600 dark:text-amber-400" />,
      bgClass: "from-amber-500/10 to-transparent",
      borderClass: "hover:border-amber-500/30 dark:hover:border-amber-500/40",
      glowClass: "group-hover:bg-amber-500/5"
    }
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:p-8 space-y-6 mt-20 md:mt-0 max-w-full">
    
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-slate-800 pb-5 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Analytics Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Monitor real-time platform statistics and performance metrics.
          </p>
        </div>
        
        <button
          onClick={fetchAnalyticsData}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <HiOutlineArrowPath className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {statItems.map((item, index) => (
          <Card 
            key={index} 
            className={`group relative overflow-hidden bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 w-full ${item.borderClass}`}
          >
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${item.bgClass} rounded-full blur-xl transition-all duration-500 ${item.glowClass}`} />
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <span className="text-xs md:text-sm font-semibold text-gray-500 dark:text-slate-400 block">
                  {item.title}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {item.value}
                </h3>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ⭕ ৩. ডাইনামিক সার্কেল (Donut) চার্ট সেকশন - শতভাগ মোবাইল উইডথ ফিক্সড */}
      <div className="w-full">
        <Card className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl p-4 md:p-6 shadow-sm w-full">
          <div className="mb-4 px-1">
            <h4 className="text-base font-bold text-gray-900 dark:text-slate-200">Platform Distribution</h4>
            <p className="text-xs text-gray-400 dark:text-slate-500">Visual ratio of users, startups, opportunities, and total earnings.</p>
          </div>

          {/* 📱 চার্ট কন্টেইনার যেন কোনোভাবেই চেপে না যায় */}
          <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center mx-auto relative">
            {loading ? (
              <span className="text-sm text-gray-400">Loading chart...</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderRadius: '12px', 
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={45} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(value) => <span className="text-xs font-semibold text-gray-600 dark:text-slate-300 px-0.5">{value}</span>}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="45%"
                    innerRadius="50%" // 🍩 ছোট স্ক্রিনের জন্য পারফেক্ট ব্যালেন্স শেপ
                    outerRadius="75%" 
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}