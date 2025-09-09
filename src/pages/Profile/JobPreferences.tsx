import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Target } from "lucide-react";

const JobPreferences = () => {
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
  const workLocations = ["On-site", "Remote", "Hybrid"];
  const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Design"];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Job Preferences</h1>
          <p className="text-sm text-muted-foreground mt-1">Set your job search preferences and requirements</p>
        </div>

        {/* Job Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="h-5 w-5 mr-2" />
              Employment Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label>Preferred employment types (select multiple)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Work Location Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Work arrangement preferences</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {workLocations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox id={location} />
                    <Label htmlFor={location} className="text-sm">{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredLocation">Preferred Work Locations</Label>
              <Input 
                id="preferredLocation" 
                placeholder="e.g. Sydney, Melbourne, Brisbane"
              />
              <p className="text-xs text-muted-foreground">Separate multiple locations with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCommute">Maximum Commute Distance (km)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Up to 10 km</SelectItem>
                  <SelectItem value="25">Up to 25 km</SelectItem>
                  <SelectItem value="50">Up to 50 km</SelectItem>
                  <SelectItem value="100">Up to 100 km</SelectItem>
                  <SelectItem value="unlimited">No limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Salary Expectations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="h-5 w-5 mr-2" />
              Salary Expectations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minSalary">Minimum Salary (AUD)</Label>
                <Input id="minSalary" type="number" placeholder="e.g. 80000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSalary">Maximum Salary (AUD)</Label>
                <Input id="maxSalary" type="number" placeholder="e.g. 120000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryType">Salary Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select salary type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="project">Per Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Industries & Roles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Industries & Job Roles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Preferred Industries</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox id={industry} />
                    <Label htmlFor={industry} className="text-sm">{industry}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitles">Preferred Job Titles</Label>
              <Input 
                id="jobTitles" 
                placeholder="e.g. Software Developer, Full Stack Engineer"
              />
              <p className="text-xs text-muted-foreground">Separate multiple titles with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Key Skills</Label>
              <Input 
                id="skills" 
                placeholder="e.g. React, Node.js, Python, AWS"
              />
              <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="h-5 w-5 mr-2" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Earliest Start Date</Label>
              <Input id="startDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Current Notice Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="1week">1 week</SelectItem>
                  <SelectItem value="2weeks">2 weeks</SelectItem>
                  <SelectItem value="1month">1 month</SelectItem>
                  <SelectItem value="2months">2 months</SelectItem>
                  <SelectItem value="3months">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHours">Preferred Working Hours</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select working hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (9 AM - 5 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="early">Early (7 AM - 3 PM)</SelectItem>
                  <SelectItem value="late">Late (11 AM - 7 PM)</SelectItem>
                  <SelectItem value="shifts">Shift work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="additionalRequirements">Special Requirements or Preferences</Label>
              <Textarea 
                id="additionalRequirements" 
                placeholder="Any additional requirements, preferences, or information about your job search..."
                className="min-h-24"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="openToRelocate" />
              <Label htmlFor="openToRelocate" className="text-sm">Open to relocating for the right opportunity</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="openToTravel" />
              <Label htmlFor="openToTravel" className="text-sm">Willing to travel for work</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">
            Save Job Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPreferences;