// Auth 
export type = AdminRole = 'ADMIN' | 'CLUB';

export interface Admin {
    fullName: string;
    username: string;
    role: AdminRole;
    clubId: string | null;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    accessToken: string;
    admin: Admin;
}

export interface RefreshResponse {
    success: boolean;
    accessToken: string;
}


// Submissions 

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'BANNED';

export type IdType =
    | 'AADHAAR'
    | 'PAN'
    | 'DRIVING_LICENSE'
    | 'PASSPORT'
    | 'VOTER_ID';


export interface Submission {
    _id: string;
    submissionId: string;
    deviceId: string;
    clubId: string | null;
    name: string;
    dob: string;
    age: number;
    idType: IdType;
    idNumber?: string;
    idDocumentUrl?: string; // only returned on single fetch
    selfieUrl: string;
    status: SubmissionStatus;
    tokenId: string | null;
    ticketNumber: string | null;
    approvedAt: string | null;
    approvedBy: string | null;
    rejectedAt: string | null;
    rejectedBy: string | null;
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface SubmissionsResponse {
    success: boolean;
    total: number;
    page: number;
    totalPages: number;
    submissions: Submission[];
}


export interface SubmissionResponse {
    success: boolean;
    submission: Submission;
}


export interface ApproveResponse {
    success: boolean;
    message: string;
    submission: Partial<Submission>
}

export interface RejectPayload {
    reason: string;
}

//Clubs
//Events

// Settings
export interface AgeSettings {
    minAgeEntry: number;
    minAgeAlcohol: number;
}

//API 

export interface ApiError {
    success: false;
    message: string;
    error?: string;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    status?: SubmissionStatus;
}