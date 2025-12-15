"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { supabaseBrowserClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = supabaseBrowserClient();
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setMessage("Signed out. You can close the tab or sign in again.");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <DashboardNav />
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="mt-2 text-sm text-slate-600">
            View your email and sign out.
          </p>
          <div className="mt-4 text-sm text-slate-700">
            Email: <span className="font-medium">{email ?? "Not signed in"}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="/forgot-password"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Reset password
            </a>
            <button
              type="button"
              onClick={signOut}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
          {message ? (
            <p className="mt-3 text-sm text-green-700">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}

