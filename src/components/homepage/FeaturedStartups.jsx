"use client";

import { useEffect, useState } from "react";
import { Card, Avatar } from "@heroui/react";
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";

export default function FeaturedStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home/featured-startups");
        const data = await res.json();
        if (data.success) {
          setStartups(data.startups);
        }
      } catch (error) {
        console.error("Error fetching startups on home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 font-semibold animate-pulse">
        Loading featured startups...
      </div>
    );
  }

  if (startups.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          🚀 Featured Startups
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Explore the fastest-growing startups currently looking for talented minds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <Card 
            key={startup._id} 
            className="p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex items-center gap-4">
              <Avatar 
                src={startup.logo || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"} 
                className="w-12 h-12 text-large rounded-2xl bg-indigo-50" 
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {startup.startup_name}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 mt-0.5">
                  <HiOutlineBuildingOffice2 className="size-3.5" /> {startup.industry}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50 dark:border-slate-800/60 flex justify-between text-xs font-semibold text-gray-500">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Founder</span>
                <span className="text-gray-700 dark:text-gray-300">{startup.founder_name}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-0.5 justify-end">
                  <HiOutlineUserGroup className="size-3" /> Team Size Needed
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{startup.team_size_needed}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}