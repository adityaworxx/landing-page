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
        `SynapseX Financial Terminal Client v1.0.4\nRelease: 2026-Q3 Universal macOS\nProtocol: Real-Time Ledger & Treasury Synchronization\nStatus: Verified\nTarget: Institutional Multi-Asset Execution`
      ], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SynapseX-Terminal-v1.0.4.dmg';
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-[#0c0c0e] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
          >
            {/* Ambient subtle glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <SynapseXLogo size={18} />
                </div>
                <div>
                  <h3 className="text-base font-medium tracking-tight">SynapseX Treasury Terminal</h3>
                  <p className="text-xs text-white/40">Release v1.0.4 · macOS Universal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm text-white/60">
              <p className="leading-relaxed">
                Experience low-latency financial telemetry with direct multi-custody settlement, 2.4ms target reconciliation, and real-time portfolio forecasting.
              </p>

              <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Architecture</span>
                  <span className="text-white/80 font-mono">Apple Silicon (M1-M4) &amp; Intel</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Package Size</span>
                  <span className="text-white/80 font-mono">84.2 MB</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">SHA-256</span>
                  <span className="text-white/80 font-mono">f84e...92a1</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartDownload}
                disabled={downloading}
                className="flex-1 h-12 bg-white text-black font-medium text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-75"
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
                    <i className="bi bi-apple text-base"></i>
                    <span>Download for macOS</span>
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
