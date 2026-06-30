import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  const handleExplore = () => {
    if (!wallet.trim()) return;

    navigate(`/wallet/${wallet}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#030712] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1036a8_0%,#030712_55%)]" />

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}
          <div>

            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              BASE ECOSYSTEM INTELLIGENCE
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
              Know Your Place
              <span className="block text-blue-400">
                In The Base Economy
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400">
              Atlas transforms wallet activity into identity,
              reputation, wallet DNA and ecosystem intelligence.
            </p>

            {/* Search */}
            <div className="mt-10 flex flex-col gap-4 md:flex-row">

              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Paste your Base wallet address..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-4 text-white outline-none transition focus:border-blue-500"
              />

              <button
                onClick={handleExplore}
                className="rounded-2xl bg-[#0052FF] px-8 py-4 font-semibold shadow-[0_0_40px_rgba(0,82,255,.4)] transition hover:scale-105"
              >
                Analyze Wallet
              </button>

            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">

              <div>
                <p className="text-3xl font-bold">12K+</p>
                <p className="text-sm text-slate-400">
                  Wallets Indexed
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">2.4M</p>
                <p className="text-sm text-slate-400">
                  Transactions
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">184K</p>
                <p className="text-sm text-slate-400">
                  NFT Holders
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">87</p>
                <p className="text-sm text-slate-400">
                  Avg Atlas Score
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">

              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Wallet Intelligence Preview
                </h3>

                <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                  Live
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Atlas Score
                  </p>

                  <p className="mt-2 text-4xl font-black text-blue-400">
                    92
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Archetype
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Builder
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Wallet DNA
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Collector
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    Reputation
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Top 5%
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                <div className="mb-3 flex justify-between">
                  <span className="text-slate-400">
                    Activity Score
                  </span>

                  <span>82%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[82%] rounded-full bg-blue-500" />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}