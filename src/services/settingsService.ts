
import apiClient from './apiService';

export interface JobSeekerSettingsPayload {
  offer_preference_type: string;
  offer_from_preference: string;
  quick_offer_only_platform_payment: boolean;
  quick_offer_only_full_balance: boolean;
  quick_offer_only_from_pro: boolean;
  manual_offer_only_from_pro: boolean;
  individual_offer_only_from_pro: boolean;
  individual_offer_only_platform_payment: boolean;
  individual_offer_industries: string[];
  jobseeker_id: number;
}

export const updateJobSeekerSettings = (payload: JobSeekerSettingsPayload) => {
  return apiClient.post('/jobseeker/settings/update', payload);
};
