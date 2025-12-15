type Stat = {
  label: string;
  value: string;
  helper?: string;
};

const stats: Stat[] = [
  { label: "Total leads", value: "0" },
  { label: "This month", value: "0" },
  { label: "Verified emails", value: "0" },
  { label: "Google vs Instagram", value: "0 / 0", helper: "GM / IG" },
];

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-600">{stat.label}</p>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {stat.value}
          </div>
          {stat.helper ? (
            <p className="text-xs text-slate-500">{stat.helper}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

