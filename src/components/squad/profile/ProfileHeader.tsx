
import { Users } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <div className="flex items-center space-x-4 border-b border-gray-200 py-2">
      <div className="bg-purple-100 p-3 rounded-lg">
        <Users className="text-purple-600" size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold">Squad Public Profile</h1>
        <p className="text-sm text-gray-500">This is how recruiters see your squad</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
