import api from './api';

// Service for user login
export const login = (data) => api.post('/auth/login', data);

// Service for user signup/registration
export const signup = (data) => api.post('/auth/register', data);

// Service to fetch the authenticated user's profile
export const fetchUserProfile = () => api.get('/auth/profile');
