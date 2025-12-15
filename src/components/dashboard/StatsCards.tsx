type StatsCardsProps = {
  totalLeads?: number;
  thisMonth?: number;
  verified?: number;
  googleCount?: number;
  instagramCount?: number;
};

const StatsCards = ({
  totalLeads = 0,
  thisMonth = 0,
  verified = 0,
  googleCount = 0,
  instagramCount = 0,
}: StatsCardsProps) => {
  const stats = [
    { label: "Total leads", value: totalLeads.toLocaleString() },
    { label: "This month", value: thisMonth.toLocaleString() },
    { label: "Verified emails", value: verified.toLocaleString() },
    {
      label: "Google vs Instagram",
      value: `${googleCount.toLocaleString()} / ${instagramCount.toLocaleString()}`,
      helper: "GM / IG",
    },
  ];

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

