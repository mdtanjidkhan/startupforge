"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Spinner, Button } from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";

import { 
  HiOutlineBriefcase, 
  HiOutlineQueueList, 
  HiOutlineUserCircle,
  HiOutlineClock,
  HiOutlineXCircle 
} from "react-icons/hi2";

export default function CollaboratorOverview() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    rejectedApplications: 0, 
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`http://localhost:5000/api/collaborator-stats?email=${email}`);
      const data = await res.json();
      
      if (data.success) {
        setStats({
          totalApplications: data.total || 0,
          pendingApplications: data.pending || 0,
          rejectedApplications: data.rejected || 0, 
        });
      }
    } catch (error) {
      console.error("Error fetching collaborator stats:", error);
      setStats({
        totalApplications: 0,
        pendingApplications: 0,
        rejectedApplications: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading && session?.user?.email) {
      fetchStats(session.user.email);
    } else if (!sessionLoading && !session) {
      setLoading(false);
    }
  }, [session, sessionLoading]);

  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner size="lg" color="primary" label="Loading dashboard stats..." />
      </div>
    );
  }

  const userName = session?.user?.name || "Collaborator";

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 py-8 mt-10 md:p-0">
      
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-slate-100">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
          Discover new opportunities, track your applications, and manage your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* ১. Total Applied */}
        <Card className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <HiOutlineQueueList className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Applied</p>
            <p className="text-xl font-black text-gray-900 dark:text-slate-100">{stats.totalApplications}</p>
          </div>
        </Card>

        {/* ২. Pending Review */}
        <Card className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
            <HiOutlineClock className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pending Review</p>
            <p className="text-xl font-black text-gray-900 dark:text-slate-100">{stats.pendingApplications}</p>
          </div>
        </Card>

        {/* ৩. Rejected Applications  */}
        <Card className="p-4 flex flex-row items-center gap-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm">
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl">
            <HiOutlineXCircle className="size-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Rejected</p>
            <p className="text-xl font-black text-gray-900 dark:text-slate-100">{stats.rejectedApplications}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="p-6 border border-gray-200/70 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="size-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <HiOutlineBriefcase className="size-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                Browse Opportunities
              </h3>
              <p className="text-xs md:text-sm text-gray-400 dark:text-slate-400 leading-relaxed">
                Find your perfect startup role. Filter through domains, skills, and commitments.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Button 
              as={Link} 
              href="/dashboard/collaborator/explore-projects" 
              className="w-full font-bold bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/10 hover:bg-indigo-700"
            >
              Explore Projects
            </Button>
          </div>
        </Card>
        <Card className="p-6 border border-gray-200/70 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="size-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <HiOutlineQueueList className="size-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                My Applications
              </h3>
              <p className="text-xs md:text-sm text-gray-400 dark:text-slate-400 leading-relaxed">
                Track your application status. View feedback, updates, and selection processes.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Button 
              as={Link} 
              href="/dashboard/collaborator/my-applications" 
              className="w-full font-bold bg-violet-600 text-white rounded-xl shadow-md shadow-violet-600/10 hover:bg-violet-700"
            >
              View Applications ({stats.totalApplications})
            </Button>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200/70 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="size-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <HiOutlineUserCircle className="size-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                Update Profile
              </h3>
              <p className="text-xs md:text-sm text-gray-400 dark:text-slate-400 leading-relaxed">
                Showcase your skills, experience, and portfolio to catch startup founders' attention.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Button 
              as={Link} 
              href="/dashboard/collaborator/profile" 
              className="w-full font-bold bg-pink-600 text-white rounded-xl shadow-md shadow-pink-600/10 hover:bg-pink-700"
            >
              Manage Profile
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}