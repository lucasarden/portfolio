export interface Project {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  features: string[];
  impact?: string[];
  learned: string;
  video: string;
  poster: string;
  github?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "starving-musician",
    title: "Starving Musician E-Commerce Platform",
    summary:
      "A full-stack e-commerce platform consolidating two legacy ZenCart storefronts into a unified Next.js + PHP platform for two retail locations.",
    techStack: [
      "Next.js 16 & TypeScript",
      "PHP REST APIs",
      "MySQL (three databases across two retail locations)",
      "NextAuth, custom-bridged to legacy ZenCart auth",
      "JWT session tokens & HMAC order tracking",
      "PayPal Express Checkout & direct credit card processing",
      "PM2 on a VPS, coordinating with PHP APIs on shared hosting",
    ],
    features: [
      "Unified ordering system with multi-location cart splitting, cross-store inventory, and dual-database order placement",
      "4-step checkout supporting PayPal Express Checkout, direct credit card processing, guest checkout, and multi-location order splitting",
      "Guest checkout with JWT-based session tokens, HMAC order tracking, and automatic cart merging on account creation",
      "Unified authentication layer bridging NextAuth with two legacy ZenCart customer databases",
      "SEO-preserving migration via middleware-based 301 redirects for legacy URLs and dynamic sitemap generation across two product databases",
      "30+ React components, including a multi-image product gallery, responsive carousel, real-time search with filters, and reusable address/payment forms",
      "Structured request-ID-based logging across TypeScript and PHP layers with an admin log viewer for production debugging",
    ],
    impact: [
      "Nearly doubled online sales by consolidating two legacy storefronts into a single modern platform",
      "Independently identified bottlenecks in the existing sites and built the case to gain leadership approval for the rebuild",
      "Migrated all information, data, and assets from both legacy sites with zero downtime",
      "Conducted a full-stack security audit and remediated 7 vulnerabilities, including CORS misconfiguration, SSRF, and PHP Object Injection, across payment processing endpoints",
    ],
    learned:
      "This project taught me how to own a production system end-to-end, from proposing the rebuild to leadership through deployment and ongoing maintenance. I learned how to bridge modern and legacy infrastructure without breaking existing payment processing or admin workflows, how to reason about security across a full stack under real payment traffic, and how to break down a large, monolithic checkout flow into a maintainable, modular architecture.",
    video: "/videos/starving-musician.mp4",
    poster: "/videos/starving-musician-poster.jpg",
    liveUrl: "https://starvingmusician.com",
    featured: true,
  },
  {
    slug: "chessboard",
    title: "Chessboard",
    summary: "A chessboard implementation using Python and Pygame.",
    techStack: ["Python", "Pygame", "Custom move validation logic (no libraries)"],
    features: [
      "Full chessboard and piece rendering",
      "Legal move generation, including en passant and castling",
      "Turn-based system with move validation",
      "Custom UI layout using Pygame surfaces",
    ],
    learned:
      "This project taught me how to structure a game using an object-oriented approach in Python, how to implement custom rulesets like chess without relying on third-party logic libraries, and how to build an interactive UI with Pygame. I also deepened my understanding of 2D graphics, state management, and rendering performance.",
    video: "/videos/chessboard.mp4",
    poster: "/videos/chessboard-poster.jpg",
    github: "https://github.com/lucasarden/chessboard",
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    summary:
      "A personal portfolio website built with Next.js, Tailwind CSS and MongoDB.",
    techStack: ["Next.js & Tailwind CSS", "Node.js", "MongoDB"],
    features: [
      "Responsive design",
      "Dynamic project showcases",
      "Custom animations and transitions",
    ],
    learned:
      "This project taught me how to structure a web application using an object-oriented approach in TypeScript, how to implement custom components and hooks in React, and how to build a responsive UI with Tailwind CSS. I also deepened my understanding of client-side routing and state management.",
    video: "/videos/portfolio.mp4",
    poster: "/videos/portfolio-poster.jpg",
    github: "https://github.com/lucasarden/portfolio",
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
