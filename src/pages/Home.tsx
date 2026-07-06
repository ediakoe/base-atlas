import Hero from "../components/Hero/Hero";
export default function Home() {
  return (
    <>
      <Hero />

      {/* How It Works */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              How It Works
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Estimate Potential Airdrops In Seconds
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-slate-400">
              Use supply, community allocation, wallet count and token price
              assumptions to estimate possible airdrop outcomes.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                01
              </div>

              <h3 className="text-2xl font-bold">
                Enter Tokenomics
              </h3>

              <p className="mt-4 text-slate-400">
                Set total supply and community allocation percentage.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                02
              </div>

              <h3 className="text-2xl font-bold">
                Estimate Users
              </h3>

              <p className="mt-4 text-slate-400">
                Define the expected number of eligible wallets.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl font-black text-blue-400">
                03
              </div>

              <h3 className="text-2xl font-bold">
                See Results
              </h3>

              <p className="mt-4 text-slate-400">
                Instantly calculate allocation size and potential value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use It */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Why Use It
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Understand Potential Outcomes
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="text-2xl font-bold">
                Allocation Estimates
              </h3>

              <p className="mt-4 text-slate-400">
                Quickly understand how different tokenomics affect allocation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="text-2xl font-bold">
                Value Projections
              </h3>

              <p className="mt-4 text-slate-400">
                Explore potential token value under different price scenarios.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <h3 className="text-2xl font-bold">
                Easy Comparisons
              </h3>

              <p className="mt-4 text-slate-400">
                Compare multiple projects and assumptions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#030712] px-6 py-10 text-center text-slate-500">
  Base Atlas © 2026 · Powered by Base

  <div className="mt-2">
    Built by
    <a
      href="https://x.com/diako901"
      target="_blank"
      rel="noreferrer"
      className="ml-1 text-blue-400 hover:text-blue-300"
    >
      @diako901
    </a>
  </div>
</footer>
    </>
  );
}