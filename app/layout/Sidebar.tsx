'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Building2,
  CalendarDays,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Submissions',
    href: '/submissions',
    icon: ClipboardList,
    badge: 'pending',
  },
  {
    label: 'Verified Users',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Clubs',
    href: '/clubs',
    icon: Building2,
    comingSoon: true,
  },
  {
    label: 'Events',
    href: '/events',
    icon: CalendarDays,
    comingSoon: true,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      logout();
      router.push('/login');
      toast.success('Logged out successfully');
    }
  };

  return (
    <aside className="w-60 shrink-0 h-screen flex flex-col bg-surface border-r border-border">
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 clubin-glow-sm">
          <ShieldCheck size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground tracking-tight">Clubin</p>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.comingSoon ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised',
                item.comingSoon && 'opacity-40 cursor-not-allowed'
              )}
              onClick={(e) => item.comingSoon && e.preventDefault()}
            >
              <Icon
                size={16}
                className={cn(
                  'shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <span>{item.label}</span>
              {item.comingSoon && (
                <span className="ml-auto text-[10px] text-muted-foreground/60 font-mono">
                  soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-foreground truncate">
            {admin?.fullName || 'Admin'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {admin?.role === 'ADMIN' ? 'Superadmin' : 'Club Admin'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}