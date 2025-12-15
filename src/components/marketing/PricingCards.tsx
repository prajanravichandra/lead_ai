const plans = [
  {
    name: "Starter",
    credits: "1,000 credits",
    price: "$29",
    blurb: "Kick off small campaigns and validate channels.",
  },
  {
    name: "Growth",
    credits: "3,000 credits",
    price: "$79",
    blurb: "Scale outreach with verified emails included.",
  },
  {
    name: "Pro",
    credits: "10,000 credits",
    price: "$199",
    blurb: "High-volume scraping with team workflows.",
  },
];

const PricingCards = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-semibold text-slate-900">Pricing</h2>
        <p className="mt-2 text-slate-600">
          Buy credits via Stripe Checkout. Credits deduct per verified email.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600">{plan.blurb}</p>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {plan.price}
              </div>
              <div className="text-sm font-medium text-slate-700">
                {plan.credits}
              </div>
              <a
                className="mt-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                href="/dashboard/credits"
              >
                Buy credits
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;

