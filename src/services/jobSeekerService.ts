
import apiClient from './apiService';

export const getJobSeekerProfile = (jobSeekerId: number) => {
  return apiClient.get(`/api/jobseeker/profile/${jobSeekerId}`);
};

export const updateJobSeekerProfile = (data: any) => {
  return apiClient.post('/api/jobseeker/profile', data);
};

export const uploadProfilePicture = (userId: number, profilePicture: File) => {
    const formData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('profile_picture', profilePicture);

    return apiClient.post('/api/jobseeker/profile_picture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export interface TaxInformationPayload {
    id: number;
    tfn?: string;
    abn?: string;
    trs?: string;
}

export const updateTaxInformation = (data: TaxInformationPayload) => {
    return apiClient.post('/api/jobseeker/tax', data);
};

export const getJobSeekerDocuments = (jobseeker_id: number) => {
    return apiClient.get(`/api/jobseeker/${jobseeker_id}/documents`);
};

export const saveJobSeekerDocument = (payload: { jobseeker_id: number; doc_name: string; file: string }) => {
  return apiClient.post('/api/jobseeker/documents', payload);
};

export const deleteJobSeekerDocument = (documentId: number) => {
  return apiClient.delete(`/api/jobseeker/documents/${documentId}`);
};
