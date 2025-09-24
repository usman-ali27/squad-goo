
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TicketPercent, 
  ClipboardCheck, 
  CircleDollarSign,
  Eye
} from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#fdc29e] border-none p-4 rounded-lg">
          <CardContent className="p-0 grid grid-cols-2 items-center">
            <div className="col-span-1">
              <p className="text-base font-bold text-gray-700">Active Offers</p>
              <div className="p-2 bg-gray-600 rounded-md inline-block my-2">
                <TicketPercent className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="col-span-1 text-right flex flex-col gap-4">
              <p className="text-3xl font-bold text-gray-800">04</p>
              <p className="text-sm text-gray-500">2 Quick | 1 Manual</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#fdc29e] border-none p-4 rounded-lg">
          <CardContent className="p-0 grid grid-cols-2 items-center">
            <div className="col-span-1">
              <p className="text-base font-bold text-gray-700">Acceptance Rate</p>
              <div className="p-2 rounded-md inline-block my-2">
                <ClipboardCheck className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <div className="col-span-1 text-right flex flex-col gap-4">
              <p className="text-3xl font-bold text-gray-800">84%</p>
              <p className="text-sm text-gray-500">Good</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#fdc29e] border-none p-4 rounded-lg">
          <CardContent className="p-0 grid grid-cols-2 items-center">
            <div className="col-span-1">
              <p className="text-base font-bold text-gray-700">This Month Earning</p>
              <div className="p-2 rounded-md inline-block my-2">
                <CircleDollarSign className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <div className="col-span-1 text-right flex flex-col gap-4">
              <p className="text-3xl font-bold text-gray-800">123.50</p>
              <p className="text-sm text-green-500">54% Increased</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#fdc29e] border-none p-4 rounded-lg">
          <CardContent className="p-0 grid grid-cols-2 items-center">
            <div className="col-span-1">
              <p className="text-base font-bold text-gray-700">Profile Views</p>
              <div className="p-2 rounded-md inline-block my-2">
                <Eye className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <div className="col-span-1 text-right flex flex-col gap-4">
              <p className="text-3xl font-bold text-gray-800">40</p>
              <p className="text-sm text-red-500">54% Decreased</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest News */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Latest News</h2>
        <hr/>
        <Card className="border border-orange-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Enhanced AI System <Badge variant="secondary" className="ml-2">News</Badge>
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Discover and connect with the perfect candidates for your business needs Discover and connect
                </p>
              </div>
              <p className="text-xs text-gray-500">2 Days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
