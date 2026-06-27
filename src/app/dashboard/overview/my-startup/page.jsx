
"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client"; 
import { Input, Label, TextField, TextArea, Button, Card, Spinner, Avatar } from "@heroui/react";
import toast from "react-hot-toast";
import { 
  HiOutlineRocketLaunch, 
  HiOutlinePencilSquare, 
  HiOutlineCheck,
  HiOutlineCamera,
  HiOutlineTrash,
  HiOutlineEnvelope,
  HiOutlineCurrencyDollar,
  HiOutlinePlus,
  HiOutlineClock,
  HiXMark
} from "react-icons/hi2";

export default function MyStartupPage() {
  
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);

  const [startupData, setStartupData] = useState({
    _id: "", 
    startup_name: "",
    logo: "", 
    industry: "",
    description: "",
    funding_stage: "",
    founder_email: "",
    status: "Pending"
  });

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 

  const fetchStartupProfile = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/my-startup?email=${email}`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setStartupData(data.data);
        setIsEditing(false); 
      } else {
        setStartupData(prev => ({ ...prev, founder_email: email }));
        setIsEditing(true); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load startup profile");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (!sessionLoading && session?.user?.email) {
      fetchStartupProfile(session.user.email);
    } else if (!sessionLoading && !session) {
      setLoading(false);
    }
  }, [session, sessionLoading]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image size must be less than 2MB!");
    }

    if (!IMGBB_API_KEY) {
      toast.error("ImgBB API Key missing in environment variables!");
      return;
    }

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.data?.url) {
        setStartupData(prev => ({ ...prev, logo: data.data.url }));
        toast.success("Logo uploaded successfully!");
      } else {
        toast.error(data.error?.message || "ImgBB upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error during logo upload.");
    } finally {
      setUploadingLogo(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startupData.startup_name?.trim()) return toast.error("Startup Name is required!");
    if (!startupData.industry?.trim()) return toast.error("Industry type is required!");
    if (!startupData.funding_stage) return toast.error("Please select your Funding Stage!");
    if (!startupData.description?.trim()) return toast.error("Description cannot be empty!");
    if (!startupData.logo) return toast.error("Please upload your startup logo!");
    if (!startupData.founder_email) return toast.error("User session missing. Please log in.");

    setActionLoading(true);

    const isNew = !startupData._id;
    const url = isNew 
      ? `${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/my-startup` 
      : `${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/my-startup/${startupData._id}`;
    
    const method = isNew ? "POST" : "PATCH";
     
    try {
        const { data: tokenData } = await authClient.token();
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify(startupData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isNew ? "Startup profile submitted successfully!" : "Changes saved successfully!");
        if (data.data) {
          setStartupData(data.data); 
        }
        setIsEditing(false); 
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed.");
    } finally {
      setActionLoading(false);
    }
  };


  const handleDeleteStartup = async () => {
    try {
       const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/my-startup/${startupData._id}`, {
        method: "DELETE",
         headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
          },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Startup profile deleted successfully!");
        setStartupData({
          _id: "",
          startup_name: "",
          logo: "",
          industry: "",
          description: "",
          funding_stage: "",
          founder_email: session?.user?.email || "",
          status: "Pending"
        });
        setIsEditing(true); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete startup profile.");
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Spinner size="lg" color="primary" label="Loading Workspace..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-20 w-full">
        <p className="text-rose-500 font-bold text-sm md:text-base">Access Denied. Please log in to manage your startup.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6 my-4 md:py-10 md:my-6 animate-fade-in w-full box-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-slate-800/60 pb-5 gap-4 w-full">
        <div className="space-y-1 w-full sm:max-w-xl">
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
            <HiOutlineRocketLaunch className="size-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate">{startupData._id ? "Manage Startup" : "Add New Startup"}</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm break-words">
            {startupData._id ? "View and moderate your registered startup info." : "Register your startup workspace profile on StartupForge."}
          </p>
        </div>

       
        {startupData._id && (
          <div className="flex flex-wrap items-center gap-2.5 sm:justify-end shrink-0">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 rounded-xl border border-amber-200/40 dark:border-amber-900/40 shadow-sm whitespace-nowrap">
              <HiOutlineClock className="size-3.5 animate-pulse text-amber-500" /> {startupData.status || "Pending"}
            </span>

            {!isEditing && (
              <Button 
                size="sm" 
                variant="flat" 
                className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-4 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap"
                onClick={() => setIsEditing(true)}
              >
                <HiOutlinePencilSquare className="size-4 mr-1" /> Edit Startup
              </Button>
            )}
          </div>
        )}
      </div>

    
      <form onSubmit={handleSubmit} className="w-full block">
        <Card className="p-4 sm:p-6 md:p-8 border border-gray-200/60 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] space-y-6 sm:space-y-8 w-full overflow-hidden">
          <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-5 border-b border-gray-50 dark:border-slate-800/40 pb-6 w-full text-center sm:text-left">
            <div className="relative group shrink-0">
              <Avatar 
                src={startupData.logo || undefined} 
                name={startupData.startup_name || "S"}
                className="w-20 h-20 sm:w-24 sm:h-24 text-xl font-black bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm mx-auto"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 text-white flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={uploadingLogo}
                >
                  {uploadingLogo ? <Spinner size="sm" color="white" /> : <HiOutlineCamera className="size-6" />}
                </button>
              )}
            </div>
            
            <div className="space-y-1 w-full">
              <h4 className="text-sm font-bold text-gray-900 dark:text-slate-200">Startup Logo Image</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto sm:mx-0">Upload a square logo. Hosted securely via ImgBB.</p>
              
              {isEditing && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="bordered" 
                    className="text-xs font-bold rounded-xl border-gray-200 dark:border-slate-700 h-8 px-3"
                    onClick={() => fileInputRef.current?.click()}
                    isLoading={uploadingLogo}
                  >
                    Upload New
                  </Button>
                  {startupData.logo && (
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="danger"
                      className="text-xs font-bold rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 h-8 px-3"
                      onClick={() => setStartupData(prev => ({ ...prev, logo: "" }))}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            
            <TextField className="w-full flex flex-col gap-1.5" name="startup_name" isRequired>
              <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Startup Name</Label>
              <Input 
                disabled={!isEditing}
                placeholder="e.g. My Awesome SaaS" 
                value={startupData.startup_name || ""}
                onChange={(e) => setStartupData({ ...startupData, startup_name: e.target.value })}
                className="w-full border-b border-gray-200 dark:border-slate-700 disabled:opacity-60 h-10 outline-none text-sm bg-transparent font-medium text-gray-800 dark:text-slate-100"
              />
            </TextField>

            <TextField className="w-full flex flex-col gap-1.5" name="industry" isRequired>
              <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Industry / Category</Label>
              <Input 
                disabled={!isEditing}
                placeholder="e.g. Fintech, AI, EdTech" 
                value={startupData.industry || ""}
                onChange={(e) => setStartupData({ ...startupData, industry: e.target.value })}
                className="w-full border-b border-gray-200 dark:border-slate-700 disabled:opacity-60 h-10 outline-none text-sm bg-transparent font-medium text-gray-800 dark:text-slate-100"
              />
            </TextField>

            <TextField className="w-full flex flex-col gap-1.5" name="email" type="email">
              <Label className="text-xs font-bold text-gray-600 dark:text-slate-300 flex items-center gap-1">
                <HiOutlineEnvelope className="size-3.5 text-gray-400" /> Founder Email
              </Label>
              <Input 
                disabled={true} 
                placeholder="founder@example.com" 
                value={startupData.founder_email || ""}
                className="w-full border-b border-gray-200 dark:border-slate-700 opacity-60 h-10 outline-none text-sm bg-transparent font-medium text-gray-500 cursor-not-allowed"
              />
            </TextField>

            <div className="flex flex-col gap-1.5 w-full">
              <Label className="text-xs font-bold text-gray-600 dark:text-slate-300 flex items-center gap-1">
                <HiOutlineCurrencyDollar className="size-4 text-gray-400" /> Funding Stage
              </Label>
              <select
                disabled={!isEditing}
                required
                className="w-full h-10 bg-transparent disabled:opacity-60 border-b border-gray-200 dark:border-slate-700 px-1 text-sm outline-none text-gray-800 dark:text-slate-100 font-medium cursor-pointer transition-colors focus:border-indigo-500"
                value={startupData.funding_stage || ""}
                onChange={(e) => setStartupData({ ...startupData, funding_stage: e.target.value })}
              >
                <option value="" disabled>Select funding stage</option>
                <option value="Idea/Bootstrapped">Idea / Bootstrapped</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A+">Series A+</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2 w-full">
              <Label className="text-xs font-bold text-gray-600 dark:text-slate-300">Startup Description</Label>
              <TextArea
                disabled={!isEditing}
                required
                placeholder="Provide a detailed overview of your startup mission..."
                value={startupData.description || ""}
                onChange={(e) => setStartupData({ ...startupData, description: e.target.value })}
                className="w-full min-h-32 border border-gray-200 dark:border-slate-700 disabled:opacity-60 rounded-xl p-3 outline-none text-sm bg-transparent focus:border-indigo-500 transition-colors text-gray-800 dark:text-slate-200 leading-relaxed"
              />
            </div>
          </div>
          {isEditing && (
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-5 border-t border-gray-50 dark:border-slate-800/40 w-full">
              
              {startupData._id ? (
                <Button 
                  type="button" 
                  color="danger"
                  variant="flat"
                  className="font-bold rounded-xl w-full sm:w-auto bg-rose-50 dark:bg-rose-950/30 py-2.5 px-4 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                  onClick={handleDeleteStartup}
                >
                  <HiOutlineTrash className="size-4 mr-1 inline" /> Delete Workspace
                </Button>
              ) : <div className="hidden sm:block"></div>}
              
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto sm:justify-end">
                {startupData._id && (
                  <Button 
                    variant="light" 
                    type="button" 
                    className="font-bold rounded-xl w-full sm:w-auto py-2.5 px-4 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800" 
                    onClick={() => setIsEditing(false)}
                  >
                    <HiXMark className="size-4 mr-1 inline" /> Cancel
                  </Button>
                )}
                
                <Button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-5 py-2.5 w-full sm:w-auto flex items-center justify-center gap-1 shadow-md shadow-indigo-600/10 transition-all"
                  isLoading={actionLoading}
                >
                  {startupData._id ? (
                    <><HiOutlineCheck className="size-4" /> Save Changes</>
                  ) : (
                    <><HiOutlinePlus className="size-4" /> Create Startup Profile</>
                  )}
                </Button>
              </div>

            </div>
          )}

        </Card>
      </form>
    </div>
  );
}