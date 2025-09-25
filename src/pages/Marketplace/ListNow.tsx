
import { Card, CardContent } from "@/components/ui/card";
import { FiPlus, FiList } from 'react-icons/fi';
import { Link, Outlet } from "react-router-dom";

const ListNow = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sell Your Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/marketplace/list/new">
            <Card className="bg-orange-400 text-white text-center hover:bg-orange-500 transition-colors h-40 flex flex-col justify-center items-center">
                <CardContent className="p-0">
                <FiPlus className="h-12 w-12 mx-auto mb-2" />
                <h2 className="text-xl font-semibold">Add New Listing</h2>
                <p>Create a new item listing in our marketplace</p>
                </CardContent>
            </Card>
        </Link>
        <Link to="/marketplace/list/manage">
            <Card className="bg-purple-600 text-white text-center hover:bg-purple-700 transition-colors h-40 flex flex-col justify-center items-center">
                <CardContent className="p-0">
                <FiList className="h-12 w-12 mx-auto mb-2" />
                <h2 className="text-xl font-semibold">View/Edit Current Listings</h2>
                <p>Manage your existing marketplace listings</p>
                </CardContent>
            </Card>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ListNow;
