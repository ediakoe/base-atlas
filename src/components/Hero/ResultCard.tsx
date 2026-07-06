interface ResultCardProps {
  estimatedValue: number;
  estimatedAllocation: number;
  fdv: number;
  onCopy: () => void;
  onShare: () => void;
}

export default function ResultCard({
  estimatedValue,
  estimatedAllocation,
  fdv,
  onCopy,
  onShare,
}: ResultCardProps) {
  const valueColor =
    estimatedValue > 5000
      ? "text-yellow-400"
      : estimatedValue > 1000
      ? "text-green-400"
      : estimatedValue > 100
      ? "text-blue-400"
      : "text-slate-300";

  return (
    <>
      <div className="mb-8 rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center">
        <p className="text-slate-400">
          Estimated Airdrop Value
        </p>

        <h2
          className={`mt-4 text-7xl font-black ${valueColor}`}
        >
          $
          {Math.round(
            estimatedValue
          ).toLocaleString()}
        </h2>

        <p className="mt-3 text-xl text-slate-300">
          {Math.round(
            estimatedAllocation
          ).toLocaleString()}{" "}
          Tokens
        </p>

        <div className="mt-3 text-sm text-slate-400">
          FDV $
          {Math.round(
            fdv
          ).toLocaleString()}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCopy}
            className="flex-1 rounded-2xl bg-blue-600 px-5 py-4 font-semibold transition hover:scale-105"
          >
            📋 Copy
          </button>

          <button
            onClick={onShare}
            className="flex-1 rounded-2xl bg-slate-800 px-5 py-4 font-semibold transition hover:scale-105"
          >
            🐦 Share
          </button>
        </div>
      </div>

      {estimatedValue > 5000 && (
        <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-center">
          <p className="font-bold text-yellow-400">
            🚨 Whale Allocation
            Detected
          </p>

          <p className="mt-2 text-sm text-slate-300">
            Your estimated allocation
            is significantly above the
            average participant.
          </p>
        </div>
      )}
    </>
  );
}