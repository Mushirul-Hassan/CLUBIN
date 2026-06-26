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

export function SubmissionsTable({ submissions, loading, activeTab }: SubmissionsTableProps) {
    const router = useRouter();

    return (
        <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-border">
                {['Name', 'Age', 'ID Type', 'Status', 'Submitted', ''].map((h) => (
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
                        <p className="text-sm text-muted-foreground">{ID_TYPE_LABELS[sub.idType] || sub.idType}</p>
                        <div>
                            <span className={cn(
                                'text-[11px] font-medium px-2 py-1 rounded-full border',
                                SUBMISSION_STATUS_CONFIG[sub.status].className
                            )}>
                                {SUBMISSION_STATUS_CONFIG[sub.status].label}
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
    );
}