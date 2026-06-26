import { SubmissionStatus } from '@/types';
import { tabs } from '../constants';
import { cn } from '@/lib/utils';
type TabsProps = {
    activeTab: SubmissionStatus;
    total: number;
    onTabChange: (status: SubmissionStatus) => void;
};

export function Tabs({ onTabChange, total, activeTab }: TabsProps) {


    return (
        <div className="space-y-5">

            <div className="flex items-center gap-1 bg-[hsl(var(--surface))] border border-border rounded-xl p-1 w-fit">
                {tabs.map((item) => (
                    <button
                        key={item.value}
                        onClick={() => onTabChange(item.value)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                            activeTab === item.value
                                ? 'bg-[hsl(var(--surface-raised))] text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <item.icon size={14} className={activeTab === item.value ? item.color : ''} />
                        {item.label}
                        {activeTab === item.value && total > 0 && (
                            <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {total}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}