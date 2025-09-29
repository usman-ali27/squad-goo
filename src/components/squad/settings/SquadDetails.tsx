
import { FileText } from 'lucide-react';

const SquadDetails = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <FileText className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Squad Details</h2>
          <p className="text-sm text-gray-500">Update squad information</p>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="squad-name" className="text-sm font-medium text-gray-700">Squad Name</label>
          <input
            type="text"
            id="squad-name"
            defaultValue="Tech Innovators Squad"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="squad-bio" className="text-sm font-medium text-gray-700">Squad Bio</label>
          <textarea
            id="squad-bio"
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            defaultValue="We are a diverse team of tech professionals specializing in full-stack development, UI/UX design, and project management. Together, we deliver innovative solutions."
          />
        </div>
        <div>
          <label htmlFor="combined-exp" className="text-sm font-medium text-gray-700">Combined Experience</label>
          <input
            type="text"
            id="combined-exp"
            defaultValue="25+ Years Combined"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SquadDetails;
