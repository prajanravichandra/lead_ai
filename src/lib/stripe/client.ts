import Stripe from "stripe";

export const stripeClient = () => {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  // Use package default API version to avoid type mismatch during deploy.
  return new Stripe(secret);
};

