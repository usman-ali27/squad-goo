
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, Download, Trash2 } from "lucide-react";

const documents = [
  {
    title: "Bachelor of Computer Science Certificate",
    details: "Uploaded: March 15, 2024 - 2.3 MB",
    status: "Verified",
    statusVariant: "green",
  },
  {
    title: "AWS Certification",
    details: "Uploaded: March 20, 2024 - 1.8 MB",
    status: "Pending Review",
    statusVariant: "yellow",
  },
  {
    title: "Resume - Software Developer",
    details: "Uploaded: April 1, 2024 - 456 KB",
    status: "Experience Verified",
    statusVariant: "blue",
  },
  {
    title: "Experience Verification Certificate",
    details: "Generated: April 5, 2024 - 324 KB",
    status: "Official Certificate",
    statusVariant: "green",
    isOfficial: true,
  },
];

const DocumentItem = ({ doc }) => {
  const getStatusClasses = (variant) => {
    switch (variant) {
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex items-start gap-4">
        <FileText className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold">{doc.title}</p>
          <p className="text-sm text-gray-500">{doc.details}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center">
        <Badge variant="outline" className={getStatusClasses(doc.statusVariant)}>{doc.status}</Badge>
        {doc.isOfficial ? (
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4"/>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const DocumentsAndCertificates = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Documents & Certificates</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-2">
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-semibold">Upload Documents</h3>
        <p className="text-gray-500">Click to browse or drag and drop your files here</p>
        <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 15MB per file)</p>
      </div>

      {/* Uploaded Documents Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Upload Documents</h3>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <DocumentItem key={index} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsAndCertificates;
