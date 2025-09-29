
import { Link, CheckCircle } from 'lucide-react';

const SquadPairing = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <Link className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Squad Pairing</h2>
          <p className="text-sm text-gray-500">Add new members to your squad</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobseeker-id" className="text-sm font-medium text-gray-700">JobSeeker ID</label>
          <input
            type="text"
            id="jobseeker-id"
            placeholder="Enter JobSeeker ID"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          Request Pairing
        </button>
      </div>

      <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center">
        <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
        <div>
          <h3 className="font-semibold text-green-800">Pairing Active</h3>
          <p className="text-sm text-green-700">Your squad is ready to receive new members</p>
        </div>
      </div>
    </div>
  );
};

export default SquadPairing;
