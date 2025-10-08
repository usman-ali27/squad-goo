
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiAlertTriangle, FiClock, FiTrendingUp } from 'react-icons/fi';
import { RiMegaphoneLine, RiCopperCoinLine } from 'react-icons/ri';

const MarketplaceDashboard = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Marketplace Dashboard</h1>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-l-4 border-orange-400">
          <CardContent className="flex items-center justify-between p-4 md:p-6">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">Pending Orders</p>
              <p className="text-3xl font-bold truncate">7</p>
            </div>
            <FiClock className="h-8 w-8 text-orange-400 flex-shrink-0" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-red-500">
          <CardContent className="flex items-center justify-between p-4 md:p-6">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">Active Disputes</p>
              <p className="text-3xl font-bold truncate">2</p>
            </div>
            <FiAlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardContent className="flex items-center justify-between p-4 md:p-6">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">SG Wallet</p>
              <p className="text-3xl font-bold truncate">1,250</p>
            </div>
            <RiCopperCoinLine className="h-8 w-8 text-green-500 flex-shrink-0" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <CardContent className="flex items-center justify-between p-4 md:p-6">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">Items Sold</p>
              <p className="text-3xl font-bold truncate">23</p>
            </div>
            <FiTrendingUp className="h-8 w-8 text-blue-500 flex-shrink-0" />
          </CardContent>
        </Card>
      </div>

      {/* Important Updates Banner */}
      <div className="bg-purple-600 text-white rounded-lg p-4 flex items-center gap-4 mb-6">
        <RiMegaphoneLine className="h-6 w-6 flex-shrink-0" />
        <p className="font-semibold hidden sm:block flex-shrink-0">Important Updates</p>
        <p className="flex-1 min-w-0">New Squad Courier service now available! Get your items delivered safely with our verified delivery partners.</p>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            {/* Recent Transactions */}
            <Card>
                <CardContent className="p-4 md:p-6">
                <h2 className="font-semibold text-lg mb-4">Recent Transactions</h2>
                <ul className="divide-y divide-gray-200">
                    <li className="py-3 flex justify-between items-center">
                        <div className="min-w-0">
                            <p className="font-medium truncate">iPhone 13 Pro</p>
                            <p className="text-sm text-gray-500 truncate">Sold to John D.</p>
                        </div>
                        <p className="text-green-500 font-bold ml-2">+850 SG</p>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                        <div className="min-w-0">
                            <p className="font-medium truncate">Honda Civic 2020</p>
                            <p className="text-sm text-gray-500 truncate">Purchased from Sarah M.</p>
                        </div>
                        <p className="text-red-500 font-bold ml-2">-15,500 SG</p>
                    </li>
                     <li className="py-3 flex justify-between items-center">
                        <div className="min-w-0">
                            <p className="font-medium truncate">Gaming Chair</p>
                            <p className="text-sm text-gray-500 truncate">Sold to Mike R.</p>
                        </div>
                        <p className="text-green-500 font-bold ml-2">+180 SG</p>
                    </li>
                </ul>
                </CardContent>
            </Card>
        </div>

        {/* Dispute Notifications */}
        <div>
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="font-semibold text-lg mb-4">Dispute Notifications</h2>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <FiAlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0"/>
                        <div className="min-w-0">
                             <p className="font-semibold truncate">Order #MP12345</p>
                            <p className="text-sm text-gray-600">Laptop dispute requires your response</p>
                            <Button variant="link" className="p-0 h-auto text-red-600">View Details</Button>
                        </div>
                    </div>
                </div>
                 <div className="bg-yellow-50 border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <FiClock className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0"/>
                        <div className="min-w-0">
                            <p className="font-semibold truncate">Order #MP12340</p>
                            <p className="text-sm text-gray-600">Payment held - awaiting delivery confirmation</p>
                            <Button variant="link" className="p-0 h-auto text-yellow-600">View Details</Button>
                        </div>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDashboard;
