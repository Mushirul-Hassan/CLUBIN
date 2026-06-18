import { LoginForm } from '@/components/auth/LoginForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">

          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl clubin-glow blur-xl opacity-60 animate-pulse"
                style={{ background: 'hsl(263 70% 58% / 0.3)' }}
              />
              <div className="relative w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <span className="text-2xl font-black text-white tracking-tight">C</span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Clubin Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Verification management dashboard
              </p>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-xl shadow-black/20">
            <LoginForm />
          </div>

          <p className="text-center text-xs text-muted-foreground/60">
            Clubin · Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
}