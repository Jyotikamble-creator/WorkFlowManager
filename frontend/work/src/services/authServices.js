import api from './api';
import { clientLogger, LogTags } from '../utils/logger';


// Service for user login
export const login = async (data) => {
	try {
		clientLogger.info(LogTags.LOGIN, `Attempt login for ${data.email}`);
		const response = await api.post('/auth/login', data);
		clientLogger.info(LogTags.LOGIN, `Login success for ${data.email}`);
		return response.data;
	} catch (error) {
		clientLogger.error(LogTags.LOGIN, `Login failed for ${data.email}`, error);
		throw error;
	}
};

// Service for user signup/registration
export const signup = async (data) => {
	try {
		clientLogger.info(LogTags.REGISTER, `Attempt register for ${data.email}`);
		const response = await api.post('/auth/register', data);
		clientLogger.info(LogTags.REGISTER, `Register success for ${data.email}`);
		return response.data;
	} catch (error) {
		clientLogger.error(LogTags.REGISTER, `Register failed for ${data.email}`, error);
		throw error;
	}
};

// Service to fetch the authenticated user's profile
export const fetchUserProfile = async () => {
	try {
		clientLogger.info(LogTags.SESSIONS, 'Fetching user profile');
		const response = await api.get('/auth/profile');
		clientLogger.info(LogTags.SESSIONS, 'Fetched user profile');
		return response.data;
	} catch (error) {
		clientLogger.error(LogTags.SESSIONS, 'Failed to fetch user profile', error);
		throw error;
	}
};
