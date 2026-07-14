import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <footer className="border-t border-white/5 bg-[#030712] px-6 py-12 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div className="h-6 w-6 rounded-lg bg-[#0052FF] flex items-center justify-center">
            <svg viewBox="0 0 111 111" className="h-3.5 w-3.5 fill-white">
              <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"/>
            </svg>
          </div>
          <span className="font-semibold text-slate-300">Base</span>
        </div>
        <p className="text-sm text-slate-500">© 2026</p>
        <p className="mt-2 text-sm text-slate-500">
          Built by{" "}
          <a
            href="https://x.com/diako901"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            @diako901
          </a>
        </p>
      </footer>
    </>
  );
}