import { supabaseServerClient } from "./server";

export async function getUserCredits(userId: string) {
  const supabase = supabaseServerClient();
  return supabase.from("users").select("credits").eq("id", userId).single();
}

export async function listLeads(userId: string, limit = 10) {
  const supabase = supabaseServerClient();
  return supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
}

export async function listLeadsPaginated(
  userId: string,
  { limit = 25, offset = 0 }: { limit?: number; offset?: number } = {},
) {
  const supabase = supabaseServerClient();
  return supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
}

export async function incrementCreditsUnsafe(userId: string, amount: number) {
  // Non-atomic helper: fetch and update credits. Acceptable for demo use.
  const supabase = supabaseServerClient();
  const current = await supabase
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();
  if (current.error || !current.data) {
    return current;
  }
  const nextCredits = (current.data.credits ?? 0) + amount;
  return supabase
    .from("users")
    .update({ credits: nextCredits })
    .eq("id", userId);
}

