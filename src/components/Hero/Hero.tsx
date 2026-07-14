import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProbabilityCard from "./ProbabilityCard";
import ResultCard from "./ResultCard";
import SpaceBackground from "../SpaceBackground";

const tierOptions = [
  ["small", "Small"],
  ["active", "Active"],
  ["power", "Power User"],
  ["whale", "Whale"],
];

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState("");
  const [supply, setSupply] = useState(10000000000);
  const [community, setCommunity] = useState(15);
  const [wallets, setWallets] = useState(500000);
  const [price, setPrice] = useState(0.5);
  const [tier, setTier] = useState("active");

  const analyzeWallet = () => {
    const address = walletAddress.trim();

    if (!address) return;

    navigate(`/wallet/${address}`);
  };

  const tierMultiplier = useMemo(() => {
    switch (tier) {
      case "small":
        return 0.5;
      case "active":
        return 1;
      case "power":
        return 3;
      case "whale":
        return 10;
      default:
        return 1;
    }
  }, [tier]);

  const calculations = useMemo(() => {
    const communityPool = supply * (community / 100);
    const averageAllocation = communityPool / wallets;
    const estimatedAllocation = averageAllocation * tierMultiplier;
    const estimatedValue = estimatedAllocation * price;
    const fdv = supply * price;
    const communityPoolValue = communityPool * price;
    const poolShare = (estimatedAllocation / communityPool) * 100;

    return {
      communityPool,
      averageAllocation,
      estimatedAllocation,
      estimatedValue,
      fdv,
      communityPoolValue,
      poolShare,
    };
  }, [supply, community, wallets, price, tierMultiplier]);

  const copyResult = async () => {
    const text = `
Airdrop Simulation

Allocation:
${Math.round(calculations.estimatedAllocation).toLocaleString()} Tokens

Value:
$${Math.round(calculations.estimatedValue).toLocaleString()}

FDV:
$${Math.round(calculations.fdv).toLocaleString()}

Generated with Base Atlas
`;

    await navigator.clipboard.writeText(text);

    alert("Copied!");
  };

  const shareOnX = () => {
    const text =
      `I simulated my next airdrop using Base Atlas.%0A%0A` +
      `Allocation: ${Math.round(
        calculations.estimatedAllocation
      ).toLocaleString()} Tokens%0A` +
      `Value: $${Math.round(
        calculations.estimatedValue
      ).toLocaleString()}%0A` +
      `FDV: $${Math.round(calculations.fdv).toLocaleString()}%0A%0A` +
      `Powered by Base Atlas`;

    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  };

  const probability = useMemo(() => {
    let score = 0;

    switch (tier) {
      case "small":
        score += 20;
        break;
      case "active":
        score += 50;
        break;
      case "power":
        score += 75;
        break;
      case "whale":
        score += 95;
        break;
    }

    if (calculations.estimatedValue > 5000) {
      score += 15;
    } else if (calculations.estimatedValue > 1000) {
      score += 10;
    } else if (calculations.estimatedValue > 100) {
      score += 5;
    }

    if (calculations.poolShare > 0.01) {
      score += 10;
    } else if (calculations.poolShare > 0.001) {
      score += 5;
    }

    return Math.min(score, 99);
  }, [tier, calculations]);

  return (
    <section className="relative overflow-hidden bg-[#030712] text-white">
      <SpaceBackground />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200 backdrop-blur-xl">
              Base Intelligence Terminal
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Decode wallets.
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-white bg-clip-text text-transparent">
                Simulate airdrops.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              A premium Base intelligence console for wallet analysis and
              token allocation modeling. Search any Base wallet or adjust
              tokenomics assumptions to project possible reward outcomes.
            </p>

            <motion.div
              {...panelMotion}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-8 rounded-[2rem] border border-blue-300/20 bg-blue-400/[0.08] p-5 shadow-2xl shadow-blue-950/25 backdrop-blur-2xl sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                    Wallet Search
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Analyze Any Base Wallet
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Enter a wallet address to open the live on-chain analyzer.
                  </p>
                </div>

                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                  Live Alchemy Data
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      analyzeWallet();
                    }
                  }}
                  placeholder="0x..."
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 font-mono text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-300/60 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  onClick={analyzeWallet}
                  className="rounded-2xl border border-blue-300/30 bg-blue-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Analyze Wallet
                </button>
              </div>
            </motion.div>

            <motion.div
              {...panelMotion}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl sm:p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Airdrop Simulator
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Model Token Allocation
                  </h2>
                </div>

                <div className="text-sm text-slate-400">
                  Tier multiplier:{" "}
                  <span className="font-bold text-pink-300">
                    {tierMultiplier}x
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <SimulatorRange
                  label="Total Supply"
                  value={`${(supply / 1000000000).toFixed(1)}B`}
                  minLabel="0.1B"
                  maxLabel="10B"
                  min={100000000}
                  max={10000000000}
                  step={100000000}
                  currentValue={supply}
                  accent="text-blue-300"
                  onChange={setSupply}
                />

                <SimulatorRange
                  label="Community Allocation"
                  value={`${community}%`}
                  min={1}
                  max={50}
                  step={1}
                  currentValue={community}
                  accent="text-cyan-300"
                  onChange={setCommunity}
                />

                <SimulatorRange
                  label="Eligible Wallets"
                  value={wallets.toLocaleString()}
                  min={10000}
                  max={2000000}
                  step={10000}
                  currentValue={wallets}
                  accent="text-purple-300"
                  onChange={setWallets}
                />

                <SimulatorRange
                  label="Token Price"
                  value={`$${price.toFixed(2)}`}
                  min={0.01}
                  max={10}
                  step={0.01}
                  currentValue={price}
                  accent="text-emerald-300"
                  onChange={setPrice}
                />

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-400">
                    Wallet Tier
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {tierOptions.map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setTier(value)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition sm:text-base ${
                          tier === value
                            ? "border-blue-300/60 bg-blue-400/20 text-white shadow-lg shadow-blue-950/20"
                            : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-blue-300/30 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-[2.25rem] border border-white/10 bg-slate-900/55 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">
              <div className="mb-5 flex items-center justify-between px-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Live Projection
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Allocation Console
                  </h2>
                </div>

                <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,0.9)]" />
              </div>

              <ResultCard
                estimatedValue={calculations.estimatedValue}
                estimatedAllocation={calculations.estimatedAllocation}
                fdv={calculations.fdv}
                onCopy={copyResult}
                onShare={shareOnX}
              />

              <ProbabilityCard probability={probability} />

              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="FDV"
                  value={`$${Math.round(calculations.fdv).toLocaleString()}`}
                  tone="text-emerald-300"
                />
                <MetricCard
                  label="Community Pool Value"
                  value={`$${Math.round(
                    calculations.communityPoolValue
                  ).toLocaleString()}`}
                  tone="text-cyan-300"
                />
                <MetricCard
                  label="Community Pool"
                  value={Math.round(calculations.communityPool).toLocaleString()}
                  tone="text-blue-300"
                />
                <MetricCard
                  label="Average Allocation"
                  value={Math.round(
                    calculations.averageAllocation
                  ).toLocaleString()}
                  tone="text-purple-300"
                />
                <MetricCard
                  label="Pool Share"
                  value={`${calculations.poolShare.toFixed(4)}%`}
                  tone="text-yellow-300"
                />
                <MetricCard
                  label="Multiplier"
                  value={`${tierMultiplier}x`}
                  tone="text-pink-300"
                />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Simulation Notice
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  These calculations are theoretical estimates based on
                  tokenomics assumptions and should not be considered actual
                  airdrop predictions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type SimulatorRangeProps = {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  accent: string;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
};

function SimulatorRange({
  label,
  value,
  min,
  max,
  step,
  currentValue,
  accent,
  onChange,
  minLabel,
  maxLabel,
}: SimulatorRangeProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-slate-400">{label}</span>
        <span className={`font-black ${accent}`}>{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full cursor-pointer accent-blue-400"
      />

      {(minLabel || maxLabel) && (
        <div className="mt-2 flex justify-between text-xs text-slate-600">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  tone: string;
};

function MetricCard({ label, value, tone }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 break-words text-2xl font-black ${tone}`}>
        {value}
      </p>
    </div>
  );
}
