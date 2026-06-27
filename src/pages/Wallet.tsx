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

export default function Wallet() {
  const { address } = useParams();

  const profile = {
    trader: 82,
    farmer: 91,
    collector: 65,
    builder: 48,
    defi: 87,
  };

  const atlasScore = calculateAtlasScore(profile);
  const archetype = getArchetype(profile);

  const dnaData = [
    { trait: "Trader", value: profile.trader },
    { trait: "Farmer", value: profile.farmer },
    { trait: "Collector", value: profile.collector },
    { trait: "Builder", value: profile.builder },
    { trait: "DeFi", value: profile.defi },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Wallet Analyzer
        </h1>

        <p className="mt-3 text-slate-400">
          Analyze wallets across the Base ecosystem.
        </p>

        {/* Wallet Address */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-blue-400">
            {address}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

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
              Wallet Rank
            </p>

            <h2 className="mt-2 text-4xl font-black">
              #128K
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Airdrop Score
            </p>

            <h2 className="mt-2 text-4xl font-black text-blue-400">
              92
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

        {/* DNA + Intelligence */}
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
                Atlas Intelligence classified this wallet based on
                dominant behavioral patterns observed in the ecosystem.
              </p>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-2xl bg-slate-800/50 p-4">
                🚀 Strong ecosystem participation
              </div>

              <div className="rounded-2xl bg-slate-800/50 p-4">
                🌉 Consistent cross-protocol activity
              </div>

              <div className="rounded-2xl bg-slate-800/50 p-4">
                💧 High liquidity engagement
              </div>

              <div className="rounded-2xl bg-slate-800/50 p-4">
                🏆 Excellent airdrop readiness
              </div>

            </div>

          </div>

        </div>

        {/* Score Breakdown */}
        <div className="mt-8">
          <ScoreBreakdown
            trader={profile.trader}
            farmer={profile.farmer}
            collector={profile.collector}
            builder={profile.builder}
            defi={profile.defi}
          />
        </div>

        {/* Share Profile */}
        <div className="mt-8">

          <ShareCard
            score={atlasScore}
            archetype={archetype}
          />

          <button
            className="mt-4 rounded-2xl bg-[#0052FF] px-6 py-3 font-semibold transition hover:bg-blue-600"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
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