import DashboardSidebar from '@/components/DashboardSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

 const DashboardLayout = ({children}) => {
    return (
       <div className='flex min-h-screen'>
               <DashboardSidebar></DashboardSidebar>
            <div className='flex-1'>
              {children}

            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default DashboardLayout;