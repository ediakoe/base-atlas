import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,82,255,0.28),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.15),#030712_72%)]" />

      <motion.div
        animate={{
          x: [0, 54, 0],
          y: [0, -34, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -46, 0],
          y: [0, 40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-10rem] top-28 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-[160px]"
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  );
}
