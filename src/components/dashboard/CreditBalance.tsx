type CreditBalanceProps = {
  credits?: number;
};

const CreditBalance = ({ credits = 0 }: CreditBalanceProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-600">Credits</p>
      <div className="mt-2 text-3xl font-semibold text-slate-900">
        {credits.toLocaleString()}
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Verified emails deduct 1 credit via Supabase RPC.
      </p>
    </div>
  );
};

export default CreditBalance;

