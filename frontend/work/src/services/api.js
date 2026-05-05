import axios from 'axios';
import { clientLogger, LogTags } from '../utils/logger';

// Create an Axios instance for API requests
const api = axios.create({
    // Use environment variable for API URL, fallback to localhost
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Attach token to every request if present in localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log outgoing request
        clientLogger.info(LogTags.API_REQUEST, `Request: ${config.method?.toUpperCase()} ${config.url}`, config);
        return config;
    },
    (error) => {
        clientLogger.error(LogTags.API_ERROR, `Request error: ${error.message}`, error);
        return Promise.reject(error);
    }
);

// Log responses and errors
api.interceptors.response.use(
    (response) => {
        clientLogger.debug(LogTags.API_REQUEST, `Response: ${response.status} ${response.config.url}`, response);
        return response;
    },
    (error) => {
        clientLogger.error(LogTags.API_ERROR, `Response error: ${error.message}`, error, error.config);
        return Promise.reject(error);
    }
);

export default api;