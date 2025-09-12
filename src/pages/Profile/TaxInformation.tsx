
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const TaxInformation = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tax Information</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <form className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="tfn">Tax File Number (TFN)</Label>
          <Input id="tfn" placeholder="Enter your TFN" />
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox id="tfn-mandatory" disabled checked className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"/>
            <Label htmlFor="tfn-mandatory" className="text-sm font-normal text-gray-500">
              Either TFN or ABN is mandatory
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="abn">Australian Business Number (ABN)</Label>
          <Input id="abn" placeholder="Enter your ABN" />
           <div className="flex items-center space-x-2 pt-1">
            <Checkbox id="abn-mandatory" disabled checked className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"/>
            <Label htmlFor="abn-mandatory" className="text-sm font-normal text-gray-500">
              Either TFN or ABN is mandatory
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-residency">Tax Residency Status</Label>
          <Input id="tax-residency" value="Australian Tax Resident" />
        </div>

        <div className="flex justify-start pt-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Save Tax Information
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaxInformation;
