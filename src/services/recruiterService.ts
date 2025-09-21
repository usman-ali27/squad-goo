
import apiClient from './apiService';

export const getRecruiterDocuments = (recruiter_id: number) => {
    return apiClient.get(`/api/recruiter/${recruiter_id}/documents`);
};

export const saveRecruiterDocument = (payload: { recruiter_id: number; doc_name: string; file: string }) => {
  return apiClient.post('/api/recruiter/documents', payload);
};

export const deleteRecruiterDocument = (documentId: number) => {
  return apiClient.delete(`/api/recruiter/documents/${documentId}`);
};

export const updateRecruiterProfile = (payload: any) => {
  return apiClient.post('/api/recruiter/profile', payload);
};
