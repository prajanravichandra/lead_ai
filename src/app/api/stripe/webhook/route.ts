import { NextRequest, NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe/client";
import { incrementCreditsUnsafe } from "@/lib/supabase/queries";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook configuration" },
      { status: 400 },
    );
  }

  const payload = await req.text();
  const stripe = stripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid signature", message: `${err}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session?.metadata?.user_id as string | undefined;
    const credits = Number(session?.metadata?.credits ?? 0);
    if (userId && credits > 0) {
      await incrementCreditsUnsafe(userId, credits);
    }
  }

  return NextResponse.json({ received: true });
}

