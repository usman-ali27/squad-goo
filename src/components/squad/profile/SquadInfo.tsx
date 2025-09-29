
import { Users } from 'lucide-react';

const SquadInfo = () => {
  return (
    <div className="text-center">
      <div className="inline-block bg-purple-100 p-4 rounded-full">
        <Users className="text-purple-600" size={40} />
      </div>
      <h2 className="mt-4 text-2xl font-bold">Tech Innovators Squad</h2>
      <p className="mt-1 text-sm text-gray-500">5 Professional Members • 25+ Years Combined Experience</p>
    </div>
  );
};

export default SquadInfo;
