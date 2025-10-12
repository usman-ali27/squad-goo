
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

export const getJobSeekerSettings = (jobseekerId: number) => {
  return apiClient.get(`/jobseeker/settings/${jobseekerId}`);
};

export const updateJobSeekerSettings = (payload: JobSeekerSettingsPayload) => {
  return apiClient.post('/jobseeker/settings/update', payload);
};

export interface RecruiterSettingsPayload {
    recruiter_id: number;
    quick_ai_auto_matching: boolean;
    quick_min_badge: string;
    quick_only_pro_jobseekers: boolean;
    quick_only_inapp_payment: boolean;
    quick_enable_squad_matching: boolean;
    manual_min_badge: string;
    manual_only_pro_jobseekers: boolean;
    manual_enable_squad_profiles: boolean;
}

export const getRecruiterSettings = (recruiterId: number) => {
  return apiClient.get(`/recruiter/settings/${recruiterId}`);
};

export const updateRecruiterSettings = (payload: RecruiterSettingsPayload) => {
  return apiClient.post('/recruiter/settings/update', payload);
};

export interface NotificationSettingsPayload {
  push_notification: 0 | 1;
  email_notification: 0 | 1;
  jobseeker_id: number;
}

export const updateNotificationSettings = (payload: NotificationSettingsPayload) => {
  return apiClient.post('/jobseeker/update-notifications', payload);
};
