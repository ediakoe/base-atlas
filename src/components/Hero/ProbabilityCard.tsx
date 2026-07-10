import { pickByThreshold } from "../../lib/threshold";

interface ProbabilityCardProps {
  probability: number;
}

const LEVEL_STYLES = {
  HIGH: {
    text: "text-green-400",
    box: "border-green-500/30 bg-green-500/10",
    bar: "bg-green-400",
  },
  MEDIUM: {
    text: "text-yellow-400",
    box: "border-yellow-500/30 bg-yellow-500/10",
    bar: "bg-yellow-400",
  },
  LOW: {
    text: "text-red-400",
    box: "border-red-500/30 bg-red-500/10",
    bar: "bg-red-400",
  },
} as const;

type Level = keyof typeof LEVEL_STYLES;

export default function ProbabilityCard({
  probability,
}: ProbabilityCardProps) {
  const level = pickByThreshold<Level>(
    probability,
    [
      [74, "HIGH"],
      [44, "MEDIUM"],
    ],
    "LOW"
  );

  const { text: color, box: bg, bar } = LEVEL_STYLES[level];

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
          className={`h-full rounded-full transition-all duration-700 ${bar}`}
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