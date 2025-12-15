export type ScrapePlatform = "google_maps" | "instagram";

export type ScrapeLeadsRequest = {
  user_id: string;
  platform: ScrapePlatform;
  keyword: string;
  location: string;
  max_results: number;
};

export async function scrapeLeads(data: ScrapeLeadsRequest) {
  const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-COMET-TOKEN": process.env.NEXT_PUBLIC_N8N_TOKEN ?? "",
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

