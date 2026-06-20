"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";
import {
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { navItems } from '@/lib/config/navigation'

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const admin = useAuthStore((s) => s.admin);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      logout();
      router.push("/login");
      toast.success("Logged out");
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col
                      bg-[hsl(var(--surface))] border-r border-border z-40"
    >
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div
          className="w-8 h-8 rounded-lg bg-primary flex items-center
                        justify-center flex-shrink-0 clubin-glow-sm"
        >
          <span className="text-sm font-black text-white">C</span>
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight">Clubin</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.comingSoon ? "#" : item.href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--surface-raised))]",
                item.comingSoon ? "opacity-40 pointer-events-none" : "",
              ].join(" ")}
            >
              <item.icon size={17} className="flex-shrink-0" />

              <span className="flex-1">{item.label}</span>

              {item.comingSoon && (
                <span
                  className="text-[9px] uppercase tracking-widest
                                 bg-border text-muted-foreground
                                 px-1.5 py-0.5 rounded-full"
                >
                  Soon
                </span>
              )}

              {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        <div
          className="flex items-center gap-3 px-3 py-2.5
                        rounded-lg bg-[hsl(var(--surface-raised))]"
        >
          <div
            className="w-7 h-7 rounded-full bg-primary/20
                          flex items-center justify-center flex-shrink-0"
          >
            <ShieldCheck size={14} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">
              {admin?.fullName ?? "Admin"}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {admin?.role ?? "ADMIN"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
                     text-sm font-medium text-muted-foreground
                     hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
