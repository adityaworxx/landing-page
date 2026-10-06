import React from 'react';
import { motion } from 'framer-motion';

const VIDEO_URL_SECTION_3 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

const METRICS_DATA = [
  {
    value: '2.4ms',
    label: 'Reconciliation Latency',
  },
  {
    value: '99.9%',
    label: 'Audit Integrity',
  },
  {
    value: '$140B',
    label: 'Daily Throughput',
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section
      id="metrics"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        src={VIDEO_URL_SECTION_3}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Light, luminous overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6 flex flex-col items-center">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-20 text-center select-none font-mono"
        >
          Performance Metrics
        </motion.p>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {METRICS_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center cursor-default select-none group"
            >
              <span className="text-white text-[clamp(50px,10vw,96px)] font-extralight tracking-[-0.04em] leading-none tabular-nums group-hover:text-white transition-colors">
                {item.value}
              </span>
              <span className="text-white/40 group-hover:text-white/60 text-[12px] sm:text-[13px] mt-4 tracking-[0.18em] uppercase font-mono transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
