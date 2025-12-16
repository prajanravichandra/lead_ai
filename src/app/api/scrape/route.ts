import { NextRequest, NextResponse } from "next/server";

// Ensure this route is treated as dynamic and always included in the build.
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const webhookUrl =
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
      "https://prajanr.app.n8n.cloud/webhook-test/scrape-leads";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-COMET-TOKEN": process.env.NEXT_PUBLIC_N8N_TOKEN ?? "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Scrape API error:", error);
    return NextResponse.json(
      { error: "Failed to trigger scrape" },
      { status: 500 },
    );
  }
}

// Simple GET to verify the route exists in deployments.
export async function GET() {
  return NextResponse.json({ ok: true });
}



