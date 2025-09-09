import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "University of Sydney",
      startYear: "2018",
      endYear: "2021",
      grade: "Distinction",
      description: "Specialized in Software Engineering and Machine Learning"
    },
    {
      id: 2,
      degree: "Certificate IV in Information Technology",
      institution: "TAFE NSW",
      startYear: "2017",
      endYear: "2018",
      grade: "Pass",
      description: "Foundation course in programming and database management"
    }
  ]);

  const [certifications] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-03",
      expiryDate: "2026-03",
      credentialId: "AWS-ASA-12345"
    },
    {
      id: 2,
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      issueDate: "2022-08",
      expiryDate: "2024-08",
      credentialId: "CSM-67890"
    }
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Qualification & Education</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your educational background and certifications</p>
        </div>

        {/* Education Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </h2>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          {/* Add Education Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree/Qualification *</Label>
                  <Input id="degree" placeholder="e.g. Bachelor of Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input id="institution" placeholder="e.g. University of Sydney" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Year *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endYear">End Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Year or Current" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/GPA</Label>
                  <Input id="grade" placeholder="e.g. Distinction, 3.8 GPA" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eduDescription">Description</Label>
                <Textarea 
                  id="eduDescription" 
                  placeholder="Describe your major, specializations, relevant coursework, achievements..."
                  className="min-h-20"
                />
              </div>

              <Button className="w-full sm:w-auto">
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Education List */}
          <div className="space-y-4">
            {educations.map((edu) => (
              <Card key={edu.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-muted-foreground">{edu.institution}</span>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{edu.startYear} - {edu.endYear}</span>
                        </div>
                        <Badge variant="secondary">{edu.grade}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{edu.description}</p>
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

        {/* Certifications Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications & Licenses
            </h2>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>

          {/* Add Certification Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Certification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certName">Certification Name *</Label>
                  <Input id="certName" placeholder="e.g. AWS Certified Solutions Architect" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization *</Label>
                  <Input id="issuer" placeholder="e.g. Amazon Web Services" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input id="issueDate" type="month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="month" placeholder="Leave empty if no expiry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input id="credentialId" placeholder="Certificate ID/Number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certUrl">Credential URL</Label>
                <Input id="certUrl" type="url" placeholder="Link to verify certification" />
              </div>

              <Button className="w-full sm:w-auto">
                Add Certification
              </Button>
            </CardContent>
          </Card>

          {/* Certifications List */}
          <div className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-muted-foreground">{cert.issuer}</span>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">ID: {cert.credentialId}</Badge>
                        <Badge 
                          variant={new Date(cert.expiryDate) > new Date() ? "default" : "destructive"}
                        >
                          {new Date(cert.expiryDate) > new Date() ? "Valid" : "Expired"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Verify</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;