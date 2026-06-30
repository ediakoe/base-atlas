type Props = {
  balance: number;
  tokens: number;
  nfts: number;
};

export default function PortfolioHealth({
  balance,
  tokens,
  nfts,
}: Props) {
  const diversification = Math.min(
    Math.round(tokens * 3 + nfts),
    100
  );

  const risk =
    balance > 2
      ? "Low"
      : balance > 0.5
      ? "Medium"
      : "High";

  const status =
    diversification > 70
      ? "Power User"
      : diversification > 40
      ? "Active User"
      : "Early User";

  const summary =
    diversification > 70
      ? "Strongly diversified wallet with broad ecosystem exposure."
      : diversification > 40
      ? "Healthy wallet activity across multiple assets."
      : "Early stage wallet with limited diversification.";

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-2xl font-bold">
        Portfolio Health
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 p-4">
          <span>Diversification</span>
          <span className="font-bold text-green-400">
            {diversification}%
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 p-4">
          <span>Risk Level</span>
          <span className="font-bold text-yellow-400">
            {risk}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 p-4">
          <span>Wallet Status</span>
          <span className="font-bold text-blue-400">
            {status}
          </span>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-sm leading-7 text-slate-300">
          {summary}
        </p>
      </div>
    </div>
  );
}