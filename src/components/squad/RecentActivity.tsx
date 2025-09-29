
import { LayoutList } from 'lucide-react';

const activities = [
  {
    title: 'New Job Match!',
    description: 'Tech Solutions Inc. is interested in your squad profile',
    time: '2 hours ago',
    borderColor: 'border-blue-500',
  },
  {
    title: 'Member Update',
    description: 'Sarah Lee updated her skills and certifications',
    time: '5 hours ago',
    borderColor: 'border-purple-500',
  },
  {
    title: 'Application Sent',
    description: 'Successfully applied to Full Stack Development Team position',
    time: '1 day ago',
    borderColor: 'border-green-500',
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <LayoutList className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Recent Activity</h2>
          <p className="text-sm text-gray-500">Latest squad updates</p>
        </div>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className={`p-4 rounded-lg bg-gray-50 border-l-4 ${activity.borderColor}`}>
            <p className="font-semibold text-gray-800">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
