import axios from 'axios';

const API_URL = 'http://localhost:5000/api/files';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getFiles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await axios.delete(`${API_URL}/delete/${fileId}`);
  return response.data;
};

export const downloadFile = async (fileId) => {
  const response = await axios.get(`${API_URL}/download/${fileId}`, {
    responseType: 'blob',
  });
  return response.data;
};