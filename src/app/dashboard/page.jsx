
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast"; 

export default function DashboardHomePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/login");
      return;
    }
    if (session?.user?.isBlocked === true) {
      toast.error("Your account has been suspended! Please contact support.", {
        id: "blocked-user-toast" 
      });
      authClient.signOut().then(() => {
        router.replace("/login");
      });
      return; 
    }
    const userRole = session?.user?.role;
     console.log("your role", userRole);
    if (!userRole) {
      router.push("/select-role"); 
      return;
    }
    if (userRole === "admin") {
      router.push("/dashboard/admin/analytics");
    } else if (userRole === "founder") {
      router.push("/dashboard/overview");
    } else if (userRole === "collaborator") {
      router.push("/dashboard/collaborator");
    } else {
      router.push("/select-role");
    }
    
  }, [session, isPending, router]);

  return (
    <div className="h-[70vh] w-full flex flex-col justify-center items-center gap-3">
      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading your workspace..
      </p>
    </div>
  );
}