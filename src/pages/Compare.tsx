import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function Compare() {
  const [walletA, setWalletA] = useState("");
  const [walletB, setWalletB] = useState("");

  const walletAData = [
    { trait: "Trader", value: 82 },
    { trait: "Farmer", value: 91 },
    { trait: "Collector", value: 65 },
    { trait: "Builder", value: 48 },
    { trait: "DeFi", value: 87 },
  ];

  const walletBData = [
    { trait: "Trader", value: 70 },
    { trait: "Farmer", value: 52 },
    { trait: "Collector", value: 88 },
    { trait: "Builder", value: 76 },
    { trait: "DeFi", value: 61 },
  ];

  const mergedData = walletAData.map((item, index) => ({
    trait: item.trait,
    walletA: item.value,
    walletB: walletBData[index].value,
  }));

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Compare Wallets
        </h1>

        <p className="mt-3 text-slate-400">
          Compare two wallets side by side.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <input
            value={walletA}
            onChange={(e) => setWalletA(e.target.value)}
            placeholder="Wallet A"
            className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-white"
          />

          <input
            value={walletB}
            onChange={(e) => setWalletB(e.target.value)}
            placeholder="Wallet B"
            className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-white"
          />

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-slate-400">
              Wallet A Score
            </p>

            <h2 className="mt-2 text-5xl font-black text-green-400">
              842
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

            <p className="text-slate-400">
              Wallet B Score
            </p>

            <h2 className="mt-2 text-5xl font-black text-blue-400">
              791
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

          <h2 className="text-2xl font-bold">
            DNA Comparison
          </h2>

          <div className="mt-6 h-[500px]">

            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mergedData}>

                <PolarGrid stroke="#334155" />

                <PolarAngleAxis
                  dataKey="trait"
                  tick={{ fill: "#94A3B8" }}
                />

                <Radar
                  name="Wallet A"
                  dataKey="walletA"
                  stroke="#22C55E"
                  fill="#22C55E"
                  fillOpacity={0.3}
                />

                <Radar
                  name="Wallet B"
                  dataKey="walletB"
                  stroke="#0052FF"
                  fill="#0052FF"
                  fillOpacity={0.3}
                />

              </RadarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-8 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

          <h2 className="text-3xl font-black text-green-400">
            🏆 Winner: Wallet A
          </h2>

          <p className="mt-4 text-slate-300">
            Wallet A has a higher Atlas Score, stronger DeFi activity
            and better airdrop readiness.
          </p>

        </div>

      </div>
    </div>
  );
}