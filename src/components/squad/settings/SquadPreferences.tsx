
import { Target } from 'lucide-react';

const industries = ["Technology", "Software Development", "Finance", "Healthcare", "E-commerce"];
const workTypes = ["Remote", "On-site", "Hybrid"];

const SquadPreferences = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <Target className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Squad Preferences</h2>
          <p className="text-sm text-gray-500">Set job preferences for your squad</p>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="industries" className="text-sm font-medium text-gray-700">Preferred Industries</label>
          <select
            id="industries"
            multiple
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            defaultValue={["Technology", "Software Development"]}
          >
            {industries.map(industry => (
              <option key={industry}>{industry}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="work-type" className="text-sm font-medium text-gray-700">Work Type</label>
          <select
            id="work-type"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            defaultValue="Remote"
          >
            {workTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="min-rate" className="text-sm font-medium text-gray-700">Minimum Squad Rate (per hour)</label>
          <input
            type="number"
            id="min-rate"
            defaultValue={500}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          Update Preferences
        </button>
      </form>
    </div>
  );
};

export default SquadPreferences;
