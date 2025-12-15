"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { Lead } from "@/types";

export default function LeadsPage() {
  const supabase = supabaseBrowserClient();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) {
        setError("Please sign in to view leads.");
        return;
      }
      const { data, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);
      if (leadsError) {
        setError(leadsError.message);
      } else {
        setLeads((data ?? []) as Lead[]);
      }
    };
    load();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <DashboardNav />
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Leads</h1>
          <p className="mt-2 text-slate-600">
            Recent leads (first 50). Export CSV from the API route.
          </p>
        </div>
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-700">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{lead.name ?? "—"}</td>
                    <td className="px-4 py-3">{lead.email ?? "—"}</td>
                    <td className="px-4 py-3 capitalize">
                      {lead.platform.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3">{lead.location ?? "—"}</td>
                    <td className="px-4 py-3">
                      {new Date(lead.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-slate-500"
                      colSpan={5}
                    >
                      No leads yet. Trigger a scrape to see results.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

