import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';

type DashboardRole = 'employee' | 'manager' | 'finance';

interface DashboardItem {
  id: string;
  tag: string;
  name: string;
  role: DashboardRole;
  description: string;
}

const DASHBOARD_BUTTONS: DashboardItem[] = [
  {
    id: '01',
    tag: 'PORTAL 01',
    name: 'Employee Dashboard',
    role: 'employee',
    description: 'Expense submission, per diem balance & card controls',
  },
  {
    id: '02',
    tag: 'PORTAL 02',
    name: 'Manager Dashboard',
    role: 'manager',
    description: 'Team budget oversight, approval queue & SLA status',
  },
  {
    id: '03',
    tag: 'PORTAL 03',
    name: 'Finance Dashboard',
    role: 'finance',
    description: 'Consolidated treasury, consensus ledger & audit export',
  },
];

export const DashboardsSection: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardRole | null>(null);

  // Modal interactivity states
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
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-white/40 text-[12px] sm:text-[13px] tracking-[0.25em] uppercase mb-6 select-none font-mono">
            Dashboards
          </span>

          <h2 className="text-white font-light text-[clamp(28px,5.5vw,54px)] leading-[1.1] tracking-[-0.03em] mb-7 select-none">
            Three portals. Zero friction.
          </h2>

          <p className="text-white/45 text-[14px] sm:text-[16px] font-light leading-relaxed max-w-lg mx-auto select-none">
            Dedicated financial workspaces engineered for individual staff, team
            approvers, and global corporate controllers.
          </p>
        </motion.div>

        {/* The 3 Clean Dashboard Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-18 flex flex-col items-center gap-3.5 w-full"
        >
          {DASHBOARD_BUTTONS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedDashboard(item.role)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg h-[74px] border border-white/[0.08] rounded-xl flex items-center justify-between px-6 sm:px-7 bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_4px_30px_rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 select-none cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.7)] transition-all" />
                <span className="text-white/35 group-hover:text-white/70 text-[11px] tracking-[0.2em] uppercase font-mono transition-colors">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/90 group-hover:text-white text-[15px] sm:text-[17px] font-light tracking-tight transition-colors">
                  {item.name}
                </span>
                <span className="w-6 h-6 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center text-white/35 group-hover:text-white text-xs group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Floating Glass Modal */}
      <AnimatePresence>
        {selectedDashboard && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedDashboard(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="relative w-full max-w-lg bg-[#0a0a0d] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl text-white z-10 overflow-hidden"
            >
              {/* Subtle accent highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Modal Role Switcher */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <SynapseXLogo size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium tracking-tight">
                      {selectedDashboard === 'employee' && 'Employee Dashboard'}
                      {selectedDashboard === 'manager' && 'Manager Dashboard'}
                      {selectedDashboard === 'finance' && 'Finance Dashboard'}
                    </h3>
                    <p className="text-[11px] text-white/40 font-mono">
                      {selectedDashboard === 'employee' && 'Alex Vance · ID #EMP-8402'}
                      {selectedDashboard === 'manager' && 'Elena Rostova · VP Quant Tech'}
                      {selectedDashboard === 'finance' && 'Consolidated Treasury Controller'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDashboard(null)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer text-xs"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Quick Tab Switcher inside Modal */}
              <div className="flex gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl mb-5 font-mono text-[11px]">
                {(['employee', 'manager', 'finance'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedDashboard(role)}
                    className={`flex-1 py-1.5 rounded-lg transition-colors capitalize cursor-pointer ${
                      selectedDashboard === role
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Modal Body: Employee */}
              {selectedDashboard === 'employee' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Monthly Allowance
                      </span>
                      <span className="text-lg font-mono text-white tabular-nums">$2,450.00</span>
                      <span className="text-[10px] text-white/40 block mt-0.5">of $5,000 Cap</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Corporate Card
                      </span>
                      <span className="text-sm font-mono text-emerald-400 block mt-1">
                        •••• 4829
                      </span>
                      <span className="text-[10px] text-white/40 block mt-0.5">Active · Chip &amp; Tap</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1.5">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">Pending Review</span>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/80">Tokyo Financial Summit - Flight</span>
                      <span className="font-mono text-white font-medium tabular-nums">$2,180.00</span>
                    </div>
                    <span className="text-[10px] text-amber-300 font-mono block">
                      Awaiting Manager Sign-Off
                    </span>
                  </div>

                  <div className="pt-2 flex gap-2.5">
                    <button
                      onClick={() => setExpenseSubmitted(true)}
                      className="flex-1 h-10 bg-white text-black font-medium text-xs rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      {expenseSubmitted ? '✓ Claim Submitted' : '+ Quick Expense Claim'}
                    </button>
                    <button
                      onClick={() => setSelectedDashboard(null)}
                      className="px-4 h-10 bg-white/5 hover:bg-white/10 text-white/70 text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Body: Manager */}
              {selectedDashboard === 'manager' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Team Spend / Budget
                      </span>
                      <span className="text-lg font-mono text-white tabular-nums">$168.4K / $240K</span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">70.2% Utilized</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Approvals Queue
                      </span>
                      <span className="text-lg font-mono text-amber-300 tabular-nums">
                        {managerApproved ? '0 Pending' : '1 Action Item'}
                      </span>
                      <span className="text-[10px] text-white/40 block mt-0.5">Avg Turnaround: 1.8h</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <div className="text-white font-medium">Alex Vance · AWS Cluster</div>
                        <div className="text-white/40 text-[10px] font-mono">Infrastructure · Receipt Verified</div>
                      </div>
                      <div className="text-right font-mono text-xs text-white font-medium tabular-nums">
                        $1,420.50
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2.5">
                    <button
                      onClick={() => setManagerApproved(true)}
                      disabled={managerApproved}
                      className="flex-1 h-10 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {managerApproved ? '✓ Claim Approved & Settled' : 'Approve Claim ($1,420.50)'}
                    </button>
                    <button
                      onClick={() => setSelectedDashboard(null)}
                      className="px-4 h-10 bg-white/5 hover:bg-white/10 text-white/70 text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Body: Finance */}
              {selectedDashboard === 'finance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Consolidated Liquidity
                      </span>
                      <span className="text-lg font-mono text-white tabular-nums">$142.85M</span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">+4.2% Net 30d float</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">
                        Ledger Consensus
                      </span>
                      <span className="text-sm font-mono text-emerald-400 block mt-1">
                        100% Reconciled
                      </span>
                      <span className="text-[10px] text-white/40 block mt-0.5">Zero drift</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1 text-xs font-mono">
                    <div className="text-white/70">Multi-Entity Settlement Engine</div>
                    <div className="text-white/40 text-[10px]">
                      JPMorgan Chase · BNY Mellon · ClearBank Direct Feeds
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        setReconciled(true);
                        setTimeout(() => setReconciled(false), 2000);
                      }}
                      className="flex-1 h-10 bg-white text-black font-medium text-xs rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      {reconciled ? '✓ Consensus Verified' : '⚡ Run Reconciliation'}
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="h-10 px-4 bg-white/10 hover:bg-white/15 text-white text-xs rounded-xl border border-white/10 transition-colors cursor-pointer"
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
