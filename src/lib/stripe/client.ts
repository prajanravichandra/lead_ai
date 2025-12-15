import Stripe from "stripe";

export const stripeClient = () => {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secret, { apiVersion: "2024-06-20" });
};

