
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineRocketLaunch, HiOutlineUserGroup } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client"; 

export default function SelectRolePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      window.location.href = "/login";
    }
  }, [session, isPending]);

  useEffect(() => {
    if (!isPending && session?.user?.role) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
        <p className="text-sm font-semibold text-gray-400">Loading session verification...</p>
      </div>
    );
  }

  const handleRoleSelection = async (selectedRole) => {
   
    if (!session?.user?.email) {
      toast.error("Session email not found. Please re-login.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating your workspace role...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/user/update-role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email.toLowerCase(),
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Registered as ${selectedRole}!`, { id: toastId });
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Failed to update role", { id: toastId });
      }
    } catch (error) {
      console.error("Role submission error:", error);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-[#0f172a] px-4">
      <Toaster position="top-center" />

      <div className="max-w-2xl w-full text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Welcome! Choose Your Account Type
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
          Logged in as: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{session?.user?.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* 🎯 Founder Card */}
        <div 
          onClick={() => !loading && handleRoleSelection("founder")}
          className={`p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl text-left transition-all shadow-md group space-y-4 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            <HiOutlineRocketLaunch className="size-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">I am a Founder</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Post active job opportunities, review incoming applications, and manage your startup dashboard portfolios.
            </p>
          </div>
        </div>

        {/* 🎯 Collaborator Card */}
        <div 
          onClick={() => !loading && handleRoleSelection("collaborator")}
          className={`p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-3xl text-left transition-all shadow-md group space-y-4 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            <HiOutlineUserGroup className="size-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">I am a Collaborator</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Explore ongoing startup opportunities, apply with your resume/portfolio, and join exciting new tech squads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

