import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle,
  Clock,
  AlertCircle,
  Plus
} from "lucide-react";

const Documents = () => {
  const [documents] = useState([
    {
      id: 1,
      name: "Bachelor of Computer Science Certificate",
      type: "Education Certificate",
      uploadDate: "March 18, 2024",
      fileSize: "2.3 MB",
      status: "verified",
      format: "PDF"
    },
    {
      id: 2, 
      name: "AWS Certification",
      type: "Professional Certificate", 
      uploadDate: "March 20, 2024",
      fileSize: "1.8 MB",
      status: "pending-review",
      format: "PDF"
    },
    {
      id: 3,
      name: "Resume - Software Developer",
      type: "Resume/CV",
      uploadDate: "April 1, 2024", 
      fileSize: "456 kB",
      status: "experience-verified",
      format: "PDF"
    },
    {
      id: 4,
      name: "Experience Verification Certificate",
      type: "Work Experience",
      uploadDate: "April 5, 2024",
      fileSize: "234 kB", 
      status: "official-certificate",
      format: "PDF"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case "pending-review":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>;
      case "experience-verified": 
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Experience Verified</Badge>;
      case "official-certificate":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Official Certificate</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case "experience-verified":
      case "official-certificate":
        return (
          <Button size="sm" className="bg-accent hover:bg-accent-hover">
            Download
          </Button>
        );
      case "pending-review":
        return (
          <Button size="sm" variant="outline">
            Download
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline">
            Delete
          </Button>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Documents & Certificates</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload and manage your professional documents</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-full">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Upload Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Click to browse or drag and drop your files here.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, PNG, JPG, DOC, DOCX (Max file size: 10MB)
                  </p>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Document Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume">Resume/CV</SelectItem>
                    <SelectItem value="cover-letter">Cover Letter</SelectItem>
                    <SelectItem value="education">Education Certificate</SelectItem>
                    <SelectItem value="professional">Professional Certificate</SelectItem>
                    <SelectItem value="license">License</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="reference">Reference Letter</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="docName">Document Name</Label>
                <Input id="docName" placeholder="Enter document name" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Upload Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-gray-50 rounded">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{doc.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>{doc.format}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {getActionButton(doc.status)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="p-3 bg-blue-50 rounded-full w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Education Documents</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Degrees, certificates, transcripts
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="p-3 bg-green-50 rounded-full w-fit mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Certifications</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Professional certificates, licenses
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="p-3 bg-purple-50 rounded-full w-fit mx-auto mb-3">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">Portfolio Items</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Work samples, projects, references
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Accepted Formats</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PDF (Recommended)</li>
                  <li>• Microsoft Word (.doc, .docx)</li>
                  <li>• Images (.jpg, .png)</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use clear, descriptive file names</li>
                  <li>• Ensure documents are readable</li>
                  <li>• Keep documents up to date</li>
                  <li>• Organize by document type</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;