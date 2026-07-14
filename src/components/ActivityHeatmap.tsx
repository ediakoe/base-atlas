import { useMemo } from "react";
import { motion } from "framer-motion";

type Props = {
  walletAge: string;
  balance: number;
  nfts: number;
};

export default function ActivityHeatmap({ walletAge, balance, nfts }: Props) {
  const weeks = useMemo(() => {
    const activityLevel = Math.min(
      1,
      balance * 0.13 + nfts * 0.0018 + (walletAge.includes("Year") ? 0.38 : walletAge.includes("Month") ? 0.22 : 0.12)
    );

    const data: number[][] = [];
    for (let w = 0; w < 18; w++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const recency = w / 18;
        const base = Math.random() * activityLevel * (0.3 + recency * 1.05);
        const spike = Math.random() > 0.88 ? 0.4 : 0;
        week.push(Math.min(1, base + spike));
      }
      data.push(week);
    }
    return data;
  }, [walletAge, balance, nfts]);

  const getColor = (value: number) => {
    if (value < 0.1) return "bg-slate-800/60";
    if (value < 0.25) return "bg-[#0c1a3a]";
    if (value < 0.4) return "bg-[#152a5c]";
    if (value < 0.55) return "bg-[#1e3a8a]";
    if (value < 0.7) return "bg-[#2563eb]";
    if (value < 0.85) return "bg-[#3b82f6]";
    return "bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.55)]";
  };

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthLabels = ["Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 md:p-7 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <h3 className="text-xl font-bold tracking-tight">Activity Heatmap</h3>
          </div>
          <p className="text-sm text-slate-400">
            On-chain activity pattern · last 18 weeks
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-xs text-slate-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-slate-800/60" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-[#0c1a3a]" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-[#1e3a8a]" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-[#2563eb]" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-[#60a5fa]" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Grid with Day Labels */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-3">
          
          {/* Day labels (left side) */}
          <div className="flex flex-col gap-[5px] pt-0 justify-between py-[1px]">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="h-3.5 flex items-center text-[10px] text-slate-500 font-medium w-7"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          <div className="flex gap-[5px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[5px]">
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: wi * 0.012 + di * 0.006, duration: 0.25 }}
                    className={`w-3.5 h-3.5 rounded-[4px] transition-all duration-200 hover:scale-125 hover:brightness-125 cursor-default ${getColor(day)}`}
                    title={`${dayLabels[di]} · Week ${wi + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Month labels */}
      <div className="mt-4 ml-10 flex justify-between text-[11px] text-slate-600 max-w-[320px]">
        {monthLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </motion.div>
  );
}