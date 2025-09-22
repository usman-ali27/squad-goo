import apiClient from './apiService';

export const getProfile = async (role: string, id: number) => {
  return await apiClient.get(`api/${role}/profile/${id}`);
};

export const updateProfile = async (role: string, data: any) => {
  console.log(role)
  if(role=='job_seeker'){
    role='jobseeker'
    return await apiClient.post(`api/${role}/profile`, data);
  }
  return await apiClient.post(`api/${role}/update`, data);
};



export const updateRecruiterCompany = (payload: any) => {
  return apiClient.post('/api/recruiter/company', payload);
};


export interface TaxInformationPayload {
    id: number;
    tfn?: string;
    abn?: string;
    trs?: string;
}

export const updateTaxInformation = (role: string, data: TaxInformationPayload) => {
    let apiRole = role;
    if (role === 'job_seeker') {
        apiRole = 'jobseeker';
    }
    return apiClient.post(`/api/${apiRole}/tax`, data);
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
    let apiRole = role;
    if (role === 'job_seeker') {
        apiRole = 'jobseeker';
    }
    return apiClient.post(`/api/${apiRole}/social`, payload);
};