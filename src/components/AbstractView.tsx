import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Tag,
  BookOpen,
  Sparkles,
  Quote,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AbstractData } from '../types/research';

interface AbstractViewProps {
  data: AbstractData;
  paperTitle: string;
}

export const AbstractView: React.FC<AbstractViewProps> = ({ data, paperTitle }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'paragraph' | 'structured'>('paragraph');

  const handleCopyAbstract = () => {
    const textToCopy = `${paperTitle}\n\nABSTRACT\n${data.fullParagraph}\n\nKeywords: ${data.keywords.join(', ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = data.fullParagraph
    ? data.fullParagraph.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">Academic Abstract & Keywords</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standard peer-review format synthesizing Background, Objectives, Methodology, Findings, and Significance.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-medium">
            <button
              onClick={() => setViewMode('paragraph')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'paragraph'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard Paragraph
            </button>
            <button
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'structured'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Structured Components
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyAbstract}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Abstract</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'paragraph' ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-700">
              Abstract Manuscript Preview
            </span>
            <div className="flex items-center space-x-3">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                {wordCount} words
              </span>
              <span className="text-slate-400">• Recommended: 200–250 words</span>
            </div>
          </div>

          <div className="relative pl-6 border-l-4 border-blue-500 py-1">
            <Quote className="w-5 h-5 text-blue-300 absolute -left-2.5 -top-3 bg-white" />
            <p className="text-slate-800 font-serif-academic text-base md:text-lg leading-relaxed text-justify">
              {data.fullParagraph}
            </p>
          </div>

          {/* Keywords */}
          <div className="mt-8 pt-5 border-t border-slate-200">
            <div className="flex items-center space-x-2 mb-2.5">
              <Tag className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Indexed Keywords (5–7 descriptors)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keywords?.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Structured Component Breakdown */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              1. Background & Context
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">{data.background}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
              2. Research Objective & Purpose
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">{data.objective}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
              3. Proposed Methodology
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">{data.proposedMethodology}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
              4. Anticipated / Indicated Findings
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">{data.anticipatedFindings}</p>
          </div>

          <div className="md:col-span-2 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
              5. Academic Significance & Practical Value
            </span>
            <p className="text-sm text-slate-900 leading-relaxed">{data.significance}</p>
          </div>
        </div>
      )}
    </div>
  );
};
