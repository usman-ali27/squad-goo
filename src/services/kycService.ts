import apiClient from './apiService';
import useAuthStore from '@/stores/authStore';

const formatRoleForApi = (role: string) => {
  return role === 'job_seeker' ? 'jobseeker' : role;
};

export const startIdentityVerification = () => {
  const state = useAuthStore.getState();
  if (!state.user) return Promise.reject('User not found');
  const apiRole = formatRoleForApi(state.user.role);
  return apiClient.post(`/${apiRole}/kyc/identity-verification`);
};

export const purchaseResumeVerification = () => {
  const state = useAuthStore.getState();
  if (!state.user) return Promise.reject('User not found');
  const apiRole = formatRoleForApi(state.user.role);
  return apiClient.post(`/${apiRole}/kyc/resume-verification`);
};
