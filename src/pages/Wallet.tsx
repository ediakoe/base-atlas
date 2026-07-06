import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getWalletBalance,
  getTokenCount,
  getNFTCount,
  getTopTokens,
  type TokenHolding,
} from "../services/alchemy";

export default function Wallet() {
  const { address } = useParams();

  const [balance, setBalance] = useState("0");
  const [tokenCount, setTokenCount] = useState("0");
  const [nftCount, setNftCount] = useState("0");
  const [topTokens, setTopTokens] = useState<TokenHolding[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        setLoading(true);
        setError("");

        const [
          balanceResult,
          tokens,
          nfts,
          holdings,
        ] = await Promise.all([
          getWalletBalance(address),
          getTokenCount(address),
          getNFTCount(address),
          getTopTokens(address),
        ]);

        setBalance(balanceResult);
        setTokenCount(tokens.toString());
        setNftCount(nfts.toString());
        setTopTokens(holdings);
      } catch (err) {
        console.error(err);
        setError("Failed to load wallet data.");
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
          <p className="text-xl font-bold">
            Loading wallet...
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Fetching on-chain data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <p className="text-xl font-bold text-red-400">
            Failed to load wallet data
          </p>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black">
          Wallet Intelligence
        </h1>

        <p className="mt-3 text-slate-400">
          Real on-chain data from Base.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-blue-400">
            {address}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Balance
            </p>

            <h2 className="mt-2 text-4xl font-black text-yellow-400">
              {balance}
            </h2>
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
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold">
            Top Holdings
          </h2>

          <div className="mt-6 space-y-3">
            {topTokens.length > 0 ? (
              topTokens.map((token) => (
                <div
                  key={token.contractAddress}
                  className="flex items-center justify-between rounded-2xl bg-slate-950/50 p-4"
                >
                  <span>{token.symbol}</span>

                  <span>{token.balance}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500">
                No token holdings found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}