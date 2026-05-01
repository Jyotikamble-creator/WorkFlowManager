import api from './api';

export const login = (data) => api.post('/auth/login', data);
export const signup = (data) => api.post('/auth/register', data);
export const fetchUserProfile = () => api.get('/auth/profile');
