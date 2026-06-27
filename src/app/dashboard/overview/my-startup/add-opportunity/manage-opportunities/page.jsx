

"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; 
import { Button, Card, Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineBriefcase, 
  HiOutlineTrash, 
  HiOutlinePencilSquare, 
  HiOutlineCalendarDays, 
  HiOutlineMapPin, 
  HiOutlineClock 
} from "react-icons/hi2"; 
import EditOpportunityModal from "@/components/dashboard/EditOpportunityModal";

export default function ManageOpportunities() {
  const { data: session, isPending: sessionLoading } = authClient.useSession(); 
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOpportunities = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/my-opportunities?email=${email}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setOpportunities(data);
      } else if (data && data.success && Array.isArray(data.data)) {
        setOpportunities(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (!sessionLoading && session?.user?.email) {
      fetchOpportunities(session.user.email);
    } else if (!sessionLoading && !session) {
      setLoading(false);
    }
  }, [session, sessionLoading]);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/opportunities/${id}`, {
        method: "DELETE",
        headers: { 'content-type': 'application/json' },
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Deleted successfully!");
        setOpportunities(prev => prev.filter(item => item._id !== id));
      } else {
        toast.error("Failed to delete.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred.");
    }
  };

  const handleEditClick = (item) => {
    setSelectedOpportunity(item);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 50);
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner size="lg" color="primary" label="Loading your dashboard..." />
      </div>
    );
  }


  if (!session) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center">
        <p className="text-red-500 font-bold">Please log in to manage your opportunities.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-8 mt-10 md:p-0">
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <HiOutlineBriefcase className="size-6 md:size-7 text-indigo-600 dark:text-indigo-400" />
          Manage Opportunities
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm">
          View, update, or remove your published team requirements.
        </p>
      </div>
      {opportunities.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-sm">
          <p className="text-gray-400 font-medium">No opportunities published yet.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {opportunities.map((item) => {
            const skillsList = Array.isArray(item.required_skills)
              ? item.required_skills
              : item.required_skills?.split(",") || [];

            return (
              <Card 
                key={item._id} 
                className="p-5 md:p-6 border border-gray-200/60 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-3 flex-1">
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base md:text-lg tracking-tight">
                      {item.role_title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 text-[11px] font-bold tracking-wide bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg uppercase"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

           
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <HiOutlineMapPin className="size-3.5 text-indigo-500 shrink-0" /> 
                      {item.work_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="size-3.5 text-indigo-500 shrink-0" /> 
                      {item.commitment_level}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineCalendarDays className="size-3.5 text-indigo-500 shrink-0" /> 
                      Deadline: {item.deadline}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col md:flex-row items-center justify-end gap-2 pt-3 sm:pt-0 border-t border-gray-100 dark:border-slate-800/40 sm:border-t-0 shrink-0">
                  <Button 
                    size="sm" 
                    variant="flat" 
                    isIconOnly
                    className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl border border-gray-200/50 dark:border-slate-700/50 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 hover:bg-indigo-50 dark:bg-slate-800/40 dark:hover:bg-indigo-950/40 transition-all" 
                    onClick={() => handleEditClick(item)}
                  >
                    <HiOutlinePencilSquare className="size-5" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    isIconOnly
                    className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl border border-gray-200/50 dark:border-slate-700/50 text-gray-500 hover:text-rose-600 bg-gray-50 hover:bg-rose-50 dark:bg-slate-800/40 dark:hover:bg-rose-950/40 transition-all" 
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    <HiOutlineTrash className="size-5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <EditOpportunityModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunity={selectedOpportunity}
        setOpportunities={setOpportunities}
        opportunities={opportunities}
      />
    </div>
  );
}