import { SubmissionStatus } from '@/types';
import { Clock, CheckCircle, XCircle, ShieldBan } from 'lucide-react';



export const SUBMISSION_STATUS_CONFIG: Record<
    SubmissionStatus,
    { label: string; className: string }
> = {
    PENDING: {
        label: 'Pending Review',
        className: 'bg-warning/10 text-warning border-warning/20',
    },
    APPROVED: {
        label: 'Approved',
        className: 'bg-success/10 text-success border-success/20',
    },
    REJECTED: {
        label: 'Rejected',
        className: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    },
    BANNED: {
        label: 'Banned',
        className: 'bg-destructive/10 text-destructive border-destructive/20',
    },
} as const;


export const ID_TYPE_LABELS: Record<string, string> = {
    AADHAAR: 'Aadhaar',
    PAN: 'PAN Card',
    DRIVING_LICENSE: 'Driving License',
    PASSPORT: 'Passport',
    VOTER_ID: 'Voter ID',
} as const;


export const TABS: { label: string; value: SubmissionStatus; icon: React.ElementType; color: string }[] = [
    { label: 'Pending', value: 'PENDING', icon: Clock, color: 'text-warning' },
    { label: 'Approved', value: 'APPROVED', icon: CheckCircle, color: 'text-success' },
    { label: 'Rejected', value: 'REJECTED', icon: XCircle, color: 'text-destructive' },
    { label: 'Banned', value: 'BANNED', icon: ShieldBan, color: 'text-destructive' },
];
