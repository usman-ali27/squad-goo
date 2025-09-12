
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Edit, Plus, Trash } from "lucide-react";

const JobPreferences = () => {
  const availabilityDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const offerTypes = ["Manual Offers", "Quick Offers"];
  const taxOptions = ["TFN", "ABN"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Preferences</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <Button className="bg-green-600 hover:bg-green-700 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add new Preference
      </Button>

      <Card className="border-l-4 border-l-purple-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Software Development Role</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-500">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Preferred Industry</Label>
              <Input id="industry" value="Information Technology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Preferred Job Title</Label>
              <Input id="job-title" value="Software Developer" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Expected Pay Range (per hour)</Label>
            <div className="flex items-center gap-4">
              <Input type="number" value="30" />
              <span>to</span>
              <Input type="number" value="50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Availability</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Days Available</Label>
                <div className="flex flex-wrap gap-4">
                  {availabilityDays.map(day => (
                    <div key={day} className="flex items-center gap-2">
                      <Checkbox id={day.toLowerCase()} defaultChecked={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(day)} className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"/>
                      <Label htmlFor={day.toLowerCase()} className="font-normal">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Time Range</Label>
                <div className="flex items-center gap-4">
                  <Input type="time" value="09:00" />
                  <Input type="time" value="17:00" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Offer Types</Label>
            <div className="flex flex-wrap gap-4">
              {offerTypes.map(type => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox id={type.toLowerCase().replace(' ', '-')} defaultChecked className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"/>
                  <Label htmlFor={type.toLowerCase().replace(' ', '-')} className="font-normal">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance">Receive Offers within (km from home)</Label>
            <Input id="distance" type="number" value="25" className="max-w-xs" />
          </div>

          <div className="space-y-2">
            <Label>Tax file Options</Label>
            <RadioGroup defaultValue="tfn" className="flex gap-6">
              {taxOptions.map(option => (
                <div key={option} className="flex items-center gap-2">
                  <RadioGroupItem value={option.toLowerCase()} id={option.toLowerCase()} className="text-orange-500"/>
                  <Label htmlFor={option.toLowerCase()} className="font-normal">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
      </div>
    </div>
  );
};

export default JobPreferences;
