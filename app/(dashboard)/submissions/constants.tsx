import {  SubmissionStatus } from '@/types';
import {  Clock, CheckCircle, XCircle, ShieldBan } from 'lucide-react';

export const tabs : { label: string; value: SubmissionStatus; icon: React.ElementType; color: string }[] = [
  { label: 'Pending', value: 'PENDING', icon: Clock, color: 'text-warning' },
  { label: 'Approved', value: 'APPROVED', icon: CheckCircle, color: 'text-success' },
  { label: 'Rejected', value: 'REJECTED', icon: XCircle, color: 'text-destructive' },
  { label: 'Banned', value: 'BANNED', icon: ShieldBan, color: 'text-destructive' },
];

export const statusBadge : Record<SubmissionStatus, string>= {
  PENDING: 'bg-warning/10 text-warning border-warning/20',
  APPROVED: 'bg-success/10 text-success border-success/20',
  REJECTED: 'bg-destructive/10 text-destructive border-destructive/20',
  BANNED: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const idTypeLabel : Record<string, string> = {
  AADHAAR: 'Aadhaar',
  PAN: 'PAN Card',
  DRIVING_LICENSE: 'Driving License',
  PASSPORT: 'Passport',
  VOTER_ID: 'Voter ID',
};