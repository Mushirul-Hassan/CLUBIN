'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { submissionsApi } from '@/lib/api/submissions';
import { Submission } from '@/types';
import { cn } from '@/lib/utils';
import {
    ArrowLeft,
    Loader2,
    CheckCircle,
    XCircle,
    AlertTriangle,
    User,
    Calendar,
    CreditCard,
    Smartphone,
    Clock,
} from 'lucide-react';
import { SUBMISSION_STATUS_CONFIG } from '@/lib/constants/submissions';

import { ReasonModal } from './components/ReasonModal';
import { InfoRow } from './components/InfoRow';
import { ActionButtons } from './components/ActionButtons';


export default function VerificationPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [submission, setSubmission] = useState<Submission | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [modal, setModal] = useState<'reject' | 'ban' | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await submissionsApi.getById(id);
                setSubmission(res.submission);
            } catch {
                toast.error('Failed to load submission');
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, router]);

    const handleApprove = async () => {
        if (!submission) return;
        setActionLoading(true);
        try {
            await submissionsApi.approve(submission._id);
            toast.success(`${submission.name} approved successfully`);
            setSubmission((prev) => prev ? { ...prev, status: 'APPROVED' } : prev);
        } catch (err: any) {
            const msg = err?.response?.data?.message;
            toast.error(msg || 'Failed to approve');
        } finally {
            setActionLoading(false);
        }
    };

    const handleReasonAction = async (reason: string) => {
        if (!submission || !modal) return;
        setActionLoading(true);
        try {
            if (modal === 'reject') {
                await submissionsApi.reject(submission._id, { reason });
                toast.success('Submission rejected');
                setSubmission((prev) => prev ? { ...prev, status: 'REJECTED', rejectionReason: reason } : prev);
            } else {
                await submissionsApi.ban(submission._id, { reason });
                toast.success('User banned');
                setSubmission((prev) => prev ? { ...prev, status: 'BANNED', rejectionReason: reason } : prev);
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message;
            toast.error(msg || 'Action failed');
        } finally {
            setActionLoading(false);
            setModal(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-80">
                <Loader2 size={24} className="animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!submission) return null;


    const status = SUBMISSION_STATUS_CONFIG[submission.status];
    const isUnderage = submission.age < 18;

    return (
        <>
            {modal && (
                <ReasonModal
                    type={modal}
                    onConfirm={handleReasonAction}
                    onCancel={() => setModal(null)}
                    loading={actionLoading}
                />
            )}

            <div className="max-w-5xl mx-auto space-y-5">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to submissions
                    </button>
                    <span className={cn('text-xs font-medium px-3 py-1.5 rounded-full border', status.className)}>
                        {status.label}
                    </span>
                </div>

                {isUnderage && (
                    <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                        <AlertTriangle size={16} className="text-destructive flex-shrink-0" />
                        <p className="text-sm text-destructive font-medium">
                            User is {submission.age} years old — below minimum age of 18
                        </p>
                    </div>
                )}

                {submission.rejectionReason && (
                    <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                        <XCircle size={16} className="text-orange-500 flex-shrink-0" />
                        <p className="text-sm text-orange-500">
                            <span className="font-medium">Reason: </span>{submission.rejectionReason}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols gap-5">
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Live Selfie */}
                            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
                                <div className="px-4 py-3 border-b border-border">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Live Selfie
                                    </p>
                                </div>
                                <div className="relative aspect-square bg-[hsl(var(--surface-raised))]">
                                    {submission.selfieUrl ? (
                                        <Image src={submission.selfieUrl} alt="Selfie" fill className="object-cover" unoptimized />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <User size={40} className="text-border" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ID Document */}
                            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
                                <div className="px-4 py-3 border-b border-border">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        ID Document
                                    </p>
                                </div>
                                <div className="relative aspect-square bg-[hsl(var(--surface-raised))]">
                                    {submission.idDocumentUrl ? (
                                        <Image src={submission.idDocumentUrl} alt="ID Document" fill className="object-cover" unoptimized />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <CreditCard size={40} className="text-border" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <ActionButtons
                            status={submission.status}
                            isUnderage={isUnderage}
                            actionLoading={actionLoading}
                            onApprove={handleApprove}
                            onSetModal={setModal}
                        />
                    </div>

                    <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-5 h-fit">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                            Submission Details
                        </p>
                        <div className="mt-3">
                            <InfoRow icon={User} label="Full Name" value={submission.name} />
                            <InfoRow icon={Calendar} label="Date of Birth" value={new Date(submission.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })} />
                            <InfoRow icon={Calendar} label="Age" value={`${submission.age} years old${isUnderage ? ' ⚠️ Underage' : ' ✅'}`} />
                            <InfoRow icon={CreditCard} label="ID Type" value={submission.idType.replace('_', ' ')} />
                            <InfoRow icon={CreditCard} label="ID Number" value={submission?.idNumber} mono />
                            <InfoRow icon={Smartphone} label="Device ID" value={submission.deviceId} mono />
                            <InfoRow icon={Clock} label="Submitted" value={new Date(submission.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                            {submission.ticketNumber && <InfoRow icon={CheckCircle} label="Ticket Number" value={submission.ticketNumber} mono />}
                            {submission.tokenId && <InfoRow icon={CheckCircle} label="QR Key" value={submission.tokenId} mono />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}