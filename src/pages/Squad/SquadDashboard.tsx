
import React from 'react';
import SquadMembers from '@/components/squad/SquadMembers';
import QuickActions from '@/components/squad/QuickActions';
import RecentActivity from '@/components/squad/RecentActivity';

const SquadDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <SquadMembers />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};

export default SquadDashboard;
