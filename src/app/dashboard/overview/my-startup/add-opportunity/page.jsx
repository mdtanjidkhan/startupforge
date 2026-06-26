

"use client";

import { useState, useEffect, Suspense } from "react";
import { authClient } from "@/lib/auth-client"; 
import { Button, Input, Card } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast"; 
import { 
  HiOutlineFolderPlus, 
  HiOutlineBriefcase, 
  HiOutlineCodeBracket, 
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineCheckCircle
} from "react-icons/hi2";

function AddOpportunityForm() {
  const { data: session } = authClient.useSession(); 
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState(0); 
  const [isPremium, setIsPremium] = useState(false); 

  const [formData, setFormData] = useState({
    roleTitle: "",
    requiredSkills: "", 
    workType: "",
    commitmentLevel: "",
    deadline: "",
  });

  const paymentSuccess = searchParams.get("payment_success");
  const paymentCancel = searchParams.get("payment_cancel");

  useEffect(() => {
    const checkUserLimits = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`http://localhost:5000/api/my-opportunities?email=${session?.user?.email}`);
        const existingOpps = await res.json();
        setPostCount(existingOpps.length);
        const paymentRes = await fetch(`http://localhost:5000/api/admin/analytics`); 
        const userPaymentRes = await fetch(`http://localhost:5000/api/payments/success?email=${session?.user?.email}`);
        
      } catch (error) {
        console.error("Error fetching user post limit:", error);
      }
    };

    checkUserLimits();
  }, [session]);
  useEffect(() => {
    if (paymentSuccess && session?.user?.email) {
      toast.loading("Processing your premium membership...", { id: "payment" });
      
      fetch("http://localhost:5000/api/payments/success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          amount: 19,
          transactionId: `ST_TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          status: "completed"
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Premium Membership Unlocked! 🎉", { id: "payment" });
          setIsPremium(true); 
          setPostCount(0); 
          router.replace("/dashboard/overview/my-startup/add-opportunity");
        }
      })
      .catch((err) => {
        console.error("Payment save error:", err);
        toast.error("Failed to update premium status.", { id: "payment" });
      });
    }

    if (paymentCancel) {
      toast.error("Payment cancelled. Try again to unlock unlimited posts.");
      router.replace("/dashboard/overview/my-startup/add-opportunity");
    }
  }, [paymentSuccess, paymentCancel, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (postCount >= 3 && !isPremium) {
      toast.error("Free limit reached! Please upgrade to premium.", {
        style: { borderRadius: '12px', background: '#1f2937', color: '#fff' }
      });
      setLoading(false);
      return;
    }

    const skillsArray = formData.requiredSkills
      .split(",")
      .map(skill => skill.trim())
      .filter(skill => skill !== "");

    const opportunityPayload = {
      role_title: formData.roleTitle,
      required_skills: skillsArray,  
      work_type: formData.workType,
      commitment_level: formData.commitmentLevel,
      deadline: formData.deadline,
      founder_email: session?.user?.email, 
      isPremium: isPremium 
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
          style: { borderRadius: '12px', background: '#1f2937', color: '#fff' },
        });
        setPostCount(prev => prev + 1); 
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

  const handlePremiumUpgrade = async () => {
    try {
      toast.loading("Redirecting to Stripe Checkout...", { id: "stripe" });
      
      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        toast.error("Failed to initiate payment.", { id: "stripe" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment server connection failed.", { id: "stripe" });
    }
  };

  const isLocked = postCount >= 3 && !isPremium;

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-8 mt-12 md:mt-8 md:p-0">
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <HiOutlineFolderPlus className="size-7 text-indigo-600 dark:text-indigo-400" />
          Add New Opportunity
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Create team requirements to find talented collaborators.
        </p>
      </div>

      {isLocked && (
        <Card className="border-2 border-amber-400/60 dark:border-amber-500/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-slate-900 rounded-2xl p-6 shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-lg">
                <HiOutlineSparkles className="size-6 animate-pulse" />
                <span>Upgrade to StartupForge Pro</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300 max-w-xl">
                You have used all your <strong>3 free opportunity posts</strong>. Upgrade to our premium plan now to unlock unlimited postings!
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-amber-200 dark:border-amber-900/40">
              <div className="text-center md:text-right">
                <span className="text-3xl font-black text-gray-900 dark:text-white">$19</span>
              </div>
              <Button
                onPress={handlePremiumUpgrade}
                className="w-full md:w-auto font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:opacity-90 px-6 py-5 rounded-xl text-sm transition-all"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="shadow-md border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* ১. Role Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Role Title</label>
            <Input
              isRequired
              disabled={isLocked} 
              type="text"
              placeholder="e.g., Frontend Developer"
              variant="bordered"
              radius="xl"
              className="font-medium"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] h-12",
              }}
              startContent={<HiOutlineBriefcase className="text-gray-400 size-5" />}
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
            />
          </div>

          {/* ২. Required Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Required Skills</label>
            <Input
              isRequired
              disabled={isLocked}
              type="text"
              placeholder="e.g., React, Node.js"
              variant="bordered"
              radius="xl"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] h-12",
              }}
              startContent={<HiOutlineCodeBracket className="text-gray-400 size-5" />}
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            />
          </div>

          {/* ৩. Work Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Work Type</label>
            <select
              required
              disabled={isLocked}
              className="w-full h-12 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-2xl px-4 text-sm font-medium text-gray-800 dark:text-slate-200 outline-none disabled:opacity-50"
              value={formData.workType}
              onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
            >
              <option value="" disabled>Select Work Type</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* ৪. Commitment Level */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Commitment Level</label>
            <select
              required
              disabled={isLocked}
              className="w-full h-12 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-2xl px-4 text-sm font-medium text-gray-800 dark:text-slate-200 outline-none disabled:opacity-50"
              value={formData.commitmentLevel}
              onChange={(e) => setFormData({ ...formData, commitmentLevel: e.target.value })}
            >
              <option value="" disabled>Select Commitment Level</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          {/* ৫. Deadline */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deadline</label>
            <Input
              isRequired
              disabled={isLocked}
              type="date"
              variant="bordered"
              radius="xl"
              classNames={{
                inputWrapper: "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1f2937] h-12",
              }}
              startContent={<HiOutlineCalendarDays className="text-gray-400 size-5" />}
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              color={isLocked ? "default" : "primary"}
              disabled={isLocked} 
              isLoading={loading}
              className="w-full font-bold rounded-xl py-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : isLocked ? "Post Limit Locked 🔒" : "Publish Opportunity"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}

export default function AddOpportunity() {
  return (
    <Suspense fallback={<div className="text-center p-12">Loading page...</div>}>
      <AddOpportunityForm />
    </Suspense>
  );
}