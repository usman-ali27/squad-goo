import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  MapPin, 
  FileText,
  CreditCard,
  Download
} from "lucide-react";

const KYCVerification = () => {
  const verificationSteps = [
    {
      id: "identity",
      title: "Identity Verification",
      description: "Verify your identity using government-issued ID",
      status: "not-verified",
      icon: User,
      details: "Upload a clear photo of your driver's license, passport, or other government ID"
    },
    {
      id: "address", 
      title: "Address Verification",
      description: "Verify your residential address",
      status: "pending",
      icon: MapPin,
      details: "Upload a recent utility bill, bank statement, or government letter"
    },
    {
      id: "resume",
      title: "Resume Verification", 
      description: "Professional experience verification",
      status: "not-started",
      icon: FileText,
      details: "Premium service - Manual verification of your work experience and references"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const overallProgress = 33; // Example: 1 of 3 steps completed

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6" />
            KYC Verification
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Complete your verification to access all platform features</p>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verification Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{overallProgress}% Complete</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Complete all verification steps to unlock premium features and increase your profile trustworthiness.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Identity and Address Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Identity and Address Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Identity Verification */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Identity Verification</h3>
                    <p className="text-sm text-muted-foreground">Verify your identity using government-issued ID</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Not Verified
                </Badge>
              </div>
              
              <Button className="w-full sm:w-auto">
                Start Identity Verification
              </Button>
            </div>

            {/* Address Verification */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Address Verification</h3>
                    <p className="text-sm text-muted-foreground">Verify your residential address</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Pending
                </Badge>
              </div>
              
              <Button variant="outline" className="w-full sm:w-auto">
                In Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Resume Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Professional Experience Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium service - Manual verification of your work experience and references
                  </p>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      $29 AUD
                    </Badge>
                  </div>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-200">
                Not Started
              </Badge>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-sm">Premium Verification Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Manual verification of work history</li>
                <li>• Reference checks with previous employers</li>
                <li>• Higher priority in job matching</li>
                <li>• Downloadable verification certificate</li>
              </ul>
            </div>

            <Button className="w-full sm:w-auto">
              Purchase & Start Verification
            </Button>
          </CardContent>
        </Card>

        {/* Example Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Example Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Driver License Example */}
              <div className="space-y-2">
                <div className="bg-blue-600 text-white p-2 text-center text-sm font-medium rounded-t">
                  DRIVER LICENSE
                </div>
                <div className="border border-blue-600 rounded-b p-4 space-y-2">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="font-medium">D 1234567890</div>
                      <div>NAME SURNAME</div>
                      <div>123 EXAMPLE ST</div>
                      <div>DOB: 12.01.1990</div>
                      <div>EXP: 12.01.2030</div>
                      <div className="text-right">CLASS: C</div>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <div className="text-xs text-center bg-black text-white py-1">
                      ||||||||||||||||||||||||||||||||||
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Card Example */}
              <div className="space-y-2">
                <div className="bg-blue-500 text-white p-2 text-center text-sm font-medium rounded-t">
                  IDENTIFICATION CARD
                </div>
                <div className="border border-blue-500 rounded-b p-4 space-y-3">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="font-medium">1234567890</div>
                      <div>John Doe</div>
                      <div>123 Main Street</div>
                      <div>Sydney NSW 2000</div>
                      <div>DOB: 01/01/1990</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <CreditCard className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Verification Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure documents are clear and readable</li>
                  <li>• All four corners must be visible</li>
                  <li>• No shadows or glare on the document</li>
                  <li>• Documents must be current and valid</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground">
                  If you're having trouble with verification, our support team is here to help.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYCVerification;