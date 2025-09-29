
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SquadHeader from './SquadHeader';
import SquadSubNav from './SquadSubNav';
import Footer from '../Footer';
import DashboardHeader from '../DashboardHeader';

const SquadLayout = () => {
   const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <SquadSubNav/>
      <main className="p-4 sm:p-4 lg:p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SquadLayout;
