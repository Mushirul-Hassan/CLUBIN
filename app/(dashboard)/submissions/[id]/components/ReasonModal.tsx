'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, ShieldBan, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReasonModalProps {
    type: 'reject' | 'ban';
    onConfirm: (reason: string) => void;
    onCancel: () => void;
    loading: boolean;
}

export function ReasonModal({ type, onConfirm, onCancel, loading }: ReasonModalProps) {
    const [reason, setReason] = useState('');
    const isBan = type === 'ban';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
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