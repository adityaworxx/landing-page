import React from 'react';
import { motion } from 'framer-motion';

const VIDEO_URL_SECTION_4 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

const TECH_ITEMS = [
  {
    title: 'Ledger Reconciliation',
    desc: 'Real-time bi-temporal reconstruction of global transaction state.',
  },
  {
    title: 'Anomaly Isolation',
    desc: 'Separates legitimate market flow from malicious variances.',
  },
  {
    title: 'Liquidity Forecasting',
    desc: 'Anticipates counterparty exposures before clearing windows.',
  },
  {
    title: 'Continuous Audit',
    desc: 'Deterministic state proofs and automated regulatory compliance.',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <section
      id="technology"
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between bg-black"
    >
      {/* Background Video */}
      <video
        src={VIDEO_URL_SECTION_4}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 select-none">
        {/* Top Area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            Financial
            <br />
            Intelligence
          </motion.h2>

          {/* Right Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
          >
            The system synchronizes multi-entity ledgers in sub-millisecond cycles. From there, every
            balance fluctuation is audited, verified, and settled in real time.
          </motion.p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[40px]" />

        {/* Bottom Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {TECH_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="flex flex-col"
            >
              <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {item.title}
              </h3>
              <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
