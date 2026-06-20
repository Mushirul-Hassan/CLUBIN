'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/submissions': 'Submissions',
  '/users': 'Verified Users',
  '/clubs': 'Clubs',
  '/events': 'Events',
  '/settings': 'Settings',
  '/settings/age-limits': 'Age Limit Settings',
};

export function Topbar() {
  const pathname = usePathname();


  const title =
    pageTitles[pathname] ||
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key) && key !== '/')?.[1] ||
    'Dashboard';

  return (
    <header className="fixed top-0 left-60 right-0 h-14 flex items-center justify-between px-6 bg-[hsl(var(--surface))] border-b border-border z-30">
      <h1 className="text-sm font-semibold text-foreground tracking-tight">{title}</h1>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="w-9 h-9 text-muted-foreground hover:text-foreground">
          <Bell size={16} />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}