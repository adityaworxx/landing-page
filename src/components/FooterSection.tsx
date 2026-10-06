import React from 'react';
import SynapseXLogo from './SynapseXLogo';

const FOOTER_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-black overflow-hidden border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row min-h-[400px] w-full">
        {/* Left Column: Video #5 */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto min-h-[300px] md:min-h-[400px] relative overflow-hidden">
          <video
            src={FOOTER_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-black pointer-events-none" />
        </div>

        {/* Right Column: Information & Copyright */}
        <div className="w-full md:w-1/2 p-8 sm:p-14 md:p-16 flex flex-col justify-between bg-black">
          <div>
            {/* Logo + Name */}
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo size={18} className="text-white/80" />
              <span className="text-[15px] font-medium text-white/80 tracking-tight">
                SynapseX
              </span>
            </div>

            {/* Description */}
            <p className="text-white/45 text-[14px] sm:text-[15px] font-light leading-relaxed max-w-sm">
              The next evolution of institutional balance sheet infrastructure. Engineered for
              global treasury teams and multi-asset capital operators.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-white/30 text-[11px] sm:text-[12px] mt-12 font-mono">
            © 2026 SynapseX Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
