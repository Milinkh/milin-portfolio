// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file, not the components.
// ---------------------------------------------------------------------------

export const NAV = [
  { id: 'header',     n: '01', label: 'Home' },
  { id: 'experience', n: '02', label: 'Experience' },
  { id: 'projects',   n: '03', label: 'Projects' },
  { id: 'about',      n: '04', label: 'About' },
  { id: 'contact',    n: '05', label: 'Contact' },
];

export const EXPERIENCE = [
  {
    date: '2024 — Present',
    role: 'Head of Product',
    where: 'Marble · San Francisco',
    bullets: [
      'Own the product roadmap and backlog end to end, running funnel-wide experimentation with design and engineering to lift conversion 18% and adoption 12% while reducing customer acquisition cost 15% over two quarters.',
      'Synthesized 80+ discovery interviews into user stories and a Figma redesign, and instrumented a KPI dashboard in Claude Code to track AI tutor engagement — cutting time-to-value 35% and growing MRR 40%.',
    ],
  },
  {
    date: '2023 — 2024',
    role: 'Product Strategy Consultant',
    where: 'Blue Diamond Growers · Sacramento',
    bullets: [
      'Led customer discovery across 3,000+ Qualtrics responses, 20 stakeholder interviews, and competitive market analysis to build a $3M go-to-market strategy, presented to senior leadership and delivering 22% growth in product reach.',
      'Developed three product line concepts with positioning, branding, and unit-cost modeling, directing five analysts across Tableau and Google Analytics to reduce projected launch costs 20%.',
    ],
  },
  {
    date: '2021 — 2022',
    role: 'Product Manager',
    where: 'Truffle Shuffle · Oakland',
    bullets: [
      'Analyzed 25,000+ meal-kit customer records from Shopify POS and HubSpot to diagnose churn drivers and define a data-driven retention roadmap.',
      'Launched a three-tiered loyalty program from enterprise and retail customer feedback, raising CSAT from 79% to 92%, saving $120K annually, and acquiring 1,500+ customers in one quarter.',
    ],
  },
  {
    date: '2020 — 2021',
    role: 'Research Assistant',
    where: 'UC Davis DataLab · Davis',
    bullets: [
      'Modeled consumer price elasticity across 500,000 anonymized retail transactions, developing predictive models in Python to forecast demand and retention across 120+ categories and 8 regions.',
      'Queried and maintained the PostgreSQL databases underpinning the research, joining 2.5M+ transactional and demographic records in support of PhD-level work.',
    ],
  },
  {
    date: '2019 — 2020',
    role: 'Data Analyst Intern',
    where: 'Cavium · San Jose',
    bullets: [
      'Validated 1,000+ component records across 20+ PCB products, improving bill-of-materials accuracy for QA teams.',
    ],
  },
];

