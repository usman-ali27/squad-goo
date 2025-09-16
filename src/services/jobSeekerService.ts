
import apiClient from './apiService';

export const getJobSeekerProfile = (jobSeekerId: number) => {
  return apiClient.get(`/api/jobseeker/profile/${jobSeekerId}`);
};

export const updateJobSeekerProfile = (data: any) => {
  return apiClient.post('/api/jobseeker/profile', data);
};
