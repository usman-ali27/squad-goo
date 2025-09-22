
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getDocuments, saveDocument, deleteDocument } from "@/services/documentService";

const DocumentItem = ({ doc, onDelete }) => {
  const getStatusClasses = (variant) => {
    switch (variant) {
      case 'verified': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const cleanedUrl = doc.file_path ? doc.file_path.replace(/([^:]\/)\/+/g, "$1") : "";

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex items-start gap-4">
        <FileText className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold">{doc.doc_name || doc.document_name}</p>
          <p className="text-sm text-gray-500">Uploaded: {new Date(doc.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center">
       
        <Button variant="outline" size="sm" onClick={() => window.open(cleanedUrl, '_blank')} disabled={!cleanedUrl}>
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

const DocumentManagement = () => {
  const { toast } = useToast();
  const user = useUser();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const role = user?.role;
  const userId = user?.[role]?.id;

  const fetchDocuments = useCallback(() => {
    if (role && userId) {
      setIsLoading(true);
      getDocuments(role, userId)
        .then(response => {
          setDocuments(response.data.data || []);
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to fetch documents.", variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [role, userId, toast]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!role || !userId) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("doc_name", file.name);

    try {
      await saveDocument(role, userId, formData);
      toast({ title: "Success", description: "Document uploaded successfully." });
      fetchDocuments(); // Refresh list
    } catch (error) {
      toast({ title: "Error", description: "Failed to save document.", variant: "destructive" });
    } finally {
      setIsUploading(false);
       if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = (docId: number) => {
    if (role) {
      deleteDocument(role, docId)
        .then(() => {
          toast({ title: "Success", description: "Document removed." });
          fetchDocuments();
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to remove document.", variant: "destructive" });
        });
    }
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
        disabled={isUploading}
      />
      <div 
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin"/> : <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
        <h3 className="text-lg font-semibold">{isUploading ? 'Uploading...' : 'Upload Documents'}</h3>
        <p className="text-gray-500">Click to browse or drag and drop your files here</p>
        <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 15MB per file)</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Uploaded Documents</h3>
        {isLoading ? <p>Loading...</p> : documents.length > 0 ? (
            <div className="space-y-4">
            {documents.map((doc) => (
                <DocumentItem key={doc.id} doc={doc} onDelete={handleDelete} />
            ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground py-4">No documents uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentManagement;
