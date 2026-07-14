import { motion } from "framer-motion";

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
      ? "text-emerald-300"
      : probability >= 45
        ? "text-yellow-300"
        : "text-red-300";

  const bar =
    probability >= 75
      ? "bg-emerald-300"
      : probability >= 45
        ? "bg-yellow-300"
        : "bg-red-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.22 }}
      className="mb-6 rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Airdrop Probability
          </p>

          <div className={`mt-3 text-4xl font-black ${color}`}>
            {probability}%
          </div>
        </div>

        <div
          className={`w-fit rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black ${color}`}
        >
          {level}
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${bar}`}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        Based on wallet tier, allocation size and estimated reward value.
      </p>
    </motion.div>
  );
}
