export interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  location: string;
  locationNote?: string;
  bullets: string[];
}

export interface ResumeProject {
  name: string;
  description: string;
}

export const resume = {
  name: "Lucas Arden",
  title: "Software Engineer · Full-Stack (TypeScript / React / Node)",
  location: "Santa Cruz, CA",
  phone: "619.764.8401",
  email: "lucas91913@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/lucas-arden-22177818a/",
    github: "https://github.com/lucasarden",
    portfolio: "https://lucasarden.com",
  },
  availability: "Open to remote or on-site — willing to relocate.",
  summary:
    "Full-stack engineer who rebuilt a retail business's entire digital stack solo: e-commerce platform, marketplace integrations, a POS database migration, and PCI-compliant payment automation. All with measurable revenue impact. Ships features end to end in TypeScript, React, and Node, and builds integrations and automations against third-party APIs.",
  skills: [
    { category: "Languages", items: "TypeScript, JavaScript, Python, SQL, PHP" },
    { category: "Frontend", items: "React, Next.js, HTML, CSS" },
    {
      category: "Backend & Data",
      items:
        "Node.js, REST API design & third-party integration, SQL databases, authentication (NextAuth)",
    },
    { category: "Tools", items: "Git, PM2, VS Code" },
  ],
  experience: [
    {
      company: "The Starving Musician",
      role: "Software Engineer",
      dates: "2025 – Present",
      location: "Santa Cruz, CA",
      locationNote:
        "with the company since 2022; moved into a full-time engineering role in 2025",
      bullets: [
        "Consolidated two legacy websites into a single full-stack e-commerce platform on a modern React/Next.js stack, nearly doubling online sales.",
        "Built and automated the company's Reverb marketplace operation, integrating against the Reverb API to sync inventory and listings, growing Reverb revenue from roughly $10–20K to $120K+ per year and reaching Reverb's top-300 sellers.",
        "Migrated the point-of-sale system to a modern SQL-backed version and built integrations and automations for inventory and sales that removed 10–20 hours of manual data entry per week.",
        "Designed and built an automated recurring-payment system for long-term instrument rentals, replacing manual card entry and bringing the business into PCI compliance by ending paper storage of card data.",
        "Identified and fixed 7 security vulnerabilities in the checkout/payment integration, then re-tested and deployed the hardened flow.",
      ],
    },
    {
      company: "Holonis",
      role: "Software Engineer Intern",
      dates: "05/2020 – 10/2020",
      location: "San Diego, CA",
      bullets: [
        "Built front-end features in React for the platform's internal admin interface, working with a small engineering team on an Agile cycle and documenting features for maintainability.",
      ],
    },
  ] satisfies ExperienceEntry[],
  projects: [
    {
      name: "Rental Autopay System",
      description:
        "Automated recurring billing for instrument rentals; PCI-conscious card handling.",
    },
    {
      name: "Portfolio Site",
      description:
        "Full-stack Next.js application with CRUD functionality showcasing personal projects.",
    },
  ] satisfies ResumeProject[],
  education: {
    school: "University of California, Santa Cruz",
    degree: "B.S. in Computer Science, 2025",
  },
};