// NOTE: these three projects are placeholders. Replace with real work before launch.
export const PROJECTS = [
  {
    num: '01 / 03',
    name: 'Sous',
    category: 'AI Cooking Assistant',
    body: [
      "An AI assistant that recommends recipes based on the ingredients already in a user's pantry, then guides them through each step of the cook.",
      'It adapts the recipe in real time when an ingredient is missing, suggesting substitutions or adjusting quantities.',
    ],
    stack: 'React · Node · LLM API · Postgres',
    // a pot with a speech bubble — the assistant that talks back
    art: `
      <path d="M40 6 L86 6 C92 6, 96 10, 96 16 L96 26 C96 32, 92 36, 86 36 L56 36 L46 44 L49 36 L40 36 C34 36, 30 32, 30 26 L30 16 C30 10, 34 6, 40 6 Z"/>
      <circle cx="48" cy="21" r="1.8"/><circle cx="63" cy="21" r="1.8"/><circle cx="78" cy="21" r="1.8"/>
      <path d="M22 62 L28 100 C28 107, 36 110, 60 110 C84 110, 92 107, 92 100 L98 62"/>
      <path d="M16 62 C16 55, 36 50, 60 50 C84 50, 104 55, 104 62 C104 68, 84 72, 60 72 C36 72, 16 68, 16 62 Z"/>
      <path d="M16 74 C7 77, 7 90, 18 90 M104 74 C113 77, 113 90, 102 90"/>`,
  },
  {
    num: '02 / 03',
    name: 'Compass',
    category: 'Research Synthesis',
    body: [
      'A research synthesis tool that clusters user interview transcripts into themes and ranks them by how frequently each problem appears.',
      'Every theme links back to the original quotes it was drawn from, so the supporting evidence stays traceable.',
    ],
    stack: 'Python · LLM API · React',
    // a compass rose
    art: `
      <circle cx="60" cy="60" r="50"/>
      <circle cx="60" cy="60" r="41"/>
      <path d="M60 19 L67 60 L60 101 L53 60 Z"/>
      <path d="M19 60 L60 53 L101 60 L60 67 Z"/>
      <circle cx="60" cy="60" r="4"/>
      <path d="M31 31 L44 44 M89 31 L76 44 M31 89 L44 76 M89 89 L76 76"/>`,
  },
  {
    num: '03 / 03',
    name: 'Northstar',
    category: 'Analytics Dashboard',
    body: [
      'A dashboard that connects to product analytics and generates a written weekly summary of how key metrics moved and what likely drove the change.',
      'It surfaces only statistically meaningful shifts and recommends which metrics to investigate next.',
    ],
    stack: 'Claude Code · SQL · React',
    // the star you steer by, above a rising line
    art: `
      <path d="M60 8 C63 30, 71 38, 93 41 C71 44, 63 52, 60 74 C57 52, 49 44, 27 41 C49 38, 57 30, 60 8 Z"/>
      <path d="M20 100 L44 84 L64 92 L100 62"/>
      <circle cx="20" cy="100" r="2.5"/><circle cx="64" cy="92" r="2.5"/><circle cx="100" cy="62" r="2.5"/>
      <path d="M14 112 L106 112"/>`,
  },
];

export const ABOUT = {
  copy: `I am Milin Khunkhun, a passionate Product Manager with a strong focus on
    <span class="hl">Product Strategy and Artificial Intelligence</span>.
    I enjoy combining rigorous customer discovery with technical fluency to design products
    that are intuitive, data-informed, and built to scale. I thrive on owning the full product
    lifecycle, leading cross-functional teams through ambiguity, and delivering high-quality
    results. Outside of work, I am curious, detail-oriented, and enjoy exploring new
    technologies and methods to expand my knowledge and capabilities.`,
  skills: [
    'Roadmapping', 'User Research', 'A/B Testing', 'AI Integration',
    'Figma', 'SQL', 'Python', 'React', 'Tableau', 'Claude Code',
    'Asana', 'Agile / Scrum',
  ],
  certs: [
    { abbr: 'PMP', full: 'Project Management Professional · PMI',
      sr: 'PMP — Project Management Professional, Project Management Institute' },
    { abbr: 'CSM', full: 'Certified ScrumMaster · Scrum Alliance',
      sr: 'CSM — Certified ScrumMaster, Scrum Alliance' },
  ],
};

// `line` accepts inline HTML — wrap a proper noun in <span class="hl"> for the accent.
export const FACTS = [
  {
    lab: 'Education',
    line: 'Pursuing a Master of Applied Science in Computer Science<br/>at the <span class="hl">University of Pennsylvania</span>',
  },
  {
    lab: 'Currently reading',
    line: "Runnin' Down a Dream by <span class=\"hl\">Bill Gurley</span>",
  },
  {
    lab: 'In the kitchen',
    line: 'Worked the soup station at <span class="hl">Chez Panisse</span>, a historically Michelin-starred restaurant',
  },
];

export const CONTACT = {
  intro: 'Always happy to connect!',
  rows: [
    { k: 'Email',    v: 'milin.khunkhun@gmail.com',       href: 'mailto:milin.khunkhun@gmail.com' },
    { k: 'LinkedIn', v: 'linkedin.com/in/milin-khunkhun', href: 'https://linkedin.com/in/milin-khunkhun' },
    { k: 'GitHub',   v: 'github.com/Milinkh',             href: 'https://github.com/Milinkh' },
    { k: 'Phone',    v: '(510) 585-7372' },  /* no href — display only, not clickable */
  ],
};
