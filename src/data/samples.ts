import { AcademicField, ResearchLevel, MethodologicalPreference, UserSourceItem } from '../types/research';

export interface PresetTopic {
  label: string;
  topic: string;
  field: AcademicField;
  level: ResearchLevel;
  methodology: MethodologicalPreference;
  context: string;
  sampleSources?: UserSourceItem[];
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    label: 'AI in Education (Required Example 1)',
    topic: 'Impact of artificial intelligence on education',
    field: 'Education',
    level: 'Undergraduate',
    methodology: 'Empirical Quantitative',
    context: 'Focus on AI-assisted learning tools and their observable effects on undergraduate student academic performance.',
    sampleSources: [
      {
        id: 'source-1',
        title: 'Evaluating the Efficacy of Generative AI Tutoring in College Introductory Courses',
        authors: 'Chen, H., & Martinez, K.',
        year: '2024',
        content:
          'This experimental study examined 240 undergraduate students across two semesters. Half utilized an AI-assisted adaptive tutor for homework problem-solving, while the control group utilized traditional static textbook exercises. Results showed a 12% statistically significant improvement in midterm exam scores for the AI-assisted cohort, with the largest gains observed among initially lower-performing students. However, no difference was found in long-term conceptual retention after 8 weeks.',
      },
      {
        id: 'source-2',
        title: 'Cognitive Offloading and Academic Dependency in AI-Integrated Classrooms',
        authors: 'Livingston, R., & Zhao, Y.',
        year: '2023',
        content:
          'A qualitative and survey-based investigation of 180 university seniors. The authors reported that while AI tools accelerate task completion by 35%, over 42% of participants demonstrated reduced depth of independent critical synthesis, relying on AI-generated summaries rather than original source materials. The study cautions against unguided adoption without explicit meta-cognitive scaffolding.',
      },
      {
        id: 'source-3',
        title: 'Pedagogical Integration of Large Language Models: A Mixed-Methods Faculty Perspective',
        authors: 'Patel, S., & O’Connor, M.',
        year: '2024',
        content:
          'Surveyed 95 higher education faculty members and analyzed course syllabi across 12 universities. Findings revealed broad institutional disparity: 38% incorporated proactive AI literacy modules, while 44% enforced strict prohibition policies. The authors propose an active-learning framework where AI serves as a formative feedback partner rather than an answer oracle.',
      },
    ],
  },
  {
    label: 'Renewable Energy in India (Required Example 2)',
    topic: 'Renewable energy adoption in India',
    field: 'Environmental Science',
    level: 'Undergraduate',
    methodology: 'Mixed Methods (Convergent/Sequential)',
    context: 'Examine economic, technological, and policy-related barriers to grid-scale solar and wind integration across Indian states.',
    sampleSources: [
      {
        id: 're-1',
        title: 'Grid Parity and Infrastructure Bottlenecks in India’s Solar Expansion',
        authors: 'Sharma, A., & Gupta, V.',
        year: '2023',
        content:
          'Analyzed central electricity authority dispatch data and tariff trends across 6 high-solar Indian states between 2018 and 2023. Although generation tariffs reached record lows (< INR 2.5/kWh), state DISCOM financial distress and interstate transmission corridor congestion delayed project commissioning by an average of 14 months.',
      },
      {
        id: 're-2',
        title: 'Policy Frameworks and Renewable Purchase Obligations: A Comparative State Analysis',
        authors: 'Rao, K., & Sundaram, P.',
        year: '2024',
        content:
          'Assessed the compliance rates of Renewable Purchase Obligations (RPO) across 15 Indian state electricity regulatory commissions. Discovered wide enforcement variance: compliance exceeded 90% in Gujarat and Karnataka, but lagged below 55% in northern and eastern states due to lack of stringent penalization mechanisms.',
      },
      {
        id: 're-3',
        title: 'Decentralized Solar Microgrids in Rural Communities: Socio-Economic Impact and Battery Degradation',
        authors: 'Banerjee, D., & Thorne, J.',
        year: '2024',
        content:
          'Conducted field interviews and technical logging across 40 rural mini-grids in Bihar and Odisha. While household lighting and small enterprise productivity rose significantly, battery replacement costs at year 4 posed severe financial sustainability threats without ongoing subsidy structures.',
      },
    ],
  },
  {
    label: 'Microplastics in Freshwater Ecosystems',
    topic: 'Microplastic contamination in urban freshwater reservoirs',
    field: 'Environmental Science',
    level: "Master's Thesis",
    methodology: 'Empirical Quantitative',
    context: 'Assess particle concentration, polymer types, and bioaccumulation indicators in urban watersheds.',
  },
  {
    label: 'Remote Work & Organizational Trust',
    topic: 'The impact of asynchronous remote work on team trust and innovation',
    field: 'Economics & Business',
    level: 'Undergraduate',
    methodology: 'Qualitative In-depth',
    context: 'Examine communication rhythms, psychological safety, and knowledge transfer among knowledge workers.',
  },
];
