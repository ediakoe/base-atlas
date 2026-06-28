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
    <section className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1036a8_0%,#030712_55%)]" />

      {/* Main Glow */}
      <div className="absolute left-1/2 top-20 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[220px]" />

      {/* Orbit 1 */}
      <div className="absolute left-1/2 top-40 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-blue-500/20 animate-spin [animation-duration:30s]" />

      {/* Orbit 2 */}
      <div className="absolute left-1/2 top-32 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-blue-400/10 animate-spin [animation-duration:50s] [animation-direction:reverse]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="mx-auto w-full max-w-5xl text-center">

          {/* Logo */}
          <div className="relative mx-auto flex h-[240px] w-[240px] items-center justify-center">

            <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative h-40 w-40 rounded-[40px] bg-[#0052FF] shadow-[0_0_120px_rgba(0,82,255,1)]" />

          </div>

          {/* Heading */}
          <h1 className="mt-10 text-7xl font-black tracking-[-0.05em] md:text-9xl">
            Discover Your
            <span className="block text-blue-400">
              Onchain Identity
            </span>
          </h1>

          {/* Search */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4 md:flex-row">

            <input
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="Paste your Base wallet address..."
              className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-6 py-5 text-white backdrop-blur-xl outline-none transition focus:border-blue-500"
            />

            <button
              onClick={handleExplore}
              className="rounded-3xl bg-[#0052FF] px-10 py-5 font-semibold text-white shadow-[0_0_40px_rgba(0,82,255,.6)] transition hover:scale-105 hover:bg-blue-600"
            >
              Analyze Wallet
            </button>

          </div>

          {/* Features */}
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold">
                Wallet DNA
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                Understand your onchain personality.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold">
                Atlas Score
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                Measure ecosystem reputation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold">
                NFT Portfolio
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                Track collections and assets.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold">
                Onchain Reputation
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                Discover hidden opportunities.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}