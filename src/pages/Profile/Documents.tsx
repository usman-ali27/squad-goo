
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getDocuments, saveDocument, deleteDocument } from "@/services/documentService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const DocumentItem = ({ doc, onDelete }) => {
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const role = user?.role;
  const userId = user?.[role]?.id;

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents', role, userId],
    queryFn: () => getDocuments(role!, userId!),
    enabled: !!role && !!userId,
    select: (response) => response.data.data || [],
  });

  const uploadMutation = useMutation({
    mutationFn: ({ role, userId, formData }: { role: string; userId: number; formData: FormData }) => saveDocument(role, userId, formData),
    onSuccess: () => {
      toast({ title: "Success", description: "Document uploaded successfully." });
      queryClient.invalidateQueries({ queryKey: ['documents', role, userId] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save document.", variant: "destructive" });
    },
    onSettled: () => {
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ role, docId }: { role: string; docId: number }) => deleteDocument(role, docId),
    onSuccess: () => {
      toast({ title: "Success", description: "Document removed." });
      queryClient.invalidateQueries({ queryKey: ['documents', role, userId] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to remove document.", variant: "destructive" });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && role && userId) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("doc_name", file.name);
      uploadMutation.mutate({ role, userId, formData });
    }
  };

  const handleDelete = (docId: number) => {
    if (role) {
      deleteMutation.mutate({ role, docId });
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
        disabled={uploadMutation.isPending}
      />
      <div 
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-2 ${uploadMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
        onClick={() => !uploadMutation.isPending && fileInputRef.current?.click()}
      >
        {uploadMutation.isPending ? <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin"/> : <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
        <h3 className="text-lg font-semibold">{uploadMutation.isPending ? 'Uploading...' : 'Upload Documents'}</h3>
        <p className="text-gray-500">Click to browse or drag and drop your files here</p>
        <p className="text-xs text-gray-400">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 15MB per file)</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Uploaded Documents</h3>
        {isLoading ? <LoadingSpinner text="Loading documents..."/> : documents && documents.length > 0 ? (
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
