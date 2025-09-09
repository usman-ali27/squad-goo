import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Shield, FileText } from "lucide-react";

const TaxInformation = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tax Information</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your tax details for employment and payment processing</p>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your tax information is securely encrypted and will only be used for employment and payment processing purposes.
          </AlertDescription>
        </Alert>

        {/* Tax File Number */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2" />
              Tax File Number (TFN)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tfn">Tax File Number (TFN) *</Label>
              <Input 
                id="tfn" 
                placeholder="Enter your TFN"
                maxLength={11}
                className="max-w-md"
              />
              <div className="flex items-start gap-2 mt-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Either TFN or ABN is mandatory for tax compliance. Your TFN is required for PAYG withholding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Australian Business Number */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Australian Business Number (ABN)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abn">Australian Business Number (ABN)</Label>
              <Input 
                id="abn" 
                placeholder="Enter your ABN"
                maxLength={14}
                className="max-w-md"
              />
              <div className="flex items-start gap-2 mt-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Either TFN or ABN is mandatory. ABN is required if you're operating as a sole trader or business entity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Residency Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Residency Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="residencyStatus">Tax Residency Status *</Label>
              <Select>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select your tax residency status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="australian-resident">Australian Tax Resident</SelectItem>
                  <SelectItem value="foreign-resident">Foreign Resident</SelectItem>
                  <SelectItem value="working-holiday">Working Holiday Maker</SelectItem>
                  <SelectItem value="temporary-resident">Temporary Resident</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Your tax residency status affects your tax rates and obligations in Australia.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryOfResidence">Country of Tax Residence</Label>
              <Select>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="united-states">United States</SelectItem>
                  <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="new-zealand">New Zealand</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Higher Education Loan Program */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Higher Education Loan Program (HELP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Do you have a HELP, VSL, or TSL debt?</Label>
              <Select>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="unsure">I'm not sure</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                If you have a HELP debt, additional tax may be withheld from your payments.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medicare Exemption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medicare Levy Exemption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Are you exempt from the Medicare Levy?</Label>
              <Select>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="full-exemption">Full exemption</SelectItem>
                  <SelectItem value="half-exemption">Half exemption</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Foreign residents and some visa holders may be exempt from the Medicare Levy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tax Declaration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Declaration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                By providing your tax information, you declare that the information is true and correct. 
                False or misleading information may result in penalties.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="declarationDate">Declaration Date</Label>
              <Input 
                id="declarationDate" 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="max-w-md"
                readOnly
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">
            Save Tax Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxInformation;