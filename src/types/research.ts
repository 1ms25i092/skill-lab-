export type AcademicField =
  | 'Computer Science & AI'
  | 'Economics & Business'
  | 'Medicine & Health'
  | 'Environmental Science'
  | 'Social Sciences'
  | 'Education'
  | 'Engineering & Technology'
  | 'Humanities & History'
  | 'Psychology & Behavioral Sciences'
  | 'Law & Public Policy'
  | 'Interdisciplinary';

export type ResearchLevel =
  | 'Undergraduate'
  | "Master's Thesis"
  | 'PhD / Dissertation'
  | 'Term Paper / Capstone'
  | 'High School / AP Capstone';

export type MethodologicalPreference =
  | 'Recommended Standard'
  | 'Empirical Quantitative'
  | 'Qualitative In-depth'
  | 'Mixed Methods (Convergent/Sequential)'
  | 'Systematic Review / Meta-Synthesis'
  | 'Experimental / Laboratory Benchmarking';

export interface SubQuestion {
  question: string;
  rationale: string;
  questionType: 'empirical' | 'theoretical' | 'methodological';
}

export interface HypothesisOrObjective {
  type: string;
  statement: string;
}

export interface MethodologyDetails {
  design: string;
  targetPopulationOrDataset?: string;
  dataCollection?: string;
  analyticalApproach: string;
  potentialLimitations?: string;
}

export interface ResearchQuestionsData {
  primaryQuestion: string;
  subQuestions: SubQuestion[];
  hypothesesOrObjectives: HypothesisOrObjective[];
  primaryResearchDirection: string;
  possibleMethodology: string;
  methodologyDetails?: MethodologyDetails;
}

export interface OutlineSubsection {
  subTitle: string;
  guidingQuestions: string[];
  keyComponentsToInclude: string[];
  writingTip?: string;
}

export interface OutlineSection {
  sectionId: string;
  sectionNumber: number;
  sectionTitle: string;
  purpose: string;
  estimatedWordCountRatio?: string;
  subsections: OutlineSubsection[];
}

export interface AbstractData {
  background: string;
  objective: string;
  proposedMethodology: string;
  anticipatedFindings: string;
  significance: string;
  fullParagraph: string;
  keywords: string[];
}

export interface IdentifiedGap {
  gapType: 'Methodological' | 'Empirical / Data' | 'Contextual / Geographic' | 'Theoretical' | string;
  title: string;
  description: string;
  opportunityForStudent: string;
}

export interface FutureDirection {
  direction: string;
  recommendedApproach: string;
}

export interface ResearchGapsData {
  identifiedGaps: IdentifiedGap[];
  futureDirections: FutureDirection[];
}

export interface TopicSummary {
  title: string;
  conciseScope: string;
  field?: string;
  level?: string;
}

export interface ResearchPlan {
  topicSummary: TopicSummary;
  researchQuestions: ResearchQuestionsData;
  structuredOutline: OutlineSection[];
  abstract: AbstractData;
  researchGapsAndFutureDirections: ResearchGapsData;
  academicIntegrityNotice?: string;
}

// Literature review source & synthesis types
export interface UserSourceItem {
  id: string;
  title: string;
  authors: string;
  year: string;
  content: string;
  doiOrUrl?: string;
}

export interface ThematicCluster {
  themeName: string;
  description: string;
  involvedSources: string[];
}

export interface LiteratureMatrixRow {
  sourceIdentifier: string;
  coreContribution: string;
  methodologyUsed: string;
  keyFindings: string;
  limitationsNoted?: string;
}

export interface LiteratureSynthesisResult {
  synthesisOverview: string;
  thematicClusters: ThematicCluster[];
  literatureMatrix: LiteratureMatrixRow[];
  consensusPoints: string[];
  debatesAndContradictions: string[];
  draftLiteratureReviewSection: string;
  literatureGapsIdentified?: string[];
}

export interface ParagraphPlanItem {
  paragraphNumber: number;
  focus: string;
  contentToInclude: string;
  recommendedEvidence?: string;
}

export interface SectionExpansionData {
  sectionTitle: string;
  reviewerExpectations: string;
  stepByStepParagraphPlan: ParagraphPlanItem[];
  academicSentenceStarters: string[];
  checklist: string[];
  commonPitfalls: string[];
}
