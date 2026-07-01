'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, ShieldBan, XCircle } from 'lucide-react';

interface ActionButtonsProps {
    status: string;
    isUnderage: boolean;
    actionLoading: boolean;
    onApprove: () => void;
    onSetModal: (type: 'reject' | 'ban') => void;
}

export function ActionButtons({
    status,
    isUnderage,
    actionLoading,
    onApprove,
    onSetModal,
}: ActionButtonsProps) {
    if (status === 'PENDING') {
        return (
            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                    Verification Decision
                </p>
                <div className="grid grid-cols-3 gap-3">
                    <Button
                        onClick={onApprove}
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
                        onClick={() => onSetModal('reject')}
                        disabled={actionLoading}
                        variant="outline"
                        className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:text-orange-500 font-semibold h-11"
                    >
                        <XCircle size={15} className="mr-2" />
                        Reject
                    </Button>

                    <Button
                        onClick={() => onSetModal('ban')}
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
        );
    }

    if (status === 'APPROVED') {
        return (
            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                    Actions
                </p>
                <Button
                    onClick={() => onSetModal('ban')}
                    disabled={actionLoading}
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold"
                >
                    <ShieldBan size={15} className="mr-2" />
                    Revoke & Ban
                </Button>
            </div>
        );
    }

    if (status === 'REJECTED') {
        return (
            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                    Actions
                </p>
                 <div className="grid grid-cols-3 gap-3">
                <Button
                    onClick={onApprove}
                    disabled={actionLoading || isUnderage}
                    variant="outline"
                    className="bg-success hover:bg-success/90 text-white font-semibold"
                >
                    <CheckCircle size={15} className="mr-2" />
                    Override & Approve
                </Button>
                <Button
                    onClick={() => onSetModal('ban')}
                    disabled={actionLoading}
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold"
                >
                    <ShieldBan size={15} className="mr-2" />
                    Ban
                </Button>
                </div>
            </div>
        );
    }

    if (status === 'BANNED') {
        return (
            <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                    Actions
                </p>
                <Button
                    onClick={onApprove}
                    disabled={actionLoading || isUnderage}
                    variant="outline"
                    className="bg-success hover:bg-success/90 text-white font-semibold"
                >
                    <CheckCircle size={15} className="mr-2" />
                    Override & Approve
                </Button>
            </div>
        );
    }

    return null;
}