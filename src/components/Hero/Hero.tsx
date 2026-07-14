import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import SpaceBackground from "../SpaceBackground";
import FloatingLogos from "../FloatingLogos";

export default function Hero() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");

  const analyzeWallet = () => {
    const address = walletAddress.trim();
    if (!address) return;
    navigate(`/wallet/${address}`);
  };

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#030712] text-white">
      <SpaceBackground />
      <FloatingLogos />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0052FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">

          {/* Big floating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-12 relative z-10"
          >
            <motion.div
              animate={{ y: [0, -16, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-[28px] bg-[#0052FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,82,255,0.45)]">
                <svg viewBox="0 0 111 111" className="h-12 w-12 md:h-14 md:w-14 fill-white">
                  <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"/>
                </svg>
              </div>
              <motion.div
                animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute inset-0 rounded-[28px] border border-blue-400/60"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight z-10"
          >
            Decode Any
            <span className="block mt-3 bg-gradient-to-r from-blue-400 via-[#3b82f6] to-cyan-400 bg-clip-text text-transparent">
              Base Wallet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-7 max-w-lg text-lg text-slate-400 z-10 leading-relaxed"
          >
            Real on-chain intelligence and token allocation modeling for the Base ecosystem.
          </motion.p>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14 w-full max-w-xl z-10"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-2.5 shadow-2xl shadow-blue-500/10">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeWallet()}
                  placeholder="Enter Base wallet (0x...)"
                  className="flex-1 rounded-2xl border-0 bg-black/40 px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/40 transition"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={analyzeWallet}
                  className="rounded-2xl bg-[#0052FF] px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition"
                >
                  Analyze
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}