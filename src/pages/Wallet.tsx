import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

import {
  calculateAtlasScore,
  getArchetype,
} from "../lib/atlasScore";

import ScoreBreakdown from "../components/ScoreBreakdown";
import ShareCard from "../components/ShareCard";

import {
  getWalletBalance,
  getTokenCount,
  getNFTCount,
} from "../services/alchemy";

export default function Wallet() {
  const { address } = useParams();

  const [balance, setBalance] = useState("0");
  const [tokenCount, setTokenCount] = useState("0");
  const [nftCount, setNftCount] = useState("0");

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        const balanceResult =
          await getWalletBalance(address);

        const tokens =
          await getTokenCount(address);

        const nfts =
          await getNFTCount(address);

        setBalance(balanceResult);
        setTokenCount(tokens.toString());
        setNftCount(nfts.toString());
      } catch (error) {
        console.error(error);
      }
    }

    loadWalletData();
  }, [address]);

  const atlasScore = calculateAtlasScore({
    balance: Number(balance),
    tokens: Number(tokenCount),
    nfts: Number(nftCount),
  });

  const archetype = getArchetype({
    balance: Number(balance),
    tokens: Number(tokenCount),
    nfts: Number(nftCount),
  });

  const dnaData = [
    {
      trait: "Balance",
      value: Math.min(Number(balance) * 10, 100),
    },
    {
      trait: "Tokens",
      value: Math.min(Number(tokenCount) * 2, 100),
    },
    {
      trait: "NFTs",
      value: Math.min(Number(nftCount) * 3, 100),
    },
    {
      trait: "Activity",
      value: 60,
    },
    {
      trait: "Potential",
      value: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Wallet Analyzer
        </h1>

        <p className="mt-3 text-slate-400">
          Analyze wallets across the Base ecosystem.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-blue-400">
            {address}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Atlas Score
            </p>

            <h2 className="mt-2 text-4xl font-black text-green-400">
              {atlasScore}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Balance
            </p>

            <h2 className="mt-2 text-4xl font-black text-yellow-400">
              {balance}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              ETH
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Tokens
            </p>

            <h2 className="mt-2 text-4xl font-black text-cyan-400">
              {tokenCount}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              NFTs
            </p>

            <h2 className="mt-2 text-4xl font-black text-pink-400">
              {nftCount}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Archetype
            </p>

            <h2 className="mt-2 text-xl font-black text-purple-400">
              {archetype}
            </h2>
          </div>

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

            <h2 className="text-2xl font-bold">
              Wallet DNA
            </h2>

            <div className="mt-6 h-[400px]">

              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dnaData}>
                  <PolarGrid stroke="#334155" />

                  <PolarAngleAxis
                    dataKey="trait"
                    tick={{ fill: "#94A3B8" }}
                  />

                  <Radar
                    dataKey="value"
                    stroke="#0052FF"
                    fill="#0052FF"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

            <h2 className="text-2xl font-bold">
              Wallet Intelligence
            </h2>

            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">

              <h3 className="text-3xl font-black text-blue-400">
                {archetype}
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                Atlas Intelligence classified this wallet
                based on real onchain activity.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-8">
          <ScoreBreakdown
            trader={Math.min(Number(tokenCount) * 2, 100)}
            farmer={Math.min(Number(balance) * 20, 100)}
            collector={Math.min(Number(nftCount) * 3, 100)}
            builder={60}
            defi={85}
          />
        </div>

        <div className="mt-8">

          <ShareCard
            score={atlasScore}
            archetype={archetype}
          />

          <button
            className="mt-4 rounded-2xl bg-[#0052FF] px-6 py-3 font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(
                window.location.href
              );
              alert("Profile link copied!");
            }}
          >
            Share Profile
          </button>

        </div>

      </div>
    </div>
  );
}