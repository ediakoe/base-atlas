import { motion } from "framer-motion";

interface ResultCardProps {
  estimatedValue: number;
  estimatedAllocation: number;
  fdv: number;
  onCopy?: () => Promise<void> | void;   // اضافه شد
  onShare?: () => void;                  // اختیاری شد
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
      ? "text-yellow-300"
      : estimatedValue > 1000
        ? "text-emerald-300"
        : estimatedValue > 100
          ? "text-blue-300"
          : "text-slate-100";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Estimated Airdrop Value
        </p>

        <h2
          className={`mt-4 break-words text-5xl font-black leading-none sm:text-7xl ${valueColor}`}
        >
          ${Math.round(estimatedValue).toLocaleString()}
        </h2>

        <p className="mt-4 text-base font-semibold text-slate-200 sm:text-xl">
          {Math.round(estimatedAllocation).toLocaleString()} Tokens
        </p>

        <div className="mt-3 text-sm text-slate-400">
          Fully diluted value ${Math.round(fdv).toLocaleString()}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {onCopy && (
            <button
              onClick={onCopy}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-blue-400/40"
            >
              Copy Result
            </button>
          )}

          {onShare && (
            <button
              onClick={onShare}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-blue-400/40"
            >
              Share on X
            </button>
          )}
        </div>
      </motion.div>

      {estimatedValue > 5000 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 rounded-3xl border border-yellow-300/30 bg-yellow-300/10 p-5"
        >
          <p className="font-bold text-yellow-200">
            Whale Allocation Detected
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Your estimated allocation is significantly above the average
            participant.
          </p>
        </motion.div>
      )}
    </>
  );
}