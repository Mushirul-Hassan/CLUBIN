"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const response = await authApi.login(values);
      setAuth(response.accessToken, response.admin);
      toast.success(`Welcome back, ${response.admin.fullName}`);
      router.push("/");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Invalid credentials";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium text-muted-foreground uppercase tracking-widest"
        >
          Username
        </Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          autoFocus
          placeholder="superadmin"
          className="bg-surface-raised border-border/60 h-11 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-destructive text-xs">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-muted-foreground uppercase tracking-widest"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="bg-surface-raised border-border/60 h-11 pr-11 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide transition-all clubin-glow-sm hover:clubin-glow"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
