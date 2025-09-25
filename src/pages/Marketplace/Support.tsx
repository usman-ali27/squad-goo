import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaGavel, FaHeadset, FaQuestion } from "react-icons/fa";
import FileDispute from "./FileDispute";
import GeneralSupport from "./GeneralSupport";
import FAQ from "./FAQ";

const supportOptions = [
  {
    title: "Dispute Resolution",
    description: "Report issues with orders",
    icon: <FaGavel className="h-10 w-10 text-white" />,
    bgColor: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    id: "dispute",
  },
  {
    title: "General Support",
    description: "Chat, call or email support",
    icon: <FaHeadset className="h-10 w-10 text-white" />,
    bgColor: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
    id: "general",
  },
  {
    title: "FAQ",
    description: "Marketplace help center",
    icon: <FaQuestion className="h-10 w-10 text-white" />,
    bgColor: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    id: "faq",
  },
];

const MarketplaceSupport = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleCardClick = (section: string) => {
    setActiveSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Marketplace Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {supportOptions.map((option, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(option.id)}
            className={`text-white p-6 rounded-lg shadow-lg cursor-pointer transition-all ${option.bgColor} ${option.hoverColor}`}>
            <CardContent className="flex flex-col items-center justify-center text-center p-0">
              <div className="mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{option.title}</h3>
              <p className="text-sm opacity-90">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeSection === "dispute" && (
        <div className="mt-8 shadow-md bg-white p-4 rounded-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">File a Dispute</h1>
          <FileDispute />
        </div>
      )}

      {activeSection === "general" && <GeneralSupport />}

      {activeSection === "faq" && <FAQ />}
    </div>
  );
};

export default MarketplaceSupport;
