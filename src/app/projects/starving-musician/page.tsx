"use client";
import { motion } from "framer-motion";
import TextPageWrapper from "@/app/components/TextPageWrapper";
import ProjectPageBanner from "@/app/components/ProjectPageBanner";
import CommentSection from "@/app/components/CommentSection";
import RoundButton from "@/app/components/RoundButton";
import clsx from "clsx";

export default function StarvingMusicianProjectPage() {
  const title = "Starving Musician E-Commerce Platform";
  const description =
    "A full-stack e-commerce platform consolidating two legacy ZenCart storefronts into a unified Next.js + PHP platform for two retail locations.";

  return (
    <main className="dark:bg-black">
      <ProjectPageBanner
        imageSrc="/images/starving-musician.gif"
        imageAlt="Starving Musician E-Commerce Platform"
        title={title}
        description={description}
      />
      <TextPageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          className="max-w-350 mx-auto px-8 lg:px-30"
        >
          {/* Visit Site button */}
          <RoundButton
            href="https://starvingmusician.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-block mb-6 px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors font-medium",
              "dark:bg-white dark:text-black dark:hover:bg-lucas-white-hover"
            )}
          >
            Visit Site
          </RoundButton>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Next.js 16 & TypeScript</li>
              <li>PHP REST APIs</li>
              <li>MySQL (three databases across two retail locations)</li>
              <li>NextAuth, custom-bridged to legacy ZenCart auth</li>
              <li>JWT session tokens & HMAC order tracking</li>
              <li>PayPal Express Checkout & direct credit card processing</li>
              <li>PM2 on a VPS, coordinating with PHP APIs on shared hosting</li>
            </ul>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>
                Unified ordering system with multi-location cart splitting,
                cross-store inventory, and dual-database order placement
              </li>
              <li>
                4-step checkout supporting PayPal Express Checkout, direct
                credit card processing, guest checkout, and multi-location
                order splitting
              </li>
              <li>
                Guest checkout with JWT-based session tokens, HMAC order
                tracking, and automatic cart merging on account creation
              </li>
              <li>
                Unified authentication layer bridging NextAuth with two
                legacy ZenCart customer databases
              </li>
              <li>
                SEO-preserving migration via middleware-based 301 redirects
                for legacy URLs and dynamic sitemap generation across two
                product databases
              </li>
              <li>
                30+ React components, including a multi-image product
                gallery, responsive carousel, real-time search with filters,
                and reusable address/payment forms
              </li>
              <li>
                Structured request-ID-based logging across TypeScript and PHP
                layers with an admin log viewer for production debugging
              </li>
            </ul>
          </div>

          {/* Impact */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Impact</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>
                Nearly doubled online sales by consolidating two legacy
                storefronts into a single modern platform
              </li>
              <li>
                Independently identified bottlenecks in the existing sites
                and built the case to gain leadership approval for the
                rebuild
              </li>
              <li>
                Migrated all information, data, and assets from both legacy
                sites with zero downtime
              </li>
              <li>
                Conducted a full-stack security audit and remediated 7
                vulnerabilities, including CORS misconfiguration, SSRF, and
                PHP Object Injection, across payment processing endpoints
              </li>
            </ul>
          </div>

          {/* What I Learned */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">What I Learned</h4>
            <p className="text-gray-700 dark:text-gray-300">
              This project taught me how to own a production system
              end-to-end, from proposing the rebuild to leadership through
              deployment and ongoing maintenance. I learned how to bridge
              modern and legacy infrastructure without breaking existing
              payment processing or admin workflows, how to reason about
              security across a full stack under real payment traffic, and
              how to break down a large, monolithic checkout flow into a
              maintainable, modular architecture.
            </p>
          </div>
        </motion.div>
        <CommentSection projectId="starving-musician" />
      </TextPageWrapper>
    </main>
  );
}
