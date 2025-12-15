const features = [
  {
    title: "Smart scraping",
    desc: "Route to Google Maps or Instagram scrapers via n8n with credit checks.",
  },
  {
    title: "Verified emails",
    desc: "Post-scrape email verification with atomic credit deduction per result.",
  },
  {
    title: "Supabase-first",
    desc: "RLS-ready schema for users and leads, with RPC for credit management.",
  },
  {
    title: "Stripe billing",
    desc: "Checkout sessions with user metadata and webhook-driven credit top-ups.",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

