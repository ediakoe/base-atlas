import { useState } from "react";

export default function Leaderboard() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const wallets = [
    {
      rank: 1,
      address: "0x8a7d...91e2",
      score: 992,
      archetype: "Alpha Farmer",
    },
    {
      rank: 2,
      address: "0x71bc...4fd1",
      score: 978,
      archetype: "Builder",
    },
    {
      rank: 3,
      address: "0xc231...8ab4",
      score: 964,
      archetype: "Collector",
    },
    {
      rank: 4,
      address: "0x54ef...11da",
      score: 952,
      archetype: "DeFi Power User",
    },
    {
      rank: 5,
      address: "0x1f23...9abc",
      score: 944,
      archetype: "Alpha Farmer",
    },
    {
      rank: 6,
      address: "0x8d91...2def",
      score: 931,
      archetype: "Builder",
    },
  ];

  const filteredWallets = wallets.filter((wallet) => {
    const matchFilter =
      filter === "All" ||
      wallet.archetype.toLowerCase().includes(filter.toLowerCase());

    const matchSearch = wallet.address
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Atlas Leaderboard
        </h1>

        <p className="mt-3 text-slate-400">
          Top wallets ranked by Atlas Score.
        </p>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Total Wallets
            </p>

            <h2 className="mt-2 text-4xl font-black">
              128,421
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Average Atlas Score
            </p>

            <h2 className="mt-2 text-4xl font-black text-green-400">
              742
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-slate-400">
              Top Archetype
            </p>

            <h2 className="mt-2 text-3xl font-black text-blue-400">
              Alpha Farmer
            </h2>
          </div>

        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Wallet..."
          className="mt-8 w-full rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-white outline-none"
        />

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">

          {[
            "All",
            "Farmer",
            "Builder",
            "Collector",
            "DeFi",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-2xl px-4 py-2 ${
                filter === item
                  ? "bg-[#0052FF]"
                  : "bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Top 3 */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <div className="text-5xl">
              🥇
            </div>

            <h2 className="mt-4 text-3xl font-black">
              #1
            </h2>

            <p className="mt-2 font-mono text-yellow-300">
              {wallets[0].address}
            </p>

            <p className="mt-4 text-5xl font-black">
              {wallets[0].score}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-400/30 bg-slate-400/10 p-6">
            <div className="text-5xl">
              🥈
            </div>

            <h2 className="mt-4 text-3xl font-black">
              #2
            </h2>

            <p className="mt-2 font-mono text-slate-300">
              {wallets[1].address}
            </p>

            <p className="mt-4 text-5xl font-black">
              {wallets[1].score}
            </p>
          </div>

          <div className="rounded-3xl border border-orange-500/30 bg-orange-500/10 p-6">
            <div className="text-5xl">
              🥉
            </div>

            <h2 className="mt-4 text-3xl font-black">
              #3
            </h2>

            <p className="mt-2 font-mono text-orange-300">
              {wallets[2].address}
            </p>

            <p className="mt-4 text-5xl font-black">
              {wallets[2].score}
            </p>
          </div>

        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">

          {filteredWallets.map((wallet) => (
            <div
              key={wallet.rank}
              className="flex items-center justify-between border-b border-slate-800 p-6"
            >
              <div>
                <p className="text-2xl font-black">
                  #{wallet.rank}
                </p>

                <p className="mt-1 font-mono text-blue-400">
                  {wallet.address}
                </p>
              </div>

              <div className="text-right">

                <p className="text-3xl font-black text-green-400">
                  {wallet.score}
                </p>

                <p className="mt-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {wallet.archetype}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}