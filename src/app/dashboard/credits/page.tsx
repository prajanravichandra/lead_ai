/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { supabaseBrowserClient } from "@/lib/supabase/client";

const plans = [
  { name: "Starter", credits: 1000, price: "$29", pack: "starter" },
  { name: "Growth", credits: 3000, price: "$79", pack: "growth" },
  { name: "Pro", credits: 10000, price: "$199", pack: "pro" },
] as const;

export default function CreditsPage() {
  const supabase = supabaseBrowserClient();
  const [credits, setCredits] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;
      const { data } = await supabase
        .from("users")
        .select("credits")
        .eq("id", uid)
        .single();
      setCredits(data?.credits ?? 0);
    };
    load();
  }, [supabase]);

  const startCheckout = async (pack: string) => {
    setError(null);
    setStatus(null);
    if (!userId) {
      setError("Please sign in first.");
      return;
    }
    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack, userId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to start checkout.");
      return;
    }
    const data = await res.json();
    if (data.url) {
      setStatus("Redirecting to Stripe...");
      window.location.href = data.url;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <DashboardNav />
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Credits</h1>
          <p className="mt-2 text-sm text-slate-600">
            Current balance and credit packs.
          </p>
          <div className="mt-4 text-lg font-semibold text-slate-900">
            Balance: {credits.toLocaleString()} credits
          </div>
          {status ? <p className="text-sm text-green-700">{status}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {plan.credits.toLocaleString()} credits
                </p>
                <div className="text-xl font-bold text-slate-900">
                  {plan.price}
                </div>
                <button
                  type="button"
                  onClick={() => startCheckout(plan.pack)}
                  className="mt-auto rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Buy credits
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

