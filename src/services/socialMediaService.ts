
import apiClient from './apiService';

export interface SocialMediaLinksPayload {
  jobseeker_id: number;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
}

export const saveSocialMediaLinks = (payload: SocialMediaLinksPayload) => {
  return apiClient.post('/api/jobseeker/social', payload);
};
