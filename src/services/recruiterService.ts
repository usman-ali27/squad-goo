
import apiClient from './apiService';

export const getRecruiterDocuments = (recruiter_id: number) => {
    return apiClient.get(`/recruiter/${recruiter_id}/documents`);
};

export const saveRecruiterDocument = (payload: { recruiter_id: number; doc_name: string; file: string }) => {
  return apiClient.post('/recruiter/documents', payload);
};

export const deleteRecruiterDocument = (documentId: number) => {
  return apiClient.delete(`/recruiter/documents/${documentId}`);
};

export const updateRecruiterProfile = (payload: any) => {
  return apiClient.post('/recruiter/profile', payload);
};

export interface QuickSearchPayload {
    industry: string;
    job_title: string;
    work_location: string;
    range_km: number;
    experience_years: number;
    salary_min: number;
    salary_max: number;
    education: string[];
    preferred_language: string;
    tax_type: string;
    job_description: string;
}

export const quickSearchStaff = (payload: QuickSearchPayload) => {
    return apiClient.post('/recruiter/quick-search', payload);
};

export interface ManualSearchPayload {
    industry: string;
    job_title: string;
    work_location: string;
    range_km: number;
    experience_years: number;
    salary_min: number;
    salary_max: number;
    job_description: string;
    tax_type: string;
}

export const manualSearchStaff = (payload: ManualSearchPayload) => {
    return apiClient.post('/recruiter/manual-search', payload);
};

// Payload for sending an offer
export interface SendOfferPayload {
  job_type: 'quick' | 'manual';
  recruiter_id?: number;
  job_seeker_id?: number;
  industry: string;
  job_title: string;
  job_description: string;
  latitude?: number;
  longitude?: number;
  range_km?: number;
  salary_min?: number;
  salary_max?: number;
  work_location: string;
  start_date: string;
  finish_date?: string;
  end_date?: string;
  offer_expiry: string;
  tax_type?: string;
  pay_min?: number;
  pay_max?: number;
}

export const sendOffer = (payload: SendOfferPayload) => {
  return apiClient.post('/offers/send', payload);
};