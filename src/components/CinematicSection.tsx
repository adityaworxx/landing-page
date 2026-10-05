import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const VIDEO_URL_SECTION_2 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export const CinematicSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <video
        src={VIDEO_URL_SECTION_2}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Top Gradient Overlay: 180px height, linear-gradient from #010103 to transparent */}
      <div
        className="absolute top-0 inset-x-0 h-[180px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #010103 0%, rgba(1, 1, 3, 0) 100%)',
        }}
      />

      {/* 3D Perspective Container */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 flex items-center justify-center text-center"
        style={{ perspective: '400px' }}
      >
        <motion.p
          style={{
            transform,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center drop-shadow-md"
        >
          A financial data architecture built for real-time institutional scale. SynapseX
          translates high-frequency market order flow into deterministic computational
          intelligence. Every transaction becomes auditable, structured, and instantly
          reconciled. It continuously reconstructs portfolio posture across global liquidity
          venues. Market latency is eliminated into actionable capital efficiency.
        </motion.p>
      </div>
    </section>
  );
};

export default CinematicSection;
