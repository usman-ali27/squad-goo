import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaMinus, FaLock } from "react-icons/fa";
import { FiPlus, FiRepeat, FiClock } from "react-icons/fi";

const transactions = [
  {
    type: "iPhone Sale",
    order: "#MP12345",
    amount: "+850 SG",
    time: "2 hours ago",
    icon: <FaPlus className="text-green-500" />,
    color: "text-green-500",
  },
  {
    type: "Honda Civic Purchase",
    order: "#MP12340",
    amount: "-15,500 SG",
    time: "1 day ago",
    icon: <FaMinus className="text-red-500" />,
    color: "text-red-500",
  },
  {
    type: "Payment Hold - Laptop",
    order: "#MP12338",
    amount: "Hold: 350 SG",
    time: "3 days ago",
    icon: <FaLock className="text-yellow-500" />,
    color: "text-yellow-500",
  },
];

const MarketplaceWallet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">SG Coin Wallet</h1>

      <Card className="bg-purple-600 text-white shadow-lg mb-6">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Available Balance</p>
            <p className="text-4xl font-bold">1,250 SG</p>
            <p className="text-sm opacity-80">≈ $1,250 AUD</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Funds on Hold</p>
            <p className="text-2xl font-bold">350 SG</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-green-500 text-white text-center py-6 cursor-pointer hover:bg-green-600 transition-all">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <FiPlus className="h-8 w-8 mb-2" />
            <p className="font-semibold">Top Up</p>
            <p className="text-xs opacity-80">Add SG Coins</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500 text-white text-center py-6 cursor-pointer hover:bg-blue-600 transition-all">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <FiRepeat className="h-8 w-8 mb-2" />
            <p className="font-semibold">Withdraw</p>
            <p className="text-xs opacity-80">Convert to AUD</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 text-white text-center py-6 cursor-pointer hover:bg-purple-600 transition-all">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <FiClock className="h-8 w-8 mb-2" />
            <p className="font-semibold">History</p>
            <p className="text-xs opacity-80">View transactions</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        {transaction.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.type}</p>
                      <p className="text-sm text-gray-500">{transaction.order}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.color}`}>{transaction.amount}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplaceWallet;
