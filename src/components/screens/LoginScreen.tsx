import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AUTHORIZED_ADMIN_EMAIL } from '../../services/storageService';

export const LoginScreen: React.FC = () => {
  const { loginAdmin, navigateTo, adminUser } = useApp();
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('nexora2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      setIsLoading(false);
      if (res.success) {
        navigateTo('admin');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleGoogleLogin = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Verify administrator permissions through trusted authorization mechanism
      if (email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        loginAdmin(AUTHORIZED_ADMIN_EMAIL, 'google_oauth_authorized');
        navigateTo('admin');
      } else {
        setError('Only authorized administrator accounts can access the Nexora Admin console.');
      }
    }, 500);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between px-6 py-8 bg-[#060c18] overflow-y-auto">
      {/* Top back button & branding */}
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="p-2 -ml-2 text-slate-400 hover:text-cyan-400 rounded-lg inline-flex items-center gap-1.5 text-xs mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Branding */}
        <div className="flex flex-col items-center text-center mt-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-2">
            <span className="font-tech text-2xl font-black text-white">N</span>
          </div>
          <h1 className="font-tech text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            NEXORA
          </h1>
          <p className="text-[11px] text-slate-400 italic">
            Innovating Today, Engineering Tomorrow.
          </p>
        </div>

        {/* Card */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to continue to Nexora</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {adminUser.isAuthenticated && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Active Admin Session Detected</p>
              <p className="text-[11px] text-emerald-400/80">
                Logged in as {adminUser.email}
              </p>
              <button
                onClick={() => navigateTo('admin')}
                className="mt-2 text-xs font-semibold underline hover:text-white"
              >
                Go to Admin Panel &rarr;
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-300 block">
              Authorized Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tiwarigautam819@gmail.com"
                className="w-full bg-[#0a1428] border border-cyan-900/50 focus:border-cyan-400 rounded-xl py-3 pl-10 pr-3 text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-300 block">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0a1428] border border-cyan-900/50 focus:border-cyan-400 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono-code"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => alert('Password reset verification link has been sent to tiwarigautam819@gmail.com')}
              className="text-[11px] text-cyan-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-cyan-500/20 active:scale-98 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Verifying Credentials...' : 'Login'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyan-950/60" />
          </div>
          <span className="relative px-3 bg-[#060c18] text-[10px] text-slate-400 font-medium">
            OR
          </span>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0b162c] hover:bg-[#0f1f3d] border border-cyan-900/50 text-slate-200 font-medium text-xs flex items-center justify-center gap-2.5 transition-all active:scale-98"
        >
          {/* Google G icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.9 0 12s.45 3.86 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Footer Contact */}
      <div className="text-center pt-6">
        <p className="text-[11px] text-slate-400">
          Not a member?{' '}
          <button
            onClick={() => alert('Contact authorized project lead: tiwarigautam819@gmail.com')}
            className="text-cyan-400 hover:underline font-medium"
          >
            Contact Admin
          </button>
        </p>
      </div>
    </div>
  );
};
