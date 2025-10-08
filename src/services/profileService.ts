import apiClient from './apiService';

const formatRoleForApi = (role: string) => {
  return role === 'job_seeker' ? 'jobseeker' : role;
};

export const getProfile = async (role: string, id: number) => {
  const apiRole = formatRoleForApi(role);
  const response = await apiClient.get(`/${apiRole}/profile/${id}`);

  // Normalize the API response for job seekers to match the auth store structure
  if (role === 'job_seeker' && response.data?.data?.jobseeker) {
    response.data.data.job_seeker = response.data.data.jobseeker;
    delete response.data.data.jobseeker;
  }

  return response;
};

export const updateProfile = async (role: string, data: any) => {
  const apiRole = formatRoleForApi(role);
  return await apiClient.post(`/${apiRole}/profile`, data);
};

export const updateRecruiterCompany = (payload: any) => {
  return apiClient.post('/recruiter/company', payload);
};

export interface TaxInformationPayload {
  id: number;
  tfn?: string;
  abn?: string;
  trs?: string;
}

export const updateTaxInformation = (role: string, data: TaxInformationPayload) => {
  const apiRole = formatRoleForApi(role);
  return apiClient.post(`/${apiRole}/tax`, data);
};

export interface SocialMediaLinksPayload {
  id: number;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
}

export const saveSocialMediaLinks = (role: string, payload: SocialMediaLinksPayload) => {
  const apiRole = formatRoleForApi(role);
  return apiClient.post(`/${apiRole}/social`, payload);
};

export const uploadProfilePicture = (role: string, userId: number, file: File) => {
  const apiRole = formatRoleForApi(role);
  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('profile_picture', file);

  return apiClient.post(`/${apiRole}/profile_picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
