"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Spinner, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineCheckCircle, 
  HiOutlineXCircle, 
  HiOutlineArrowTopRightOnSquare,
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlineClock
} from "react-icons/hi2";

export default function FounderApplications() {
  const { data: session } = authClient.useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [actionLoading, setActionLoading] = useState({});

  
  useEffect(() => {
    const fetchFounderApplications = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/founder-applications?email=${session.user.email}`);
        const data = await res.json();
        if (res.ok) {
          setApplications(data);
        } else {
          toast.error("Failed to load applications.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchFounderApplications();
  }, [session]);

 
  const handleStatusAction = async (id, targetStatus) => {
    
    setActionLoading((prev) => ({ ...prev, [id]: targetStatus }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/applications/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus })
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(`Application ${targetStatus.toLowerCase()} successfully! `);
        
       
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app._id === id ? { ...app, status: targetStatus } : app
          )
        );
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Action error:", error);
      toast.error("Connection failed. Try again!");
    } finally {
      
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="primary" label="Fetching received applications..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-8 mt-16 md:mt-0 transition-colors duration-300">
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-slate-100">
          Applications
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
          {applications.length} application(s) received.
        </p>
      </div>

      {applications.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
          <p className="text-gray-400 dark:text-slate-500 font-medium">No applications received for your roles yet.</p>
        </Card>
      ) : (
        <div className="space-y-5">
          {applications.map((item) => (
            <Card 
              key={item._id}
              className="p-5 md:p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              
              <div className="space-y-4 flex-1">
                
               
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg">
                    {item.role_title || "Unknown Role"}
                  </h3>
                  
               
                  {item.status === "Accepted" && (
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      Accepted
                    </span>
                  )}
                  {item.status === "Rejected" && (
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
                      Rejected
                    </span>
                  )}
                  {item.status === "Pending" && (
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 animate-pulse">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <HiOutlineEnvelope className="size-4 text-gray-400" />
                    {item.applicant_email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineCalendarDays className="size-4 text-gray-400" />
                    Applied: {item.applied_at ? new Date(item.applied_at).toLocaleDateString("en-GB") : "N/A"}
                  </span>
                  {item.portfolio_link && (
                    <a 
                      href={item.portfolio_link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View Portfolio <HiOutlineArrowTopRightOnSquare className="size-3.5" />
                    </a>
                  )}
                </div>
                {item.motivation_message && (
                  <div className="space-y-1 bg-gray-50/70 dark:bg-[#1f2937]/30 p-4 rounded-xl border border-gray-100/70 dark:border-slate-800/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Motivation</span>
                    <p className="text-sm text-gray-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {item.motivation_message}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex md:flex-col items-center justify-end gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-slate-800/60">
                {item.status === "Pending" ? (
                  <>
                    {/* Accept Button */}
                    <Button
                      size="sm"
                      className="w-full md:w-28 font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40 rounded-xl"
                      onClick={() => handleStatusAction(item._id, "Accepted")}
                      isLoading={actionLoading[item._id] === "Accepted"}
                      isDisabled={!!actionLoading[item._id]}
                      startContent={actionLoading[item._id] !== "Accepted" && <HiOutlineCheckCircle className="size-4" />}
                    >
                      Accept
                    </Button>

                    {/* Reject Button */}
                    <Button
                      size="sm"
                      className="w-full md:w-28 font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/40 rounded-xl"
                      onClick={() => handleStatusAction(item._id, "Rejected")}
                      isLoading={actionLoading[item._id] === "Rejected"}
                      isDisabled={!!actionLoading[item._id]}
                      startContent={actionLoading[item._id] !== "Rejected" && <HiOutlineXCircle className="size-4" />}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  
                  <span className="text-xs font-bold text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-[#1f2937]/30 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-slate-800/50 flex items-center gap-1">
                    Decision Taken
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}