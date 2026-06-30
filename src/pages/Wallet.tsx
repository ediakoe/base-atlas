import WalletAge from "../components/WalletAge";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getWalletBalance,
  getTokenCount,
  getNFTCount,
  getTopTokens,
  getWalletAge,
  getTransactionStats,
  type TokenHolding,
  type TransactionStats,
  type WalletAgeData,
} from "../services/alchemy";

export default function Wallet() {
  const { address } = useParams();

  const [balance, setBalance] = useState("0");
  const [tokenCount, setTokenCount] = useState("0");
  const [nftCount, setNftCount] = useState("0");
  const [topTokens, setTopTokens] = useState<TokenHolding[]>([]);

  const [walletAge, setWalletAge] = useState<WalletAgeData>({
    days: "",
    years: "",
    firstActivity: "",
  });

  const [transactionStats, setTransactionStats] = useState<TransactionStats>({
    totalTransactions: 0,
    lastActivity: "",
    lastTransaction: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWalletData() {
      if (!address) return;

      try {
        setLoading(true);
        setError("");

        const [balanceResult, tokens, nfts, holdings, age, txStats] =
          await Promise.all([
            getWalletBalance(address),
            getTokenCount(address),
            getNFTCount(address),
            getTopTokens(address),
            getWalletAge(address),
            getTransactionStats(address),
          ]);

        setBalance(balanceResult);
        setTokenCount(tokens.toString());
        setNftCount(nfts.toString());
        setTopTokens(holdings);
        setWalletAge(age);
        setTransactionStats(txStats);
      } catch (err) {
        console.error(err);
        setError("Failed to load wallet data.");
      } finally {
        setLoading(false);
      }
    }

    loadWalletData();
  }, [address]);

  const tx = transactionStats.lastTransaction;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        Loading wallet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black">Wallet Intelligence</h1>
        <p className="mt-3 text-slate-400">Real on-chain data from Base.</p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">Wallet Address</p>
          <p className="mt-2 break-all font-mono text-blue-400">{address}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Balance</p>
            <h2 className="mt-2 text-4xl font-black text-yellow-400">
              {balance}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Tokens</p>
            <h2 className="mt-2 text-4xl font-black text-cyan-400">
              {tokenCount}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">NFTs</p>
            <h2 className="mt-2 text-4xl font-black text-pink-400">
              {nftCount}
            </h2>
          </div>

          <WalletAge age={walletAge} />

          {/* Total Transactions */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">Total Transactions</p>
            <h2 className="mt-2 text-4xl font-black text-emerald-400">
              {transactionStats.totalTransactions.toLocaleString()}
            </h2>
          </div>

          {/* Last Transaction - مینیمال */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-2">
            <p className="text-slate-400">Last Transaction</p>

            {tx ? (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-black uppercase text-white">
                  {tx.category === "erc721" || tx.category === "erc1155"
                    ? "NFT"
                    : tx.category}
                </span>
                <span className="text-sm text-orange-400">
                  {new Date(
                    Number(tx.timeStamp) * 1000
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ) : (
              <p className="mt-3 text-slate-500">No transactions</p>
            )}
          </div>
        </div>

        {/* Top Holdings */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold">Top Holdings</h2>
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
              <p className="text-slate-500">No token holdings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
