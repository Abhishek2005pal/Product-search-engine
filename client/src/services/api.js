import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const searchProducts = async (tags, category) => {
  const response = await api.post('/search', {
    tags,
    category,
  });

  return response.data;
};

export default api;

