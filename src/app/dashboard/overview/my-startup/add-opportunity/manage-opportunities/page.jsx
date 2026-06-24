// "use client";

// import { useEffect, useState } from "react";
// import { Button, Card, Spinner } from "@heroui/react";
// import toast from "react-hot-toast";
// import { HiOutlineBriefcase, HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";

// export default function ManageOpportunities() {
//   const [opportunities, setOpportunities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 ডাটা ফেচ করা
//   const fetchOpportunities = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/opportunities");
//       const data = await res.json();
//       if (data.success) {
//         setOpportunities(data.data);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load opportunities");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   // 🗑️ ডাটা ডিলিট হ্যান্ডলার
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this opportunity?")) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
//         method: "DELETE",
//         headers:{
//             'content-type':'application/json'
//         },
//       });
//       const data = await res.json();

//       if (data.success) {
//         toast.success("Deleted successfully!");
//         // স্টেট থেকে রিমুভ করা
//         setOpportunities(opportunities.filter((item) => item._id !== id));
//       } else {
//         toast.error("Failed to delete.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Server error occurred.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <Spinner size="lg" color="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-6 px-4 py-8 mt-10 md:p-0">
//       {/* হেডার */}
//       <div className="space-y-1">
//         <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
//           <HiOutlineBriefcase className="size-7 text-indigo-600 dark:text-indigo-400" />
//           Manage Opportunities
//         </h1>
//         <p className="text-gray-500 dark:text-slate-400 text-sm">
//           View, update, or remove your published team requirements.
//         </p>
//       </div>

//       {/* সুযোগের লিস্ট বা টেবিল */}
//       {opportunities.length === 0 ? (
//         <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
//           <p className="text-gray-400 font-medium">No opportunities published yet.</p>
//         </Card>
//       ) : (
//         <Card className="overflow-x-auto border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-sm">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 text-xs font-bold uppercase bg-gray-50/50 dark:bg-[#1f2937]/30">
//                 <th className="p-4">Role Title</th>
//                 <th className="p-4">Work Type</th>
//                 <th className="p-4">Commitment</th>
//                 <th className="p-4">Deadline</th>
//                 <th className="p-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm">
//               {opportunities.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-[#1f2937]/20 transition-colors">
//                   <td className="p-4 font-semibold text-gray-900 dark:text-slate-200">{item.role_title}</td>
//                   <td className="p-4 text-gray-600 dark:text-slate-400">{item.work_type}</td>
//                   <td className="p-4 text-gray-600 dark:text-slate-400">{item.commitment_level}</td>
//                   <td className="p-4 text-gray-600 dark:text-slate-400">{item.deadline}</td>
//                   <td className="p-4 text-right space-x-2">
//                     {/* 📝 এডিট বাটন (পরবর্তীতে এটাতে মডাল বা রাউট সেট করা যাবে) */}
//                     <Button isIconOnly size="sm" variant="light" className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30" onClick={() => toast("Update functionality can be added here!")}>
//                       <HiOutlinePencilSquare className="size-5" />
//                     </Button>
//                     {/* 🗑️ ডিলিট বাটন */}
//                     <Button isIconOnly size="sm" variant="light" className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" onClick={() => handleDelete(item._id)}>
//                       <HiOutlineTrash className="size-5" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Card>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { Button, Card, Spinner } from "@heroui/react";
// import toast from "react-hot-toast";
// import { HiOutlineBriefcase, HiOutlineTrash, HiOutlinePencilSquare, HiOutlineCalendarDays, HiOutlineMapPin, HiOutlineClock } from "react-icons/hi2";
// import EditOpportunityModal from "@/components/dashboard/EditOpportunityModal";


// export default function ManageOpportunities() {
//   const [opportunities, setOpportunities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const fetchOpportunities = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/my-opportunities");
//       const data = await res.json();
      
//       if (Array.isArray(data)) {
//         setOpportunities(data);
//       } else if (data && data.success && Array.isArray(data.data)) {
//         setOpportunities(data.data);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load opportunities");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, []);

//   const handleDelete = async (e, id) => {
//     e.stopPropagation(); 
    
//     try {
//       const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
//         method: "DELETE",
//         headers: { 'content-type': 'application/json' },
//       });
//       const data = await res.json();
//        console.log(data ,'r')
//       if (data.success) {
//         toast.success("Deleted successfully!");
//         setOpportunities(prev =>
//   prev.filter(item => item._id !== id)
// );
//       } else {
//         toast.error("Failed to delete.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Server error occurred.");
//     }
//   };

