"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardHomepage() {
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
  
    if (isPending) return;
    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session?.user?.role;

    if (userRole === "founder") {
      router.push("/dashboard/overview");
    } else {
      router.push("/dashboard/overview"); 
    }
  }, [session, isPending, router]);

  
  return (
    <div className="h-[70vh] w-full flex flex-col justify-center items-center gap-3">
      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading your workspace...
      </p>
    </div>
  );
}