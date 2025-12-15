export default function ScrapePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Scrape leads</h1>
        <p className="mt-2 text-sm text-slate-600">
          Platform selector, keyword, location, and max results form will go
          here. Submissions will call the n8n webhook.
        </p>
      </div>
    </main>
  );
}

