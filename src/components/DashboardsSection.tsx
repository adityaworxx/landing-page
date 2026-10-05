import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';

type DashboardRole = 'employee' | 'manager' | 'finance';

interface DashboardItem {
  id: string;
  tag: string;
  name: string;
  role: DashboardRole;
  badge: string;
}

const DASHBOARD_BUTTONS: DashboardItem[] = [
  {
    id: '01',
    tag: 'PORTAL 1',
    name: 'Employee Dashboard',
    role: 'employee',
    badge: 'Expense & Cards',
  },
  {
    id: '02',
    tag: 'PORTAL 2',
    name: 'Manager Dashboard',
    role: 'manager',
    badge: 'Approvals & Budgets',
  },
  {
    id: '03',
    tag: 'PORTAL 3',
    name: 'Finance Dashboard',
    role: 'finance',
    badge: 'Treasury & Ledger',
  },
];

export const DashboardsSection: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardRole | null>(null);

  // Quick state for modal interactivity
  const [managerApproved, setManagerApproved] = useState(false);
  const [expenseSubmitted, setExpenseSubmitted] = useState(false);
  const [reconciled, setReconciled] = useState(false);

  const handleExportCSV = () => {
    const csvContent =
      'TxID,Entity,Type,Amount,Currency,Status\nTXN-882194,SynapseX Global LLC,Treasury Sweep,14500000.00,USD,Reconciled\nTXN-882193,SynapseX UK Ltd,Vendor Wire,184500.00,GBP,Reconciled\nTXN-882192,SynapseX SG Pte,Payroll Settlement,642800.00,USD,Reconciled';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SynapseX-Ledger-Reconciliation.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="dashboards"
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center px-6 py-32"
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 select-none font-mono">
            Dashboards
          </span>

          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10 select-none">
            Three portals. Zero friction.
          </h2>

          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto select-none">
            Access dedicated financial workspaces engineered for individual staff, team
            approvers, and global corporate controllers.
          </p>
        </motion.div>

        {/* The 3 Dashboard Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-4 w-full"
        >
          {DASHBOARD_BUTTONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDashboard(item.role)}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.04] transition-all select-none cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-white/30 group-hover:text-white/60 text-[12px] tracking-[0.15em] uppercase font-mono transition-colors">
                  {item.tag}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white text-[16px] sm:text-[18px] font-light group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-white/30 group-hover:text-white text-sm transition-colors">
                  →
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Interactive Modal for Dashboard Quick Preview */}
      <AnimatePresence>
        {selectedDashboard && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDashboard(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-[#0c0c0f] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-white z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <SynapseXLogo size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {selectedDashboard === 'employee' && 'Employee Dashboard'}
                      {selectedDashboard === 'manager' && 'Manager Dashboard'}
                      {selectedDashboard === 'finance' && 'Finance Dashboard'}
                    </h3>
                    <p className="text-xs text-white/40 font-mono">
                      {selectedDashboard === 'employee' && 'User Portal · Alex Vance (ID #EMP-8402)'}
                      {selectedDashboard === 'manager' && 'Approver Portal · Elena Rostova (VP Quant Tech)'}
                      {selectedDashboard === 'finance' && 'Institutional Treasury & Controller Console'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDashboard(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Modal Content Based on Role */}
              {selectedDashboard === 'employee' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Monthly Per Diem
                      </span>
                      <span className="text-xl font-mono text-white">$2,450.00 / $5,000</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Corporate Card
                      </span>
                      <span className="text-sm font-mono text-emerald-400 block mt-1">
                        •••• 4829 (Active)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-white/50 block">Recent Claim</span>
                    <div className="flex justify-between items-center text-xs">
                      <span>Tokyo Financial Summit - Travel</span>
                      <span className="font-mono text-white font-medium">$2,180.00</span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      Status: Under Manager Review
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => setExpenseSubmitted(true)}
                      className="flex-1 h-11 bg-white text-black font-medium text-xs sm:text-sm rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      {expenseSubmitted ? '✓ Quick Claim Submitted' : '+ Quick Expense Claim'}
                    </button>
                    <button
                      onClick={() => setSelectedDashboard(null)}
                      className="px-4 h-11 bg-white/5 hover:bg-white/10 text-white/70 text-xs sm:text-sm rounded-xl transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {selectedDashboard === 'manager' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Team Spend / Budget
                      </span>
                      <span className="text-xl font-mono text-white">$168.4K / $240K</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Review Queue
                      </span>
                      <span className="text-xl font-mono text-amber-300">
                        {managerApproved ? '0 Pending' : '1 Action Required'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <div className="text-white font-medium">Alex Vance · AWS Cluster</div>
                        <div className="text-white/40 text-[11px] font-mono">Category: Infrastructure</div>
                      </div>
                      <div className="text-right font-mono text-sm text-white font-medium">
                        $1,420.50
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => setManagerApproved(true)}
                      disabled={managerApproved}
                      className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {managerApproved ? '✓ Claim Approved & Settled' : 'Approve Pending Claim'}
                    </button>
                    <button
                      onClick={() => setSelectedDashboard(null)}
                      className="px-4 h-11 bg-white/5 hover:bg-white/10 text-white/70 text-xs sm:text-sm rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {selectedDashboard === 'finance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Total Liquidity
                      </span>
                      <span className="text-xl font-mono text-white">$142,850,000.00</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[11px] text-white/40 font-mono uppercase block mb-1">
                        Ledger Consensus
                      </span>
                      <span className="text-sm font-mono text-emerald-400 block mt-1">
                        ✓ 100% Reconciled
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 text-xs font-mono">
                    <div className="text-white/60">Multi-Entity Settlement Engine</div>
                    <div className="text-white/40 text-[11px]">
                      JPMorgan Chase · BNY Mellon · ClearBank Prime Feeds
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setReconciled(true);
                        setTimeout(() => setReconciled(false), 2500);
                      }}
                      className="flex-1 h-11 bg-white text-black font-medium text-xs sm:text-sm rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      {reconciled ? '✓ Consensus Verified' : '⚡ Run Reconciliation'}
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm rounded-xl border border-white/10 transition-colors cursor-pointer"
                    >
                      ↓ Export CSV
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DashboardsSection;
