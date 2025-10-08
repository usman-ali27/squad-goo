import apiClient from './apiService';

export const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export const uploadFileAsBase64 = async (file: File) => {
    const base64String = await toBase64(file);
    const response = await apiClient.post('/upload-base64-image', { image_base64: base64String });
    return response.data.image_url;
};
