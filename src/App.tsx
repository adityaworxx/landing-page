/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CinematicSection from './components/CinematicSection';
import MetricsSection from './components/MetricsSection';
import TechnologySection from './components/TechnologySection';
import DashboardsSection from './components/DashboardsSection';
import FooterSection from './components/FooterSection';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    // Initialize buttery Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // After 800ms delay, entranceComplete becomes true
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{ fontFamily: '"Space Mono", monospace' }}
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden"
    >
      {/* Fixed Navbar */}
      <Navbar
        entranceComplete={entranceComplete}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* Section 1: Hero (full viewport height, mouse-scrubbed Video #1) */}
        <HeroSection entranceComplete={entranceComplete} />

        {/* Section 2: Cinematic Text (full viewport height, Video #2) */}
        <CinematicSection />

        {/* Section 3: Metrics (min-h-screen, Video #3) */}
        <MetricsSection />

        {/* Section 4: Technology / Financial Intelligence (full viewport height, Video #4) */}
        <TechnologySection />

        {/* Section 5: Dashboards (Employee, Manager, and Finance) */}
        <DashboardsSection />
      </main>

      {/* Footer (Video #5) */}
      <FooterSection />

      {/* Download Action Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
