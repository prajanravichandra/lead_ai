const LeadsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Recent leads</h3>
        <p className="text-xs text-slate-500">
          Table with filters, bulk actions, and badges will render here.
        </p>
      </div>
      <div className="px-4 py-6 text-sm text-slate-500">
        No leads yet. Trigger a scrape to see results.
      </div>
    </div>
  );
};

export default LeadsTable;

