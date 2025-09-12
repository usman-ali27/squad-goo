
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CompanyDetailsRecruiter = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Company Details</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" defaultValue="Pusparaj" disabled />
            <p className="text-xs text-red-500">Cannot be changed after KYC verification</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" defaultValue="Giri" disabled />
            <p className="text-xs text-red-500">Cannot be changed after KYC verification</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="acn">ABC/ACN</Label>
          <Input id="acn" defaultValue="connect@mybeamlabor.com" disabled />
          <p className="text-xs text-green-600">Verified email cannot be changed through app. Contact customer service.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-address">Business Address</Label>
          <Input id="business-address" defaultValue="+61 451348192" />
        </div>

        <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold">Director's Name</h3>
            <Input id="director-name" defaultValue="Pushparaj" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="director-contact">Director's Contact Number</Label>
          <Input id="director-contact" defaultValue="Pushparaj" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="director-email">Director's Contact Email</Label>
          <Input id="director-email" defaultValue="Pushparaj" />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetailsRecruiter;
