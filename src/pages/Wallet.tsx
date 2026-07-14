import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getWalletBalance,
  getNFTCount,
  getWalletAge,
} from "../services/alchemy";
import ActivityHeatmap from "../components/ActivityHeatmap";

export default function Wallet() {
  const { address } = useParams();

  const [balance, setBalance] = useState("0");
  const [nftCount, setNftCount] = useState("0");
  const [walletAge, setWalletAge] = useState({ label: "—", days: 0, since: "—" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Allocation Simulator
  const [supply, setSupply] = useState(10000000000);
  const [community, setCommunity] = useState(15);
  const [wallets, setWallets] = useState(500000);
  const [price, setPrice] = useState(0.5);
  const [tier, setTier] = useState("active");

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        setLoading(true);
        setError("");

        const balanceResult = await getWalletBalance(address);
        const age = await getWalletAge(address);
        const nfts = await getNFTCount(address);

        setBalance(balanceResult);
        setWalletAge(age);
        setNftCount(nfts.toString());

        // Auto set tier
        const bal = Number(balanceResult);
        const nft = nfts;

        if (nft > 500 || bal > 10) setTier("whale");
        else if (nft > 100 || bal > 3) setTier("power");
        else if (nft > 20 || bal > 0.5) setTier("active");
        else setTier("small");
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load wallet.");
      } finally {
        setLoading(false);
      }
    }

    loadWalletData();
  }, [address]);

  const balanceNum = Number(balance);
  const nftNum = Number(nftCount);

  // ===== SCORE BREAKDOWN =====
  const scoreBreakdown = useMemo(() => {
    let balanceScore = 0;
    if (balanceNum > 0.1) balanceScore += 10;
    if (balanceNum > 1) balanceScore += 15;
    if (balanceNum > 5) balanceScore += 20;
    if (balanceNum > 20) balanceScore += 10;

    let nftScore = 0;
    if (nftNum > 10) nftScore += 10;
    if (nftNum > 50) nftScore += 15;
    if (nftNum > 200) nftScore += 15;
    if (nftNum > 500) nftScore += 10;

    let ageScore = 0;
    if (walletAge.days > 30) ageScore += 5;
    if (walletAge.days > 90) ageScore += 8;
    if (walletAge.days > 365) ageScore += 12;
    if (walletAge.days > 730) ageScore += 10;

    const total = Math.min(100, 15 + balanceScore + nftScore + ageScore);

    return {
      balanceScore,
      nftScore,
      ageScore,
      base: 15,
      total,
    };
  }, [balanceNum, nftNum, walletAge.days]);

  const atlasScore = scoreBreakdown.total;

  const archetype =
    nftNum > 500
      ? "NFT Whale"
      : nftNum > 100
      ? "Collector"
      : balanceNum > 5
      ? "Capital Holder"
      : "Active User";

  const tierMultiplier = useMemo(() => {
    switch (tier) {
      case "small": return 0.5;
      case "active": return 1;
      case "power": return 3;
      case "whale": return 10;
      default: return 1;
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

  return (
    <div className="min-h-screen bg-[#030712] p-6 md:p-8 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            WALLET + ALLOCATION SIMULATOR
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            Decode This
            <span className="block text-blue-400">Base Wallet</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl">
            Real on-chain analysis + Token Allocation Model.
          </p>
        </div>

        {/* Wallet Address */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
          <p className="text-sm text-slate-500">Wallet Address</p>
          <p className="mt-2 break-all font-mono text-blue-400">{address}</p>
        </div>

        {/* Score + Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-blue-300">Score</p>
            <p className="mt-3 text-5xl font-black text-blue-400">{atlasScore}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-sm text-slate-400">Balance</p>
            <p className="mt-3 text-3xl font-black text-yellow-400">{balance} ETH</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-sm text-slate-400">NFTs</p>
            <p className="mt-3 text-3xl font-black text-pink-400">{nftCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-sm text-slate-400">Age</p>
            <p className="mt-3 text-3xl font-black text-cyan-400">
              {walletAge.days > 0 ? walletAge.days : "—"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {walletAge.days > 0 ? "days active" : "No history"}
            </p>
            {walletAge.since !== "—" && (
              <p className="mt-1 text-xs text-slate-500">since {walletAge.since}</p>
            )}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
          <h3 className="text-lg font-bold mb-5">Score Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Base Score</span>
              <span className="font-bold text-white">+{scoreBreakdown.base}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Balance Score</span>
              <span className="font-bold text-yellow-400">+{scoreBreakdown.balanceScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">NFT Score</span>
              <span className="font-bold text-pink-400">+{scoreBreakdown.nftScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Age Score</span>
              <span className="font-bold text-cyan-400">+{scoreBreakdown.ageScore}</span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
              <span className="font-bold">Total Score</span>
              <span className="text-2xl font-black text-blue-400">{atlasScore}/100</span>
            </div>
          </div>
        </div>

        {/* Archetype + Multiplier */}
        <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Archetype</p>
            <p className="text-2xl font-black text-purple-400">{archetype}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-400">Detected Multiplier</p>
            <p className="text-2xl font-black text-white">{tierMultiplier}x</p>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="mb-10">
          <ActivityHeatmap
            walletAge={walletAge.label}
            balance={balanceNum}
            nfts={nftNum}
          />
        </div>

        {/* SIMULATOR SECTION */}
        <div className="grid gap-10 lg:grid-cols-2">
          
          {/* LEFT - Controls */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black">Model Token Allocation</h2>
              <p className="mt-2 text-slate-400">
                Adjust the parameters and see estimated tokens for this wallet.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Supply</span>
                <span className="font-bold text-blue-400">
                  {(supply / 1_000_000_000).toFixed(1)}B
                </span>
              </div>
              <input
                type="range"
                min={100_000_000}
                max={10_000_000_000}
                step={100_000_000}
                value={supply}
                onChange={(e) => setSupply(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer accent-blue-500"
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Community Allocation</span>
                <span className="font-bold text-cyan-400">{community}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={community}
                onChange={(e) => setCommunity(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Eligible Wallets</span>
                <span className="font-bold text-purple-400">
                  {wallets.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10_000}
                max={2_000_000}
                step={10_000}
                value={wallets}
                onChange={(e) => setWallets(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer accent-purple-500"
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Token Price</span>
                <span className="font-bold text-green-400">${price.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.01}
                max={10}
                step={0.01}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer accent-green-500"
              />
            </div>
          </div>

          {/* RIGHT - Results */}
          <div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl">
              
              <div className="text-center mb-8">
                <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
                  Estimated Allocation
                </p>
                <h2 className="mt-4 text-6xl md:text-7xl font-black text-blue-400">
                  {Math.round(calculations.estimatedAllocation).toLocaleString()}
                </h2>
                <p className="mt-2 text-slate-300">Tokens for this wallet</p>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-sm text-slate-400">Estimated Value</p>
                  <p className="text-4xl font-black text-green-400">
                    ${Math.round(calculations.estimatedValue).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">FDV</p>
                  <p className="mt-2 text-2xl font-black text-green-400">
                    ${Math.round(calculations.fdv).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Community Pool</p>
                  <p className="mt-2 text-2xl font-black text-blue-400">
                    {Math.round(calculations.communityPool).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Average Allocation</p>
                  <p className="mt-2 text-2xl font-black text-purple-400">
                    {Math.round(calculations.averageAllocation).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Multiplier</p>
                  <p className="mt-2 text-2xl font-black text-pink-400">{tierMultiplier}x</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 col-span-2">
                  <p className="text-sm text-slate-400">Pool Share</p>
                  <p className="mt-2 text-2xl font-black text-yellow-400">
                    {calculations.poolShare.toFixed(4)}%
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Simulation Notice</p>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  These calculations are theoretical estimates based on tokenomics assumptions and the wallet's on-chain activity. Not actual airdrop predictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}