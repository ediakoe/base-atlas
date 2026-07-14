import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/78 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:h-20 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-blue-300/30 bg-blue-500 shadow-lg shadow-blue-950/40">
            <div className="absolute inset-2 rounded-xl bg-white/15" />
            <div className="absolute left-2 top-2 h-2 w-2 rounded-full bg-cyan-200" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-black tracking-[0.22em] text-white sm:text-base">
              BASE ATLAS
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Crypto Intelligence Platform
            </p>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
