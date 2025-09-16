
import apiClient from './apiService';

export const getJobSeekerEducation = (jobseeker_id: number) => {
  return apiClient.get(`/api/jobseeker/${jobseeker_id}/education`);
};

export const saveJobSeekerEducation = (jobseeker_id: number, education: any[]) => {
  return apiClient.post('/api/jobseeker/education', { jobseeker_id, education });
};
