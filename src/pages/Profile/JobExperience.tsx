
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash } from "lucide-react";

const JobExperience = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Experience</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <Button className="bg-green-600 hover:bg-green-700 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add new Experience
      </Button>

      <Card className="border-l-4 border-l-purple-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Software Developer</CardTitle>
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
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value="Information Technology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" value="Software Developer" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              value="Developed and maintained web applications using modern technologies..."
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Expected Pay Rate Range (per hour)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="number" value="25" />
                <Input type="number" value="45" />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Input id="from-date" value="01/15/2025" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input id="to-date" value="05/14/2035" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
      </div>
    </div>
  );
};

export default JobExperience;
