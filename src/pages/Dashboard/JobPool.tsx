
import { Button } from "@/components/ui/button";

const offers = [
  {
    jobTitle: "Frontend Developer",
    recruiter: "Tech Solutions",
    date: "2025-09-01",
    status: "Active",
  },
  {
    jobTitle: "UI/UX Designer",
    recruiter: "Creative Minds",
    date: "2025-09-03",
    status: "Active",
  },
];

const JobPool = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Job Pool</h1>
        
        <div className="flex justify-center gap-2 mb-8">
          <Button className="bg-purple-700 text-white">Active Offers</Button>
          <Button variant="ghost" className="text-gray-600">Expired Offers</Button>
          <Button variant="ghost" className="text-gray-600">Declined Offers</Button>
          <Button variant="ghost" className="text-gray-600">Completed Offers</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="p-4 rounded-l-lg">Job Title</th>
                <th className="p-4">Recruiter</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-medium">{offer.jobTitle}</td>
                  <td className="p-4">{offer.recruiter}</td>
                  <td className="p-4">{offer.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button variant="orange" size="sm">View</Button>
                    <Button variant="orange" size="sm">Request Modification</Button>
                    <Button variant="orange" size="sm">Accept</Button>
                    <Button variant="orange" size="sm">Close</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobPool;
