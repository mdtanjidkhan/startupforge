"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Spinner, Button, Input,  Avatar, Chip, TextArea, TextField, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlineLink, 
  HiOutlineCpuChip, 
  HiOutlineDocumentText,
  HiOutlineCloudArrowUp
} from "react-icons/hi2";

export default function CollaboratorProfile() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    skills: "",
    bio: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/collaborator-profile?email=${session.user.email}`);
        const data = await res.json();
        
        if (res.ok && data) {
          setFormData({
            name: data.name || session.user.name || "",
            email: session.user.email,
            image: data.image || session.user.image || "",
            skills: data.skills ? data.skills.join(", ") : "",
            bio: data.bio || ""
          });
        } else {
          setFormData({
            name: session.user.name || "",
            email: session.user.email,
            image: session.user.image || "",
            skills: "",
            bio: ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading && session) {
      fetchProfileData();
    } else if (!sessionLoading && !session) {
      setLoading(false);
    }
  }, [session, sessionLoading]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const profilePayload = {
      name: formData.name,
      email: formData.email,
      image: formData.image,
      skills: skillsArray,
      bio: formData.bio
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/collaborator-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profilePayload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Profile updated successfully! ✨");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Network connection failed!");
    } finally {
      setSaving(false);
    }
  };

  const liveSkills = formData.skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="secondary" label="Loading profile setup..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-8 mt-16 md:mt-24">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-slate-100">
          My Profile
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
          Update your personal information, expertise, and showcase your best self.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
       
        <Card className="p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col items-center text-center sticky top-28 gap-4">
           <Avatar className="w-24 h-24 text-large font-black border-4 border-violet-100 dark:border-violet-950/50">
        <Avatar.Image alt={formData.name} src={formData.image} />
        <Avatar.Fallback>j</Avatar.Fallback>
      </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 dark:text-slate-100 text-xl tracking-tight">
              {formData.name || "Your Name"}
            </h3>
            <span className="inline-flex px-3 py-0.5 text-xs font-bold rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30 uppercase tracking-wider">
              Collaborator
            </span>
          </div>

          {formData.bio && (
            <p className="text-xs text-gray-400 dark:text-slate-400 italic leading-relaxed px-2 border-t border-gray-50 dark:border-slate-800/60 pt-3 w-full">
             {formData.bio}
            </p>
          )}
        </Card>

      
        <Card className="md:col-span-2 p-6 md:p-8 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-sm">
          <form onSubmit={handleSaveProfile} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <HiOutlineUser className="size-4 text-violet-500" />
                Full Name
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="e.g. Bob Dev"
                variant="bordered"
                radius="xl"
                value={formData.name}
                onChange={handleChange}
                className="font-medium w-64"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <HiOutlineEnvelope className="size-4 text-violet-500" />
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                variant="bordered"
                radius="xl"
                value={formData.email}
                isDisabled
                className="font-medium opacity-75 w-64"
              />
              <p className="text-[11px] text-gray-400 dark:text-slate-500 pl-1">Email is linked to your account security and cannot be changed.</p>
            </div>

            {/* Profile Image URL */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <HiOutlineLink className="size-4 text-violet-500" />
                Profile Image URL
              </Label>
              <Input
                type="url"
                name="image"
                placeholder="https://example.com/avatar.jpg"
                variant="bordered"
                radius="xl"
                value={formData.image}
                onChange={handleChange}
                className="font-medium w-64"
              />
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <HiOutlineCpuChip className="size-4 text-violet-500" />
                Skills (comma-separated)
              </Label>
              <Input
                type="text"
                name="skills"
                placeholder="React, TypeScript, Next.js, Node.js"
                variant="bordered"
                radius="xl"
                value={formData.skills}
                onChange={handleChange}
                className="font-medium w-64"
                aria-label="Name"
              />
             
              {liveSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {liveSkills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      size="sm" 
                      variant="flat" 
                      color="secondary" 
                      className="font-bold text-xs capitalize"
                    >
                      {skill}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <TextField
                name="bio"
                 minRows={3}
                maxRows={6}
                value={formData.bio}
                onChange={handleChange}
                 validate={(value) => {
              if (value.length < 10) {
                return "Name must be at least 10 characters";
              }
              return null;
            }}
              >
                      <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <HiOutlineDocumentText className="size-4 text-violet-500" />
                Bio
              </Label>
               <TextArea
                
                placeholder="Write a short bio about your expertise and what roles you are looking for..."
                variant="bordered"
                radius="xl"
                className="font-medium"
              />
              </TextField>
            
            </div>

            {/* Save Button */}
            <div className="pt-3">
              <Button
                type="submit"
                color="secondary"
                className="w-full font-black text-white bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/10 rounded-xl"
                isLoading={saving}
                startContent={!saving && <HiOutlineCloudArrowUp className="size-5" />}
              >
                Save Profile
              </Button>
            </div>

          </form>
        </Card>

      </div>
    </div>
  );
}