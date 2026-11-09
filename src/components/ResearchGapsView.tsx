import React from 'react';
import {
  Compass,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Split,
  MapPin,
  Database,
  Binary,
} from 'lucide-react';
import { ResearchGapsData } from '../types/research';

interface ResearchGapsViewProps {
  data: ResearchGapsData;
}

export const ResearchGapsView: React.FC<ResearchGapsViewProps> = ({ data }) => {
  const getGapIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'methodological':
        return <Binary className="w-4 h-4 text-emerald-600" />;
      case 'empirical / data':
      case 'empirical':
        return <Database className="w-4 h-4 text-blue-600" />;
      case 'contextual / geographic':
      case 'contextual':
        return <MapPin className="w-4 h-4 text-amber-600" />;
      default:
        return <Split className="w-4 h-4 text-purple-600" />;
    }
  };

  const getGapBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'methodological':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'empirical / data':
      case 'empirical':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contextual / geographic':
      case 'contextual':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Identified Research Gaps & Future Inquiry Directions
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unexplored theoretical voids, empirical blind spots, and niche opportunities for scholarly contribution.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Analytic gap mapping without synthetic references</span>
        </div>
      </div>

      {/* Identified Research Gaps Cards */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-2">
          <span>Identified Research Gaps in the Literature</span>
          <span className="text-xs font-normal text-slate-400">
            ({data.identifiedGaps?.length || 0} mapped voids)
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.identifiedGaps?.map((gap, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-amber-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    {getGapIcon(gap.gapType)}
                    <span className="text-sm font-semibold text-slate-900">{gap.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getGapBadgeColor(
                      gap.gapType
                    )}`}
                  >
                    {gap.gapType}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {gap.description}
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg text-xs text-amber-950 flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-900">Student Opportunity:</strong>{' '}
                  {gap.opportunityForStudent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Future Directions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-4 flex items-center space-x-2">
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span>Actionable Future Research Pathways</span>
        </h3>

        <div className="space-y-3">
          {data.futureDirections?.map((dir, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{dir.direction}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <strong className="text-slate-700">Recommended Method:</strong>{' '}
                    {dir.recommendedApproach}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0 border border-blue-200/60 self-start sm:self-auto">
                Next-generation Study
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
