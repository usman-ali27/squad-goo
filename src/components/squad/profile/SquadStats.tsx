
import { Star } from 'lucide-react';

const StatsCard = ({ value, label, icon }: { value: string, label: string, icon?: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <p className="text-3xl font-bold flex items-center justify-center">
        {value} {icon}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};

const SquadStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard value="100%" label="Success Rate" />
      <StatsCard value="15+" label="Projects Done" />
      <StatsCard value="4.9" label="Average Rating" icon={<Star size={20} className="text-yellow-400 ml-1" />} />
    </div>
  );
};

export default SquadStats;
