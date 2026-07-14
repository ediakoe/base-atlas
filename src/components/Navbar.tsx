import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="h-9 w-9 rounded-xl bg-[#0052FF] flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:shadow-blue-500/60 transition">
              <svg viewBox="0 0 111 111" className="h-5 w-5 fill-white">
                <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"/>
              </svg>
            </div>
          </motion.div>

          <div>
            <h1 className="font-black text-white tracking-tight text-[17px]">
              BASE
            </h1>
            <p className="text-[10px] text-slate-500 -mt-0.5 tracking-[0.18em] uppercase">
              Wallet Intelligence
            </p>
          </div>
        </Link>

        <nav className="flex items-center">
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-blue-400 transition"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}