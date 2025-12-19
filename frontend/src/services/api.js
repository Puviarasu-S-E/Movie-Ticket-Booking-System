import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const moviesAPI = {
  getAll: (params) => api.get('/movies', { params }),
  getById: (id) => api.get(`/movies/${id}`),
  create: (data) => api.post('/movies', data),
  update: (id, data) => api.put(`/movies/${id}`, data),
  delete: (id) => api.delete(`/movies/${id}`),
};

export const theatresAPI = {
  getAll: (params) => api.get('/theatres', { params }),
  getByMovie: (movieId, params) => api.get(`/theatres/movie/${movieId}`, { params }),
  create: (data) => api.post('/theatres', data),
};

export const showsAPI = {
  getById: (id) => api.get(`/shows/${id}`),
  create: (data) => api.post('/shows', data),
  update: (id, data) => api.put(`/shows/${id}`, data),
};

export const bookingsAPI = {
  create: (data) => {
    console.log('Creating booking via API:', data);
    return api.post('/bookings', data);
  },
  getAll: () => {
    console.log('Fetching all bookings via API');
    return api.get('/bookings');
  },
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
};

export default api;