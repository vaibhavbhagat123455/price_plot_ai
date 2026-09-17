"use client";

import React, { FormEvent, useState } from "react";
import { LockKeyhole, LogIn, ShieldCheck, User } from "lucide-react";

interface AdminLoginProps {
  onLogin: (user: { username: string; email: string; isApproved: boolean; isAdmin: boolean }) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || "Invalid admin username or password");
      }

      localStorage.setItem("pricepilot_admin_session", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (loginError: any) {
      setError(loginError.message || "Unable to connect to the backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-brand-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-white">PricePilot AI</h1>
          <p className="text-slate-400 mt-2">Admin access to pricing intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 shadow-2xl space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-sm text-slate-500 mt-1">Enter the credentials configured on the backend.</p>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Username</span>
            <span className="mt-2 flex items-center gap-2 border border-slate-200 rounded-xl px-3 focus-within:border-brand-500">
              <User className="w-4 h-4 text-slate-400" />
              <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full py-3 outline-none text-sm" placeholder="Admin username" autoComplete="username" required />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <span className="mt-2 flex items-center gap-2 border border-slate-200 rounded-xl px-3 focus-within:border-brand-500">
              <LockKeyhole className="w-4 h-4 text-slate-400" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full py-3 outline-none text-sm" placeholder="Admin password" autoComplete="current-password" required />
            </span>
          </label>

          {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
            <LogIn className="w-4 h-4" />
            {loading ? "Signing in..." : "Sign in as Admin"}
          </button>
        </form>
      </div>
    </main>
  );
};
