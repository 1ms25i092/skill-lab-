import React, { useState } from 'react';
import {
  ListTree,
  ChevronDown,
  ChevronRight,
  BookOpen,
  HelpCircle,
  CheckCircle,
  Lightbulb,
  Maximize2,
  FileEdit,
  Layers,
  Clock,
  Sparkles,
} from 'lucide-react';
import { OutlineSection } from '../types/research';

interface OutlineViewProps {
  sections: OutlineSection[];
  onExpandSectionGuide: (section: OutlineSection) => void;
}

export const OutlineView: React.FC<OutlineViewProps> = ({ sections, onExpandSectionGuide }) => {
  // Track open sections. Default all open for easy scanning
  const [openSectionIds, setOpenSectionIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach((s) => {
      initial[s.sectionId] = true;
    });
    return initial;
  });

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    sections.forEach((s) => (all[s.sectionId] = true));
    setOpenSectionIds(all);
  };

  const collapseAll = () => {
    setOpenSectionIds({});
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ListTree className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Canonical 6-Section Academic Outline
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Structured standard: Introduction, Literature Review, Methodology, Results, Discussion, Conclusion.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={expandAll}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Sections Accordion */}
      <div className="space-y-4">
        {sections.map((section, sIdx) => {
          const isOpen = !!openSectionIds[section.sectionId];

          return (
            <div
              key={section.sectionId || sIdx}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Section Header */}
              <div
                className={`p-4 md:p-5 flex items-center justify-between cursor-pointer transition select-none ${
                  isOpen ? 'bg-slate-50/80 border-b border-slate-200' : 'hover:bg-slate-50'
                }`}
                onClick={() => toggleSection(section.sectionId)}
              >
                <div className="flex items-center space-x-3.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-serif-academic font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                    {section.sectionNumber || sIdx + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-slate-900">
                        {section.sectionTitle}
                      </h3>
                      {section.estimatedWordCountRatio && (
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full hidden sm:inline-block">
                          ~{section.estimatedWordCountRatio} of paper
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {section.purpose}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExpandSectionGuide(section);
                    }}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                    title="Get paragraph-by-paragraph writing blueprint and sentence starters"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Paragraph Blueprint</span>
                  </button>

                  <div className="p-1 text-slate-400">
                    {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Subsections Content */}
              {isOpen && (
                <div className="p-5 md:p-6 space-y-6">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Section Objective:</strong> {section.purpose}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.subsections?.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-blue-300 transition shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2 mb-2 pb-1.5 border-b border-slate-200/70">
                            <span className="text-xs font-mono font-semibold text-blue-700">
                              {section.sectionNumber}.{subIdx + 1}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {sub.subTitle}
                            </h4>
                          </div>

                          {/* Guiding Questions */}
                          <div className="mb-3">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                              <HelpCircle className="w-3 h-3 text-indigo-500" />
                              <span>Guiding Questions to Answer:</span>
                            </span>
                            <ul className="space-y-1">
                              {sub.guidingQuestions?.map((q, qIdx) => (
                                <li key={qIdx} className="text-xs text-slate-700 flex items-start space-x-1.5">
                                  <span className="text-blue-500 font-bold shrink-0">•</span>
                                  <span>{q}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Components */}
                          <div className="mb-3">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span>Core Elements to Include:</span>
                            </span>
                            <ul className="space-y-1">
                              {sub.keyComponentsToInclude?.map((comp, cIdx) => (
                                <li key={cIdx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                                  <span className="text-emerald-500 shrink-0">✓</span>
                                  <span>{comp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Writing Tip */}
                        {sub.writingTip && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-md flex items-start space-x-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Academic Tip:</strong> {sub.writingTip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
