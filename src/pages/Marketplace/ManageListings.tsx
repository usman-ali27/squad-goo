
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaMobileAlt, FaChair } from "react-icons/fa";

const listings = [
  {
    name: "iPhone 13 Pro Max",
    listedDate: "Listed 2 days ago",
    price: "850 SG",
    icon: <FaMobileAlt className="h-8 w-8 text-white" />,
    bgColor: "bg-blue-500",
  },
  {
    name: "Gaming Chair",
    listedDate: "Listed 5 days ago",
    price: "180 SG",
    icon: <FaChair className="h-8 w-8 text-white" />,
    bgColor: "bg-green-500",
  },
];

const ManageListings = () => {
  return (
    <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Current Listings</h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        {listings.map((listing, index) => (
            <Card key={index} className="p-4 shadow-sm">
                <CardContent className="flex items-center justify-between p-0">
                    <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${listing.bgColor}`}>
                        {listing.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800">{listing.name}</h3>
                        <p className="text-sm text-gray-500">{listing.listedDate}</p>
                        <p className="text-md font-bold text-orange-500">{listing.price}</p>
                    </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="purple">Edit</Button>
                        <Button variant="destructive">Delete</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    </div>
  );
};

export default ManageListings;
