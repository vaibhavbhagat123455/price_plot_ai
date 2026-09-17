"use client";

import React from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { SignInButton } from "./ClerkAuthWrapper";

export const ClerkOnlyLogin: React.FC = () => (
  <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
    <div className="w-full max-w-md text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto mb-4">
        <ShieldCheck className="w-7 h-7" />
      </div>
      <h1 className="text-3xl font-bold text-white">PricePilot AI</h1>
      <p className="text-slate-400 mt-2 mb-8">Sign in with Clerk to access pricing intelligence</p>
      <div className="bg-white rounded-2xl p-7 shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900">Admin Access</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">Only authorized Clerk accounts can access the dashboard.</p>
        <SignInButton mode="modal">
          <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Sign in with Clerk
          </button>
        </SignInButton>
      </div>
    </div>
  </main>
);
