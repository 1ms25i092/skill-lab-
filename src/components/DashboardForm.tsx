import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Layers,
  GraduationCap,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Info,
  Lightbulb,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import {
  AcademicField,
  ResearchLevel,
  MethodologicalPreference,
  UserSourceItem,
} from '../types/research';
import { PRESET_TOPICS, PresetTopic } from '../data/samples';

interface DashboardFormProps {
  onGeneratePlan: (params: {
    topic: string;
    academicField: AcademicField;
    researchLevel: ResearchLevel;
    methodologicalPreference: MethodologicalPreference;
    targetPaperType: string;
    additionalContext: string;
    presetSources?: UserSourceItem[];
  }) => void;
  isLoading: boolean;
}

const ACADEMIC_FIELDS: AcademicField[] = [
  'Education',
  'Environmental Science',
  'Computer Science & AI',
  'Economics & Business',
  'Medicine & Health',
  'Social Sciences',
  'Engineering & Technology',
  'Humanities & History',
  'Psychology & Behavioral Sciences',
  'Law & Public Policy',
  'Interdisciplinary',
];

const RESEARCH_LEVELS: { value: ResearchLevel; label: string; desc: string }[] = [
  { value: 'Undergraduate', label: 'Undergraduate', desc: 'Senior thesis, capstone project, or independent study' },
  { value: "Master's Thesis", label: "Master's Thesis", desc: 'Advanced methodology, comprehensive literature review' },
  { value: 'PhD / Dissertation', label: 'PhD / Dissertation', desc: 'Original contribution to scholarly theory & empirical void' },
  { value: 'Term Paper / Capstone', label: 'Term Paper / Seminar', desc: 'Semester research paper with rigorous academic structure' },
  { value: 'High School / AP Capstone', label: 'AP Capstone / Seminar', desc: 'Inquiry-based foundational academic formulation' },
];

const METHODOLOGY_PREFERENCES: MethodologicalPreference[] = [
  'Recommended Standard',
  'Empirical Quantitative',
  'Qualitative In-depth',
  'Mixed Methods (Convergent/Sequential)',
  'Systematic Review / Meta-Synthesis',
  'Experimental / Laboratory Benchmarking',
];

export const DashboardForm: React.FC<DashboardFormProps> = ({ onGeneratePlan, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [academicField, setAcademicField] = useState<AcademicField>('Education');
  const [researchLevel, setResearchLevel] = useState<ResearchLevel>('Undergraduate');
  const [methodology, setMethodology] = useState<MethodologicalPreference>('Empirical Quantitative');
  const [targetPaperType, setTargetPaperType] = useState('Original Empirical Research Paper');
  const [additionalContext, setAdditionalContext] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);

  const handleApplyPreset = (preset: PresetTopic, index: number) => {
    setTopic(preset.topic);
    setAcademicField(preset.field);
    setResearchLevel(preset.level);
    setMethodology(preset.methodology);
    setAdditionalContext(preset.context);
    setSelectedPresetIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const presetSources =
      selectedPresetIndex !== null && PRESET_TOPICS[selectedPresetIndex]?.sampleSources
        ? PRESET_TOPICS[selectedPresetIndex].sampleSources
        : undefined;

    onGeneratePlan({
      topic: topic.trim(),
      academicField,
      researchLevel,
      methodologicalPreference: methodology,
      targetPaperType,
      additionalContext: additionalContext.trim(),
      presetSources,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Banner introduction */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 text-white relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Collegiate Research Paper Architect</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-academic tracking-tight font-medium text-white mb-2">
            Plan your academic research paper with scholarly precision
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Formulate high-impact research questions, structured canonical outlines, ready-to-use abstracts,
            methodological designs, and synthesize source materials without hallucinated citations.
          </p>
        </div>

        {/* Quick Example Presets */}
        <div className="mt-5 pt-4 border-t border-slate-700/60">
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Prompt Benchmarks & Common Scenarios:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_TOPICS.map((p, idx) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleApplyPreset(p, idx)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition text-left flex items-center space-x-1.5 ${
                  selectedPresetIndex === idx
                    ? 'bg-blue-600/30 border-blue-400 text-white font-medium shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Configuration Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {/* Research Topic Input */}
        <div>
          <label htmlFor="research-topic" className="block text-sm font-semibold text-slate-900 mb-1.5">
            Research Topic or Working Proposal Title <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <textarea
              id="research-topic"
              rows={2}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (selectedPresetIndex !== null && e.target.value !== PRESET_TOPICS[selectedPresetIndex]?.topic) {
                  setSelectedPresetIndex(null);
                }
              }}
              placeholder="e.g., Impact of artificial intelligence on education, or Renewable energy adoption in India..."
              className="w-full px-4 py-3 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base leading-relaxed transition"
              required
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-500 flex items-center space-x-1">
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
            <span>
              Tip: Clear, focused topics yield specific empirical research questions and tailored methodologies.
            </span>
          </p>
        </div>

        {/* Core Dropdowns: Academic Field, Research Level, Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Academic Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Academic Field / Discipline
            </label>
            <div className="relative">
              <select
                value={academicField}
                onChange={(e) => setAcademicField(e.target.value as AcademicField)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium appearance-none pr-8 cursor-pointer shadow-xs"
              >
                {ACADEMIC_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Research Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Academic Research Level
            </label>
            <div className="relative">
              <select
                value={researchLevel}
                onChange={(e) => setResearchLevel(e.target.value as ResearchLevel)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium appearance-none pr-8 cursor-pointer shadow-xs"
              >
                {RESEARCH_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 truncate">
              {RESEARCH_LEVELS.find((l) => l.value === researchLevel)?.desc}
            </p>
          </div>

          {/* Methodological Preference */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Methodological Approach
            </label>
            <div className="relative">
              <select
                value={methodology}
                onChange={(e) => setMethodology(e.target.value as MethodologicalPreference)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium appearance-none pr-8 cursor-pointer shadow-xs"
              >
                {METHODOLOGY_PREFERENCES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Options */}
        <div className="border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Optional Paper Scope & Context Specifications</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Paper Format
                </label>
                <input
                  type="text"
                  value={targetPaperType}
                  onChange={(e) => setTargetPaperType(e.target.value)}
                  placeholder="e.g., Senior Capstone Paper, Journal Article, Seminar Project"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Student Context / Hypotheses / Scope Constraints
                </label>
                <input
                  type="text"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="e.g., Focus on college freshmen, Indian regional grid policies, or specific statistical modeling"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Submission Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Few-shot academic prompting • Rigorous 6-section canonical architecture</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3 rounded-xl font-medium text-sm text-white shadow-md transition ${
              isLoading || !topic.trim()
                ? 'bg-slate-400 cursor-not-allowed opacity-75'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.99] cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Formulating Academic Blueprint...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Research Paper Blueprint</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
