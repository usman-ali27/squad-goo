import apiClient from './apiService';

const formatRoleForApi = (role: string) => {
    return role === 'job_seeker' ? 'jobseeker' : role;
};

export const getDocuments = (role: string, userId: number) => {
    const apiRole = formatRoleForApi(role);
    return apiClient.get(`/${apiRole}/${userId}/documents`);
};

export const saveDocument = (role: string, userId: number, formData: FormData) => {
    const apiRole = formatRoleForApi(role);
    return apiClient.post(`/${apiRole}/${userId}/documents`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteDocument = (role: string, docId: number) => {
    const apiRole = formatRoleForApi(role);
    return apiClient.delete(`/${apiRole}/documents/${docId}`);
};