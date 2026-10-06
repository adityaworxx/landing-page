import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete, onOpenDownload }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  const scrollToPosition = (yPos: number) => {
    window.scrollTo({
      top: yPos,
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  const scrollToDashboards = () => {
    const el = document.getElementById('dashboards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const springConfig = {
    type: 'spring' as const,
    stiffness: 350,
    damping: 28,
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-20 z-50 pointer-events-none flex items-center px-4 sm:px-6 md:px-8"
    >
      <div className="w-full flex items-center justify-between pointer-events-auto">
        {/* DESKTOP NAV: Two matching rounded-full pills */}
        <div className="hidden sm:flex items-center gap-2">
          {/* SynapseX Logo Pill (extended on the X side for generous breathing room) */}
          <motion.button
            onClick={() => scrollToPosition(0)}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.98 }}
            className="h-11 pl-5 pr-8 bg-white/10 hover:bg-white/15 backdrop-blur-xl rounded-full flex items-center gap-2.5 text-white transition-colors cursor-pointer border border-white/15 shadow-[0_2px_15px_rgba(0,0,0,0.2)] select-none shrink-0"
            aria-label="SynapseX Home"
          >
            <SynapseXLogo size={17} className="text-white shrink-0" />
            <span className="text-[14px] font-medium tracking-tight text-white whitespace-nowrap">
              SynapseX
            </span>
          </motion.button>

          {/* Expanding Menu Pill */}
          <motion.div
            initial={false}
            animate={{ width: isMenuOpen ? 310 : 44 }}
            transition={springConfig}
            className="h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.2)]"
          >
            {/* Hamburger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 flex items-center justify-center shrink-0 cursor-pointer rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={false} />
            </button>

            {/* Nav links */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-5 ml-1 mr-5 whitespace-nowrap"
              >
                <button
                  onClick={() => scrollToPosition(window.innerHeight)}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[14px] font-normal text-white/80 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  onClick={() => scrollToPosition(window.innerHeight * 2)}
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[14px] font-normal text-white/80 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>
                <button
                  onClick={scrollToDashboards}
                  onMouseEnter={() => setHoveredLink('dashboards')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[14px] font-normal text-white/80 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="Dashboards" isHovered={hoveredLink === 'dashboards'} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* MOBILE NAV */}
        <div className="flex sm:hidden items-center gap-1.5 flex-1 mr-2">
          {/* Mobile SynapseX Pill (expanded on X side) */}
          <motion.button
            onClick={() => scrollToPosition(0)}
            animate={{
              width: isMenuOpen ? 0 : 'auto',
              opacity: isMenuOpen ? 0 : 1,
              paddingLeft: isMenuOpen ? 0 : 13,
              paddingRight: isMenuOpen ? 0 : 20,
            }}
            transition={springConfig}
            className="h-9 bg-white/10 backdrop-blur-xl rounded-full flex items-center gap-2 text-white border border-white/15 overflow-hidden shrink-0 select-none shadow-sm"
          >
            <SynapseXLogo size={14} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight whitespace-nowrap">
              SynapseX
            </span>
          </motion.button>

          {/* Mobile Menu Pill */}
          <motion.div
            initial={false}
            animate={{
              width: isMenuOpen ? '100%' : 36,
            }}
            transition={springConfig}
            className="h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center overflow-hidden flex-1 max-w-[280px] shadow-sm"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer rounded-full hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={true} />
            </button>

            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 ml-2 mr-3 whitespace-nowrap text-xs"
              >
                <button
                  onClick={() => scrollToPosition(window.innerHeight)}
                  className="text-white/80 hover:text-white"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToPosition(window.innerHeight * 2)}
                  className="text-white/80 hover:text-white"
                >
                  Metrics
                </button>
                <button
                  onClick={scrollToDashboards}
                  className="text-white/80 hover:text-white"
                >
                  Dashboards
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* RIGHT ACTION: Download Button */}
        <div>
          {/* Desktop Download Button */}
          <motion.button
            onClick={onOpenDownload}
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
            whileHover={{ scale: 1.02, backgroundColor: '#f0f0f4' }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex h-11 px-5 bg-white rounded-full text-black items-center gap-2 cursor-pointer font-medium text-[14px] select-none shadow-[0_2px_15px_rgba(255,255,255,0.12)] transition-colors shrink-0"
          >
            <svg
              className="w-4 h-4 text-black shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <ScrambleText text="Download" isHovered={isDownloadHovered} />
          </motion.button>

          {/* Mobile Download Button */}
          <motion.button
            onClick={onOpenDownload}
            whileTap={{ scale: 0.96 }}
            className="flex sm:hidden h-9 px-3.5 bg-white rounded-full text-black items-center gap-1.5 cursor-pointer font-medium text-[12px] select-none shrink-0 shadow-[0_2px_12px_rgba(255,255,255,0.1)]"
          >
            <svg
              className="w-3.5 h-3.5 text-black shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
