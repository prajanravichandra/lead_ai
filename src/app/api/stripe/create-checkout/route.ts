import { NextRequest, NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe/client";

const packs = {
  starter: { amount: 2900, credits: 1000, name: "Starter (1,000 credits)" },
  growth: { amount: 7900, credits: 3000, name: "Growth (3,000 credits)" },
  pro: { amount: 19900, credits: 10000, name: "Pro (10,000 credits)" },
} as const;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const pack = body?.pack as keyof typeof packs | undefined;
  const userId = body?.userId as string | undefined;
  if (!pack || !userId || !packs[pack]) {
    return NextResponse.json(
      { error: "Invalid pack or userId" },
      { status: 400 },
    );
  }

  const stripe = stripeClient();
  const successUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/dashboard/credits";
  const cancelUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/dashboard/credits";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${successUrl}?checkout=success`,
    cancel_url: `${cancelUrl}?checkout=cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: packs[pack].name },
          unit_amount: packs[pack].amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
      credits: String(packs[pack].credits),
      pack,
    },
  });

  return NextResponse.json({ url: session.url });
}

