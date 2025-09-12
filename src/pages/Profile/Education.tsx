
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Plus, Save, Trash2 } from "lucide-react";

const EducationItem = () => (
  <Card className="border-l-4 border-l-purple-600 overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between bg-gray-50 p-4">
      <CardTitle className="text-base font-semibold">Bachelor of Computer Science</CardTitle>
      <div className="flex items-center gap-1">
        <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700">
          Edit
        </Button>
        <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
          Delete
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500">
          <Copy className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500">
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="qual-type">Qualification Type</Label>
          <Input id="qual-type" value="Bachelor's Degree" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Input id="institution" value="University of Sydney" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
          <Label htmlFor="year-completed">Year Completed</Label>
          <Input id="year-completed" value="2019" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">Grade/GPA</Label>
          <Input id="grade" value="Distinction" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const QualificationItem = () => (
  <Card className="border-l-4 border-l-purple-600 overflow-hidden">
    <CardHeader className="bg-gray-50 p-4">
      <CardTitle className="text-base font-semibold">AWS Certified Developer</CardTitle>
    </CardHeader>
    <CardContent className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cert-name">Certification Name</Label>
          <Input id="cert-name" value="AWS Certified Developer - Associate" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuing-org">Issuing Organization</Label>
          <Input id="issuing-org" value="Amazon Web Services" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="issue-date">Issue Date</Label>
          <Input id="issue-date" value="03/09/2025" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry-date">Expiry Date</Label>
          <Input id="expiry-date" value="07/15/2028" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Education = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Qualifications & Education</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      {/* Educational Details Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-purple-700">Educational Details</h3>
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
        <EducationItem />
      </div>

      {/* Extra Qualifications Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-semibold text-purple-700">Extra Qualifications</h3>
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Qualification
          </Button>
        </div>
        <QualificationItem />
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
          Save All Qualification
        </Button>
      </div>
    </div>
  );
};

export default Education;
