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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);


  const fetchSubmissions = useCallback(async (status: SubmissionStatus) => {
    setLoading(true);
    try {
      const res = await submissionsApi.getAll({ status, limit: 50 });
      setSubmissions(res.submissions);
      setTotal(res.total);

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
    setSubmissions([]);

  };

  return (
    <div className="space-y-5">

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
            {activeTab === tab.value && total > 0 && (
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {total}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-border">
          {['Name', 'Age', 'ID Type', 'Status', 'Submitted', ''].map((h) => (
            <p key={h} className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
              {h}
            </p>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-sm">No {activeTab.toLowerCase()} submissions</p>
          </div>
        ) : (
          submissions.map((sub, i) => (
            <button
              key={sub._id}
              onClick={() => router.push(`/submissions/${sub._id}`)}
              className={cn(
                'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-4 w-full text-left transition-colors hover:bg-[hsl(var(--surface-raised))] group',
                i !== submissions.length - 1 && 'border-b border-border/50'
              )}
            >
              <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
              <p className="text-sm text-foreground">{sub.age}</p>
              <p className="text-sm text-muted-foreground">{idTypeLabel[sub.idType] || sub.idType}</p>
              <div>
                <span className={cn(
                  'text-[11px] font-medium px-2 py-1 rounded-full border',
                  statusBadge[sub.status]
                )}>
                  {sub.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })}
              </p>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
