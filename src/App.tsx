import React, { useState } from 'react';
import {
  HelpCircle,
  ListTree,
  FileText,
  Compass,
  BookOpen,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Download,
  Printer,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Header } from './components/Header';
import { DashboardForm } from './components/DashboardForm';
import { ResearchQuestionsView } from './components/ResearchQuestionsView';
import { OutlineView } from './components/OutlineView';
import { AbstractView } from './components/AbstractView';
import { ResearchGapsView } from './components/ResearchGapsView';
import { LiteratureAssistantView } from './components/LiteratureAssistantView';
import { SectionModal } from './components/SectionModal';
import { ExportModal } from './components/ExportModal';
import {
  ResearchPlan,
  AcademicField,
  ResearchLevel,
  MethodologicalPreference,
  OutlineSection,
  UserSourceItem,
  LiteratureSynthesisResult,
} from './types/research';
import { PRESET_TOPICS } from './data/samples';

type ActiveTab = 'questions' | 'outline' | 'abstract' | 'gaps' | 'literature';

export default function App() {
  const [plan, setPlan] = useState<ResearchPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('questions');

  // Form State Saved for references & refinement
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentField, setCurrentField] = useState<AcademicField>('Education');
  const [currentLevel, setCurrentLevel] = useState<ResearchLevel>('Undergraduate');

  // Literature Review Sources & Synthesis state
  const [userSources, setUserSources] = useState<UserSourceItem[]>([]);
  const [synthesisResult, setSynthesisResult] = useState<LiteratureSynthesisResult | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Modals
  const [activeExpandedSection, setActiveExpandedSection] = useState<OutlineSection | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Generate complete research plan
  const handleGeneratePlan = async (params: {
    topic: string;
    academicField: AcademicField;
    researchLevel: ResearchLevel;
    methodologicalPreference: MethodologicalPreference;
    targetPaperType: string;
    additionalContext: string;
    presetSources?: UserSourceItem[];
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentTopic(params.topic);
    setCurrentField(params.academicField);
    setCurrentLevel(params.researchLevel);

    if (params.presetSources && params.presetSources.length > 0) {
      setUserSources(params.presetSources);
      setSynthesisResult(null);
    }

    try {
      const response = await fetch('/api/research/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to formulate academic research plan.');
      }

      setPlan(json.data);
      setActiveTab('questions');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'An unexpected error occurred while generating the research plan.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Synthesize user-provided sources for literature review
  const handleSynthesizeLiterature = async (sourcesToSynthesize: UserSourceItem[]) => {
    if (!sourcesToSynthesize || sourcesToSynthesize.length === 0) return;
    setIsSynthesizing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/research/synthesize-literature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic || plan?.topicSummary.title || 'Academic Research',
          academicField: currentField || plan?.topicSummary.field || 'General',
          sources: sourcesToSynthesize,
          focusQuestion: plan?.researchQuestions.primaryQuestion,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to synthesize literature sources.');
      }

      setSynthesisResult(json.data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Error occurred while synthesizing literature review sources.'
      );
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleLoadPresetSources = () => {
    // Check if current topic matches any preset, or load preset 1
    const match = PRESET_TOPICS.find((p) => p.topic === currentTopic) || PRESET_TOPICS[0];
    if (match.sampleSources) {
      setUserSources(match.sampleSources);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setUserSources([]);
    setSynthesisResult(null);
    setErrorMessage(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Application Header */}
      <Header
        plan={plan}
        onReset={handleReset}
        onOpenExport={() => setShowExportModal(true)}
        onPrint={handlePrint}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <strong className="font-semibold block mb-0.5">Generation Notice</strong>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-red-600 hover:text-red-900 font-medium ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Form */}
        <div className="no-print">
          <DashboardForm onGeneratePlan={handleGeneratePlan} isLoading={isLoading} />
        </div>

        {/* Loading Skeleton during plan generation */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs space-y-5 animate-pulse no-print">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <GraduationCap className="w-6 h-6 animate-bounce" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-serif-academic font-medium text-slate-900">
                Formulating Academic Research Architecture...
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Applying few-shot academic reasoning, developing empirical research questions, structuring the
                canonical 6-section outline, and mapping verified literature boundaries.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-medium text-blue-700">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Connecting to Gemini Academic Engine</span>
            </div>
          </div>
        )}

        {/* Generated Plan Workspace */}
        {plan && !isLoading && (
          <div className="space-y-6">
            {/* Academic Navigation Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-xs flex flex-wrap items-center gap-1.5 no-print">
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'questions'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>1. Research Questions</span>
              </button>

              <button
                onClick={() => setActiveTab('outline')}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'outline'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ListTree className="w-4 h-4" />
                <span>2. Structured Outline</span>
              </button>

              <button
                onClick={() => setActiveTab('abstract')}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'abstract'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>3. Abstract</span>
              </button>

              <button
                onClick={() => setActiveTab('gaps')}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'gaps'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>4. Research Gaps</span>
              </button>

              <button
                onClick={() => setActiveTab('literature')}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'literature'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-indigo-800 hover:text-indigo-950 bg-indigo-50/60 hover:bg-indigo-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>5. Literature Assistant</span>
                {userSources.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-mono">
                    {userSources.length}
                  </span>
                )}
              </button>
            </div>

            {/* Active Tab Views */}
            <div className="transition-all duration-200">
              {activeTab === 'questions' && (
                <ResearchQuestionsView
                  data={plan.researchQuestions}
                  summary={plan.topicSummary}
                />
              )}

              {activeTab === 'outline' && (
                <OutlineView
                  sections={plan.structuredOutline}
                  onExpandSectionGuide={(sec) => setActiveExpandedSection(sec)}
                />
              )}

              {activeTab === 'abstract' && (
                <AbstractView
                  data={plan.abstract}
                  paperTitle={plan.topicSummary.title}
                />
              )}

              {activeTab === 'gaps' && (
                <ResearchGapsView data={plan.researchGapsAndFutureDirections} />
              )}

              {activeTab === 'literature' && (
                <LiteratureAssistantView
                  topic={plan.topicSummary.title}
                  academicField={plan.topicSummary.field || currentField}
                  sources={userSources}
                  onUpdateSources={setUserSources}
                  synthesisResult={synthesisResult}
                  onSynthesize={handleSynthesizeLiterature}
                  isSynthesizing={isSynthesizing}
                  onLoadPresetSources={handleLoadPresetSources}
                />
              )}
            </div>

            {/* Academic Integrity Notice Footer */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Academic Integrity Guard:</strong> ResearchMate provides research directions and outlines.
                  It will not fabricate fake citations or phantom authors. Use the Literature Assistant to synthesize real articles you provide.
                </span>
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="text-blue-600 hover:text-blue-800 font-semibold shrink-0 inline-flex items-center space-x-1"
              >
                <span>Export Complete Blueprint</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="font-serif-academic text-sm text-slate-200 font-medium">
              ResearchMate
            </span>
            <span>— AI Research Paper Assistant for Collegiate Scholarship</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>•</span>
            <span>APA / IEEE / Chicago Aligned</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeExpandedSection && (
        <SectionModal
          section={activeExpandedSection}
          onClose={() => setActiveExpandedSection(null)}
          topic={plan?.topicSummary.title || currentTopic}
          academicField={plan?.topicSummary.field || currentField}
          researchLevel={plan?.topicSummary.level || currentLevel}
        />
      )}

      {showExportModal && plan && (
        <ExportModal
          plan={plan}
          synthesisResult={synthesisResult}
          onClose={() => setShowExportModal(false)}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
}
