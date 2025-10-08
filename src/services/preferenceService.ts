import apiClient from './apiService';

export interface Preference {
  id?: number;
  industry: string;
  job_title: string;
  pay_min: number;
  pay_max: number;
  days: string[];
  time_from: string;
  time_to: string;
  offer_types: string[];
  distance: number;
  tax_option: string;
}

export interface PreferencePayload {
  jobseeker_id: number;
  preferences: Preference[];
}

export const getJobSeekerPreferences = (jobSeekerId: number) => {
  return apiClient.get(`/jobseeker/${jobSeekerId}/preferences`);
};

export const saveJobSeekerPreferences = (payload: PreferencePayload) => {
  return apiClient.post('/jobseeker/preferences', payload);
};
