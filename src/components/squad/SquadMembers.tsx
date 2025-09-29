
import { Users, User, Plus } from 'lucide-react';

const squadStats = [
  { value: '5', label: 'Members' },
  { value: '12', label: 'Applications' },
  { value: '3', label: 'Offers' },
];

const squadMembers = [
  { initials: 'JD', name: 'John Doe', role: 'Software Developer', isAdmin: true },
  { initials: 'JS', name: 'Jane Smith', role: 'UI/UX Designer' },
  { initials: 'MJ', name: 'Mike Johnson', role: 'Project Manager' },
  { initials: 'SL', name: 'Sarah Lee', role: 'Data Analyst' },
  { initials: 'TC', name: 'Tom Chen', role: 'DevOps Engineer' },
];

const SquadMembers = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
            5
          </div>
        </div>
        <h1 className="text-xl font-bold mt-4">Tech Innovators Squad</h1>
        <p className="text-sm text-gray-500 mt-1">Professional Squad • Active</p>
      </div>

      <div className="flex justify-around text-center my-6">
        {squadStats.map(stat => (
          <div key={stat.label}>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Squad Members</h2>
          <button className="bg-orange-500 text-white px-3 py-1 text-sm rounded-md flex items-center hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {squadMembers.map(member => (
            <li key={member.name} className="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-50">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                {member.initials}
              </div>
              <div className="flex-grow">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              {member.isAdmin && (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                  ADMIN
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SquadMembers;
