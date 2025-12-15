"use client";

import { useEffect, useState } from "react";
import CreditBalance from "@/components/dashboard/CreditBalance";
import DashboardNav from "@/components/dashboard/DashboardNav";
import LeadsTable from "@/components/dashboard/LeadsTable";
import StatsCards from "@/components/dashboard/StatsCards";
import { supabaseBrowserClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = supabaseBrowserClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [stats, setStats] = useState({
    total: 0,
    month: 0,
    verified: 0,
    google: 0,
    instagram: 0,
  });

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;

      const { data: creditsData } = await supabase
        .from("users")
        .select("credits")
        .eq("id", uid)
        .single();
      setCredits(creditsData?.credits ?? 0);

      const { data: leadsData } = await supabase
        .from("leads")
        .select("platform,email_status,created_at");

      if (leadsData) {
        const total = leadsData.length;
        const verified = leadsData.filter(
          (l) => l.email_status === "verified",
        ).length;
        const google = leadsData.filter((l) => l.platform === "google_maps")
          .length;
        const instagram = leadsData.filter((l) => l.platform === "instagram")
          .length;
        const month = leadsData.filter((l) => {
          const created = new Date(l.created_at);
          const now = new Date();
          return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
          );
        }).length;
        setStats({ total, month, verified, google, instagram });
      }
    };
    load();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <DashboardNav />
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Credit balance, stats, and recent leads.
          </p>
        </div>
        <CreditBalance credits={credits} />
        <StatsCards
          totalLeads={stats.total}
          thisMonth={stats.month}
          verified={stats.verified}
          googleCount={stats.google}
          instagramCount={stats.instagram}
        />
        <LeadsTable />
        {!userId ? (
          <p className="text-sm text-slate-500">
            Sign in to see your data. Use the login or signup links.
          </p>
        ) : null}
      </div>
    </main>
  );
}

