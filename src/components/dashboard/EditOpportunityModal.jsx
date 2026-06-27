"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function EditOpportunityModal({ isOpen, onClose, opportunity, setOpportunities, opportunities }) {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
  });

  useEffect(() => {
    if (opportunity) {
      setEditForm({
        roleTitle: opportunity.role_title || "",
        requiredSkills: opportunity.required_skills || "",
        workType: opportunity.work_type || "Remote",
        commitmentLevel: opportunity.commitment_level || "Full-time",
        deadline: opportunity.deadline || "",
      });
    }
  }, [opportunity]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setUpdateLoading(true);

    const updatedPayload = {
      role_title: editForm.roleTitle,
      required_skills: editForm.requiredSkills,
      work_type: editForm.workType,
      commitment_level: editForm.commitmentLevel,
      deadline: editForm.deadline,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/opportunities/${opportunity._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Opportunity updated successfully!");
        setOpportunities(opportunities.map(item => 
          item._id === opportunity._id ? { ...item, ...updatedPayload } : item
        ));
        onClose(); 
      } else {
        toast.error(data.message || "Failed to update.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error during update.");
    } finally {
      setUpdateLoading(false);
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
          <Modal.Dialog className="sm:max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header className="shrink-0">
              <Modal.Icon className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <HiOutlinePencilSquare className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update Opportunity</Modal.Heading>
              <p className="mt-1.5 text-xs md:text-sm leading-5 text-gray-500 dark:text-slate-400">
                Modify the fields below to update your published requirements.
              </p>
            </Modal.Header>
            <form onSubmit={handleUpdateSubmit} className="flex flex-col flex-1 overflow-hidden">
              <Modal.Body className="p-4 md:p-6 overflow-y-auto flex-1">
                <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                  <div className="flex flex-col gap-4 pb-2">
                    
                    {/* Role Title */}
                    <TextField className="w-full" name="roleTitle" variant="secondary">
                      <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Role Title</Label>
                      <Input 
                        isRequired 
                        placeholder="Enter role title" 
                        value={editForm.roleTitle}
                        onChange={(e) => setEditForm({ ...editForm, roleTitle: e.target.value })}
                      />
                    </TextField>

                    {/* Required Skills */}
                    <TextField className="w-full" name="requiredSkills" variant="secondary">
                      <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Required Skills</Label>
                      <Input 
                        isRequired 
                        placeholder="e.g. React, Node.js" 
                        value={editForm.requiredSkills}
                        onChange={(e) => setEditForm({ ...editForm, requiredSkills: e.target.value })}
                      />
                    </TextField>

                    {/* Work Type */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-slate-300">Work Type</label>
                      <select
                        className="w-full h-10 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-xl px-3 text-sm outline-none text-gray-800 dark:text-slate-200 cursor-pointer transition-colors"
                        value={editForm.workType}
                        onChange={(e) => setEditForm({ ...editForm, workType: e.target.value })}
                      >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    {/* Commitment Level */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-slate-300">Commitment Level</label>
                      <select
                        className="w-full h-10 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-slate-700 rounded-xl px-3 text-sm outline-none text-gray-800 dark:text-slate-200 cursor-pointer transition-colors"
                        value={editForm.commitmentLevel}
                        onChange={(e) => setEditForm({ ...editForm, commitmentLevel: e.target.value })}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Hourly">Hourly</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <TextField className="w-full" name="deadline" type="date" variant="secondary">
                      <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Deadline</Label>
                      <Input 
                        isRequired 
                        value={editForm.deadline}
                        onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                      />
                    </TextField>

                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-2 p-4 md:p-6 pt-2 shrink-0 border-t border-gray-50 dark:border-slate-800/50">
                <Button variant="secondary" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-indigo-600 text-white font-bold"
                  isLoading={updateLoading}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}