//   const handleEditClick = (item) => {
//     setSelectedOpportunity(item);
//      setTimeout(()=>{
//     setIsModalOpen(true);
//   },50);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <Spinner size="lg" color="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-6 px-4 py-8 mt-10 md:mt-10 md:p-0">
//       <div className="space-y-1">
//         <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
//           <HiOutlineBriefcase className="size-6 md:size-7 text-indigo-600 dark:text-indigo-400" />
//           Manage Opportunities
//         </h1>
//         <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm">
//           View, update, or remove your published team requirements.
//         </p>
//       </div>
//       {opportunities.length === 0 ? (
//         <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
//           <p className="text-gray-400 font-medium">No opportunities published yet.</p>
//         </Card>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
//             {opportunities.map((item) => (
//               <Card key={item._id} className="p-5 border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-sm space-y-4">
//                 <div>
//                   <h3 className="font-bold text-gray-900 dark:text-slate-200 text-base">{item.role_title}</h3>
//                   <p className="text-xs text-gray-400 mt-1">Skills: {item.required_skills}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-slate-400 pt-2 border-t border-gray-50 dark:border-slate-800/50">
//                   <span className="flex items-center gap-1"><HiOutlineMapPin className="text-indigo-500 shrink-0" /> {item.work_type}</span>
//                   <span className="flex items-center gap-1"><HiOutlineClock className="text-indigo-500 shrink-0" /> {item.commitment_level}</span>
//                   <span className="flex items-center gap-1 col-span-2 mt-1"><HiOutlineCalendarDays className="text-indigo-500 shrink-0" /> Deadline: {item.deadline}</span>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-2 border-t border-gray-50 dark:border-slate-800/50">
//                   <Button size="sm" variant="flat" className="text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40" startContent={<HiOutlinePencilSquare />} onClick={() => handleEditClick(item)}>
//                     Edit
//                   </Button>
//                   <Button size="sm" variant="flat" color="danger" className="font-semibold" startContent={<HiOutlineTrash />} onClick={(e) => handleDelete(e, item._id)}>
//                     Delete
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//           <Card className="hidden md:block overflow-x-auto border border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-sm">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 text-xs font-bold uppercase bg-gray-50/50 dark:bg-[#1f2937]/30">
//                   <th className="p-4">Role Title</th>
//                   <th className="p-4">Work Type</th>
//                   <th className="p-4">Commitment</th>
//                   <th className="p-4">Deadline</th>
//                   <th className="p-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm">
//                 {opportunities.map((item) => (
//                   <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-[#1f2937]/20 transition-colors">
//                     <td className="p-4 font-semibold text-gray-900 dark:text-slate-200">{item.role_title}</td>
//                     <td className="p-4 text-gray-600 dark:text-slate-400">{item.work_type}</td>
//                     <td className="p-4 text-gray-600 dark:text-slate-400">{item.commitment_level}</td>
//                     <td className="p-4 text-gray-600 dark:text-slate-400">{item.deadline}</td>
//                     <td className="p-4 text-right space-x-2">
//                       <Button isIconOnly size="sm" variant="light" className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30" onClick={() => handleEditClick(item)}>
//                         <HiOutlinePencilSquare className="size-5" />
//                       </Button>
//                       <Button isIconOnly size="sm" variant="light" className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" onClick={(e) => handleDelete(e, item._id)}>
//                         <HiOutlineTrash className="size-5" />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card>
//         </>
//       )}
//       <EditOpportunityModal 
//          isOpen={isModalOpen}
//  onOpenChange={setIsModalOpen}
//  onClose={()=>setIsModalOpen(false)}
//  opportunity={selectedOpportunity}
//  setOpportunities={setOpportunities}
//  opportunities={opportunities}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "@heroui/react";
import toast from "react-hot-toast";
// 🎯 রিয়্যাক্ট আইকনস (react-icons/hi2) এর পারফেক্ট পাথ
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
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOpportunities = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/my-opportunities");
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
    fetchOpportunities();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    
    try {
      const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-8 mt-10 md:p-0">
      
      {/* হেডার সেকশন */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <HiOutlineBriefcase className="size-6 md:size-7 text-indigo-600 dark:text-indigo-400" />
          Manage Opportunities
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm">
          View, update, or remove your published team requirements.
        </p>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      {opportunities.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-sm">
          <p className="text-gray-400 font-medium">No opportunities published yet.</p>
        </Card>
      ) : (
        /* 🎯 রেসপন্সিভ কার্ড লেআউট (মোবাইল, ট্যাবলেট ও ডেস্কটপ সব এক সাথে হ্যান্ডেল করবে) */
        <div className="flex flex-col gap-4 w-full">
          {opportunities.map((item) => (
            <Card 
              key={item._id} 
              className="p-5 md:p-6 border border-gray-200/60 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* 📂 বামপাশ: রোল টাইটেল, স্কিল ব্যাজ এবং মেটা ইনফো */}
              <div className="space-y-3 flex-1">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base md:text-lg tracking-tight">
                    {item.role_title}
                  </h3>
                  
                  {/* স্কিল চিপস/ব্যাজসমূহ */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.required_skills?.split(',').map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 text-[11px] font-bold tracking-wide bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg uppercase"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* আইকন সহ মেটা ডেটা */}
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

              {/* 🛠️ ডানপাশ: এডিট এবং ডিলিট স্কয়ার বাটন */}
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
          ))}
        </div>
      )}

      {/* এডিট মডাল */}
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
