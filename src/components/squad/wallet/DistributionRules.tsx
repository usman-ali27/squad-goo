
import { Scale } from 'lucide-react';

const DistributionRules = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <Scale className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Distribution Rules</h2>
          <p className="text-sm text-gray-500">Configure automatic distribution</p>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="distribution-method" className="text-sm font-medium text-gray-700">Distribution Method</label>
          <select
            id="distribution-method"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            defaultValue="Equal Distribution"
          >
            <option>Equal Distribution</option>
            <option>Percentage Based</option>
            <option>Manual</option>
          </select>
        </div>
        <div>
          <label htmlFor="auto-distribute" className="text-sm font-medium text-gray-700">Auto-distribute when balance exceeds</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              id="auto-distribute"
              className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="10000"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          Save Distribution Rules
        </button>
      </form>
    </div>
  );
};

export default DistributionRules;
