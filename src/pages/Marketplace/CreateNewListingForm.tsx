
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FiCamera } from 'react-icons/fi';

const CreateNewListingForm = () => {
    return (
        <div className="mt-12 shadow-md bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Listing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="listing-category" className="block text-sm font-medium text-gray-700 mb-1">Listing Category</label>
                    <Select>
                        <SelectTrigger id="listing-category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vehicles">Vehicles</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="property">Property</SelectItem>
                            <SelectItem value="tools">Tools</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="item-title" className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                    <Input id="item-title" placeholder="Enter a descriptive title" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (SG Coins)</label>
                    <Input id="price" placeholder="e.g., 500" />
                </div>
                <div>
                    <label htmlFor="delivery-charge" className="block text-sm font-medium text-gray-700 mb-1">Delivery Charge (Optional)</label>
                    <Input id="delivery-charge" placeholder="e.g., 20" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input id="location" placeholder="e.g., Melbourne, VIC" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea id="description" placeholder="Describe your item in detail..." rows={4} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FiCamera className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload photos or drag and drop</p>
                        <Button variant="ghost" className="mt-4">Choose Photos</Button>
                    </div>
                </div>
                <div className="md:col-span-2 flex items-center">
                    <Checkbox id="squad-courier" />
                    <label htmlFor="squad-courier" className="ml-2 block text-sm text-gray-900">Include Squad Courier delivery service</label>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
                <Button variant="outline" size="lg">Cancel</Button>
                <Button variant="orange" size="lg">Submit for Review</Button>
            </div>
        </div>
    );
};

export default CreateNewListingForm;
