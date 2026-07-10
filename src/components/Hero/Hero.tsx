import { useNavigate } from "react-router-dom";
import ProbabilityCard from "./ProbabilityCard";
import ResultCard from "./ResultCard";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SpaceBackground from "../SpaceBackground";
import { formatNumber, formatUsd } from "../../lib/format";
export default function Hero() {
  const navigate = useNavigate();

const [walletAddress, setWalletAddress] =
  useState("");

const analyzeWallet = () => {
  const address = walletAddress.trim();

  if (!address) return;

  navigate(`/wallet/${address}`);
};
  const [supply, setSupply] = useState(10000000000);
  const [community, setCommunity] = useState(15);
  const [wallets, setWallets] = useState(500000);
  const [price, setPrice] = useState(0.5);
  const [tier, setTier] = useState("active");

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
    const communityPool =
      supply * (community / 100);

    const averageAllocation =
      communityPool / wallets;

    const estimatedAllocation =
      averageAllocation * tierMultiplier;

    const estimatedValue =
      estimatedAllocation * price;

    const fdv =
      supply * price;

    const communityPoolValue =
      communityPool * price;

    const poolShare =
      (estimatedAllocation /
        communityPool) *
      100;

    return {
      communityPool,
      averageAllocation,
      estimatedAllocation,
      estimatedValue,
      fdv,
      communityPoolValue,
      poolShare,
    };
  }, [
    supply,
    community,
    wallets,
    price,
    tierMultiplier,
  ]);

  const copyResult = async () => {
    const text = `
Airdrop Simulation

Allocation:
${formatNumber(calculations.estimatedAllocation)} Tokens

Value:
${formatUsd(calculations.estimatedValue)}

FDV:
${formatUsd(calculations.fdv)}

Generated with Base Atlas
`;

    await navigator.clipboard.writeText(
      text
    );

    alert("Copied!");
  };

 const shareOnX = () => {
  const text =
    `I simulated my next airdrop using Base Atlas.%0A%0A` +
    `Allocation: ${formatNumber(
      calculations.estimatedAllocation
    )} Tokens%0A` +
    `Value: ${formatUsd(calculations.estimatedValue)}%0A` +
    `FDV: ${formatUsd(calculations.fdv)}%0A%0A` +
    `⚡ Powered by Base Atlas`;

  window.open(
    `https://x.com/intent/tweet?text=${text}`,
    "_blank"
  );
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
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              AIRDROP ALLOCATION SIMULATOR
            </div>

           <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-8 text-5xl font-black leading-tight md:text-7xl"
>
  Explore The DNA
  <span className="block text-blue-400">
    Of Any Wallet
  </span>
</motion.h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400">
              Adjust the sliders and instantly
              estimate potential token rewards
              and future value.
            </p>
<div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6">
  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-blue-300">
    Wallet Intelligence
  </p>

  <h3 className="text-2xl font-black">
    Analyze Any Base Wallet
  </h3>

  <p className="mt-2 text-slate-400">
    Enter a wallet address to view
    real on-chain intelligence.
  </p>

  <div className="mt-5 flex flex-col gap-3 md:flex-row">
    <input
      type="text"
      value={walletAddress}
      onChange={(e) =>
        setWalletAddress(e.target.value)
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          analyzeWallet();
        }
      }}
      placeholder="0x..."
      className="flex-1 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-white outline-none focus:border-blue-500"
    />

    <button
      onClick={analyzeWallet}
      className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold transition hover:scale-105"
    >
      Analyze Wallet
    </button>
  </div>
</div>
            <div className="mt-10 space-y-6">

              {/* Supply */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">
                    Total Supply
                  </span>

                  <span className="font-bold text-blue-400">
                    {(supply / 1000000000).toFixed(
                      1
                    )}B
                  </span>
                </div>

                <input
                  type="range"
                  min={100000000}
                  max={10000000000}
                  step={100000000}
                  value={supply}
                  onChange={(e) =>
                    setSupply(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-4 w-full cursor-pointer accent-blue-500"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>0.1B</span>
                  <span>10B</span>
                </div>
              </div>

              {/* Community */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">
                    Community Allocation
                  </span>

                  <span className="font-bold text-cyan-400">
                    {community}%
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={community}
                  onChange={(e) =>
                    setCommunity(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-4 w-full cursor-pointer"
                />
              </div>

              {/* Wallets */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">
                    Eligible Wallets
                  </span>

                  <span className="font-bold text-purple-400">
                    {formatNumber(wallets)}
                  </span>
                </div>

                <input
                  type="range"
                  min={10000}
                  max={2000000}
                  step={10000}
                  value={wallets}
                  onChange={(e) =>
                    setWallets(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-4 w-full cursor-pointer"
                />
              </div>              {/* Price */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">
                    Token Price
                  </span>

                  <span className="font-bold text-green-400">
                    ${price.toFixed(2)}
                  </span>
                </div>

                <input
                  type="range"
                  min={0.01}
                  max={10}
                  step={0.01}
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="mt-4 w-full cursor-pointer"
                />
              </div>

              {/* Tier */}

              <div>
                <label className="mb-3 block text-sm text-slate-400">
                  Wallet Tier
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["small", "Small"],
                    ["active", "Active"],
                    ["power", "Power User"],
                    ["whale", "Whale"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() =>
                        setTier(value)
                      }
                      className={`rounded-2xl border px-4 py-3 font-medium transition ${
                        tier === value
                          ? "border-blue-500 bg-blue-500/20"
                          : "border-slate-700 bg-slate-900/50 hover:border-slate-500"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl">

              <ResultCard

  estimatedValue={
    calculations.estimatedValue
  }
  estimatedAllocation={
    calculations.estimatedAllocation
  }
  fdv={calculations.fdv}
  onCopy={copyResult}
  onShare={shareOnX}
/><ProbabilityCard
  probability={probability}
/>

              {/* STATS */}

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    FDV
                  </p>

                  <p className="mt-2 text-2xl font-black text-green-400">
                    {formatUsd(calculations.fdv)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Community Pool Value
                  </p>

                  <p className="mt-2 text-2xl font-black text-cyan-400">
                    {formatUsd(calculations.communityPoolValue)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Community Pool
                  </p>

                  <p className="mt-2 text-2xl font-black text-blue-400">
                    {formatNumber(calculations.communityPool)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Average Allocation
                  </p>

                  <p className="mt-2 text-2xl font-black text-purple-400">
                    {formatNumber(calculations.averageAllocation)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Pool Share
                  </p>

                  <p className="mt-2 text-2xl font-black text-yellow-400">
                    {calculations.poolShare.toFixed(
                      4
                    )}
                    %
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Multiplier
                  </p>

                  <p className="mt-2 text-2xl font-black text-pink-400">
                    {tierMultiplier}x
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <p className="text-sm text-slate-400">
                  Simulation Notice
                </p>

                <p className="mt-3 text-slate-300">
                  These calculations are
                  theoretical estimates
                  based on tokenomics
                  assumptions and should
                  not be considered actual
                  airdrop predictions.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}