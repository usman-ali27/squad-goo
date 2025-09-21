
import apiClient from './apiService';

export const uploadBase64Image = (image_base64: string) => {
  return apiClient.post('/api/upload-base64-image', { image_base64 });
};
