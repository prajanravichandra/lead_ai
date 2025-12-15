"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import PlatformSelector from "@/components/scraper/PlatformSelector";
import { scrapeLeads, ScrapePlatform } from "@/lib/api/scraper";
import { supabaseBrowserClient } from "@/lib/supabase/client";

export default function ScrapePage() {
  const supabase = supabaseBrowserClient();
  const [platform, setPlatform] = useState<ScrapePlatform>("google_maps");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [maxResults, setMaxResults] = useState(50);
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    if (!userId) {
      setError("Please sign in first.");
      return;
    }
    if (!keyword || !location) {
      setError("Keyword and location are required.");
      return;
    }
    setLoading(true);
    try {
      await scrapeLeads({
        user_id: userId,
        platform,
        keyword,
        location,
        max_results: maxResults,
      });
      setStatus("Scraping started! Leads will appear shortly.");
    } catch (err: any) {
      setError(err?.message ?? "Failed to start scraping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <DashboardNav />
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Scrape leads
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose platform, keyword, location, and max results. Submit to start
            the n8n workflow.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <PlatformSelector value={platform} onChange={setPlatform} />
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm font-medium text-slate-700">
                Keyword
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g., restaurants"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  required
                />
              </label>
              <label className="space-y-1 text-sm font-medium text-slate-700">
                Location
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g., New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </label>
            </div>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Max results (10–500)
              <input
                type="number"
                min={10}
                max={500}
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            {status ? <p className="text-sm text-green-700">{status}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Starting..." : "Start scraping"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

