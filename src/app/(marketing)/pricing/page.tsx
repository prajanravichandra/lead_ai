import PricingCards from "@/components/marketing/PricingCards";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-2 text-slate-600">
          Choose a credit pack. Checkout handled via Stripe.
        </p>
      </div>
      <PricingCards />
    </main>
  );
}

