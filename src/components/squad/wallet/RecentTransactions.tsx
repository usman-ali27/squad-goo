
import { TrendingUp } from 'lucide-react';

const transactions = [
  {
    title: "Project Completion Payment",
    from: "From: Tech Solutions Inc.",
    amount: "+$5,000",
    color: "text-green-500",
  },
  {
    title: "Distribution to Members",
    from: "5 members",
    amount: "-$3,000",
    color: "text-red-500",
  },
  {
    title: "Milestone Payment",
    from: "From: StartupXYZ",
    amount: "+$2,500",
    color: "text-green-500",
  },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Recent Transactions</h2>
          <p className="text-sm text-gray-500">Squad wallet activity</p>
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">{tx.title}</p>
              <p className="text-sm text-gray-500">{tx.from}</p>
            </div>
            <p className={`font-bold text-lg ${tx.color}`}>{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
