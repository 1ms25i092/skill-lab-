import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Sparkles,
  Table,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  RotateCcw,
  Layers,
  ArrowRight,
  Split,
  Search,
} from 'lucide-react';
import { UserSourceItem, LiteratureSynthesisResult } from '../types/research';

interface LiteratureAssistantViewProps {
  topic: string;
  academicField: string;
  sources: UserSourceItem[];
  onUpdateSources: (sources: UserSourceItem[]) => void;
  synthesisResult: LiteratureSynthesisResult | null;
  onSynthesize: (sources: UserSourceItem[]) => void;
  isSynthesizing: boolean;
  onLoadPresetSources?: () => void;
}

export const LiteratureAssistantView: React.FC<LiteratureAssistantViewProps> = ({
  topic,
  academicField,
  sources,
  onUpdateSources,
  synthesisResult,
  onSynthesize,
  isSynthesizing,
  onLoadPresetSources,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newContent, setNewContent] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newSource: UserSourceItem = {
      id: `source-${Date.now()}`,
      title: newTitle.trim() || `Source #${sources.length + 1}`,
      authors: newAuthors.trim() || 'Author(s) specified in text',
      year: newYear.trim() || new Date().getFullYear().toString(),
      content: newContent.trim(),
    };

    onUpdateSources([...sources, newSource]);
    setNewTitle('');
    setNewAuthors('');
    setNewYear('');
    setNewContent('');
    setShowAddForm(false);
  };

  const handleRemoveSource = (id: string) => {
    onUpdateSources(sources.filter((s) => s.id !== id));
  };

  const handleCopyDraft = () => {
    if (!synthesisResult?.draftLiteratureReviewSection) return;
    navigator.clipboard.writeText(synthesisResult.draftLiteratureReviewSection);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Literature Review Assistant & Source Synthesizer
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provide paper abstracts, excerpts, or reading notes. AI extracts themes, builds a synthesis matrix,
            identifies consensus & debates, and drafts the literature review without hallucinating false citations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {onLoadPresetSources && sources.length === 0 && (
            <button
              onClick={onLoadPresetSources}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Load Benchmark Sources</span>
            </button>
          )}

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 shadow-2xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Source or Abstract</span>
          </button>
        </div>
      </div>

      {/* Add Source Drawer / Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSource}
          className="bg-indigo-50/40 border-2 border-indigo-200 rounded-xl p-5 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-950 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Add Real Paper Abstract, Excerpt, or Study Notes</span>
            </h3>
            <span className="text-[11px] text-slate-500">
              Strictly grounded: only real information you provide will be analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paper / Book / Report Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Evaluating the Efficacy of AI Tutoring in College Courses"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Publication Year
              </label>
              <input
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="e.g., 2024"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Author(s)
            </label>
            <input
              type="text"
              value={newAuthors}
              onChange={(e) => setNewAuthors(e.target.value)}
              placeholder="e.g., Chen, H., & Martinez, K."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Abstract Text, Key Findings, or Direct Excerpts <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Paste the paper abstract, methodology description, sample size, or key statistical conclusions..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-2xs"
            >
              Save Source to Project
            </button>
          </div>
        </form>
      )}

      {/* Provided Sources List */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-slate-900">
              Provided Source Materials
            </span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
              {sources.length} {sources.length === 1 ? 'source' : 'sources'} loaded
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {sources.length > 0 && (
              <button
                onClick={() => onSynthesize(sources)}
                disabled={isSynthesizing}
                className={`inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-xs transition ${
                  isSynthesizing
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] cursor-pointer'
                }`}
              >
                {isSynthesizing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Synthesizing Literature Matrix...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Synthesize Literature Review</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {sources.length === 0 ? (
          <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-xl p-6">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-slate-800 mb-1">
              No literature sources provided yet
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Add paper abstracts, research articles, or notes you have collected. ResearchMate will analyze their
              connections, construct a synthesis matrix, and draft your literature review.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your First Abstract</span>
              </button>
              {onLoadPresetSources && (
                <button
                  onClick={onLoadPresetSources}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Load Benchmark Sample Sources</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((src, idx) => (
              <div
                key={src.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      Ref #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveSource(src.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                      title="Remove source"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">
                    {src.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2">
                    {src.authors} ({src.year})
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {src.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Synthesis Results Section */}
      {synthesisResult && (
        <div className="space-y-6 pt-2">
          {/* Executive Synthesis Summary */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-md border border-indigo-950">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">
              Executive Scholarly Synthesis
            </span>
            <p className="text-sm md:text-base text-slate-100 font-serif-academic leading-relaxed">
              {synthesisResult.synthesisOverview}
            </p>
          </div>

          {/* Thematic Clusters */}
          {synthesisResult.thematicClusters?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Thematic Clusters Identified Across Provided Sources</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {synthesisResult.thematicClusters.map((cluster, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs"
                  >
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                      Theme {cIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">{cluster.themeName}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {cluster.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.involvedSources?.map((sName, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md"
                        >
                          {sName}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side-by-side Literature Matrix Table */}
          {synthesisResult.literatureMatrix?.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Table className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Comparative Literature Matrix
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  Side-by-side methodology and empirical outcomes
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Source Identifier</th>
                      <th className="py-3 px-4">Core Contribution</th>
                      <th className="py-3 px-4">Methodology Used</th>
                      <th className="py-3 px-4">Key Empirical Findings</th>
                      <th className="py-3 px-4">Limitations Noted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {synthesisResult.literatureMatrix.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 font-semibold text-slate-900 align-top max-w-[160px]">
                          {row.sourceIdentifier}
                        </td>
                        <td className="py-3 px-4 align-top leading-relaxed max-w-[200px]">
                          {row.coreContribution}
                        </td>
                        <td className="py-3 px-4 align-top text-blue-700 font-medium max-w-[160px]">
                          {row.methodologyUsed || 'Not specified'}
                        </td>
                        <td className="py-3 px-4 align-top leading-relaxed max-w-[220px]">
                          {row.keyFindings}
                        </td>
                        <td className="py-3 px-4 align-top text-slate-500 italic max-w-[180px]">
                          {row.limitationsNoted || 'None explicitly reported'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Consensus vs Debates / Contradictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Consensus */}
            <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center space-x-2 text-emerald-800 font-semibold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Points of Scholarly Consensus</span>
              </div>
              <ul className="space-y-2">
                {synthesisResult.consensusPoints?.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs text-emerald-950 flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Debates & Contradictions */}
            <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-800 font-semibold text-sm mb-3">
                <Split className="w-4 h-4 text-amber-600" />
                <span>Points of Divergence & Academic Debate</span>
              </div>
              <ul className="space-y-2">
                {synthesisResult.debatesAndContradictions?.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs text-amber-950 flex items-start space-x-2">
                    <span className="text-amber-600 font-bold shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Synthesized Literature Review Draft Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Synthesized Literature Review Draft Section
                </h3>
              </div>
              <button
                onClick={handleCopyDraft}
                className="inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Draft Paragraphs</span>
                  </>
                )}
              </button>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-sm md:text-base font-serif-academic text-slate-800 leading-relaxed whitespace-pre-line text-justify">
                {synthesisResult.draftLiteratureReviewSection}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Properly attributed strictly to your loaded source texts without synthetic bibliographies.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
