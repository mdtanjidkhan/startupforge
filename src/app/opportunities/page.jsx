
"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Input, Button, Spinner } from "@heroui/react"; 
import toast from "react-hot-toast";
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineMapPin, 
  HiOutlineClock, 
  HiOutlineCalendarDays,
  HiOutlineBriefcase
} from "react-icons/hi2";
import ApplyModal from "@/components/dashboard/ApplyModal";

export default function BrowseOpportunities() {
  const { data: session } = authClient.useSession();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [commitmentFilter, setCommitmentFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);

  const userRole = session?.user?.role; 

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (workTypeFilter !== "all") params.append("work_type", workTypeFilter);
      if (commitmentFilter !== "all") params.append("commitment_level", commitmentFilter);

      const res = await fetch(`http://localhost:5000/api/opportunities?${params.toString()}`);
      const data = await res.json();
      
      if (res.ok) {
        setOpportunities(data);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, workTypeFilter, commitmentFilter]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const handleApplyClick = (opportunity) => {
    if (!session) {
      toast.error("Please login first to apply!");
      return;
    }
    
    if (userRole === "Founder") {
      toast.error("As a Founder, you cannot apply to opportunities!");
      return;
    }

    setSelectedOp(opportunity);
    setIsModalOpen(true); 
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 py-8 mt-16 md:mt-16 transition-colors duration-300">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center justify-center md:justify-start gap-3">
          <HiOutlineBriefcase className="size-8 text-indigo-600 dark:text-indigo-400" />
          Explore Startup Roles
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base max-w-2xl">
          Find and apply for opportunities posted by founders worldwide. Filter by skills, engagement model, or role names.
        </p>
      </div>

      <Card className="p-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <Input
          isClearable
          placeholder="Search roles (e.g., Frontend)"
          startContent={<HiOutlineMagnifyingGlass className="text-gray-400 size-5" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="w-full"
          variant="bordered"
        />

        <div className="relative w-full">
          <select
            value={workTypeFilter}
            onChange={(e) => setWorkTypeFilter(e.target.value)}
            className="w-full h-[40px] px-3 rounded-xl border-2 border-default-200 hover:border-default-400 dark:border-slate-800 bg-transparent text-sm text-gray-700 dark:text-slate-200 outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="all" className="dark:bg-[#111827]">All Work Types</option>
            <option value="Remote" className="dark:bg-[#111827]">Remote</option>
            <option value="Onsite" className="dark:bg-[#111827]">Onsite</option>
            <option value="Hybrid" className="dark:bg-[#111827]">Hybrid</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            ▼
          </div>
        </div>
        
        <div className="relative w-full">
          <select
            value={commitmentFilter}
            onChange={(e) => setCommitmentFilter(e.target.value)}
            className="w-full h-[40px] px-3 rounded-xl border-2 border-default-200 hover:border-default-400 dark:border-slate-800 bg-transparent text-sm text-gray-700 dark:text-slate-200 outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="all" className="dark:bg-[#111827]">All Commitments</option>
            <option value="Full-time" className="dark:bg-[#111827]">Full-time</option>
            <option value="Part-time" className="dark:bg-[#111827]">Part-time</option>
            <option value="Contract" className="dark:bg-[#111827]">Contract</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            ▼
          </div>
        </div>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Spinner size="lg" color="primary" label="Fetching matching roles..." />
        </div>
      ) : opportunities.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
          <p className="text-gray-400 font-medium">No active opportunities found matching your criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((item) => {
            const skillsList = Array.isArray(item.required_skills)
              ? item.required_skills
              : item.required_skills?.split(",") || [];

            return (
              <Card 
                key={item._id} 
                className="p-6 border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-[#111827] rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between gap-5 group"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg md:text-xl tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.role_title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                      By: {item.founder_email}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 text-[10px] font-bold tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg uppercase"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-100 dark:border-slate-800/50">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineMapPin className="size-4 text-indigo-500 shrink-0" /> 
                      {item.work_type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineClock className="size-4 text-indigo-500 shrink-0" /> 
                      {item.commitment_level}
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2">
                      <HiOutlineCalendarDays className="size-4 text-indigo-500 shrink-0" /> 
                      Deadline: {item.deadline}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    className={`w-full font-bold text-white rounded-xl shadow-md transition-all ${
                      userRole === "Founder" 
                        ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed shadow-none" 
                        : "bg-indigo-600 shadow-indigo-600/10 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    }`}
                    onClick={() => handleApplyClick(item)}
                    isDisabled={userRole === "Founder"} 
                  >
                    {userRole === "Founder" ? "Founders Cannot Apply" : "Apply Now"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        opportunity={selectedOp} 
        userEmail={session?.user?.email}
        userName={session?.user?.name}
        userRole={userRole} 
      />
    </div>
  );
}