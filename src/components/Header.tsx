import React from 'react';
import { BookOpen, Sparkles, Download, RotateCcw, GraduationCap, ShieldCheck, Printer } from 'lucide-react';
import { ResearchPlan } from '../types/research';

interface HeaderProps {
  plan: ResearchPlan | null;
  onReset: () => void;
  onOpenExport: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ plan, onReset, onOpenExport, onPrint }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-slate-800 flex items-center justify-center shadow-inner border border-indigo-400/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif-academic text-xl tracking-tight text-white font-medium">
                  ResearchMate
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Academic Assistant
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans hidden sm:block">
                Collegiate Research Paper Formulation & Rigorous Planning
              </p>
            </div>
          </div>

          {/* Academic Integrity Badge & Action buttons */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grounded Academic Formulation</span>
            </div>

            {plan && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onPrint}
                  title="Print Academic Manuscript Plan"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={onOpenExport}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Plan</span>
                </button>

                <button
                  onClick={onReset}
                  title="Plan New Paper"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
