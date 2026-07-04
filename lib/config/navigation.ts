import {
    LayoutDashboard,
    ClipboardList,
    Users,
    Building2,
    CalendarDays,
    Settings,
    type LucideIcon,
} from 'lucide-react'

export interface NavItem {
    label: string
    href: string
    icon: LucideIcon
    comingSoon?: boolean
}

export const navItems: NavItem[] = [
    { label: 'Overview', href: '/', icon: LayoutDashboard},
    { label: 'Submissions', href: '/submissions', icon: ClipboardList },
    { label: 'Verified Users', href: '/users', icon: Users, comingSoon: true},
    { label: 'Clubs', href: '/clubs', icon: Building2, comingSoon: true },
    { label: 'Events', href: '/events', icon: CalendarDays, comingSoon: true },
    { label: 'Settings', href: '/settings', icon: Settings,comingSoon: true },
]