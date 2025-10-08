import apiClient from './apiService';

export interface Experience {
  id?: number;
  industry: string;
  job_title: string;
  job_description: string;
  pay_min: string;
  pay_max: string;
  start_date: string;
  end_date: string;
  payslip_path?: string;
}

export interface ExperiencePayload {
  jobseeker_id: number;
  experiences: Experience[];
}

export const getJobSeekerExperiences = (jobSeekerId: number) => {
  return apiClient.get(`/jobseeker/${jobSeekerId}/experiences`);
};

export const saveJobSeekerExperiences = (payload: ExperiencePayload) => {
  return apiClient.post('/jobseeker/experiences', payload);
};
