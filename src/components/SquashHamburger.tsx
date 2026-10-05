import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  isMobile?: boolean;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({ isOpen, isMobile = false }) => {
  const width = isMobile ? 15 : 18;
  const height = isMobile ? 10 : 12;
  const barHeight = isMobile ? 1.2 : 1.5;
  const translateY = isMobile ? 4.4 : 5.25;

  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex items-center justify-center cursor-pointer pointer-events-none"
      aria-hidden="true"
    >
      {/* Top bar */}
      <motion.span
        style={{ height: `${barHeight}px` }}
        className="absolute left-0 right-0 top-0 bg-white rounded-full origin-center"
        animate={
          isOpen
            ? { y: translateY, rotate: 45 }
            : { y: 0, rotate: 0 }
        }
        transition={springTransition}
      />

      {/* Middle bar */}
      <motion.span
        style={{
          height: `${barHeight}px`,
          top: `calc(50% - ${barHeight / 2}px)`
        }}
        className="absolute left-0 right-0 bg-white rounded-full origin-center"
        animate={
          isOpen
            ? { opacity: 0, scale: 0 }
            : { opacity: 1, scale: 1 }
        }
        transition={springTransition}
      />

      {/* Bottom bar */}
      <motion.span
        style={{ height: `${barHeight}px` }}
        className="absolute left-0 right-0 bottom-0 bg-white rounded-full origin-center"
        animate={
          isOpen
            ? { y: -translateY, rotate: -45 }
            : { y: 0, rotate: 0 }
        }
        transition={springTransition}
      />
    </div>
  );
};

export default SquashHamburger;
