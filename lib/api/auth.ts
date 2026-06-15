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

}