
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountUpgrades = () => {
  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      {/* Header */}
      <div className="text-center">
        <div className="bg-[#2A004E] text-white py-8 px-6 rounded-xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">ACCOUNT UPGRADES</h1>
          <p className="text-purple-100">
            Unlock premium features and showcase your professional credibility with our exclusive badge system
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-8">Premium Badge System</h2>
      </div>

      {/* Badge Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Bronze Badge */}
        <Card className="border-2 border-transparent hover:border-orange-300 transition-colors bg-[#F9F6F3] p-3 flex flex-col">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-[#D97706]">BRONZE BADGE</CardTitle>
            <div className="text-2xl font-bold text-[#4F3F7C]">20 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Minimum 6 months registration</li>
                <li>• Accepted minimum 2 job offers (manual or quick)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-center">Bronze Benefits</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="bg-white p-3 rounded-lg text-center">Bronze badge displayed on profile card, visible to all recruiters</div>
                <div className="bg-white p-3 rounded-lg text-center">Eligible for receiving payments of quick jobs through platform</div>
                <div className="bg-white p-3 rounded-lg text-center">Acceptance rating reset annually</div>
                <div className="bg-white p-3 rounded-lg text-center">Up to 5 SG coins for each successful referral</div>
              </div>
            </div>
          </CardContent>
          <div className="mt-auto pt-6">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Apply For Bronze Badge
            </Button>
          </div>
        </Card>

        {/* Platinum Badge */}
        <Card className="border-2 border-transparent hover:border-gray-400 transition-colors bg-[#F9F6F3] p-3 flex flex-col">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-[#D97706]">PLATINUM BADGE</CardTitle>
            <div className="text-2xl font-bold text-[#4F3F7C]">99 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Minimum 6 months registration</li>
                <li>• Accepted minimum 4 job offers (manual or quick)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-center">Platinum Benefits</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="bg-white p-3 rounded-lg text-center">Platinum badge displayed on profile card, visible to all</div>
                <div className="bg-white p-3 rounded-lg text-center">Payments for quick jobs from both recruiters and individuals</div>
                <div className="bg-white p-3 rounded-lg text-center">VIP level support (faster than normal users)</div>
                <div className="bg-white p-3 rounded-lg text-center">Acceptance rating reset every 6 months</div>
                <div className="bg-white p-3 rounded-lg text-center">Platinum level compensation for no-fault cancellations</div>
                <div className="bg-white p-3 rounded-lg text-center">Up to 10 SG coins bonus on each referral</div>
              </div>
            </div>
          </CardContent>
          <div className="mt-auto pt-6">
            <Button className="w-full bg-gray-400 hover:bg-gray-500 text-white">
              Apply For Platinum Badge
            </Button>
          </div>
        </Card>

        {/* Gold Badge */}
        <Card className="border-2 border-transparent hover:border-yellow-400 transition-colors bg-[#F9F6F3] p-3 flex flex-col">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-[#D97706]">GOLD BADGE</CardTitle>
            <div className="text-2xl font-bold text-[#4F3F7C]">199 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Minimum 12 months registration</li>
                <li>• Accepted minimum 10 job offers (manual or quick)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-center">Gold Benefits</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="bg-white p-3 rounded-lg text-center">Gold badge displayed on profile card, visible to all</div>
                <div className="bg-white p-3 rounded-lg text-center">Payments for quick jobs from both recruiters and individuals</div>
                <div className="bg-white p-3 rounded-lg text-center">VIP level support (faster than normal users)</div>
                <div className="bg-white p-3 rounded-lg text-center">Acceptance rating reset every 4 months</div>
                <div className="bg-white p-3 rounded-lg text-center">Up to 50 SG coins for no-fault cancellations</div>
                <div className="bg-white p-3 rounded-lg text-center">Up to 20 SG coins bonus on each referral</div>
              </div>
            </div>
          </CardContent>
          <div className="mt-auto pt-6">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Apply For Gold Badge
            </Button>
          </div>
        </Card>
      </div>

      {/* Extra Purchases Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-2">Extra Purchases</h2>
        <p className="text-gray-600 text-sm">
          These premium services are available to all users and are not included in any badge membership
        </p>
      </div>

      <Card className="max-w-4xl bg-[#f1ebeb] border-none mt-8">
        <CardContent className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Resume/Experience Verification</CardTitle>
              <p className="text-gray-600 mt-2 max-w-lg">
                Get your professional credentials verified and showcase your expertise with our comprehensive verification service. Stand out from the crowd with authenticated experience and qualifications.
              </p>
            </div>
            <div className="text-xl font-bold text-orange-500">50 SG COINS/year</div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-600 mb-4">What You Get:</h4>
            <div className="space-y-3">
              <div className="bg-[#F9F6F3] shadow-md p-4 rounded-lg">PRO Verification Badge displayed on your profile</div>
              <div className="bg-[#F9F6F3] shadow-md p-4 rounded-lg">Each verified experience marked as "Verified" when viewed by recruiters</div>
              <div className="bg-[#F9F6F3] shadow-md p-4 rounded-lg">Enhanced profile credibility and trust score</div>
              <div className="bg-[#F9F6F3] shadow-md p-4 rounded-lg">Higher visibility in recruiter searches</div>
            </div>

            <div className="bg-ray-50 p-4 rounded-lg mt-6">
              <strong>Validity:</strong> 12 months from purchase date. One-time annual expense with automatic renewal option.
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Purchase verification Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountUpgrades;
