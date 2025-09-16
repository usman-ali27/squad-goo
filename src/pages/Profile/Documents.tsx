
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { uploadBase64Image, saveJobSeekerDocument, getJobSeekerDocuments } from "@/services/documentService";

const DocumentItem = ({ doc, onDelete }) => {
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

  // Clean up URL by removing double slashes after the protocol
  const cleanedUrl = doc.file_path.replace(/([^:]\/)\/+/g, "$1");

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex items-start gap-4">
        <FileText className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold">{doc.document_name}</p>
          <p className="text-sm text-gray-500">Uploaded: {new Date(doc.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center">
        <Badge variant="outline" className={getStatusClasses(doc.statusVariant)}>{doc.status || 'Pending'}</Badge>
        <Button variant="outline" size="sm" onClick={() => window.open(cleanedUrl, '_blank')}>
            <Download className="mr-2 h-4 w-4" />
            Download
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(doc.id)}>
            <Trash2 className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

const DocumentsAndCertificates = () => {
  const { toast } = useToast();
  const user = useUser();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = () => {
    if (user && user.job_seeker) {
      setIsLoading(true);
      getJobSeekerDocuments(user.job_seeker.id)
        .then(response => {
          setDocuments(response.data.data);
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to fetch documents.", variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        handleFileUpload(file.name, base64);
      };
      reader.onerror = () => {
        toast({ title: "Error", description: "Failed to read file.", variant: "destructive" });
      };
    }
  };

  const handleFileUpload = (doc_name: string, base64: string) => {
    if (user && user.job_seeker) {
      setIsLoading(true);
      uploadBase64Image(base64)
        .then(uploadResponse => {
          const imageUrl = uploadResponse.data.image_url; // Correctly use image_url
          saveJobSeekerDocument(user.job_seeker.id, doc_name, imageUrl)
            .then(() => {
              toast({ title: "Success", description: "Document uploaded successfully." });
              fetchDocuments(); // Refresh the document list
            })
            .catch(() => {
              toast({ title: "Error", description: "Failed to save document.", variant: "destructive" });
            });
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to upload file.", variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleDelete = (docId: number) => {
    // Implement delete functionality here if the API is available
    console.log("Delete document with ID:", docId);
    toast({ title: "Info", description: "Delete functionality not yet implemented." });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Documents & Certificates</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-2 cursor-pointer hover:bg-gray-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-semibold">Upload Documents</h3>
        <p className="text-gray-500">Click to browse or drag and drop your files here</p>
        <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 15MB per file)</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Uploaded Documents</h3>
        {isLoading && <p>Loading...</p>}
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentItem key={doc.id} doc={doc} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsAndCertificates;
