import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Award } from "lucide-react";

const badgeFeatures = {
  bronze: [
    "Minimum 3 months registration",
    "Accepted minimum 2 job offers (Financial or Squad)",
    "Good badge displayed on profile with status",
    "Profile listed higher on filtered rank view as volunteers",
    "2FA code required for all job offers through platform",
    "Accelerated rating count results",
    "Up to 50 coins for each completed job offers",
    "Free badge for all life once each qualified as bronze",
    "Badge expires if profile rank drops"
  ],
  platinum: [
    "Minimum 6 months registration",
    "Accepted minimum 5 job offers (Financial or Squad)",
    "Platinum badge displayed on profile with status",
    "Profile listed higher on filtered rank view as volunteers",
    "Premium features for job offers from top allocators",
    "VIP event support (better than manual speed)",
    "Accelerated rating count every 3 months",
    "Up to 100 coins for each completed job offers",
    "Badge expires if profile rank drops for 3 months",
    "Up to 50 SG coins service for each referral"
  ],
  gold: [
    "Minimum 12 months registration",
    "Accepted minimum 10 job offers (Financial or Squad)",
    "Gold badge displayed on profile with status",
    "Profile listed higher on filtered rank view as volunteers",
    "Advanced features for gold staff from both recruiters and individuals",
    "VIP event support (better than manual speed)",
    "Accelerated rating count every 3 months",
    "Up to 150 SG coins service for each referral",
    "Up to 100 SG coins service for each referral"
  ]
};

const AccountUpgrades = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8 px-6 rounded-xl">
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
      <div className="grid md:grid-cols-3 gap-6">
        {/* Bronze Badge */}
        <Card className="relative overflow-hidden border-2 border-orange-200 hover:border-orange-300 transition-colors">
          <CardHeader className="text-center bg-gradient-to-b from-orange-50 to-white">
            <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl font-bold text-orange-600">BRONZE BADGE</CardTitle>
            <div className="text-2xl font-bold">20 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1">
                <li>• Minimum 3 months registration</li>
                <li>• Accepted minimum 2 job offers</li>
                <li>• (Financial or Squad)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Bronze Benefits</h4>
              <ul className="text-sm space-y-1">
                {badgeFeatures.bronze.slice(2, 6).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Apply For Bronze Badge
            </Button>
          </CardContent>
        </Card>

        {/* Platinum Badge */}
        <Card className="relative overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardHeader className="text-center bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
              <Star className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-600">PLATINUM BADGE</CardTitle>
            <div className="text-2xl font-bold">99 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-600 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1">
                <li>• Minimum 6 months registration</li>
                <li>• Accepted minimum 5 job offers</li>
                <li>• (Financial or Squad)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-600 mb-2">Platinum Benefits</h4>
              <ul className="text-sm space-y-1">
                {badgeFeatures.platinum.slice(2, 6).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
              Apply For Platinum Badge
            </Button>
          </CardContent>
        </Card>

        {/* Gold Badge */}
        <Card className="relative overflow-hidden border-2 border-yellow-300 hover:border-yellow-400 transition-colors">
          <CardHeader className="text-center bg-gradient-to-b from-yellow-50 to-white">
            <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-fit">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl font-bold text-yellow-600">GOLD BADGE</CardTitle>
            <div className="text-2xl font-bold">199 SG COINS</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1">
                <li>• Minimum 12 months registration</li>
                <li>• Accepted minimum 10 job offers</li>
                <li>• (Financial or Squad)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Gold Benefits</h4>
              <ul className="text-sm space-y-1">
                {badgeFeatures.gold.slice(2, 6).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
              Apply For Gold Badge
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Extra Purchases Section */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-orange-500 mb-2">Extra Purchases</h2>
        <p className="text-center text-gray-600 mb-8">
          These premium services are suggested to all users that has included in any badge membership
        </p>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Resume/Experience Verification</CardTitle>
              <div className="text-2xl font-bold text-orange-500">50 SG COINS/year</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">What You Get:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Purchase Verification Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountUpgrades;