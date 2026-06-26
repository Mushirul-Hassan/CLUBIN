import { cn } from '@/lib/utils';
import React from 'react';

interface InfoRowProps {
    icon: React.ElementType;
    label: string;
    value?: string | number;
    mono?: boolean;
}

export function InfoRow({ icon: Icon, label, value, mono = false }: InfoRowProps) {
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