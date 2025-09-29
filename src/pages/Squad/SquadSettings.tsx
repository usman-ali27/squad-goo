
import React from 'react';
import SquadPairing from '@/components/squad/settings/SquadPairing';
import SquadManagement from '@/components/squad/settings/SquadManagement';
import SquadDetails from '@/components/squad/settings/SquadDetails';
import SquadPreferences from '@/components/squad/settings/SquadPreferences';

const SquadSettings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <SquadPairing />
        <SquadPreferences />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SquadManagement />
          <SquadDetails />
        </div>
      </div>
    </div>
  );
};

export default SquadSettings;
