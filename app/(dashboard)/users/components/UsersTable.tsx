'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Submission, SubmissionStatus } from '@/types';
import { Loader2, ChevronRight } from 'lucide-react';
import { SUBMISSION_STATUS_CONFIG, ID_TYPE_LABELS } from '@/lib/constants/submissions';


interface SubmissionsTableProps {
    submissions: Submission[];
    loading: boolean;
    activeTab: SubmissionStatus;
}

export function UsersTable({ submissions, loading, activeTab }: SubmissionsTableProps) {
    const router = useRouter();

    return (
        <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-border">
                {['Name', 'Age', 'Ticket No', 'Approve On', 'Action', ''].map((h) => (
                    <p key={h} className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
                        {h}
                    </p>
                ))}
            </div>

            {/* Rows */}
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
                        <p className="text-sm text-foreground">{sub.ticketNumber}</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit', month: 'short', year: 'numeric'
                            })}
                        </p>
                        {/* <Button
                            onClick={() => onSetModal('ban')}
                            disabled={actionLoading}
                            variant="outline"
                            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold"
                        >
                            <ShieldBan size={15} className="mr-2" />
                            Revoke & Ban
                        </Button> */}

                        <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                ))
            )}
        </div>
    );
}