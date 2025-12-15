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

