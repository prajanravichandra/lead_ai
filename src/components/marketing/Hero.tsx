const Hero = () => {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
        Lead Generation SaaS · Google Maps + Instagram
      </div>
      <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
        Scrape business leads, verify emails, and manage credits in one
        dashboard.
      </h1>
      <p className="max-w-2xl text-lg text-slate-600">
        Connect to the live n8n backend, trigger scrapes for Google Maps or
        Instagram, verify emails, and export clean lead lists. Built with
        Next.js, Supabase Auth, Stripe, and Tailwind.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          href="/signup"
        >
          Get started
        </a>
        <a
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          href="/dashboard"
        >
          Go to dashboard
        </a>
      </div>
    </section>
  );
};

export default Hero;

