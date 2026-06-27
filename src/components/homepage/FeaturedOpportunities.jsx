"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export default function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/home/featured-opportunities`);
        const data = await res.json();
        if (data.success) {
          setOpportunities(data.opportunities);
        }
      } catch (error) {
        console.error("Error fetching opportunities on home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 font-semibold animate-pulse">
        Loading hot opportunities...
      </div>
    );
  }

  if (opportunities.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-slate-800/40">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          🎯 Hot Opportunities
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Apply directly to active roles and collaborate on next-gen projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <Card 
            key={opp._id} 
            className="p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm hover:border-indigo-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {opp.startup_name}
                </span>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mt-0.5 capitalize">
                  {opp.role_title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {opp.required_skills?.map((skill, index) => (
                  <Chip key={index} size="sm" variant="flat" className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
                    {skill.trim()}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold">
                <HiOutlineCalendarDays className="size-4" />
                <span>Deadline: {opp.deadline ? new Date(opp.deadline).toLocaleDateString() : "N/A"}</span>
              </div>
              <Button size="sm" color="primary" className="font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}