
"use client";

import { useEffect, useState, useRef } from "react";
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
  HiOutlineArrowLeftOnRectangle, 
  HiBars3BottomLeft,           
  HiOutlineInboxArrowDown,
  HiOutlineUserCircle,
  HiOutlineChartBar,         
  HiOutlineUsers,            
  HiOutlineShieldCheck,      
  HiOutlineCreditCard
} from "react-icons/hi2";
import { FaAngleDoubleLeft } from "react-icons/fa";

export default function DashboardSidebar({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role || "collaborator"; 

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const profileLink =
    userRole === "collaborator"
      ? "/dashboard/collaborator/my-applications/my-profile"
      : "/dashboard/overview";

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
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
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
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 mt-4 border-t border-gray-200 dark:border-gray-800 pt-4 w-full text-left cursor-pointer"
      >
        <HiOutlineArrowLeftOnRectangle className="size-5 shrink-0" />
        <span>Logout</span>
      </button>
    </nav>
  );

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <span className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex transition-colors duration-300">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 p-4 lg:block bg-white dark:bg-gray-900 h-screen sticky top-0 transition-colors duration-300 flex flex-col justify-between">
        <div>
          <div className="h-12 flex items-center px-2 mb-6 justify-center gap-10">
            <Link href={'/'}>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
                StartupForge
              </span>
            </Link>
            <Link href={'/'}>
              <p className="">
                <FaAngleDoubleLeft className="text-xl text-indigo-600 dark:text-indigo-400 tracking-wider" />
              </p>
            </Link>
          </div>
          {navLink}
        </div>
      </aside>

      {/* --- MOBILE DRAWER (For small screens) --- */}
      <Drawer key={pathname}>
        <Button className="lg:hidden fixed top-3 left-4 z-50 font-bold rounded-none h-10 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100" variant="flat">
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

      {/* --- MAIN CONTENT & TOP NAVBAR AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 px-6 flex items-center justify-between shadow-xs transition-colors duration-300">
          <div className="lg:hidden"></div> {/* Spacer for mobile menu button */}
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 capitalize">
              {userRole} Portal
            </h1>
          </div>

          {/* Right Profile Dropdown */}
          <div className="relative ml-auto flex items-center gap-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              {user?.image ? (
                <img src={user.image} alt={user?.name || "User"} className="w-9 h-9 rounded-full object-cover border border-indigo-500/30" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <HiOutlineUserCircle className="size-6" />
                </div>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-56   rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                  <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                    {user?.name || "User"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </div>
                  <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {userRole}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href={profileLink}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        {children && (
          <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
            {children}
          </main>
        )}
      </div>

    </div>
  );
}
