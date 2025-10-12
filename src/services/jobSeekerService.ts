import apiClient from './apiService';

export const getJobSeekerProfile = (jobSeekerId: number) => {
  return apiClient.get(`/jobseeker/profile/${jobSeekerId}`);
};

export const updateJobSeekerProfile = (data: any) => {
  return apiClient.post('/jobseeker/profile', data);
};

export interface TaxInformationPayload {
    id: number;
    tfn?: string;
    abn?: string;
    trs?: string;
}

export const updateTaxInformation = (data: TaxInformationPayload) => {
    return apiClient.post('/jobseeker/tax', data);
};

export const getJobSeekerDocuments = (jobseeker_id: number) => {
    return apiClient.get(`/jobseeker/${jobseeker_id}/documents`);
};

export const saveJobSeekerDocument = (payload: { jobseeker_id: number; doc_name: string; file: string }) => {
  return apiClient.post('/jobseeker/documents', payload);
};

export const deleteJobSeekerDocument = (documentId: number) => {
  return apiClient.delete(`/jobseeker/documents/${documentId}`);
};

export const getJobOffers = (payload: { jobseeker_id: number, status: string }) => {
    return apiClient.post('/jobseeker/offers', payload);
};

export const acceptJobOffer = (payload: { offer_id: number, jobseeker_id: number, action: string }) => {
    const { offer_id, ...rest } = payload;
    return apiClient.post(`/jobseeker/offers/${offer_id}/action`, rest);
};

export interface ModificationRequestPayload {
  job_offer_id: number;
  new_pay_rate?: number;
  new_start_time?: string;
  new_end_time?: string;
  modification_note: string;
  user_id: number;
}

export const requestModification = (payload: ModificationRequestPayload) => {
  return apiClient.post('/offers/modifications', payload);
};
