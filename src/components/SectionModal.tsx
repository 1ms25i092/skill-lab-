import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  CheckCircle,
  AlertOctagon,
  Copy,
  Check,
  Send,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { OutlineSection, SectionExpansionData } from '../types/research';

interface SectionModalProps {
  section: OutlineSection | null;
  onClose: () => void;
  topic: string;
  academicField: string;
  researchLevel: string;
}

export const SectionModal: React.FC<SectionModalProps> = ({
  section,
  onClose,
  topic,
  academicField,
  researchLevel,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SectionExpansionData | null>(null);
  const [customQuery, setCustomQuery] = useState('');
  const [copiedSentence, setCopiedSentence] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!section) return;
    fetchSectionGuide();
  }, [section]);

  const fetchSectionGuide = async (query = '') => {
    if (!section) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/research/expand-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          sectionTitle: section.sectionTitle,
          researchLevel,
          academicField,
          customQuery: query,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to expand section');
      setData(result.data);
    } catch (err: any) {
      setError(err.message || 'Error expanding section');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySentence = (sentence: string) => {
    navigator.clipboard.writeText(sentence);
    setCopiedSentence(sentence);
    setTimeout(() => setCopiedSentence(null), 2000);
  };

  if (!section) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 font-bold flex items-center justify-center text-sm">
              {section.sectionNumber}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                  Section Drafting Blueprint
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300">{researchLevel}</span>
              </div>
              <h2 className="text-lg font-serif-academic font-medium text-white">
                {section.sectionTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 flex-1">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-700">
                Formulating paragraph-by-paragraph drafting blueprint...
              </p>
              <p className="text-xs text-slate-400">
                Analyzing reviewer expectations and sentence starter templates for {section.sectionTitle}
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              <p className="font-semibold mb-1">Unable to load drafting blueprint</p>
              <p className="text-xs">{error}</p>
              <button
                onClick={() => fetchSectionGuide(customQuery)}
                className="mt-3 text-xs px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-md font-medium"
              >
                Retry
              </button>
            </div>
          ) : data ? (
            <>
              {/* Reviewer Expectations */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block mb-1">
                  What Reviewers & Professors Look For:
                </span>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {data.reviewerExpectations}
                </p>
              </div>

              {/* Step-by-Step Paragraph Plan */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Paragraph-by-Paragraph Execution Plan</span>
                </h3>

                <div className="space-y-3">
                  {data.stepByStepParagraphPlan?.map((item) => (
                    <div
                      key={item.paragraphNumber}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                          Paragraph {item.paragraphNumber}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{item.focus}</h4>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-1.5">
                        {item.contentToInclude}
                      </p>
                      {item.recommendedEvidence && (
                        <p className="text-[11px] text-slate-500 italic">
                          <strong className="text-slate-600">Expected Evidence:</strong>{' '}
                          {item.recommendedEvidence}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Sentence Starters */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Academic Sentence Starters & Scholarly Connectors</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.academicSentenceStarters?.map((starter, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => handleCopySentence(starter)}
                      className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg text-xs text-slate-800 flex items-center justify-between cursor-pointer transition group"
                    >
                      <span className="font-serif-academic text-slate-900 italic">
                        "{starter}"
                      </span>
                      <span className="text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2">
                        {copiedSentence === starter ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist & Pitfalls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Checklist */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Submission Checklist</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {data.checklist?.map((chk, cIdx) => (
                      <li key={cIdx} className="text-xs text-emerald-950 flex items-start space-x-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Pitfalls */}
                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center space-x-1">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                    <span>Common Student Pitfalls to Avoid</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {data.commonPitfalls?.map((pit, pIdx) => (
                      <li key={pIdx} className="text-xs text-rose-950 flex items-start space-x-1.5">
                        <span className="text-rose-500 font-bold">×</span>
                        <span>{pit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer / Refinement Prompt */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center space-x-2">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchSectionGuide(customQuery)}
            placeholder="Ask specific question for this section (e.g. 'How to structure regression table discussion?')..."
            className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
          <button
            onClick={() => fetchSectionGuide(customQuery)}
            disabled={loading}
            className="px-3.5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-2xs transition flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Refine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
