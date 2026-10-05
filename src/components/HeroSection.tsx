import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

interface HeroSectionProps {
  entranceComplete: boolean;
}

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({ entranceComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const lastXRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
      targetTimeRef.current = 0;
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (!video) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      if (lastXRef.current === null) {
        lastXRef.current = clientX;
        return;
      }
      const deltaX = clientX - lastXRef.current;
      lastXRef.current = clientX;

      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const duration = video.duration;
      // Sensitivity 0.8
      const deltaSeconds = (deltaX / window.innerWidth) * duration * 0.8;
      targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + deltaSeconds));

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handlePointerLeave = () => {
      lastXRef.current = null;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, []);

  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
      {/* Background Video (paused, mouse-scrubbed) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Large Background Watermark Text: "TRANSCENDENCE" */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-[5]"
        style={{
          top: 'calc(50% + 50px)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2
          className="font-anton uppercase tracking-[-4px] whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(120px, 30vw, 521px)',
            opacity: 0.10,
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          LIQUIDITY
        </h2>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 pointer-events-none">
        {/* Spacer to push content to bottom */}
        <div className="flex-1" />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1.0 }}
          className="w-full flex flex-col gap-6 md:flex-row md:items-end md:justify-between pointer-events-auto"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Capital" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Flow" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-sans"
            >
              Built at the intersection of distributed systems and institutional finance. SynapseX
              continuously reconciles transaction streams, liquidity reserves, and multi-asset
              exposure into a single unified financial intelligence layer.
            </motion.p>
          </div>

          {/* Right h1 */}
          <div className="text-left md:text-right">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Ledger" delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
