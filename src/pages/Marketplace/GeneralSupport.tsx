import { Card, CardContent } from "@/components/ui/card";
import {
  FaComments,
  FaPhoneAlt,
  FaTicketAlt,
  FaEnvelope,
} from "react-icons/fa";

const generalSupportOptions = [
  {
    title: "Live Chat",
    description: "Chat with support agent",
    icon: <FaComments className="h-10 w-10 text-white" />,
    bgColor: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    title: "Request Callback",
    description: "We'll call you back",
    icon: <FaPhoneAlt className="h-10 w-10 text-white" />,
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    title: "Create Ticket",
    description: "Submit support request",
    icon: <FaTicketAlt className="h-10 w-10 text-white" />,
    bgColor: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
  },
  {
    title: "Email Support",
    description: "Send us an email",
    icon: <FaEnvelope className="h-10 w-10 text-white" />,
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
  },
];

const GeneralSupport = () => {
  return (
    <div className="mt-8 shadow-md bg-white p-4 rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">General Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generalSupportOptions.map((option, index) => (
          <Card
            key={index}
            className={`text-white p-6 rounded-lg shadow-lg cursor-pointer transition-all ${option.bgColor} ${option.hoverColor}`}>
            <CardContent className="flex items-center p-0">
              <div className="mr-6">{option.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{option.title}</h3>
                <p className="text-sm opacity-90">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneralSupport;
