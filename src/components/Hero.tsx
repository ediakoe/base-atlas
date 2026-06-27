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
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">

        <div className="mx-auto mb-10 h-40 w-40 rounded-[38px] bg-[#0052FF] shadow-[0_0_120px_rgba(0,82,255,1)]" />

        <h1 className="text-6xl md:text-8xl font-black text-white">
          Base Atlas
        </h1>

        <p className="mt-6 text-xl text-slate-400">
          Discover your wallet identity on Base.
        </p>

        <div className="mt-10 flex gap-4">
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Paste your Base wallet..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-white outline-none"
          />

          <button
            onClick={handleExplore}
            className="rounded-2xl bg-[#0052FF] px-8 py-4 text-white"
          >
            Explore
          </button>
        </div>

      </div>
    </div>
  );
}