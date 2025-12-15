type ScrapeFormProps = {
  onSubmit?: () => void;
};

const ScrapeForm = ({ onSubmit = () => undefined }: ScrapeFormProps) => {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          Keyword
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="e.g., restaurants"
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          Location
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="e.g., New York, NY"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm font-medium text-slate-700">
        Max results (10–500)
        <input
          type="number"
          min={10}
          max={500}
          defaultValue={50}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <p className="text-xs text-slate-500">
        This form will call the n8n webhook with an authenticated request and
        handle 403 for insufficient credits.
      </p>
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Start scraping
      </button>
    </form>
  );
};

export default ScrapeForm;

