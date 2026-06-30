import Hero from "../components/Hero";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Hero />

      {/* How It Works */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              How Atlas Works
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Turn Wallet Activity Into Intelligence
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                01
              </div>

              <h3 className="text-2xl font-bold">
                Analyze
              </h3>

              <p className="mt-4 text-slate-400">
                Scan balances, token holdings,
                NFTs and onchain activity.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                02
              </div>

              <h3 className="text-2xl font-bold">
                Classify
              </h3>

              <p className="mt-4 text-slate-400">
                Detect wallet behavior,
                archetypes and DNA patterns.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                03
              </div>

              <h3 className="text-2xl font-bold">
                Score
              </h3>

              <p className="mt-4 text-slate-400">
                Generate Atlas Score and
                ecosystem reputation metrics.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Intelligence */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Atlas Intelligence
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Everything You Need To Understand A Wallet
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Atlas Score",
                text: "Measure wallet influence and reputation."
              },
              {
                title: "Wallet DNA",
                text: "Understand behavior patterns and tendencies."
              },
              {
                title: "Archetype",
                text: "Builder, Collector, Trader or Whale."
              },
              {
                title: "NFT Intelligence",
                text: "Analyze collections and NFT exposure."
              },
              {
                title: "Compare Wallets",
                text: "Compare multiple wallets side by side."
              },
              {
                title: "Leaderboard",
                text: "Discover the strongest wallets on Base."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-blue-500/50"
              >
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Trending Wallets */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                Live Signals
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Trending Wallets
              </h2>
            </div>

            <div className="rounded-full bg-green-500/10 px-4 py-2 text-green-400">
              Live
            </div>
          </div>

          <div className="mt-12 space-y-4">

            {[
              ["0x7A...91D", "+12 Atlas Score"],
              ["0x4D...A8F", "NFT Activity Spike"],
              ["0x91...C2A", "New Whale Detected"],
              ["0x2C...7FD", "Rapid Growth"],
            ].map(([wallet, signal]) => (
              <div
                key={wallet}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <span className="font-mono">
                  {wallet}
                </span>

                <span className="text-blue-400">
                  {signal}
                </span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Top Wallets
            </p>

            <h2 className="mt-4 text-4xl font-black">
              Atlas Leaderboard
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-slate-800">

            {[
              ["#1", "98"],
              ["#2", "96"],
              ["#3", "95"],
              ["#4", "94"],
              ["#5", "93"],
            ].map(([rank, score]) => (
              <div
                key={rank}
                className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-5 last:border-none"
              >
                <span className="font-bold">
                  {rank}
                </span>

                <span className="text-blue-400">
                  Atlas Score {score}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/leaderboard"
              className="inline-flex rounded-2xl bg-[#0052FF] px-6 py-4 font-semibold transition hover:scale-105"
            >
              View Full Leaderboard
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#030712] px-6 py-10 text-center text-slate-500">
        Base Atlas © 2026 · Wallet Intelligence For Base
      </footer>
    </>
  );
}