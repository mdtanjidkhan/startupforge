
"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "@heroui/react"; 
import toast from "react-hot-toast";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

export default function ApplyModal({ isOpen, onClose, opportunity, userEmail, userName, userRole }) {
  const [portfolioLink, setPortfolioLink] = useState("");
  const [motivationMessage, setMotivationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPortfolioLink("");
      setMotivationMessage("");
    }
  }, [isOpen]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (userRole === "Founder") {
      toast.error("Restriction: Startup Founders are not allowed to apply!");
      return;
    }

    if (!motivationMessage.trim()) {
      toast.error("Please enter a motivation message!");
      return;
    }

    setSubmitting(true);
    const applicationData = {
      opportunity_id: opportunity?._id,
      role_title: opportunity?.role_title,
      founder_email: opportunity?.founder_email,
      applicant_name: userName || "Anonymous",
      applicant_email: userEmail, 
      portfolio_link: portfolioLink,
      motivation_message: motivationMessage,
      userRole: userRole,
      status: "Pending", 
      applied_at: new Date()
    };

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData)
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Application submitted successfully! 🚀");
        onClose(); 
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Server connection lost. Try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}  
      scrollBehavior="inside" 
      restoreFocus={false}
      preventScrollOnFocus={true}
    >
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header className="shrink-0 p-6 pb-4 border-b border-gray-50 dark:border-slate-800/50">
              <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                <HiOutlinePaperAirplane className="size-5 rotate-45" />
              </div>
              <Modal.Heading className="text-xl font-black text-gray-900 dark:text-slate-100">
                Apply to Opportunity
              </Modal.Heading>
              <p className="mt-1 text-xs md:text-sm leading-5 text-gray-500 dark:text-slate-400">
                Submit your portfolio and interest details directly to the startup founder.
              </p>
            </Modal.Header>
            
            <form onSubmit={handleApplySubmit} className="flex flex-col flex-1 overflow-hidden">
              <Modal.Body className="p-6 overflow-y-auto flex-1 space-y-4">
                
                {/* 1. Opportunity ID (Read Only) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Opportunity ID</label>
                  <input 
                    type="text" 
                    disabled
                    value={opportunity?._id || ""} 
                    className="w-full h-10 bg-gray-100 dark:bg-[#1f2937]/50 border border-gray-200 dark:border-slate-800 rounded-xl px-3 text-xs outline-none text-gray-400 dark:text-slate-500 font-mono select-all cursor-not-allowed"
                  />
                </div>

                {/* 2. Applicant Email (Read Only) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Applicant Email</label>
                  <input 
                    type="email" 
                    disabled
                    value={userEmail || ""} 
                    className="w-full h-10 bg-gray-100 dark:bg-[#1f2937]/50 border border-gray-200 dark:border-slate-800 rounded-xl px-3 text-sm outline-none text-gray-400 dark:text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>

                {/* 3. Portfolio Link (Input Field) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Portfolio Link</label>
                  <input 
                    type="url" 
                    placeholder="https://yourportfolio.com or GitHub profile" 
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full h-10 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-xl px-3 text-sm outline-none text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* 4. Motivation Message (Textarea Field) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Motivation Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Why are you interested in this role? Briefly describe your skills..." 
                    value={motivationMessage}
                    onChange={(e) => setMotivationMessage(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none text-gray-800 dark:text-slate-200 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-2 p-6 pt-3 shrink-0 border-t border-gray-50 dark:border-slate-800/50">
                <Button 
                  onClick={onClose} 
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-slate-300 font-bold px-4 rounded-xl text-sm transition-colors"
                  isDisabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5"
                  isLoading={submitting}
                >
                  Submit Application
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}