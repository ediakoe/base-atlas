import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0052FF]" />

          <div>
            <h1 className="font-black text-white">
              BASE ATLAS
            </h1>

            <p className="text-xs text-slate-400">
              Wallet Intelligence
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-300 hover:text-white"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}