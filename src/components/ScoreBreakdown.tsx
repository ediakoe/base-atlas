type Props = {
  trader: number;
  farmer: number;
  collector: number;
  builder: number;
  defi: number;
};

export default function ScoreBreakdown({
  trader,
  farmer,
  collector,
  builder,
  defi,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

      <h2 className="text-2xl font-bold">
        Atlas Score Breakdown
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Trader</span>
          <span className="text-blue-400">
            +{Math.round(trader * 0.25)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Farmer</span>
          <span className="text-green-400">
            +{Math.round(farmer * 0.3)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Collector</span>
          <span className="text-purple-400">
            +{Math.round(collector * 0.15)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Builder</span>
          <span className="text-orange-400">
            +{Math.round(builder * 0.1)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>DeFi</span>
          <span className="text-cyan-400">
            +{Math.round(defi * 0.2)}
          </span>
        </div>

      </div>

    </div>
  );
}