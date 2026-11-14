

import DashboardSidebar from '@/components/DashboardSidebar';
import React from 'react';
// import { Toaster } from 'react-hot-toast';
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return redirect("/login");
  }
  if (!session.user.role) {
    return redirect("/select-role"); 
  }

  return (
    <DashboardSidebar>
      {children}
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </DashboardSidebar>
  );
};

export default DashboardLayout;