import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building, Phone, Mail, User, AlertTriangle, Info } from "lucide-react";

const CompanyDetails = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Company Details</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your company information and business details</p>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Building className="h-5 w-5 mr-2" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input 
                  id="companyName" 
                  defaultValue="Pusparaj"
                  placeholder="Enter company name"
                />
                <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input 
                  id="businessName" 
                  defaultValue="Giri"
                  placeholder="Enter business/trading name"
                />
                <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abcAcn">ABC/ACN *</Label>
              <Input 
                id="abcAcn" 
                defaultValue="connect@mybeamlabour.com"
                placeholder="Enter Australian Business Number or Company Number"
              />
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-500">
                  Verified email cannot be changed through app. Contact customer service.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Textarea 
                id="businessAddress" 
                defaultValue="+61 451248192"
                placeholder="Enter complete business address"
                className="min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Director Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2" />
              Director's Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="directorName">Director's Name *</Label>
              <Input 
                id="directorName" 
                defaultValue="Pusparaj"
                placeholder="Enter director's full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="directorPhone">Director's Contact Number *</Label>
              <Input 
                id="directorPhone" 
                defaultValue="Pusparaj"
                placeholder="Enter director's phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="directorEmail">Director's Contact Email *</Label>
              <Input 
                id="directorEmail" 
                type="email"
                defaultValue="Pusparaj"
                placeholder="Enter director's email address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry Type</Label>
                <Input 
                  id="industry" 
                  placeholder="e.g. Information Technology"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of Employees</Label>
                <Input 
                  id="employeeCount" 
                  type="number"
                  placeholder="e.g. 50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Year Founded</Label>
                <Input 
                  id="foundedYear" 
                  type="number"
                  placeholder="e.g. 2015"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input 
                  id="website" 
                  type="url"
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of your company and services..."
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Compliance Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance & Legal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Ensure all company information is accurate and up-to-date. This information is used for legal compliance and verification purposes.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gstRegistered">GST Registration Number</Label>
                <Input 
                  id="gstRegistered" 
                  placeholder="Enter GST number if registered"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workersComp">Workers' Compensation Policy</Label>
                <Input 
                  id="workersComp" 
                  placeholder="Policy number if applicable"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publicLiability">Public Liability Insurance</Label>
                <Input 
                  id="publicLiability" 
                  placeholder="Policy number if applicable"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="professionalIndemnity">Professional Indemnity Insurance</Label>
                <Input 
                  id="professionalIndemnity" 
                  placeholder="Policy number if applicable"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainPhone">Main Phone Number</Label>
                <Input 
                  id="mainPhone" 
                  placeholder="+61 2 1234 5678"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mainEmail">Main Email Address</Label>
                <Input 
                  id="mainEmail" 
                  type="email"
                  placeholder="info@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input 
                  id="supportEmail" 
                  type="email"
                  placeholder="support@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hrEmail">HR Contact Email</Label>
                <Input 
                  id="hrEmail" 
                  type="email"
                  placeholder="hr@company.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">
            Save Company Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;