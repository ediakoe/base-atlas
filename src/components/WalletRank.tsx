import { formatNumber } from "../lib/format";
import { getWalletRank } from "../lib/rank";

type Props = {
  score: number;
};

export default function WalletRank({
  score,
}: Props) {
  const { rank, percentile } = getWalletRank(score);

  let badge = "Early User";

  if (score > 800) {
    badge = "Elite";
  } else if (score > 600) {
    badge = "Power User";
  } else if (score > 400) {
    badge = "Advanced";
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Wallet Rank
        </h2>

        <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          {badge}
        </div>

      </div>

      <div className="mt-6">

        <h3 className="text-5xl font-black text-blue-400">
          #{formatNumber(rank)}
        </h3>

        <p className="mt-3 text-slate-400">
          Better than {percentile}% of analyzed wallets
        </p>

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-[#0052FF] transition-all"
          style={{
            width: `${percentile}%`,
          }}
        />

      </div>

    </div>
  );
}