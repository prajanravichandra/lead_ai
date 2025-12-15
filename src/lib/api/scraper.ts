export type ScrapePlatform = "google_maps" | "instagram";

export type ScrapeLeadsRequest = {
  user_id: string;
  platform: ScrapePlatform;
  keyword: string;
  location: string;
  max_results: number;
};

export async function scrapeLeads(data: ScrapeLeadsRequest) {
  // Call through Next.js API proxy to avoid CORS issues and hide webhook URL.
  const response = await fetch("/api/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Insufficient credits");
    }
    throw new Error("Scraping failed");
  }

  return response.json();
}

