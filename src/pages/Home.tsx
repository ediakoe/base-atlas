import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Allocation Simulator Section */}
      <section className="bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black">Token Allocation Simulator</h2>
            <p className="mt-4 text-slate-400">Adjust the sliders and see real-time impact on your potential airdrop and score</p>
          </div>

          {/* Simulator will be added in Hero or here */}
        </div>
      </section>
    </>
  );
}