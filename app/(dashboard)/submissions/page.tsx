'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { submissionsApi } from '@/lib/api/submissions';
import { Submission, SubmissionStatus } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Loader2, ChevronRight, Clock, CheckCircle, XCircle, ShieldBan } from 'lucide-react';

const tabs: { label: string; value: SubmissionStatus; icon: React.ElementType; color: string }[] = [
  { label: 'Pending', value: 'PENDING', icon: Clock, color: 'text-warning' },
  { label: 'Approved', value: 'APPROVED', icon: CheckCircle, color: 'text-success' },
  { label: 'Rejected', value: 'REJECTED', icon: XCircle, color: 'text-destructive' },
  { label: 'Banned', value: 'BANNED', icon: ShieldBan, color: 'text-destructive' },
];

const statusBadge: Record<SubmissionStatus, string> = {
  PENDING: 'bg-warning/10 text-warning border-warning/20',
  APPROVED: 'bg-success/10 text-success border-success/20',
  REJECTED: 'bg-destructive/10 text-destructive border-destructive/20',
  BANNED: 'bg-destructive/10 text-destructive border-destructive/20',
};

const idTypeLabel: Record<string, string> = {
  AADHAAR: 'Aadhaar',
  PAN: 'PAN Card',
  DRIVING_LICENSE: 'Driving License',
  PASSPORT: 'Passport',
  VOTER_ID: 'Voter ID',
};

export default function SubmissionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SubmissionStatus>('PENDING');
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(async (status: SubmissionStatus) => {
    setLoading(true);
    try {
      const res = await submissionsApi.getAll({ status, limit: 50 });
    
    } catch {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions(activeTab);
  }, [activeTab, fetchSubmissions]);

  const handleTabChange = (status: SubmissionStatus) => {
    setActiveTab(status);
  
  };

  return (
    <div className="space-y-5">

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[hsl(var(--surface))] border border-border rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.value
                ? 'bg-[hsl(var(--surface-raised))] text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon size={14} className={activeTab === tab.value ? tab.color : ''} />
            {tab.label}
            {activeTab === tab.value && (
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                hi
              </span>
            )}
          </button>
        ))}
      </div>
</div>

  );
}