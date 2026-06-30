type WalletAgeProps = {
  age: {
    days: string;
    years: string;
    firstActivity: string;
  };
};

export default function WalletAge({
  age,
}: WalletAgeProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-slate-400">
        Wallet Age
      </p>

      <h2 className="mt-2 text-2xl font-black text-orange-400">
        {age.years || age.days}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        First Activity
      </p>

      <p className="text-slate-300">
        {age.firstActivity || "Unknown"}
      </p>
    </div>
  );
}