import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

export const api = axios.create({
	baseURL: 'http://localhost:3333',
	headers: {
		Authorization: `Bearer ${getCookie('opaSuite.token')}`,
		'X-Refresh-Token': `Bearer ${getCookie('opaSuite.refresh_token')}`,
	},
});

api.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (error && error.response?.status === 401) return error.response;
	}
);
