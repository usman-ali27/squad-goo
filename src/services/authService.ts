
import apiClient from './apiService';

export const sendEmailVerification = (email: string, type: string) => {
  return apiClient.post('/api/send-email-verification', { email, type });
};

export const verifyEmailCode = (email: string, code: string) => {
  return apiClient.post('/api/verify-email-code', { email, code });
};

export const sendPhoneVerification = (phone_number: string) => {
  return apiClient.post('/api/send-verification', { phone_number });
};

export const verifyPhoneCode = (phone_number: string, code: string) => {
  return apiClient.post('/api/verify-code', { phone_number, code });
};

export const register = (data: any) => {
  return apiClient.post('/api/register', data);
};

export const login = (data: any) => {
    return apiClient.post('/api/login', data);
};
