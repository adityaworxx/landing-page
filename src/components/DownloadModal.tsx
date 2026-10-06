import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleStartDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create mock file download trigger
      const blob = new Blob([
        `SynapseX Financial Terminal Client v1.0.4\nRelease: 2026-Q3 Universal Edition\nProtocol: Real-Time Ledger & Treasury Synchronization\nStatus: Verified\nTarget: Institutional Multi-Asset Execution`
      ], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SynapseX-Terminal-v1.0.4-universal.pkg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
      }, 4000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="relative w-full max-w-lg bg-[#0a0a0d] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl text-white overflow-hidden"
          >
            {/* Top hairline sheen */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {/* Ambient subtle glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <SynapseXLogo size={16} />
                </div>
                <div>
                  <h3 className="text-base font-medium tracking-tight">SynapseX Treasury Terminal</h3>
                  <p className="text-[11px] text-white/40 font-mono">Release v1.0.4 · Cross-Platform Universal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer text-xs"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm text-white/65">
              <p className="leading-relaxed font-light">
                Experience low-latency financial telemetry with direct multi-custody settlement, 2.4ms target reconciliation, and real-time portfolio forecasting.
              </p>

              <div className="border border-white/[0.08] rounded-xl p-3.5 bg-white/[0.015] space-y-2 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Architecture</span>
                  <span className="text-white/80">Universal 64-bit (x86_64 &amp; ARM64)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Package Size</span>
                  <span className="text-white/80">84.2 MB</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">SHA-256</span>
                  <span className="text-white/80">f84e...92a1</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleStartDownload}
                disabled={downloading}
                className="flex-1 h-11 bg-white text-black font-medium text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-75 cursor-pointer"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Binary...</span>
                  </>
                ) : downloaded ? (
                  <>
                    <span>✓ Download Started</span>
                  </>
                ) : (
                  <>
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
                    <span>Download Terminal Binary</span>
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="h-12 px-5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm rounded-xl transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
