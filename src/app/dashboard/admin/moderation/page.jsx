"use client";

import { useEffect, useState } from "react";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import toast from "react-hot-toast";
import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath
} from "react-icons/hi2";

export default function ManageStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/startups");
      const data = await res.json();
      if (data.success) {
        setStartups(data.startups);
      } else {
        toast.error("Failed to load startups");
      }
    } catch (error) {
      console.error("Error fetching startups:", error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);
  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch("http://localhost:5000/api/admin/startups/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Startup Approved! ");
        setStartups(prev =>
          prev.map(item => item.id === id ? { ...item, status: "Approved" } : item)
        );
      } else {
        toast.error(data.message || "Approval failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch("http://localhost:5000/api/admin/startups/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Startup Removed/Rejected! ");
        setStartups(prev =>
          prev.map(item => item.id === id ? { ...item, status: "Rejected" } : item)
        );
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredStartups = startups.filter(startup =>
    startup.startup_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    startup.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    startup.founder_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Approved") return "success";
    if (status === "Rejected") return "danger";
    return "warning";
  };

  return (
    <div className="w-full px-2 sm:px-4 md:p-8 space-y-6 mt-20 md:mt-0 max-w-full">

      <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-5 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineBriefcase className="size-8 text-indigo-600 dark:text-indigo-400" />
            Manage Startups
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Review, approve or soft-delete submitted startup portfolios.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search by name, industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 font-medium"
            />
          </div>
          <button
            onClick={fetchStartups}
            disabled={loading}
            className="p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 rounded-xl transition-all shadow-sm active:scale-95 text-gray-700 dark:text-slate-200 shrink-0"
          >
            <HiOutlineArrowPath className={`size-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden w-full">
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">Loading startups directory...</p>
        ) : filteredStartups.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">No startups found.</p>
        ) : (
          filteredStartups.map((startup) => (
            <Card key={startup.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm w-full">
              <div className="flex items-start gap-3">
                <Avatar src={startup.logo} name={startup.startup_name} radius="xl" className="size-12 border border-gray-100 dark:border-slate-700 shrink-0" />
                <div className="truncate min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{startup.startup_name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate">{startup.industry}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{startup.founder_email}</p>
                </div>
                <Chip size="sm" variant="flat" color={getStatusColor(startup.status)} className="font-bold shrink-0 capitalize">
                  {startup.status}
                </Chip>
              </div>

              <div className="bg-gray-50 dark:bg-slate-900/50 p-2.5 rounded-xl text-xs text-gray-500 dark:text-slate-400 line-clamp-2">
                <strong>Stage:</strong> {startup.funding_stage} <br />
                <strong>Desc:</strong> {startup.description}
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-gray-50 dark:border-slate-800/60">
                <Button
                  size="sm"
                  radius="lg"
                  className="w-full font-bold bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                  disabled={startup.status === "Approved" || actionLoading !== null}
                  isLoading={actionLoading === startup.id}
                  onPress={() => handleApprove(startup.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  radius="lg"
                  className="w-full font-bold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                  disabled={startup.status === "Rejected" || actionLoading !== null}
                  isLoading={actionLoading === startup.id}
                  onPress={() => handleReject(startup.id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>


      <div className="hidden lg:block w-full overflow-hidden bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Startup</th>
              <th className="py-4 px-6">Industry</th>
              <th className="py-4 px-6">Funding Stage</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium text-gray-700 dark:text-slate-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">Loading startups...</td>
              </tr>
            ) : filteredStartups.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">No startups available.</td>
              </tr>
            ) : (
              filteredStartups.map((startup) => (
                <tr key={startup.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar className="border border-gray-100 dark:border-slate-700" size="sm" radius="xl">
                      <Avatar.Image alt={startup.startup_name} src={startup?.logo} />
                      <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">{startup.startup_name}</span>
                      <span className="text-xs text-gray-400 font-normal">{startup.founder_email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500 dark:text-slate-400 font-semibold">{startup.industry}</td>
                  <td className="py-4 px-6 text-xs text-gray-500 dark:text-slate-400 font-mono">{startup.funding_stage}</td>
                  <td className="py-4 px-6">
                    <Chip
                      size="sm"
                      variant="dot"
                      color={getStatusColor(startup.status)}
                      className="font-bold border-none bg-transparent capitalize"
                    >
                      {startup.status}
                    </Chip>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        radius="xl"
                        variant="light"
                        color="success"
                        className="font-bold text-xs"
                        disabled={startup.status === "Approved" || actionLoading !== null}
                        isLoading={actionLoading === startup.id}
                        startContent={<HiOutlineCheckCircle className="size-4" />}
                        onPress={() => handleApprove(startup.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        radius="xl"
                        variant="light"
                        color="danger"
                        className="font-bold text-xs"
                        disabled={startup.status === "Rejected" || actionLoading !== null}
                        isLoading={actionLoading === startup.id}
                        startContent={<HiOutlineXCircle className="size-4" />}
                        onPress={() => handleReject(startup.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}