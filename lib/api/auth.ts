import apiClient from './client';
import { AuthResponse, LoginPayload, RefreshResponse, Admin } from '@/types';

export const authApi = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>(
            '/api/admin/auth/login',
            payload
        );
        return data;
    },

    refresh: async (): Promise<RefreshResponse> => {
        const { data } = await apiClient.post<RefreshResponse>(
            '/api/admin/auth/refresh'
        );
        return data;


    },

    logout: async (): Promise<void> => {
        await apiClient.post('/api/admin/auth/logout');
    },

    getMe: async (): Promise<{ success: boolean; admin: Admin }> => {
        const { data } = await apiClient.get('/api/admin/auth/me');
        return data;
    },
}