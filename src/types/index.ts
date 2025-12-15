export type Platform = "google_maps" | "instagram";

export type User = {
  id: string;
  credits: number;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  user_id: string;
  platform: Platform;
  name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  location: string | null;
  email_status: "verified" | "invalid" | "pending" | null;
  created_at: string;
};

