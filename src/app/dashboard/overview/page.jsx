// "use client";

// import { Card, Button } from "@heroui/react";
// import { HiOutlineRocketLaunch, HiOutlineBriefcase, HiOutlineUserGroup } from "react-icons/hi2";

// export default function FounderOverview() {
//   return (
//     <div className="space-y-6 p-4 mt-5 md:p-0">
//       <div className="p-3">
//         <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
//           Welcome back, Founder!
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Here is what's happening with your startups today.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  
//         <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
//           <div className="flex items-center gap-4 p-5"> 
//             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950/40 shrink-0">
//               <HiOutlineRocketLaunch className="size-6" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">My Startups</p>
//               <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">2</h3>
//             </div>
//           </div>
//         </Card>
//         <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
//           <div className="flex items-center gap-4 p-5">
//             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-emerald-950/40 shrink-0">
//               <HiOutlineBriefcase className="size-6" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Active Roles</p>
//               <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">5</h3>
//             </div>
//           </div>
//         </Card>

//         <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
//           <div className="flex items-center gap-4 p-5">
//             <div className="p-3 bg-amber-50 text-amber-600 rounded-xl dark:bg-amber-950/40 shrink-0">
//               <HiOutlineUserGroup className="size-6" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Total Applicants</p>
//               <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">12</h3>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
//           <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Applications</h2>
//           <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
//             <p className="text-sm text-gray-400 dark:text-gray-500">No recent applications found.</p>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
//           <div>
//             <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">Quick Actions</h2>
//             <p className="text-xs text-gray-500 mb-4">Manage your startup growth instantly.</p>
//           </div>
//           <Button color="primary" className="font-bold rounded-xl w-full py-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10">
//             + Post New Opportunity
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { HiOutlineRocketLaunch, HiOutlineBriefcase, HiOutlineUserGroup } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function FounderOverview() {
  const { data: session, isPending } = useSession();
  const founderEmail = session?.user?.email;

  const [analytics, setAnalytics] = useState({ myStartups: 0, activeRoles: 0, totalApplicants: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!founderEmail) return;
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/founder/overview?email=${founderEmail}`);
        const data = await res.json();
        if (data.success) {
          setAnalytics(data.analytics);
          setRecentApps(data.recentApplications);
        } else {
          toast.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Server connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [founderEmail]);

 
  const getStatusColor = (status) => {
    if (status?.toLowerCase() === "approved" || status?.toLowerCase() === "accepted") return "success";
    if (status?.toLowerCase() === "rejected") return "danger";
    return "warning";
  };
  if (isPending) {
    return <p className="text-center text-sm text-gray-400 py-20">Loading founder session...</p>;
  }

  return (
    <div className="space-y-6 p-4 mt-15 md:mt-5 md:p-4">
      <div className="p-3">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
          Welcome back, Founder!
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here is what&apos;s happening with your startups today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* My Startups */}
        <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 p-5"> 
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950/40 shrink-0">
              <HiOutlineRocketLaunch className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">My Startups</p>
              <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">
                {loading ? "..." : analytics.myStartups}
              </h3>
            </div>
          </div>
        </Card>

        {/* Active Roles */}
        <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 p-5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-emerald-950/40 shrink-0">
              <HiOutlineBriefcase className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Active Roles</p>
              <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">
                {loading ? "..." : analytics.activeRoles}
              </h3>
            </div>
          </div>
        </Card>

        {/* Total Applicants */}
        <Card className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4 p-5">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl dark:bg-amber-950/40 shrink-0">
              <HiOutlineUserGroup className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Total Applicants</p>
              <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-0.5">
                {loading ? "..." : analytics.totalApplicants}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Applications Table List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Applications</h2>
          
          {loading ? (
            <p className="text-center text-sm text-gray-400 py-10">Loading applications...</p>
          ) : recentApps.length === 0 ? (
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
              <p className="text-sm text-gray-400 dark:text-gray-500">No recent applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800 uppercase font-bold">
                    <th className="pb-3">Applicant</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50 font-medium">
                  {recentApps.map((app) => (
                    <tr key={app.id} className="text-gray-700 dark:text-gray-300">
                      <td className="py-3">
                        <span className="block font-bold text-gray-900 dark:text-white">{app.applicant_name}</span>
                        <span className="text-xs text-gray-400">{app.applicant_email}</span>
                      </td>
                      <td className="py-3 text-indigo-600 dark:text-indigo-400 font-semibold">{app.role_title}</td>
                      <td className="py-3 text-right">
                        <Chip size="sm" variant="flat" color={getStatusColor(app.status)} className="capitalize font-bold">
                          {app.status}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[200px]">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">Quick Actions</h2>
            <p className="text-xs text-gray-500 mb-4">Manage your startup growth instantly.</p>
          </div>
          <Button color="primary" className="font-bold rounded-xl w-full py-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10">
            + Post New Opportunity
          </Button>
        </div>

      </div>
    </div>
  );
}