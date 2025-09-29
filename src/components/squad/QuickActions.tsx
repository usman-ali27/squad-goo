
import { Zap } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <Zap className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Quick Actions</h2>
          <p className="text-sm text-gray-500">Manage your squad efficiently</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors w-full">
          Update Squad Bio
        </button>
        <button className="bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors w-full">
          Edit Preferences
        </button>
        <button className="bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors w-full">
          View Applications
        </button>
        <button className="bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors w-full">
          Manage Members
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
