import apiClient from './apiService';

export const getDocuments = (role: string, userId: number) => {
    let apiRole = role;
    if (role === 'job_seeker') {
        apiRole = 'jobseeker';
    }
    return apiClient.get(`/api/${apiRole}/${userId}/documents`);
};

export const saveDocument = (role: string, userId: number, formData: FormData) => {
    let apiRole = role;
    if (role === 'job_seeker') {
        apiRole = 'jobseeker';
    }
    return apiClient.post(`/api/${apiRole}/${userId}/documents`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteDocument = (role: string, docId: number) => {
    let apiRole = role;
    if (role === 'job_seeker') {
        apiRole = 'jobseeker';
    }
    return apiClient.delete(`/api/${apiRole}/documents/${docId}`);
};