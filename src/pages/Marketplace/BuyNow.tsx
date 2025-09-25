
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaCar, FaLaptop, FaCouch, FaTshirt, FaHome, FaTools, FaFutbol, FaEllipsisH, FaMapMarkerAlt, FaMotorcycle, FaMobileAlt } from 'react-icons/fa';

const categories = [
  { name: 'Vehicles', icon: <FaCar /> },
  { name: 'Electronics', icon: <FaLaptop /> },
  { name: 'Furniture', icon: <FaCouch /> },
  { name: 'Clothing', icon: <FaTshirt /> },
  { name: 'Property', icon: <FaHome /> },
  { name: 'Tools', icon: <FaTools /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Other', icon: <FaEllipsisH /> },
];

const items = [
  {
    name: 'iPhone 14 Pro Max',
    description: '256GB, Space Black, Excellent condition',
    price: '950 SG',
    location: 'Melbourne, VIC',
    time: '2 hours ago',
    icon: <FaMobileAlt className="h-16 w-16 text-white" />,
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Honda CBR 600RR',
    description: '2019, 15,000km, Great condition',
    price: '8,500 SG',
    location: 'Sydney, NSW',
    time: '5 hours ago',
    icon: <FaMotorcycle className="h-16 w-16 text-white" />,
    bgColor: 'bg-teal-500',
  },
  {
    name: 'Leather Sofa Set',
    description: '3-seater, Brown leather, Like new',
    price: '650 SG',
    location: 'Brisbane, QLD',
    time: '1 day ago',
    icon: <FaCouch className="h-16 w-16 text-white" />,
    bgColor: 'bg-pink-500',
  },
  {
    name: 'Macbook Pro M2',
    description: '13\", 256GB SSD, Space Grey',
    price: '1,850 SG',
    location: 'Perth, WA',
    time: '3 days ago',
    icon: <FaLaptop className="h-16 w-16 text-white" />,
    bgColor: 'bg-yellow-500',
  },
    {
    name: 'iPhone 14 Pro Max',
    description: '256GB, Space Black, Excellent condition',
    price: '950 SG',
    location: 'Melbourne, VIC',
    time: '2 hours ago',
    icon: <FaMobileAlt className="h-16 w-16 text-white" />,
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Honda CBR 600RR',
    description: '2019, 15,000km, Great condition',
    price: '8,500 SG',
    location: 'Sydney, NSW',
    time: '5 hours ago',
    icon: <FaMotorcycle className="h-16 w-16 text-white" />,
    bgColor: 'bg-teal-500',
  },
  {
    name: 'Leather Sofa Set',
    description: '3-seater, Brown leather, Like new',
    price: '650 SG',
    location: 'Brisbane, QLD',
    time: '1 day ago',
    icon: <FaCouch className="h-16 w-16 text-white" />,
    bgColor: 'bg-pink-500',
  },
  {
    name: 'Macbook Pro M2',
    description: '13\", 256GB SSD, Space Grey',
    price: '1,850 SG',
    location: 'Perth, WA',
    time: '3 days ago',
    icon: <FaLaptop className="h-16 w-16 text-white" />,
    bgColor: 'bg-yellow-500',
  },
];

const BuyNow = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Marketplace Items</h1>

      {/* Categories */}
      <div className="mb-8 shadow-md bg-white p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Button key={index} variant={index === 0 ? 'orange' : 'outline'} className="flex flex-col h-24 items-center justify-center gap-2">
              <div className="text-2xl">{category.icon}</div>
              <span className="text-sm">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <div className={`h-40 flex items-center justify-center ${item.bgColor}`}>
                {item.icon}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <p className="font-bold text-lg text-green-600 mb-3">{item.price}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {item.location}</span>
                <span>{item.time}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="w-full">Chat</Button>
                <Button variant="orange" className="w-full">Buy</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BuyNow;
