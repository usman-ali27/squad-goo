
import { Settings, ChevronRight } from 'lucide-react';

const managementOptions = [
  { label: 'Transfer Admin Rights' },
  { label: 'Remove Member' },
  { label: 'Squad Privacy Settings' },
];

const SquadManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <Settings className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Squad Management</h2>
          <p className="text-sm text-gray-500">Configure squad settings</p>
        </div>
      </div>
      <div className="space-y-3">
        {managementOptions.map(option => (
          <button key={option.label} className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
            <span>{option.label}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        ))}
        <button className="w-full flex justify-between items-center bg-red-100 hover:bg-red-200 text-red-600 font-medium py-3 px-4 rounded-lg transition-colors">
          <span>Leave Squad</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SquadManagement;
