
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KYCVerification = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">KYC Verification</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      {/* Identity and Address Verification */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Identity and Address Verification</h3>
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex-grow">
            <h4 className="font-semibold">Identity Verification</h4>
            <p className="text-sm text-gray-500">Verify your identity using government-issued ID</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">Not Verified</Badge>
            <Button className="bg-orange-500 hover:bg-orange-600">Start Identity Verification</Button>
          </div>
        </div>
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex-grow">
            <h4 className="font-semibold">Address Verification</h4>
            <p className="text-sm text-gray-500">Verify your residential address</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">Pending</Badge>
            <Button disabled variant="outline">In Progress</Button>
          </div>
        </div>
      </div>

      {/* Resume Verification */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Resume Verification</h3>
        <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h4 className="font-semibold">Professional Experience Verification</h4>
                    <p className="text-sm text-gray-500">Premium service - Manual verification of your work experience and references</p>
                    <p className="text-orange-500 font-bold mt-1">$99 AUD</p>
                </div>
                <Badge variant="destructive" className="bg-red-100 text-red-600 border-red-200">Not Started</Badge>
            </div>
              <div className="mt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                  Purchase & start verification
                </Button>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-500 mt-4 space-y-1">
                <li>Verified experience badge on profile</li>
                <li>Higher priority in job matching</li>
                <li>Downloadable verification certificate</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
