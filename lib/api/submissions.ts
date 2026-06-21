import apiClient from "./client";
import {
  SubmissionsResponse,
  SubmissionResponse,
  ApproveResponse,
  RejectPayload,
  PaginationParams,
} from '@/types';



const getAll = async (params: PaginationParams =  {}) :Promise<SubmissionsResponse> => {
    const {data} = await apiClient.get<SubmissionsResponse>("/api/admin/submissions", {
        params,
    });
    return data;
};

const getById = async (id: string) :Promise<SubmissionResponse>=>  {
    const { data } = await apiClient.get<SubmissionResponse>(`/api/admin/submissions/${id}`);
     return data;
}

const approve = async (id:string): Promise<ApproveResponse> => {
    const {data} = await apiClient.post<ApproveResponse>(`/api/admin/submissions/${id}/approve`);
    return data;
}

const reject = async (id:string, payload: RejectPayload):Promise<ApproveResponse> => {
    const {data} = await apiClient.post<ApproveResponse>(`/api/admin/submissions/${id}/reject`, payload);
    return data;
}

const ban = async (id:string, payload:RejectPayload): Promise<ApproveResponse> => {
    const {data} = await apiClient.post<ApproveResponse>(`/api/admin/submissions/${id}/ban`, payload);
    return data;
}

export const submissionsApi = {
    getAll,
    getById,
    approve,
    reject,
    ban,
};