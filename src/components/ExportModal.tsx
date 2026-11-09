import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Printer,
  Sparkles,
  Layers,
  BookOpen,
} from 'lucide-react';
import { ResearchPlan, LiteratureSynthesisResult } from '../types/research';

interface ExportModalProps {
  plan: ResearchPlan;
  synthesisResult: LiteratureSynthesisResult | null;
  onClose: () => void;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  plan,
  synthesisResult,
  onClose,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    let md = `# ${plan.topicSummary.title}\n\n`;
    md += `**Academic Discipline:** ${plan.topicSummary.field || 'General'}\n`;
    md += `**Research Level:** ${plan.topicSummary.level || 'Undergraduate'}\n`;
    md += `**Scope:** ${plan.topicSummary.conciseScope}\n\n`;

    md += `---\n\n`;
    md += `## 1. Abstract\n\n`;
    md += `${plan.abstract.fullParagraph}\n\n`;
    md += `**Keywords:** ${plan.abstract.keywords.join(', ')}\n\n`;

    md += `---\n\n`;
    md += `## 2. Research Questions & Methodological Direction\n\n`;
    md += `### Primary Research Question\n> ${plan.researchQuestions.primaryQuestion}\n\n`;
    md += `**Core Research Direction:** ${plan.researchQuestions.primaryResearchDirection}\n\n`;
    md += `**Proposed Methodology:** ${plan.researchQuestions.possibleMethodology}\n\n`;

    if (plan.researchQuestions.subQuestions?.length > 0) {
      md += `### Sub-Questions\n`;
      plan.researchQuestions.subQuestions.forEach((sq, i) => {
        md += `${i + 1}. **[${sq.questionType.toUpperCase()}]** ${sq.question}\n   *Rationale:* ${sq.rationale}\n`;
      });
      md += `\n`;
    }

    if (plan.researchQuestions.hypothesesOrObjectives?.length > 0) {
      md += `### Hypotheses & Core Objectives\n`;
      plan.researchQuestions.hypothesesOrObjectives.forEach((h, i) => {
        md += `- **${h.type}:** ${h.statement}\n`;
      });
      md += `\n`;
    }

    md += `---\n\n`;
    md += `## 3. Canonical Structured Outline\n\n`;
    plan.structuredOutline.forEach((sec) => {
      md += `### ${sec.sectionNumber}. ${sec.sectionTitle}\n`;
      md += `*Purpose:* ${sec.purpose}\n\n`;
      sec.subsections.forEach((sub, subIdx) => {
        md += `#### ${sec.sectionNumber}.${subIdx + 1} ${sub.subTitle}\n`;
        md += `**Guiding Questions:**\n`;
        sub.guidingQuestions.forEach((q) => (md += `- ${q}\n`));
        md += `**Key Components:**\n`;
        sub.keyComponentsToInclude.forEach((c) => (md += `- ${c}\n`));
        if (sub.writingTip) {
          md += `*Tip:* ${sub.writingTip}\n`;
        }
        md += `\n`;
      });
    });

    md += `---\n\n`;
    md += `## 4. Identified Research Gaps & Future Directions\n\n`;
    plan.researchGapsAndFutureDirections.identifiedGaps.forEach((gap, i) => {
      md += `### Gap ${i + 1}: ${gap.title} (${gap.gapType})\n`;
      md += `${gap.description}\n\n`;
      md += `*Student Opportunity:* ${gap.opportunityForStudent}\n\n`;
    });

    md += `### Recommended Future Inquiries\n`;
    plan.researchGapsAndFutureDirections.futureDirections.forEach((f, i) => {
      md += `${i + 1}. **${f.direction}** — Approach: ${f.recommendedApproach}\n`;
    });
    md += `\n`;

    if (synthesisResult) {
      md += `---\n\n`;
      md += `## 5. Literature Review Synthesis (User Sources)\n\n`;
      md += `### Synthesis Overview\n${synthesisResult.synthesisOverview}\n\n`;
      md += `### Draft Literature Review Narrative\n${synthesisResult.draftLiteratureReviewSection}\n\n`;
    }

    md += `---\n*Generated via ResearchMate – AI Research Paper Assistant*\n`;
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.topicSummary.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_research_plan.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDoc = () => {
    const md = generateMarkdown();
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${plan.topicSummary.title}</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; margin: 1in; }
        h1 { font-size: 18pt; text-align: center; }
        h2 { font-size: 14pt; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
        h3 { font-size: 12pt; }
        blockquote { font-style: italic; margin-left: 20px; }
      </style>
      </head>
      <body>
        <pre style="white-space: pre-wrap; font-family: 'Times New Roman', serif;">${md}</pre>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.topicSummary.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_manuscript_plan.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-semibold text-white">
              Export Research Manuscript Plan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Download your comprehensive research blueprint formatted for academic markdown editors (Obsidian, Notion, VS Code) or word processors (Microsoft Word, Google Docs).
          </p>

          <div className="space-y-3">
            {/* Download Markdown */}
            <button
              onClick={handleDownloadMarkdown}
              className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-xs">
                  .MD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Download Markdown Blueprint (.md)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Includes headers, quotes, bullet checklists, and abstract
                  </p>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            </button>

            {/* Download Word Document */}
            <button
              onClick={handleDownloadDoc}
              className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                  .DOC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Download Word Document (.doc)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Compatible with Microsoft Word, LibreOffice & Google Docs
                  </p>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
            </button>

            {/* Print Formatted Manuscript */}
            <button
              onClick={() => {
                onClose();
                setTimeout(onPrint, 250);
              }}
              className="w-full p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Print / Save as PDF
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Printer-optimized academic styling with page layout
                  </p>
                </div>
              </div>
              <Printer className="w-4 h-4 text-slate-400" />
            </button>

            {/* Copy to Clipboard */}
            <button
              onClick={handleCopyMarkdown}
              className="w-full p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {copied ? 'Copied to Clipboard!' : 'Copy Entire Markdown to Clipboard'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Paste directly into your research notes or drafting app
                  </p>
                </div>
              </div>
              {copied ? (
                <span className="text-xs font-bold text-emerald-600">Copied</span>
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
