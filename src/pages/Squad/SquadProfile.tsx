
import React from 'react';
import ProfileHeader from '@/components/squad/profile/ProfileHeader';
import SquadInfo from '@/components/squad/profile/SquadInfo';
import SquadStats from '@/components/squad/profile/SquadStats';
import SquadBio from '@/components/squad/profile/SquadBio';
import SquadMembers from '@/components/squad/profile/SquadMembers';
import Skills from '@/components/squad/profile/Skills';
import ProfileActions from '@/components/squad/profile/ProfileActions';

const SquadProfile = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <ProfileHeader />
           <div className='bg-gray-100 rounded-lg shadow-sm p-6 space-y-6'>
           <SquadInfo />
            <SquadStats />
            <SquadBio />
            <SquadMembers />
            <Skills />
           </div>
            <ProfileActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadProfile;
