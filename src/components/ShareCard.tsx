 type Props = {
  score: number;
  archetype: string;
};

export default function ShareCard({
  score,
  archetype,
}: Props) {
  return (
    <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-slate-900 p-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm uppercase tracking-widest text-blue-400">
            Base Atlas
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Atlas Profile
          </h2>
        </div>

        <div className="rounded-2xl bg-[#0052FF] px-4 py-2 font-bold">
          BASE
        </div>

      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">

        <div>
          <p className="text-slate-400">
            Atlas Score
          </p>

          <h3 className="mt-2 text-5xl font-black text-green-400">
            {score}
          </h3>
        </div>

        <div>
          <p className="text-slate-400">
            Archetype
          </p>

          <h3 className="mt-2 text-2xl font-black text-blue-400">
            {archetype}
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-slate-900/60 p-4 text-slate-300">
        Discover your wallet intelligence on Base Atlas.
      </div>

    </div>
  );
}