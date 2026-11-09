import React, { useState } from 'react';
import {
  HelpCircle,
  Compass,
  FlaskConical,
  Target,
  Check,
  Copy,
  Layers,
  Sparkles,
  ArrowRight,
  BookMarked,
  ShieldAlert,
} from 'lucide-react';
import { ResearchQuestionsData, TopicSummary } from '../types/research';

interface ResearchQuestionsViewProps {
  data: ResearchQuestionsData;
  summary: TopicSummary;
}

export const ResearchQuestionsView: React.FC<ResearchQuestionsViewProps> = ({ data, summary }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Core Summary Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Working Paper Title
            </span>
            <h2 className="text-xl md:text-2xl font-serif-academic text-slate-900 font-medium mt-0.5">
              {summary.title}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {summary.field || 'Academic Study'}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {summary.level || 'Undergraduate'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Scope Definition:</strong> {summary.conciseScope}
        </p>
      </div>

      {/* Prominent Golden Triad: Primary Question, Direction, Possible Methodology */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Primary Research Question */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 rounded-xl border-2 border-blue-200/80 p-5 shadow-xs relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Primary Research Question</span>
              </span>
              <button
                onClick={() => handleCopy(data.primaryQuestion, 'primaryQ')}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition"
                title="Copy Question"
              >
                {copiedKey === 'primaryQ' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-900 font-serif-academic text-lg leading-snug font-medium pt-1">
              "{data.primaryQuestion}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 text-[11px] text-blue-700 flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span>Anchors all empirical data collection and theoretical alignment</span>
          </div>
        </div>

        {/* Primary Research Direction */}
        <div className="bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 rounded-xl border-2 border-amber-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Research Direction</span>
              </span>
              <button
                onClick={() => handleCopy(data.primaryResearchDirection, 'direction')}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition"
                title="Copy Direction"
              >
                {copiedKey === 'direction' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-900 text-sm md:text-base leading-snug font-medium pt-1">
              {data.primaryResearchDirection}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-100 text-[11px] text-amber-800 flex items-center space-x-1">
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span>Operational inquiry pathway</span>
          </div>
        </div>

        {/* Possible Methodology */}
        <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 rounded-xl border-2 border-emerald-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <span>Possible Methodology</span>
              </span>
              <button
                onClick={() => handleCopy(data.possibleMethodology, 'methodology')}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition"
                title="Copy Methodology"
              >
                {copiedKey === 'methodology' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-900 text-sm md:text-base leading-snug font-medium pt-1">
              {data.possibleMethodology}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-emerald-800 flex items-center space-x-1">
            <FlaskConical className="w-3.5 h-3.5 shrink-0" />
            <span>Empirical / analytical execution framework</span>
          </div>
        </div>
      </div>

      {/* Sub-Questions & Hypotheses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Questions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-semibold text-slate-900">Specific Sub-Questions</h3>
            </div>
            <span className="text-xs text-slate-500">{data.subQuestions?.length || 0} sub-questions</span>
          </div>

          <div className="space-y-3.5">
            {data.subQuestions?.map((sq, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-700">SQ{idx + 1}.</span>
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      sq.questionType === 'empirical'
                        ? 'bg-blue-100 text-blue-800'
                        : sq.questionType === 'methodological'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {sq.questionType}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800 mb-1">{sq.question}</p>
                <p className="text-xs text-slate-500 italic">Rationale: {sq.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hypotheses & Research Objectives */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Hypotheses & Core Objectives</h3>
            </div>
          </div>

          <div className="space-y-3.5">
            {data.hypothesesOrObjectives?.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition flex items-start space-x-3"
              >
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md shrink-0">
                  {item.type || 'H' + (idx + 1)}
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">{item.statement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Methodological Architecture Breakdown */}
      {data.methodologyDetails && (
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">
                Operational Methodology Blueprint
              </h3>
            </div>
            <span className="text-xs text-slate-400">Standard Academic Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Research Design
              </span>
              <p className="text-xs text-slate-200">{data.methodologyDetails.design}</p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                Target Sample / Dataset
              </span>
              <p className="text-xs text-slate-200">
                {data.methodologyDetails.targetPopulationOrDataset || 'Specified target population or institutional data'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Analytical Approach
              </span>
              <p className="text-xs text-slate-200">{data.methodologyDetails.analyticalApproach}</p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                Threats & Limitations
              </span>
              <p className="text-xs text-slate-200">
                {data.methodologyDetails.potentialLimitations || 'Confounding variables, generalizability boundaries'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
