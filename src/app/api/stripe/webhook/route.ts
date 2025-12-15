import { NextResponse } from "next/server";

export async function POST() {
  // TODO: verify Stripe signature and increment credits based on metadata.user_id
  return NextResponse.json({ status: "pending", message: "Not implemented" });
}

