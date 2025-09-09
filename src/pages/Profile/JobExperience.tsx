import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Calendar, Building } from "lucide-react";

const JobExperience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      jobTitle: "Senior Software Developer",
      company: "Tech Solutions Inc.",
      location: "Sydney, Australia",
      startDate: "2022-01",
      endDate: "Present",
      description: "Led development of scalable web applications using React and Node.js. Managed a team of 5 developers and implemented CI/CD pipelines."
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer", 
      company: "Digital Innovations",
      location: "Melbourne, Australia",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Developed and maintained multiple client websites using modern web technologies. Collaborated with design teams to implement responsive user interfaces."
    }
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Job Experience</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your professional work experience</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {/* Add New Experience Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Add New Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle" placeholder="e.g. Software Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input id="company" placeholder="e.g. ABC Company" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Sydney, Australia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input id="startDate" type="month" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="month" placeholder="Leave empty if current" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your responsibilities, achievements, and key projects..."
                className="min-h-24"
              />
            </div>

            <Button className="w-full sm:w-auto">
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Experience List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Experience</h2>
          {experiences.map((exp) => (
            <Card key={exp.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.jobTitle}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="text-sm">{exp.company}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobExperience;