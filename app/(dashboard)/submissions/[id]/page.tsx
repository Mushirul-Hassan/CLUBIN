'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { submissionsApi } from '@/lib/api/submissions';
import { Submission } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    ArrowLeft,
    Loader2,
    CheckCircle,
    XCircle,
    ShieldBan,
    AlertTriangle,
    User,
    Calendar,
    CreditCard,
    Smartphone,
    Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Reason Modal ─────────────────────────────────────────────────────────────
function ReasonModal({
    type,
    onConfirm,
    onCancel,
    loading,
}: {
    type: 'reject' | 'ban';
    onConfirm: (reason: string) => void;
    onCancel: () => void;
    loading: boolean;
}) {
    const [reason, setReason] = useState('');
    const isBan = type === 'ban';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[hsl(var(--surface))] border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center',
                        isBan ? 'bg-destructive/20' : 'bg-orange-500/20'
                    )}>
                        {isBan ? (
                            <ShieldBan size={18} className="text-destructive" />
                        ) : (
                            <XCircle size={18} className="text-orange-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            {isBan ? 'Ban User' : 'Reject Submission'}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {isBan ? 'This will permanently ban the user' : 'User can resubmit after rejection'}
                        </p>
                    </div>
                </div>

                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={isBan ? 'Reason for ban (e.g. Fake ID, Underage)' : 'Reason for rejection (e.g. Photo unclear, ID expired)'}
                    rows={3}
                    className="w-full bg-[hsl(var(--surface-raised))] border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40"
                />

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => reason.trim() && onConfirm(reason.trim())}
                        disabled={!reason.trim() || loading}
                        className={cn(
                            'flex-1',
                            isBan
                                ? 'bg-destructive hover:bg-destructive/90 text-white'
                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                        )}
                    >
                        {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                        {isBan ? 'Ban User' : 'Reject'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, mono = false }: {
    icon: React.ElementType;
    label: string;
    value?: string | number;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
            <Icon size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
                <p className={cn('text-sm text-foreground font-medium', mono && 'font-mono tracking-wide')}>
                    {value}
                </p>
            </div>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusConfig = {
    PENDING: { label: 'Pending Review', className: 'bg-warning/10 text-warning border-warning/20' },
    APPROVED: { label: 'Approved', className: 'bg-success/10 text-success border-success/20' },
    REJECTED: { label: 'Rejected', className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    BANNED: { label: 'Banned', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
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
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
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
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
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

    const status = statusConfig[submission.status];
    const isPending = submission.status === 'PENDING';
    const isUnderage = submission.age < 18;

    return (
        <>
            {/* Reason modal */}
            {modal && (
                <ReasonModal
                    type={modal}
                    onConfirm={handleReasonAction}
                    onCancel={() => setModal(null)}
                    loading={actionLoading}
                />
            )}

            <div className="max-w-5xl mx-auto space-y-5">

                {/* Back + status */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to submissions
                    </button>
                    <span className={cn(
                        'text-xs font-medium px-3 py-1.5 rounded-full border',
                        status.className
                    )}>
                        {status.label}
                    </span>
                </div>

                {/* Underage warning */}
                {isUnderage && (
                    <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                        <AlertTriangle size={16} className="text-destructive flex-shrink-0" />
                        <p className="text-sm text-destructive font-medium">
                            User is {submission.age} years old — below minimum age of 18
                        </p>
                    </div>
                )}

                {/* Rejection reason banner */}
                {submission.rejectionReason && (
                    <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                        <XCircle size={16} className="text-orange-500 flex-shrink-0" />
                        <p className="text-sm text-orange-500">
                            <span className="font-medium">Reason: </span>{submission.rejectionReason}
                        </p>
                    </div>
                )}

                {/* Main grid */}
                <div className="grid grid-cols-[1fr_320px] gap-5">

                    {/* Left: photos + actions */}
                    <div className="space-y-5">

                        {/* Photos side by side */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Selfie */}
                            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl overflow-hidden">
                                <div className="px-4 py-3 border-b border-border">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Live Selfie
                                    </p>
                                </div>
                                <div className="relative aspect-square bg-[hsl(var(--surface-raised))]">
                                    {submission.selfieUrl ? (
                                        <Image
                                            src={submission.selfieUrl}
                                            alt="Selfie"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
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
                                        <Image
                                            src={submission.idDocumentUrl}
                                            alt="ID Document"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <CreditCard size={40} className="text-border" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        {isPending && (
                            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                                    Verification Decision
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <Button
                                        onClick={handleApprove}
                                        disabled={actionLoading || isUnderage}
                                        className="bg-success hover:bg-success/90 text-white font-semibold h-11"
                                    >
                                        {actionLoading ? (
                                            <Loader2 size={15} className="animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle size={15} className="mr-2" />
                                                Approve
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        onClick={() => setModal('reject')}
                                        disabled={actionLoading}
                                        variant="outline"
                                        className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:text-orange-500 font-semibold h-11"
                                    >
                                        <XCircle size={15} className="mr-2" />
                                        Reject
                                    </Button>

                                    <Button
                                        onClick={() => setModal('ban')}
                                        disabled={actionLoading}
                                        variant="outline"
                                        className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold h-11"
                                    >
                                        <ShieldBan size={15} className="mr-2" />
                                        Ban
                                    </Button>
                                </div>

                                {isUnderage && (
                                    <p className="text-xs text-destructive mt-2">
                                        Approval blocked — user is underage
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Post-action controls (approved user can still be banned) */}
                        {submission.status === 'APPROVED' && (
                            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                                    Actions
                                </p>
                                <Button
                                    onClick={() => setModal('ban')}
                                    disabled={actionLoading}
                                    variant="outline"
                                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold"
                                >
                                    <ShieldBan size={15} className="mr-2" />
                                    Revoke & Ban
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right: submission details */}
                    <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-5 h-fit">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                            Submission Details
                        </p>

                        <div className="mt-3">
                            <InfoRow icon={User} label="Full Name" value={submission.name} />
                            <InfoRow
                                icon={Calendar}
                                label="Date of Birth"
                                value={new Date(submission.dob).toLocaleDateString('en-IN', {
                                    day: '2-digit', month: 'long', year: 'numeric'
                                })}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Age"
                                value={`${submission.age} years old${isUnderage ? ' ⚠️ Underage' : ' ✅'}`}
                            />
                            <InfoRow
                                icon={CreditCard}
                                label="ID Type"
                                value={submission.idType.replace('_', ' ')}
                            />
                            <InfoRow
                                icon={CreditCard}
                                label="ID Number"
                                value={submission.idNumber}
                                mono
                            />
                            <InfoRow
                                icon={Smartphone}
                                label="Device ID"
                                value={submission.deviceId}
                                mono
                            />
                            <InfoRow
                                icon={Clock}
                                label="Submitted"
                                value={new Date(submission.createdAt).toLocaleString('en-IN', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            />
                            {submission.ticketNumber && (
                                <InfoRow
                                    icon={CheckCircle}
                                    label="Ticket Number"
                                    value={submission.ticketNumber}
                                    mono
                                />
                            )}
                            {submission.tokenId && (
                                <InfoRow
                                    icon={CheckCircle}
                                    label="QR Key"
                                    value={submission.tokenId}
                                    mono
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}