"use client";

import { useState } from "react";
import { Button, Input, Card } from "@heroui/react";
import toast from "react-hot-toast"; 
import { HiOutlineFolderPlus, HiOutlineBriefcase, HiOutlineCodeBracket, HiOutlineCalendarDays } from "react-icons/hi2";

export default function AddOpportunity() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const opportunityPayload = {
      // startup_id: "65f1a2b3c4d5e6f7a8b9c0d1", 
      role_title: formData.roleTitle,
      required_skills: formData.requiredSkills,
      work_type: formData.workType,
      commitment_level: formData.commitmentLevel,
      deadline: formData.deadline,
    };

    try {
      const res = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunityPayload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Opportunity published successfully!", {
          style: {
            borderRadius: '12px',
            background: '#1f2937',
            color: '#fff',
          },
        });
        setFormData({
          roleTitle: "",
          requiredSkills: "",
          workType: "",
          commitmentLevel: "",
          deadline: "",
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-8 md:p-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <HiOutlineFolderPlus className="size-7 text-indigo-600 dark:text-indigo-400" />
          Add New Opportunity
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Create team requirements to find talented collaborators.
        </p>
      </div>
      <Card className="shadow-md dark:shadow-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl transition-colors duration-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* ১. Role Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Role Title</label>
            <Input
              isRequired
              type="text"
              placeholder="e.g., Frontend Developer"
              variant="bordered"
              radius="xl"
              className="font-medium text-gray-900 dark:text-slate-100"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] hover:border-gray-300 dark:hover:border-slate-600 focus-within:!border-indigo-500 h-12 transition-colors",
                input: "placeholder:text-gray-400 dark:placeholder:text-slate-500 text-gray-800 dark:text-slate-200",
              }}
              startContent={<HiOutlineBriefcase className="text-gray-400 dark:text-slate-400 size-5 shrink-0" />}
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
            />
          </div>

          {/* ২. Required Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Required Skills</label>
            <Input
              isRequired
              type="text"
              placeholder="e.g., React, Node.js, Tailwind CSS"
              variant="bordered"
              radius="xl"
              className="font-medium text-gray-900 dark:text-slate-100"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] hover:border-gray-300 dark:hover:border-slate-600 focus-within:!border-indigo-500 h-12 transition-colors",
                input: "placeholder:text-gray-400 dark:placeholder:text-slate-500 text-gray-800 dark:text-slate-200",
              }}
              startContent={<HiOutlineCodeBracket className="text-gray-400 dark:text-slate-400 size-5 shrink-0" />}
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            />
          </div>

          {/* ৩. Work Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Work Type</label>
            <div className="relative w-full">
              <select
                isRequired
                className="w-full h-12 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 focus:border-indigo-500 rounded-2xl px-4 text-sm font-medium outline-none transition-all duration-200 text-gray-800 dark:text-slate-200 appearance-none cursor-pointer"
                value={formData.workType}
                onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
              >
                <option value="" disabled className="text-gray-400 dark:text-slate-500 bg-white dark:bg-[#111827]">Select Work Type</option>
                <option value="Remote" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">Remote</option>
                <option value="On-site" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">On-site</option>
                <option value="Hybrid" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">Hybrid</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ৪. Commitment Level */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Commitment Level</label>
            <div className="relative w-full">
              <select
                isRequired
                className="w-full h-12 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 focus:border-indigo-500 rounded-2xl px-4 text-sm font-medium outline-none transition-all duration-200 text-gray-800 dark:text-slate-200 appearance-none cursor-pointer"
                value={formData.commitmentLevel}
                onChange={(e) => setFormData({ ...formData, commitmentLevel: e.target.value })}
              >
                <option value="" disabled className="text-gray-400 dark:text-slate-500 bg-white dark:bg-[#111827]">Select Commitment Level</option>
                <option value="Full-time" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">Full-time</option>
                <option value="Part-time" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">Part-time</option>
                <option value="Hourly" className="bg-white dark:bg-[#111827] text-gray-800 dark:text-slate-200">Hourly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ৫. Deadline */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deadline</label>
            <Input
              isRequired
              type="date"
              variant="bordered"
              radius="xl"
              className="font-medium text-gray-900 dark:text-slate-100"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] hover:border-gray-300 dark:hover:border-slate-600 focus-within:!border-indigo-500 h-12 transition-colors",
                input: "text-gray-800 dark:text-slate-200 cursor-pointer",
              }}
              startContent={<HiOutlineCalendarDays className="text-gray-400 dark:text-slate-400 size-5 shrink-0" />}
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="w-full font-bold rounded-xl py-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 dark:shadow-indigo-600/20 transition-all duration-200"
            >
              {loading ? "Publishing..." : "Publish Opportunity"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}