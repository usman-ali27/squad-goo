
import apiClient from './apiService';

export const uploadBase64Image = (image_base64: string) => {
  return apiClient.post('/api/upload-base64-image', { image_base64 });
};

export const saveJobSeekerDocument = (jobseeker_id: number, doc_name: string, file: string) => {
  return apiClient.post('/api/jobseeker/documents', { jobseeker_id, doc_name, file });
};

export const getJobSeekerDocuments = (jobseeker_id: number) => {
    return apiClient.get(`/api/jobseeker/${jobseeker_id}/documents`);
};
