
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
