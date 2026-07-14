import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getWalletBalance,
  getNFTCount,
  getWalletAge,
} from "../services/alchemy";

export default function Wallet() {
  const { address } = useParams();

  const [realBalance, setRealBalance] = useState(0);
  const [realNftCount, setRealNftCount] = useState(0);
  const [walletAge, setWalletAge] = useState("Loading...");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulated values for allocation
  const [simBalance, setSimBalance] = useState(0);
  const [simNfts, setSimNfts] = useState(0);

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        setLoading(true);
        setError("");

        const balanceResult = await getWalletBalance(address);
        const age = await getWalletAge(address);
        const nfts = await getNFTCount(address);

        const balNum = Number(balanceResult);

        setRealBalance(balNum);
        setRealNftCount(nfts);
        setWalletAge(age);
        setSimBalance(balNum);
        setSimNfts(nfts);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load wallet.");
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
          <p className="text-2xl font-black">Loading Wallet...</p>
          <p className="mt-3 text-slate-400">Fetching Base on-chain data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <p className="text-2xl font-black text-red-400">Failed To Load Wallet</p>
          <p className="mt-3 text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate score based on simulated values
  let atlasScore = 20;
  if (simBalance > 0.1) atlasScore += 10;
  if (simBalance > 1) atlasScore += 15;
  if (simBalance > 5) atlasScore += 20;
  if (simNfts > 20) atlasScore += 10;
  if (simNfts > 100) atlasScore += 15;
  if (simNfts > 500) atlasScore += 20;
  atlasScore = Math.min(atlasScore, 100);

  const archetype = simNfts > 500 ? "🟣 NFT Whale" : simNfts > 100 ? "🎨 Collector" : simBalance > 5 ? "🐋 Capital Holder" : "⚡ Active User";

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black">Wallet Intelligence + Token Allocation Simulator</h1>
        <p className="mt-3 text-slate-400">Adjust allocation and see real-time impact</p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">Wallet Address</p>
          <p className="mt-2 break-all font-mono text-blue-400">{address}</p>
        </div>

        {/* Allocation Simulator */}
        <div className="mt-8 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Token Allocation Simulator</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <span>ETH Balance</span>
                <span className="font-bold text-yellow-400">{simBalance.toFixed(2)} ETH</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={simBalance}
                onChange={(e) => setSimBalance(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <span>NFT Count</span>
                <span className="font-bold text-pink-400">{simNfts}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="5"
                value={simNfts}
                onChange={(e) => setSimNfts(Number(e.target.value))}
                className="w-full accent-pink-400"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Atlas Score</p>
          <h2 className="mt-4 text-8xl font-black text-blue-400">{atlasScore}</h2>
          <p className="mt-3 text-xl text-slate-300">{archetype}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Real Balance</p>
            <h2 className="mt-2 text-4xl font-black text-yellow-400">{realBalance} ETH</h2>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Simulated Balance</p>
            <h2 className="mt-2 text-4xl font-black text-yellow-400">{simBalance.toFixed(2)} ETH</h2>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Simulated NFTs</p>
            <h2 className="mt-2 text-4xl font-black text-pink-400">{simNfts}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}