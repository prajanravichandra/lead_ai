import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase/server";
import { Lead } from "@/types";

function toCsv(leads: Lead[]) {
  const headers = [
    "id",
    "name",
    "email",
    "phone",
    "website",
    "platform",
    "location",
    "email_status",
    "created_at",
  ];
  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.name ?? "",
      lead.email ?? "",
      lead.phone ?? "",
      lead.website ?? "",
      lead.platform,
      lead.location ?? "",
      lead.email_status ?? "",
      lead.created_at,
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const supabase = supabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csv = toCsv((data ?? []) as Lead[]);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}

