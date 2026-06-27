"use client";

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// রিয়্যাক্ট আইকনস
import { 
  HiOutlineSquares2X2,       
  HiOutlineRocketLaunch,     
  HiOutlineFolderPlus,       
  HiOutlineBriefcase,        
  HiOutlineQueueList,        
  HiOutlineMagnifyingGlass,  
  HiOutlineArrowLeftOnRectangle, 
  HiBars3BottomLeft,          
  HiOutlineInboxArrowDown,
  HiOutlineUserCircle,
  // 
  HiOutlineChartBar,         
  HiOutlineUsers,            
  HiOutlineShieldCheck,      
  HiOutlineCreditCard

} from "react-icons/hi2";
import { FaAngleDoubleLeft, FaArrowLeft } from "react-icons/fa";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();


  const { data: session, isPending } = authClient.useSession();
  const userRole = session?.user?.role || "collaborator"; 


  const founderItems = [
    { name: "Overview", href: "/dashboard/overview", icon: HiOutlineSquares2X2 },
    { name: "My Startup", href: "/dashboard/overview/my-startup", icon: HiOutlineRocketLaunch },
    { name: "Add Opportunity", href: "/dashboard/overview/my-startup/add-opportunity", icon: HiOutlineFolderPlus },
    { name: "Manage Opportunities", href: "/dashboard/overview/my-startup/add-opportunity/manage-opportunities", icon: HiOutlineBriefcase },
    { name: "Applications", href: "/dashboard/overview/my-startup/add-opportunity/applications", icon: HiOutlineInboxArrowDown },
    
  ];

 
  const collaboratorItems = [
    { name: "Overview", href: "/dashboard/collaborator", icon: HiOutlineSquares2X2 },
    { name: "My Applications", href: "/dashboard/collaborator/my-applications", icon: HiOutlineQueueList },
    { name: "My Profile", href: "/dashboard/collaborator/my-applications/my-profile", icon: HiOutlineUserCircle },
    { name: "Track Status", href: "/dashboard/overview/my-applications/explore-projects/track-status", icon: HiOutlineBriefcase },
  ];

  const adminItems = [
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: HiOutlineChartBar },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: HiOutlineUsers },
    { name: "Moderation", href: "/dashboard/admin/moderation", icon: HiOutlineShieldCheck },
    { name: "Payments", href: "/dashboard/admin/payments", icon: HiOutlineCreditCard },
  ];

  let currentMenu = collaboratorItems;
  if (userRole === "admin") {
    currentMenu = adminItems;
  } else if (userRole === "founder") {
    currentMenu = founderItems;
  }


  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const navLink = (
    <nav className="flex flex-col gap-1 w-full">
      {currentMenu.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-gray-400 hover:bg-gray-800/60"
            }`}
            href={item.href}
          >
            <Icon className="size-5 shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
      
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-950/30 transition-all duration-200 mt-4 border-t border-gray-800 pt-4 w-full text-left"
      >
        <HiOutlineArrowLeftOnRectangle className="size-5 shrink-0" />
        <span>Logout</span>
      </button>
    </nav>
  );

  if (isPending) {
    return <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block h-screen" />;
  }

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block bg-white dark:bg-gray-900 h-screen sticky top-0 transition-colors duration-300">
        <div className="h-12 flex items-center px-2 mb-6 justify-center gap-10">
         <Link href={'/'}> <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
            StartupForge
          </span></Link>
           <Link href={'/'}><p className=""><FaAngleDoubleLeft className="text-xl text-indigo-600 dark:text-indigo-400 tracking-wider" /></p></Link>
        </div>
        {navLink}
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-default z-40 flex items-center justify-end px-6 shadow-sm">
       <Link href={'/'}>
        <span className="text-md font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
          StartupForge
        </span>
       </Link>
      </div>
      <Drawer key={pathname}>
        <Button className="lg:hidden fixed top-3 left-4 z-50 font-bold rounded-none h-10 bg-gray-100 dark:bg-gray-800 text-foreground" variant="flat">
          <HiBars3BottomLeft className="size-5" />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-white dark:bg-gray-900 max-w-xs">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header className="border-b border-gray-100 dark:border-gray-800 py-4">
                <Drawer.Heading className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
                  StartupForge
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="py-4">
                {navLink}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}