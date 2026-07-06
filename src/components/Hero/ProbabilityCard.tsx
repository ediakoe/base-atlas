interface ProbabilityCardProps {
  probability: number;
}

export default function ProbabilityCard({
  probability,
}: ProbabilityCardProps) {
  const level =
    probability >= 75
      ? "HIGH"
      : probability >= 45
      ? "MEDIUM"
      : "LOW";

  const color =
    probability >= 75
      ? "text-green-400"
      : probability >= 45
      ? "text-yellow-400"
      : "text-red-400";

  const bg =
    probability >= 75
      ? "border-green-500/30 bg-green-500/10"
      : probability >= 45
      ? "border-yellow-500/30 bg-yellow-500/10"
      : "border-red-500/30 bg-red-500/10";

  return (
    <div
      className={`mb-6 rounded-3xl border p-6 text-center backdrop-blur-xl ${bg}`}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
        Airdrop Probability
      </p>

      <h2
        className={`mt-4 text-6xl font-black ${color}`}
      >
        {probability}%
      </h2>

      <div
        className={`mt-2 text-lg font-bold ${color}`}
      >
        {level}
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            probability >= 75
              ? "bg-green-400"
              : probability >= 45
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
          style={{
            width: `${probability}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Based on wallet tier,
        allocation size and
        estimated reward value.
      </p>
    </div>
  );
}