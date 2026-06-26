import {  SubmissionStatus } from '@/types';
import {  Clock, CheckCircle, XCircle, ShieldBan } from 'lucide-react';

export const tabs : { label: string; value: SubmissionStatus; icon: React.ElementType; color: string }[] = [
  { label: 'Pending', value: 'PENDING', icon: Clock, color: 'text-warning' },
  { label: 'Approved', value: 'APPROVED', icon: CheckCircle, color: 'text-success' },
  { label: 'Rejected', value: 'REJECTED', icon: XCircle, color: 'text-destructive' },
  { label: 'Banned', value: 'BANNED', icon: ShieldBan, color: 'text-destructive' },
];

