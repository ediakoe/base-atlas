import { motion } from "framer-motion";

const logos = [
  { size: 36, top: "6%", left: "4%", duration: 19, delay: 0, rotate: 360 },
  { size: 24, top: "12%", right: "6%", duration: 23, delay: 0.8, rotate: -360 },
  { size: 48, top: "38%", left: "2%", duration: 26, delay: 0.4, rotate: 360 },
  { size: 30, top: "55%", right: "4%", duration: 21, delay: 1.6, rotate: -360 },
  { size: 20, top: "22%", left: "16%", duration: 17, delay: 1.2, rotate: 360 },
  { size: 42, top: "68%", left: "8%", duration: 29, delay: 0.6, rotate: -360 },
  { size: 28, top: "32%", right: "12%", duration: 20, delay: 2, rotate: 360 },
  { size: 34, top: "78%", right: "18%", duration: 25, delay: 0.3, rotate: -360 },
  { size: 22, top: "10%", left: "38%", duration: 22, delay: 1.5, rotate: 360 },
  { size: 40, top: "48%", left: "78%", duration: 27, delay: 0.9, rotate: -360 },
  { size: 18, top: "88%", left: "42%", duration: 16, delay: 2.3, rotate: 360 },
  { size: 32, top: "18%", right: "28%", duration: 24, delay: 1.1, rotate: -360 },
  { size: 26, top: "62%", left: "55%", duration: 18, delay: 0.7, rotate: 360 },
  { size: 44, top: "3%", right: "38%", duration: 28, delay: 1.4, rotate: -360 },
];

export default function FloatingLogos() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {logos.map((logo, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.14]"
          style={{
            top: logo.top,
            left: logo.left,
            right: (logo as any).right,
            width: logo.size,
            height: logo.size,
          }}
          animate={{
            y: [0, -45, 20, -30, 0],
            x: [0, 30, -20, 35, 0],
            rotate: [0, logo.rotate],
            scale: [1, 1.18, 0.88, 1.12, 1],
          }}
          transition={{
            duration: logo.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: logo.delay,
          }}
        >
          <div
            className="w-full h-full bg-[#0052FF] flex items-center justify-center"
            style={{ borderRadius: logo.size * 0.28 }}
          >
            <svg
              viewBox="0 0 111 111"
              className="fill-white"
              style={{ width: logo.size * 0.55, height: logo.size * 0.55 }}
            >
              <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}