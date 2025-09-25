import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FaUpload, FaExclamationTriangle } from "react-icons/fa";

const FileDispute = () => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="select-order">Select Order</Label>
            <Select>
              <SelectTrigger id="select-order">
                <SelectValue placeholder="Choose from recent orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order1">
                  Order #MP12345 - iPhone 14 Pro Max
                </SelectItem>
                <SelectItem value="order2">
                  Order #MP12340 - Honda Civic Purchase
                </SelectItem>
                <SelectItem value="order3">
                  Order #MP12338 - Payment Hold - Laptop
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-2">
              Or enter order number manually
            </p>
            <Input placeholder="Enter order number" />
          </div>

          <div>
            <Label>I am the:</Label>
            <RadioGroup defaultValue="buyer" className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seller" id="seller" />
                <Label htmlFor="seller">Seller</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Transaction Status</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="status1" />
                <Label htmlFor="status1" className="font-normal">
                  Already paid but did not receive item
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status2" />
                <Label htmlFor="status2" className="font-normal">
                  Item received but faulty/not as described
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status3" />
                <Label htmlFor="status3" className="font-normal">
                  Still in process of making deal
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label>Resolution Expected</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="resolution1" />
                <Label htmlFor="resolution1" className="font-normal">
                  Refund my purchase
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="resolution2" />
                <Label htmlFor="resolution2" className="font-normal">
                  Return item back to seller
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="resolution3" />
                <Label htmlFor="resolution3" className="font-normal">
                  Request delivery/pickup ASAP
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="complaint">Detailed Complaint</Label>
            <Textarea
              id="complaint"
              placeholder="Describe your complaint in detail (max 2000 words)..."
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label>Evidence (Screenshots, Documents)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2 flex flex-col items-center">
              <FaUpload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-4">
                Upload screenshots, videos, or chat transcripts
              </p>
              <Button variant="purple">Choose Files</Button>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle
                  className="h-5 w-5 text-yellow-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <span className="font-bold">Important Notice:</span> Once
                  submitted, SG coins equivalent to the order value will be
                  placed on hold until the dispute is resolved. Both parties
                  will be invited to a mediated chat to resolve the issue.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
            <Button variant="destructive" size="lg">
              Submit Dispute
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileDispute;
