import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getWalletBalance,
  getNFTCount,
  getWalletAge,
} from "../services/alchemy";

export default function Wallet() {
  const { address } = useParams();

  const [balance, setBalance] = useState("0");
  const [nftCount, setNftCount] = useState("0");
  const [walletAge, setWalletAge] = useState("Loading...");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        setLoading(true);
        setError("");

        const balanceResult =
          await getWalletBalance(address);

        const age =
          await getWalletAge(address);

        const nfts =
          await getNFTCount(address);

        setBalance(balanceResult);
        setWalletAge(age);
        setNftCount(nfts.toString());
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load wallet."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWalletData();
  }, [address]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <p className="text-2xl font-black">
            Loading Wallet...
          </p>

          <p className="mt-3 text-slate-400">
            Fetching Base on-chain data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <p className="text-2xl font-black text-red-400">
            Failed To Load Wallet
          </p>

          <p className="mt-3 text-slate-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const balanceNum = Number(balance);
  const nftNum = Number(nftCount);

  let atlasScore = 20;

  if (balanceNum > 0.1) atlasScore += 10;
  if (balanceNum > 1) atlasScore += 15;
  if (balanceNum > 5) atlasScore += 20;

  if (nftNum > 20) atlasScore += 10;
  if (nftNum > 100) atlasScore += 15;
  if (nftNum > 500) atlasScore += 20;

  atlasScore = Math.min(atlasScore, 100);

  const archetype =
    nftNum > 500
      ? "🟣 NFT Whale"
      : nftNum > 100
      ? "🎨 Collector"
      : balanceNum > 5
      ? "🐋 Capital Holder"
      : "⚡ Active User";

  const capitalStrength =
    balanceNum > 5
      ? "High"
      : balanceNum > 1
      ? "Medium"
      : "Low";

  const nftExposure =
    nftNum > 500
      ? "Extreme"
      : nftNum > 100
      ? "Strong"
      : nftNum > 20
      ? "Moderate"
      : "Low";

  const insight =
    nftNum > 500
      ? "This wallet shows very strong NFT participation and behaves like an NFT-focused power user."
      : balanceNum > 5
      ? "This wallet maintains meaningful capital exposure and resembles a capital-focused participant."
      : "This wallet shows moderate ecosystem participation and may still be growing activity over time.";

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Wallet Intelligence
        </h1>

        <p className="mt-3 text-slate-400">
          Base Atlas On-Chain Analysis
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-blue-400">
            {address}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
            Atlas Score
          </p>

          <h2 className="mt-4 text-8xl font-black text-blue-400">
            {atlasScore}
          </h2>

          <p className="mt-3 text-xl text-slate-300">
            {archetype}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Balance
            </p>

            <h2 className="mt-2 text-4xl font-black text-yellow-400">
              {balance} ETH
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Wallet Age
            </p>

            <h2 className="mt-2 text-4xl font-black text-cyan-400">
              {walletAge}
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

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6">
            <p className="text-slate-400">
              Archetype
            </p>

            <h2 className="mt-3 text-3xl font-black text-purple-400">
              {archetype}
            </h2>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
            <p className="text-slate-400">
              Capital Strength
            </p>

            <h2 className="mt-3 text-3xl font-black text-green-400">
              {capitalStrength}
            </h2>
          </div>

          <div className="rounded-3xl border border-pink-500/20 bg-pink-500/10 p-6">
            <p className="text-slate-400">
              NFT Exposure
            </p>

            <h2 className="mt-3 text-3xl font-black text-pink-400">
              {nftExposure}
            </h2>
          </div>

        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h2 className="text-3xl font-black">
            Atlas Insight
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            {insight}
          </p>
        </div>

      </div>
    </div>
  );
}