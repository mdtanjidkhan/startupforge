
"use client";

import { useEffect, useState } from "react";
import { Card, Avatar, Chip, Input } from "@heroui/react";
import { HiOutlineBuildingOffice2, HiMagnifyingGlass } from "react-icons/hi2";

export default function BrowseStartupsPage() {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllStartups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/startups");
        const data = await res.json();
        if (data.success) {
          setStartups(data.startups);
        }
      } catch (error) {
        console.error("Failed to fetch startups:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllStartups();
  }, []);

  const filteredStartups = startups.filter((startup) =>
    startup.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0f172a] py-12 px-4 w-full">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <div className="space-y-4 border-b border-gray-100 dark:border-slate-800/60 pb-6 w-full">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              🚀 Explore Startups
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Discover and connect with innovative teams shaping the future.
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search startup or industry..."
              startContent={<HiMagnifyingGlass className="size-5 text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-semibold animate-pulse w-full">
            Loading startups directory...
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium w-full">
            No startups found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {filteredStartups.map((startup) => (
              <Card 
                key={startup._id} 
                className="w-full p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-3 w-full">
                      <Avatar 
                        src={startup.logo} 
                        name={startup.startup_name}
                        className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex-shrink-0" 
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                          {startup.startup_name}
                        </h3>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 mt-0.5 truncate">
                          <HiOutlineBuildingOffice2 className="size-3 flex-shrink-0" /> {startup.industry}
                        </p>
                      </div>
                    </div>
                    <Chip size="sm" variant="flat" color="secondary" className="font-bold text-[9px] uppercase w-fit mt-1">
                      {startup.funding_stage || "Idea"}
                    </Chip>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-3 w-full">
                    {startup.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-50 dark:border-slate-800/60 flex flex-col gap-1 text-[11px] text-gray-400 w-full">
                  <span className="truncate w-full">Contact: {startup.founder_email}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline mt-1 w-fit">
                    View Details →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}