import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        {/* DESKTOP NAV (visible sm and up) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Logo pill */}
          <AnimatePresence initial={false}>
            {(!isMenuOpen || true) && (
              <motion.button
                onClick={() => scrollToPosition(0)}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center gap-2.5 text-white transition-colors cursor-pointer border border-white/5"
              >
                <SynapseXLogo size={18} className="text-white" />
                <span className="text-[16px] font-medium tracking-tight text-white select-none">
                  SynapseX
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Expanding menu pill */}
          <motion.div
            initial={false}
            animate={{ width: isMenuOpen ? 390 : 48 }}
            transition={springConfig}
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/5 flex items-center overflow-hidden"
          >
            {/* Hamburger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center transition-all cursor-pointer ${
                isMenuOpen
                  ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                  : 'w-12 h-12 rounded-[14px] hover:bg-white/10'
              }`}
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={false} />
            </button>

            {/* Nav links */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-6 ml-4 whitespace-nowrap"
              >
                <button
                  onClick={() => scrollToPosition(window.innerHeight)}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[16px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  onClick={() => scrollToPosition(window.innerHeight * 2)}
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[16px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>
                <button
                  onClick={scrollToDashboards}
                  onMouseEnter={() => setHoveredLink('dashboards')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[16px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <ScrambleText text="Dashboards" isHovered={hoveredLink === 'dashboards'} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* MOBILE NAV (visible below sm) */}
        <div className="flex sm:hidden items-center gap-1.5 flex-1 mr-2">
          {/* Mobile Logo pill: animates to width 0 when open */}
          <motion.button
            onClick={() => scrollToPosition(0)}
            animate={{
              width: isMenuOpen ? 0 : 'auto',
              opacity: isMenuOpen ? 0 : 1,
              paddingLeft: isMenuOpen ? 0 : 12,
              paddingRight: isMenuOpen ? 0 : 12,
            }}
            transition={springConfig}
            className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-1.5 text-white overflow-hidden border border-white/5 shrink-0"
          >
            <SynapseXLogo size={14} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight whitespace-nowrap">
              SynapseX
            </span>
          </motion.button>

          {/* Mobile Expanding menu capsule */}
          <motion.div
            initial={false}
            animate={{
              width: isMenuOpen ? '100%' : 36,
            }}
            transition={springConfig}
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md border border-white/5 flex items-center overflow-hidden flex-1 max-w-[280px]"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={true} />
            </button>

            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 ml-2"
              >
                <button
                  onClick={() => scrollToPosition(window.innerHeight)}
                  className="text-[12px] text-white/85 hover:text-white"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToPosition(window.innerHeight * 2)}
                  className="text-[12px] text-white/85 hover:text-white"
                >
                  Metrics
                </button>
                <button
                  onClick={scrollToDashboards}
                  className="text-[12px] text-white/85 hover:text-white"
                >
                  Dashboards
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* RIGHT DOWNLOAD BUTTON */}
        <div>
          {/* Desktop download button */}
          <motion.button
            onClick={onOpenDownload}
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex h-12 px-6 bg-white rounded-full text-black items-center gap-2 cursor-pointer font-medium text-[15px] select-none shadow-lg shadow-black/20"
          >
            <i className="bi bi-apple text-[17px] leading-none"></i>
            <ScrambleText text="Download" isHovered={isDownloadHovered} />
          </motion.button>

          {/* Mobile download button */}
          <motion.button
            onClick={onOpenDownload}
            whileTap={{ scale: 0.95 }}
            className="flex sm:hidden h-9 px-3.5 bg-white rounded-full text-black items-center gap-1.5 cursor-pointer font-medium text-[13px] select-none shrink-0"
          >
            <i className="bi bi-apple text-[14px] leading-none"></i>
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
