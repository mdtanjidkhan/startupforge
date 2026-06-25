"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Spinner, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays
} from "react-icons/hi2";

export default function MyApplications() {
  const { data: session } = authClient.useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApplications = async () => {
      if (!session?.user?.email) return;
      
      try {
        const res = await fetch(`http://localhost:5000/api/my-applications?email=${session.user.email}`);
        const data = await res.json();
        
        if (res.ok) {
          setApplications(data);
        } else {
          toast.error("Failed to load applications");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [session]);
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30">
            <HiOutlineCheckCircle className="size-4" />
            Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30">
            <HiOutlineXCircle className="size-4" />
            Rejected
          </span>
        );
      default: // Pending
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30">
            <HiOutlineClock className="size-4 animate-pulse" />
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="primary" label="Loading your applications..." />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 py-8 mt-10 md:mt-16 transition-colors duration-300">
      
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-slate-100">
          My Applications
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
          {applications.length} application(s) submitted.
        </p>
      </div>

      {applications.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
          <p className="text-gray-400 dark:text-slate-500 font-medium">You haven't applied to any opportunities yet.</p>
        </Card>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800/60 bg-gray-50/50 dark:bg-[#1f2937]/30 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  <th className="py-4 px-6">Opportunity</th>
                  <th className="py-4 px-6">Startup</th>
                  <th className="py-4 px-6">Applied Date</th>
                  <th className="py-4 px-6">Portfolio</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50 text-sm">
                {applications.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/40 dark:hover:bg-[#1f2937]/20 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-slate-200">
                      {item.role_title || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-400 font-medium">
                      {item.startup_name || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-500 dark:text-slate-400">
                      {item.applied_at ? new Date(item.applied_at).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      {item.portfolio_link ? (
                        <a 
                          href={item.portfolio_link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
                        >
                          View <HiOutlineArrowTopRightOnSquare className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {renderStatusBadge(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Responsive mobile Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {applications.map((item) => (
              <Card 
                key={item._id} 
                className="p-5 border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-[#111827] rounded-2xl shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base leading-tight">
                        {item.role_title || "N/A"}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
                        <HiOutlineBuildingOffice2 className="size-3.5 text-gray-400" />
                        {item.startup_name || "N/A"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {renderStatusBadge(item.status)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-slate-800/40 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-gray-400 dark:text-slate-500 block">Applied On</span>
                      <span className="font-medium text-gray-700 dark:text-slate-300 flex items-center gap-1">
                        <HiOutlineCalendarDays className="size-3.5 text-indigo-500" />
                        {item.applied_at ? new Date(item.applied_at).toLocaleDateString("en-GB") : "N/A"}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-gray-400 dark:text-slate-500 block">Portfolio</span>
                      {item.portfolio_link ? (
                        <a 
                          href={item.portfolio_link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          View Link <HiOutlineArrowTopRightOnSquare className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-slate-600">—</span>
                      )}
                    </div>
                  </div>
                </div> 
                {item.motivation_message && (
                  <div className="bg-gray-50 dark:bg-[#1f2937]/40 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Your Message:</span>
                    <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2">
                      {item.motivation_message}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}