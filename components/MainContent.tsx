import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, Bot, Braces, BriefcaseBusiness, Check, Code2, Database, Download, Facebook, Github, Globe2, Instagram, Linkedin, Mail, Music2, Plug, Smartphone, Webhook as WebhookIcon, Workflow, X, ZoomIn, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

// - Animation Variants -

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.82, ease: PREMIUM_EASE },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.04, staggerChildren: 0.055 },
  },
};

const headingReveal = {
  hidden: { opacity: 0, y: 38, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.95, ease: PREMIUM_EASE },
  },
};

// - Types -

interface CaseStudy {
  overview: string;
  problem: string;
  solution: string[] | string;
  impact: string[];
  videoUrl?: string;
  timeline?: string;
  apisConnected?: number;
  scalability?: string;
  howItWorks?: string[];
  stack?: string[];
  keyFeatures?: string[];
  note?: string;
}

interface ProjectData {
  title: string;
  imageUrl: string;
  tag: string;
  link?: string;
  caseStudy?: CaseStudy;
}

// - Data -

const PROJECTS: ProjectData[] = [
  {
    title: 'AI Content Repurposing',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ugBCixWhFkzd4NrFMaXzi4zAGp0_OdZz',
    tag: 'Zapier + Make.com',
    caseStudy: {
      overview: 'Automated Content Repurposing Engine built in both Zapier and Make.com. Transforms raw audio/video files into 2 blog posts, Instagram & LinkedIn posts, plus logging - fully no-code with AI transcription, generation, conditional paths, and multi-platform distribution.',
      problem: 'Content creators and teams spend 4-6 hours manually transcribing, rewriting, formatting, and posting each audio/video piece - leading to inconsistent output, burnout, delayed distribution, and missed reach across blogs and social channels.',
      solution: [
        'Trigger: New file in Google Drive / OneDrive folder',
        'AI transcription - Generate 2 unique blog variants',
        'Create platform-specific social posts (Instagram + LinkedIn)',
        'Log everything to Google Sheets',
        'Conditional Paths/Router: Filter by keywords or quality to control auto-posting',
        'Identical logic implemented in Zapier and Make.com with strong AI prompt engineering.',
      ],
      impact: [
        'Reduced repurposing time from hours to ~5-10 minutes of review',
        'Scaled output: 1 file - 2 blogs + 2 social posts + log automatically',
        'Improved consistency, brand alignment, and weekly reach',
        'Enabled safe, reliable automation with filters preventing unwanted posts',
      ],
    },
  },
  {
    title: 'Smart Lead Qualification & Automated Follow-Up',
    imageUrl: 'https://lh3.googleusercontent.com/d/1RLxdzix2yesNEzvqNrMOquUM3flnu8PT',
    tag: 'Zapier + Apollo.io',
    caseStudy: {
      overview: 'Automated B2B Lead Qualification & Outreach Workflow built in Zapier. Triggers in real-time via Webhooks, enriches leads using Apollo.io, scores/prioritizes based on firmographics (company size, revenue, industry fit), stores high-priority leads in SQL, notifies the sales team, and generates personalized email drafts via AI.',
      problem: 'Sales teams receive real-time inbound leads but spend excessive time on manual enrichment, qualification, prioritization, and personalized outreach. Without automation, low-fit leads waste resources, high-value opportunities get delayed, and outreach lacks consistency - resulting in inefficient pipelines and lost revenue.',
      solution: [
        'Webhook trigger receives real-time lead data (name, email, company, size, website, source)',
        'Apollo.io enrichment: revenue, employee count, industry, tech stack via API',
        'Scoring via Formatter + Paths by Zapier - based on company size, revenue bands, industry ICP match',
        'High-priority path: save to SQL database, notify team, generate AI email draft',
        'Low-priority path: basic notification or log only',
        'AI by Zapier (OpenAI/Gemini) creates short, context-aware outreach emails',
      ],
      impact: [
        'Reduced manual lead processing from hours to seconds per lead',
        'Automatically prioritized high-fit leads - focusing sales on the top 20-30% conversion potential',
        'Boosted outreach quality and response rates via AI-personalized, data-enriched email drafts',
        'Centralized SQL storage for clean reporting, CRM syncing, and pipeline analytics',
      ],
    },
  },
  {
    title: 'Asana CRM Automation System',
    imageUrl: 'https://lh3.googleusercontent.com/d/1WyrHA7qSum4-X6GSHXtUPiQpqmdL6e8K',
    tag: 'Zapier + Asana',
    link: 'https://docs.google.com/presentation/d/1iOBihJxwTDRk25ZBTCw8qaBGiM8iu_gd_O5cO8kQt5o/edit',
  },
  {
    title: 'Automated Gmail Attachment Intelligence & Routing',
    imageUrl: 'https://lh3.googleusercontent.com/d/1GplsktqoLPIaYU40ZRu-1rd3K1-MGWyt',
    tag: 'Make.com + Gemini AI',
    caseStudy: {
      overview: 'Intelligent Gmail Attachment Processor built with Make.com. Monitors incoming Gmail emails, analyzes attachments (PDFs, XLSX, CSV, DOCX) with Google Gemini AI, renames files descriptively based on content, uploads to Google Drive, logs details in Google Sheets, and optionally sends confirmation emails.',
      problem: 'Manual handling of incoming email attachments was time-consuming and error-prone - requiring constant Gmail monitoring, manual renaming, uploading to the correct folder, and tracking. This led to delays, misfiled documents, lost time, and inconsistent organization.',
      solution: [
        'Trigger: Gmail Watch Emails for new messages with attachments',
        'Extract: List attachments and download file data',
        'AI Analysis: Upload file to Google Gemini to generate a short, descriptive content summary',
        'Rename: Dynamically create intelligent filenames (e.g., Q4_Invoice_ClientX_2025.pdf)',
        'Store: Upload renamed file to specific Google Drive folder',
        'Log: Append timestamp, original & new filename, file type, AI summary to Google Sheet',
        'Notify (optional): Send Gmail confirmation after successful processing',
      ],
      impact: [
        'Reduced manual processing from 5-10 minutes per attachment to near-zero hands-on time',
        'AI-driven renaming eliminated guesswork and ensured uniform, searchable filenames',
        'Centralized, properly named files in Drive + full audit trail in Sheets',
        'Handles high volumes 24/7 with zero missed files',
      ],
    },
  },
  {
    title: 'Automated Financial Export Pipeline',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fQ4oH6VMDDT3ACweWzyNXQZ-i679Mc-Y',
    tag: 'Make.com + Xero',
    caseStudy: {
      overview: 'Automated Xero General Ledger Attachment to Asana Tasks using Make.com. Triggers when an Asana task is marked complete, pulls detailed transaction data from Xero API, formats it into a standard CSV mirroring the Account Transactions report, and attaches the CSV directly to the completed Asana task for archival.',
      problem: "Manual Xero report exports required logging in, navigating Reports > Account Transactions, filtering for the desired period, downloading CSV, and uploading to Asana - repetitive, time-consuming, and prone to oversight.",
      solution: [
        'Trigger: Asana Watch Completed Tasks',
        'Fetch Data: Xero API call to retrieve transaction-level data for the last calendar year',
        'Process & Format: Router, Iterators, Google Sheets staging, Text Aggregator to structure CSV',
        'Attach: Asana Upload Attachment - CSV attached directly to the completed task',
        'Cleanup: Clear temp Google Sheets ranges and add logging/sleeps for reliability',
      ],
      impact: [
        'Eliminated 10-20 minutes of manual Xero navigation per completed task',
        'CSV mirrors exact Xero report format - zero formatting errors, reliable audit trail',
        'Automatic attachment ensures financial history is preserved in project context',
        'Handles multiple tasks daily with no added effort',
      ],
    },
  },
  {
    title: 'WhatsApp AI Booking & Inquiry Agent',
    imageUrl: 'https://lh3.googleusercontent.com/d/1rwfl7dxbU5cGLA0oIZgx2HlZdenqCSD4',
    tag: 'n8n + WhatsApp',
    caseStudy: {
      videoUrl: 'https://youtu.be/0Z0HgTMvg_U',
      overview: 'A fully automated restaurant booking and inquiry system built with n8n that handles WhatsApp messages, AI-powered intent routing, booking management via Google Sheets, and multi-channel responses. Processes inquiries 24/7 with zero manual intervention-from customer message to confirmed booking automatically.',
      problem: 'Restaurant staff waste hours answering the same questions outside business hours. Booking inquiries get missed, customers get ignored, and staff spends time manually managing bookings, cancellations, and complaints - leading to lost reservations, frustrated customers, and operational chaos.',
      solution: [
        'WhatsApp Webhook receives incoming messages in real-time',
        'AI Agent (Claude Sonnet) reads message and routes intent: booking, cancellation, complaint, or general inquiry',
        'Route Intent node branches workflow based on intent type',
        'Write Booking: Saves bookings to Google Sheets with auto-confirmation',
        'Send WhatsApp Reply: Delivers instant response via WhatsApp',
        'Save to Conversations: Logs all interactions for customer history',
        'Log Escalation: Routes complex issues to staff automatically',
        'Respond 200 OK: Confirms delivery to WhatsApp immediately',
      ],
      impact: [
        'Response time reduced from hours to under 30 seconds',
        'Eliminated manual booking entry - 5+ API calls per booking automated',
        'Handles cancellations, new bookings, and complaints autonomously',
        '24/7 availability: never miss a customer inquiry again',
        'Conversation memory provides customer context on every interaction',
        'Staff only handles escalations - routine work fully automated',
        'Confirmed bookings written directly to Google Sheets',
      ],
    },
  },
  {
    title: 'AI Jobs Scraper + Resume Optimizer System',
    imageUrl: 'https://lh3.googleusercontent.com/d/1iENI_54wQ7DnJ3xrRj1a6AAgFUIU9Kse',
    tag: 'n8n + AI',
    caseStudy: {
      overview: 'Built with n8n. An intelligent automation pipeline that monitors incoming job requests via Messaging, scrapes tailored job listings, uses AI to customize resumes for each role, stores optimized versions in Google Drive, drafts personalized application emails, and sends completion reports - fully automated.',
      problem: 'Manual job applications are highly repetitive and inefficient. Searching for listings, tailoring resumes to match job descriptions, organizing files, and writing customized emails take hours per application - leading to fatigue, inconsistent tailoring, and missed opportunities.',
      solution: [
        'Triggers on Messaging job requests',
        'Scrapes and filters relevant job postings',
        'Analyzes job descriptions with AI to tailor resumes (keyword optimization, skill highlighting, ATS-friendly)',
        'Saves customized resumes to Google Drive with clear naming conventions',
        'Generates draft application emails',
        'Notifies results via Messaging',
      ],
      impact: [
        'Reduced application time from hours to minutes per job - enabling 10x more applications',
        'AI-driven tailoring improves ATS compatibility and interview callback rates',
        'Supports high-volume job searches while keeping applications professional and organized',
        'Frees up time for interviews, skill-building, and networking',
      ],
    },
  },
  {
    title: 'AI Webhook Agent & Customer Intake Automation',
    imageUrl: 'https://lh3.googleusercontent.com/d/19LSO-CxBQUFNDZHi6ECzWgNallGZyNiQ',
    tag: 'n8n + Webhooks',
    caseStudy: {
      overview: 'A fully autonomous, webhook-triggered AI agent built with n8n that handles incoming customer inquiries and applications. Classifies intent, answers FAQs in real time, extracts and structures application data, saves records cleanly, and sends personalized confirmation emails - all without human involvement.',
      problem: 'Manual processing of customer inquiries and applications creates major bottlenecks: slow response times frustrate users and lose leads; inconsistent answers damage brand trust; fragmented data entry leads to errors; delayed follow-ups reduce conversion rates.',
      solution: [
        'Analyzes incoming messages with AI to detect intent',
        'Instantly replies to common FAQs with accurate, branded responses',
        'Extracts key data from applications (name, email, preferences, documents)',
        'Structures and stores clean records (Google Sheets, Airtable, database)',
        'Triggers personalized confirmation & next-step emails via SMTP/Mailgun',
        'All executed in seconds, 24/7, with zero manual touch',
      ],
      impact: [
        'Response time reduced from hours/days to under 10 seconds for most inquiries',
        '100% structured data collection - eliminated missed or incomplete submissions',
        'Removed 80-95% of repetitive inquiry/application handling work',
        'Instant, consistent, professional communication - higher satisfaction and trust',
      ],
    },
  },
  {
    title: 'AI Voice Receptionist & Dynamic Appointment Manager',
    imageUrl: 'https://lh3.googleusercontent.com/d/1n929yATdP0dtjO1ZEZoCRHvO1c9U6bUo',
    tag: 'n8n + Voice AI',
    caseStudy: {
      overview: 'A production-grade, fully autonomous AI receptionist built with n8n exposing multiple webhook/API endpoints to handle real-time appointment workflows. Checks calendar availability, books new slots, updates or reschedules existing appointments, processes cancellations, and stores call recordings + metadata in Airtable - all without human intervention.',
      problem: 'Traditional appointment scheduling via phone suffered from: long wait times and after-hours unavailability; human errors in double-booking; high staff burden for routine tasks; and limited scalability during peak demand - leading to lost bookings and frustrated customers.',
      solution: [
        'Get Availability - Real-time slot checking across calendars',
        'Book Appointment - Validates input, creates calendar event, confirms via voice/text',
        'Update Appointment - Modifies existing bookings with conflict detection',
        'Cancel Appointment - Safely deletes/cancels slots and notifies parties',
        'Call Logging - Automatically captures recordings and metadata in Airtable',
      ],
      impact: [
        '24/7 instant booking & management - no more missed after-hours opportunities',
        'Eliminated 90-100% of routine phone and scheduling work',
        'Near-zero double-bookings or data-entry mistakes through automated validation',
        'Handles unlimited concurrent requests without adding headcount',
      ],
    },
  },
  {
    title: 'AI ASMR Video Production & Multi-Platform Publishing',
    imageUrl: 'https://lh3.googleusercontent.com/d/1nfdD2zKiYYTHTDn0PeO0WyxnaA5T_1B8',
    tag: 'n8n + Video AI',
    caseStudy: {
      overview: 'A completely autonomous pipeline built with n8n that turns high-level ideas into ready-to-watch short-form ASMR videos and publishes them across platforms. Auto-generates creative prompts, renders videos using AI, validates output quality, converts formats, adds metadata, and uploads directly to YouTube and Facebook - fully hands-free.',
      problem: 'Creating and distributing short-form ASMR content is extremely labor-intensive: manually writing detailed prompts; waiting for renders; checking quality; editing/exporting in correct formats; and uploading with metadata to multiple platforms - limiting output and causing burnout.',
      solution: [
        'Generates varied, high-quality ASMR prompts (triggers, themes, durations)',
        'Submits to AI video generation engine and monitors rendering status',
        'Validates successful output (length, audio presence, no errors)',
        'Converts & optimizes files for platform specs',
        'Auto-uploads with SEO-optimized titles, descriptions, tags, thumbnails',
        'Publishes simultaneously to YouTube Shorts and Facebook Reels',
      ],
      impact: [
        'From idea to published video in minutes instead of hours/days',
        '10-30× increase in weekly content output',
        'Eliminated 95%+ of manual creative and publishing labor',
        'Enables rapid experimentation and sustained high-frequency posting',
      ],
    },
  },
];

const LAAG_BUKIDNON_PROJECT = {
  title: 'Laag Bukidnon',
  link: 'https://laagbukidnon.vercel.app/',
  description: 'A responsive tourism platform that helps travelers discover Bukidnon, plan trips, find stays, and travel with useful local context.',
  problem: 'Bukidnon travel information is often scattered across social posts, operator pages, and disconnected guides, making it difficult to move from discovery to a practical trip plan.',
  role: 'Product design, frontend development, and responsive UX',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  shipped: 'A live destination platform connecting discovery, maps, stays, practical travel guidance, and an Ask Bukid planning path.',
  capabilities: [
    {
      label: 'Discover',
      detail: 'Destinations, stays, guides, and travel essentials organized in one clear experience.',
    },
    {
      label: 'Plan',
      detail: 'Search and trip-planning paths designed to move travelers from inspiration to action.',
    },
    {
      label: 'Ask Bukid',
      detail: 'A conversational entry point for practical questions about exploring the province.',
    },
  ],
};

const MIGO_PROJECT = {
  title: 'Migo',
  link: 'https://migo-rust.vercel.app/',
  description: 'A mobile-first travel platform combining trip planning, AI assistance, travel tracking, social discovery, and personal memories in one connected experience.',
  note: 'Independent product concept designed and developed as a full-stack travel application.',
  problem: 'Trip planning is fragmented across chats, notes, budgets, maps, and social feeds, so the context travelers need rarely stays in one place.',
  role: 'Product design, full-stack development, and AI integration',
  stack: ['Expo', 'React Native', 'TypeScript', 'Supabase'],
  shipped: 'A live mobile-first product that brings AI guidance, trips, expenses, passport progress, community rankings, and memories into one experience.',
  posters: [
    {
      src: '/images/projects/migo-ai-travel-buddy.webp',
      alt: 'Migo promotional poster introducing the AI travel buddy with route, budget, packing, and local discovery tools',
      label: 'Meet your AI travel buddy',
    },
    {
      src: '/images/projects/migo-plan-every-trip.webp',
      alt: 'Migo promotional poster showing trip planning, itinerary organization, and travel passport progress',
      label: 'Plan every trip with clarity',
    },
    {
      src: '/images/projects/migo-explore-stories.webp',
      alt: 'Migo promotional poster showing travel stories, verified progress, and leaderboard standings',
      label: 'Explore stories and see your standing',
    },
    {
      src: '/images/projects/migo-travel-identity.webp',
      alt: 'Migo promotional poster showing a traveler profile, check-ins, passport progress, and personal memories',
      label: 'Build your travel identity',
    },
  ],
};

const NARRA_ESTATES_PROJECT = {
  title: 'Narra Estates',
  liveUrl: 'https://narra-estates.vercel.app/',
  sourceUrl: 'https://github.com/dionerazedev/narra-estates',
  description: 'A cinematic luxury real estate concept that combines editorial property storytelling, responsive discovery tools, accessible inquiry flows, and restrained scroll-driven animation.',
  technologies: ['Next.js', 'TypeScript', 'GSAP', 'ScrollTrigger', 'Lenis', 'Tailwind CSS', 'Playwright'],
};

interface ProductProofProps {
  project: {
    problem: string;
    role: string;
    stack: string[];
    shipped: string;
  };
  className?: string;
}

const ProductProof: React.FC<ProductProofProps> = ({ project, className = '' }) => (
  <motion.div
    variants={fadeUp}
    className={`${className} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-y border-[#242424] py-9`}
  >
    <div className="lg:col-span-5">
      <p className="mono-font text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-3">The problem</p>
      <p className="mono-font text-[13px] leading-relaxed text-neutral-400 max-w-[58ch]">{project.problem}</p>
    </div>
    <dl className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-7">
      <div>
        <dt className="mono-font text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3">My role</dt>
        <dd className="mono-font text-[12px] leading-relaxed text-neutral-300">{project.role}</dd>
      </div>
      <div>
        <dt className="mono-font text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3">Build stack</dt>
        <dd className="mono-font text-[12px] leading-relaxed text-neutral-300">{project.stack.join(' / ')}</dd>
      </div>
      <div>
        <dt className="mono-font text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3">What shipped</dt>
        <dd className="mono-font text-[12px] leading-relaxed text-neutral-300">{project.shipped}</dd>
      </div>
    </dl>
  </motion.div>
);

interface TechItem {
  name: string;
  category: string;
  logo?: string;
  Icon?: LucideIcon;
}

interface TechGroup {
  label: string;
  description: string;
  gridClass: string;
  tools: TechItem[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    label: 'Full-Stack Development',
    description: 'Product interfaces, mobile applications, and connected data layers.',
    gridClass: 'grid-cols-2 sm:grid-cols-4',
    tools: [
      { name: 'React', category: 'Interface', logo: '/images/tech/react.svg' },
      { name: 'Next.js', category: 'Framework', logo: '/images/tech/nextdotjs.svg' },
      { name: 'TypeScript', category: 'Language', logo: '/images/tech/typescript.svg' },
      { name: 'React Native', category: 'Mobile', logo: '/images/tech/react.svg' },
      { name: 'Expo', category: 'Mobile', logo: '/images/tech/expo.svg' },
      { name: 'Tailwind CSS', category: 'Styling', logo: '/images/tech/tailwindcss.svg' },
      { name: 'Supabase', category: 'Backend', logo: '/images/tech/supabase.svg' },
      { name: 'PostgreSQL', category: 'Database', logo: '/images/tech/postgresql.svg' },
    ],
  },
  {
    label: 'AI & Automation',
    description: 'Intelligent workflows, model integrations, and operational automation.',
    gridClass: 'grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6',
    tools: [
      { name: 'n8n', category: 'Automation', logo: '/images/tech/n8n.svg' },
      { name: 'Make.com', category: 'Automation', logo: '/images/tech/make.svg' },
      { name: 'Zapier', category: 'Automation', logo: '/images/tech/zapier.svg' },
      { name: 'OpenAI', category: 'Model API', Icon: Bot },
      { name: 'Claude', category: 'Model API', logo: '/images/tech/claude.svg' },
      { name: 'Gemini', category: 'Model API', logo: '/images/tech/googlegemini.svg' },
    ],
  },
  {
    label: 'Infrastructure & Integration',
    description: 'Version control, deployment, and event-driven product connections.',
    gridClass: 'grid-cols-2 sm:grid-cols-4',
    tools: [
      { name: 'Git / GitHub', category: 'Versioning', logo: '/images/tech/github.svg' },
      { name: 'Vercel', category: 'Deployment', logo: '/images/tech/vercel.svg' },
      { name: 'REST APIs', category: 'Integration', Icon: Braces },
      { name: 'Webhooks', category: 'Events', Icon: WebhookIcon },
    ],
  },
];

interface ServiceOffering {
  title: string;
  description: string;
  Icon: LucideIcon;
  deliverables: string[];
}

const PRIMARY_SERVICES: ServiceOffering[] = [
  {
    title: 'AI Automation Systems',
    description: 'Automations that move data, route decisions, and complete repetitive work across the tools your team already uses.',
    Icon: Workflow,
    deliverables: ['Workflow architecture', 'Model and API orchestration', 'Validation and error handling', 'Operational handoff'],
  },
  {
    title: 'Full-Stack Product Development',
    description: 'Web and mobile products with clear interfaces, secure data flows, and the infrastructure needed to keep them useful.',
    Icon: Code2,
    deliverables: ['React and Next.js applications', 'Expo and React Native apps', 'Supabase and PostgreSQL', 'Authentication and user accounts'],
  },
];

const SUPPORTING_SERVICES = [
  {
    title: 'AI Assistants & Agents',
    description: 'Intent routing, useful responses, context handling, and tool calls.',
    Icon: Bot,
  },
  {
    title: 'Product Integrations',
    description: 'Maps, location data, authentication, APIs, and third-party services.',
    Icon: Plug,
  },
  {
    title: 'Data & Product Operations',
    description: 'Application schemas, internal workflows, content operations, and admin flows.',
    Icon: Database,
  },
  {
    title: 'Responsive Product UI',
    description: 'Accessible interfaces designed for mobile, tablet, and desktop use.',
    Icon: Smartphone,
  },
];

const LINE_NUMBERS = Array.from({ length: 570 }, (_, index) => index + 1).join('\n');

// - Sub-Components -

const CaseStudyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}> = ({ isOpen, onClose, project }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project?.caseStudy) return null;
  const { caseStudy, title } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-3xl max-h-[88vh] bg-[#0c0c0c] border border-[#1e1e1e] overflow-y-auto"
            role="document"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 bg-[#0c0c0c] border-b border-[#1e1e1e]">
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter pr-4">
                {title}
              </h2>
              <button
                ref={closeRef}
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center border border-[#222] text-neutral-500 hover:text-white hover:border-[#444] transition-colors flex-shrink-0"
                aria-label="Close case study"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col gap-10">
              {caseStudy.videoUrl && (
                <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full border border-[#2a2a2a]"
                    src={caseStudy.videoUrl.replace('youtu.be/', 'youtube.com/embed/').replace('?', '?')}
                    title={`${title} video demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {[
                { label: 'Project Overview', content: caseStudy.overview, list: false },
                { label: 'Problem', content: caseStudy.problem, list: false },
                { label: 'Solution', items: caseStudy.solution, list: true },
                { label: 'Impact', items: caseStudy.impact, list: true },
              ].map((s) => (
                <section key={s.label}>
                  <h3 className="mono-font text-[10px] text-yellow-400 uppercase tracking-widest font-bold mb-4">
                    {s.label}
                  </h3>
                  {s.list ? (
                    <ul className="space-y-3" aria-label={s.label}>
                      {(s.items as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 mono-font text-[13px] text-neutral-400 leading-relaxed">
                          <span className="text-yellow-400 flex-shrink-0 mt-[3px]" aria-hidden="true">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mono-font text-[14px] text-neutral-400 leading-relaxed">{s.content}</p>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ImageLightbox: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}> = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed view of ${title}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/96 backdrop-blur-md cursor-zoom-out"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="relative max-w-7xl max-h-full flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt={`Full view: ${title}`}
              className="max-w-full max-h-[90vh] object-contain border border-[#2a2a2a]"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={onClose}
              className="absolute -top-11 right-0 flex items-center gap-2 mono-font text-[11px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors min-h-[44px] px-2"
              aria-label="Close zoomed image"
            >
              <span>Close</span>
              <X size={16} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

type MigoPoster = (typeof MIGO_PROJECT.posters)[number];

interface MigoPosterShowcaseProps {
  posters: MigoPoster[];
  onPreview: (url: string, title: string) => void;
}

const MigoPosterShowcase: React.FC<MigoPosterShowcaseProps> = ({ posters, onPreview }) => {
  const [[currentIndex, direction], setCurrent] = useState<[number, number]>([0, 0]);
  const currentPoster = posters[currentIndex];

  const paginate = (step: number) => {
    setCurrent(([index]) => [
      (index + step + posters.length) % posters.length,
      step,
    ]);
  };

  if (!currentPoster) {
    return (
      <div className="border-y border-[#242424] py-12 text-center" role="status">
        <p className="mono-font text-[11px] uppercase tracking-widest text-neutral-600">Poster preview unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[560px] h-[460px] sm:h-[500px] xl:h-[520px] mx-auto" aria-label="Migo product poster viewer">
      <div className="absolute inset-y-6 left-1/2 w-[58%] max-w-[320px] -translate-x-1/2 rotate-[1deg] border border-[#222] bg-[#0d0d0d]" aria-hidden="true" />
      <div className="absolute inset-y-6 left-1/2 w-[58%] max-w-[320px] -translate-x-1/2 -rotate-[1deg] border border-[#282828] bg-[#101010]" aria-hidden="true" />

      <div className="absolute inset-x-0 inset-y-5 flex items-center justify-center px-14 sm:px-16">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.button
            key={currentPoster.src}
            type="button"
            custom={direction}
            initial={{ opacity: 0, x: direction * 22, rotate: direction * 0.6 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: direction * -22, rotate: direction * -0.6 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            onClick={() => onPreview(currentPoster.src, currentPoster.label)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                paginate(-1);
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                paginate(1);
              }
            }}
            className="relative block h-full max-h-[500px] overflow-hidden border border-[#343434] bg-[#101010] text-left shadow-[0_24px_55px_-28px_rgba(0,0,0,0.9)] hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            aria-label={`Enlarge ${currentPoster.label} poster. Use left and right arrow keys to change poster.`}
          >
            <img
              src={currentPoster.src}
              alt={currentPoster.alt}
              width="941"
              height="1672"
              className="block h-full w-auto max-w-full object-contain"
              loading="lazy"
              sizes="(max-width: 767px) 260px, 290px"
            />
          </motion.button>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => paginate(-1)}
        className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-12 h-12 border border-[#343434] bg-[#0d0d0d] text-neutral-400 hover:border-neutral-500 hover:text-white active:scale-[0.98] mono-font text-lg transition-colors"
        aria-label="Show previous Migo poster"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => paginate(1)}
        className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 text-[#0a0a0a] hover:bg-yellow-300 active:scale-[0.98] mono-font text-lg transition-colors"
        aria-label="Show next Migo poster"
      >
        →
      </button>

      <p className="absolute right-0 top-0 mono-font text-[10px] text-neutral-500 tabular-nums" aria-live="polite">
        <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="mx-2 text-neutral-700">/</span>
        {String(posters.length).padStart(2, '0')}
      </p>
      <p className="absolute left-0 top-0 max-w-[24ch] mono-font text-[10px] text-neutral-500 uppercase tracking-wide" aria-live="polite">
        {currentPoster.label}
      </p>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: ProjectData;
  onCaseStudyClick: (p: ProjectData) => void;
  onZoomClick: (url: string, title: string) => void;
}> = ({ project, onCaseStudyClick, onZoomClick }) => {
  const { title, imageUrl, tag, link, caseStudy } = project;

  const handleClick = useCallback(() => {
    if (caseStudy) onCaseStudyClick(project);
    else if (link) window.open(link, '_blank', 'noopener,noreferrer');
  }, [caseStudy, link, project, onCaseStudyClick]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
  };

  return (
    <motion.article
      variants={fadeUp}
      className="flex flex-col border-r border-b border-[#1a1a1a] bg-[#0c0c0c] hover:bg-[#0f0f0f] hover:border-yellow-400/20 transition-all duration-300 group h-full cursor-pointer focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-inset relative overflow-hidden"
      role="article"
    >
      {/* Hover accent line */}
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-yellow-400 to-transparent group-hover:w-full transition-all duration-500" aria-hidden="true" />

      {/* Card Header */}
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${title} - ${caseStudy ? 'click to view case study' : 'click to open project'}`}
        className="flex items-start justify-between p-4 border-b border-[#1a1a1a] min-h-[72px] outline-none group-hover:border-[#1a1a1a] transition-colors"
      >
        <div className="flex-1">
          <h3 className="mono-font text-[11px] text-white font-semibold tracking-tight leading-relaxed uppercase pr-3 group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex gap-1.5 flex-wrap">
            {caseStudy && (
              <span className="inline-flex items-center gap-1 text-[9px] mono-font font-bold text-green-400/80 bg-green-400/10 px-2 py-1 rounded">
                <span aria-hidden="true">--</span> Case Study
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[9px] mono-font font-bold text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded">
              Featured
            </span>
          </div>
        </div>
        <div className="text-yellow-400 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-300 mt-0.5 flex-shrink-0 text-lg scale-125" aria-hidden="true">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Image */}
      <div className="aspect-[16/11] overflow-hidden bg-[#111] relative group/img">
        <img
          src={imageUrl}
          alt={`Screenshot of ${title}`}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700 grayscale group-hover:grayscale-0"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Tag */}
        {tag && (
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-yellow-400/30 px-2.5 py-1 mono-font text-[9px] font-semibold text-yellow-300 uppercase tracking-widest group-hover:border-yellow-400 transition-all duration-300">
            {tag}
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center gap-4 translate-y-4 group-hover/img:translate-y-0 transition-all duration-300">
            {caseStudy && (
              <button
                onClick={(e) => { e.stopPropagation(); onCaseStudyClick(project); }}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-sm mono-font font-bold text-[12px] tracking-widest uppercase shadow-lg whitespace-nowrap transition-colors"
                aria-label={`View case study for ${title}`}
              >
                View Case Study
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onZoomClick(imageUrl, title); }}
              className="bg-transparent border border-yellow-400 hover:bg-yellow-400/10 text-yellow-400 hover:text-yellow-300 p-3 rounded-full transition-all flex items-center gap-2"
              aria-label={`Zoom in on ${title} screenshot`}
            >
              <ZoomIn size={18} aria-hidden="true" />
              <span className="mono-font text-[11px] font-bold uppercase tracking-widest">Fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const TechCard: React.FC<{
  name: string;
  category: string;
  logo?: string;
  Icon?: LucideIcon;
}> = ({ name, category, logo, Icon }) => (
  <motion.div
    variants={fadeUp}
    className="min-h-[132px] sm:min-h-[146px] border-r border-b border-[#1a1a1a] bg-[#0c0c0c] p-4 sm:p-5 flex flex-col justify-between hover:bg-[#111] transition-colors group"
    role="listitem"
    aria-label={`${name} - ${category}`}
  >
    <span className="mono-font text-[10px] leading-tight text-neutral-500 uppercase tracking-tight">{name}</span>
    <div className="flex-1 flex items-center justify-center py-2">
      {logo ? (
        <img
          src={logo}
          alt=""
          className="w-9 h-9 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          loading="lazy"
          aria-hidden="true"
        />
      ) : Icon ? (
        <Icon size={36} strokeWidth={1.5} className="text-neutral-400 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" aria-hidden="true" />
      ) : null}
    </div>
    <span className="mono-font text-[9px] text-neutral-700 self-end uppercase tracking-widest">{category}</span>
  </motion.div>
);

const Testimonial: React.FC<{
  text: string;
  name: string;
  role: string;
  avatar: string;
  reverse?: boolean;
}> = ({ text, name, role, avatar, reverse }) => (
  <motion.blockquote
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''} max-w-3xl mx-auto`}
  >
    <div className="flex-shrink-0">
      <div className="w-16 h-16 rounded-full border border-[#2a2a2a] overflow-hidden grayscale" aria-hidden="true">
        <img src={avatar} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
    <div className="flex-1 bg-[#0c0c0c] border border-[#1e1e1e] p-7 md:p-10 relative">
      <span className="absolute top-3 right-5 text-5xl text-[#1a1a1a] font-serif leading-none select-none" aria-hidden="true">"</span>
      <p className="mono-font text-[14px] text-neutral-400 leading-relaxed mb-5 italic">{text}</p>
      <footer>
        <cite className="mono-font not-italic">
          <span className="text-white font-bold text-[13px]">{name}</span>
          <span className="text-neutral-600 text-[12px]">, {role}</span>
        </cite>
      </footer>
    </div>
  </motion.blockquote>
);

// - Main Export -

export const MainContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ container: mainRef });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    mass: 0.28,
  });
  const progressOpacity = useTransform(smoothScrollProgress, [0, 0.012], [0, 1]);
  const heroParallaxY = useTransform(smoothScrollProgress, [0, 0.075], [0, -34]);
  const heroParallaxOpacity = useTransform(smoothScrollProgress, [0, 0.045, 0.09], [1, 0.88, 0.48]);

  const openCaseStudy = useCallback((project: ProjectData) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeCaseStudy = useCallback(() => {
    setIsModalOpen(false);
    lastFocusedRef.current?.focus();
  }, []);

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="flex-1 bg-[#0a0a0a] flex relative overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]"
      tabIndex={-1}
    >

      <motion.div
        style={{ scaleX: smoothScrollProgress, opacity: progressOpacity }}
        className="scroll-progress fixed top-[52px] left-0 md:left-72 right-0 z-40 h-[2px] origin-left bg-yellow-400 pointer-events-none"
        aria-hidden="true"
      />

      {/* Line Numbers */}
      <div
        className="w-14 border-r border-[#1a1a1a] flex-shrink-0 py-8 hidden sm:flex justify-center items-start select-none bg-[#0a0a0a] z-10"
        aria-hidden="true"
      >
        <pre className="line-numbers mono-font text-[11px] leading-[1.8] opacity-70 m-0 w-full text-center whitespace-pre">
          {LINE_NUMBERS}
        </pre>
      </div>

      <div className="flex-1 min-w-0 [container-type:inline-size]">

        {/* - Hero - */}
        <section
          id="home"
          className="p-8 lg:px-16 lg:py-24 min-h-[68vh] flex flex-col justify-center border-b border-[#1a1a1a]"
          aria-label="Introduction"
        >
          <motion.div style={{ y: heroParallaxY, opacity: heroParallaxOpacity }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-10 text-[12px] italic" aria-hidden="true">
                {'/* Hero section */'}
              </motion.div>

              <motion.div variants={headingReveal} className="motion-heading mb-10">
                <h2 className="text-[42px] md:text-[clamp(36px,11cqw,96px)] font-extrabold text-white leading-[0.87] tracking-tighter uppercase whitespace-nowrap">
                  AI Automation
                </h2>
                <h2 className="text-[clamp(21px,6.8cqw,78px)] font-extrabold text-neutral-700 leading-[0.87] tracking-tighter uppercase whitespace-nowrap">
                  & Full-Stack Developer
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl mono-font leading-relaxed text-neutral-500 max-w-2xl mb-10">
                I'm an AI automation and full-stack developer. I build intelligent workflows, modern web apps, and mobile products people actually use.
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  const main = document.querySelector('main');
                  if (el && main) main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-4 bg-yellow-400 hover:bg-yellow-300 text-black mono-font font-bold text-[11px] tracking-widest uppercase transition-all duration-200 min-h-[44px] shadow-lg hover:shadow-yellow-400/50 hover:shadow-2xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 group"
              >
                <span>View Projects</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-me');
                  const main = document.querySelector('main');
                  if (el && main) main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-4 border-2 border-neutral-600 hover:border-white text-neutral-400 hover:text-white mono-font font-bold text-[11px] tracking-widest uppercase transition-all duration-200 min-h-[44px] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 group"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
              </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* - Impact Stats - */}
        <section
          className="p-8 lg:px-16 lg:py-16 border-b border-[#1a1a1a]"
          aria-labelledby="impact-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: 'AI', desc: 'Automation Systems' },
                { label: 'Web', desc: 'Full-Stack Apps' },
                { label: 'API', desc: 'Connected Workflows' },
                { label: 'Mobile', desc: 'First Products' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.label}</div>
                  <div className="mono-font text-[11px] text-neutral-600 uppercase tracking-widest">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* - Featured Work - */}
        <section
          id="work"
          className="p-6 lg:px-16 lg:py-16 border-b border-[#1a1a1a]"
          aria-labelledby="work-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-10 text-[12px] italic" aria-hidden="true">
              {'/* Featured work */'}
            </motion.div>

            {/* Zapier Projects */}
            <div className="mb-16">
              <motion.h3 variants={fadeUp} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-yellow-400">#</span> Zapier Automations
              </motion.h3>
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-l border-t border-[#1a1a1a]"
                role="list"
                aria-label="Zapier projects"
              >
                {PROJECTS.filter(p => p.tag?.includes('Zapier') && !(p.tag?.includes('Make') && !p.tag?.startsWith('Zapier'))).map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onCaseStudyClick={openCaseStudy}
                    onZoomClick={(url, title) => setZoomedImage({ url, title })}
                  />
                ))}
              </motion.div>
            </div>

            {/* Make.com Projects */}
            <div className="mb-16">
              <motion.h3 variants={fadeUp} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-yellow-400">#</span> Make.com Automations
              </motion.h3>
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-l border-t border-[#1a1a1a]"
                role="list"
                aria-label="Make.com projects"
              >
                {PROJECTS.filter(p => p.tag?.includes('Make') && !p.tag?.startsWith('Zapier')).map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onCaseStudyClick={openCaseStudy}
                    onZoomClick={(url, title) => setZoomedImage({ url, title })}
                  />
                ))}
              </motion.div>
            </div>

            {/* n8n Projects */}
            <div className="mb-16">
              <motion.h3 variants={fadeUp} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-yellow-400">#</span> n8n Automations
              </motion.h3>
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-l border-t border-[#1a1a1a]"
                role="list"
                aria-label="n8n projects"
              >
                {PROJECTS.filter(p => p.tag?.includes('n8n')).map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onCaseStudyClick={openCaseStudy}
                    onZoomClick={(url, title) => setZoomedImage({ url, title })}
                  />
                ))}
              </motion.div>
            </div>

          </motion.div>
        </section>

        {/* - Low-Code Dev - */}
        <section
          id="frontend-dev"
          className="p-6 sm:p-8 lg:px-16 lg:py-20 border-b border-[#1a1a1a] overflow-hidden"
          aria-labelledby="frontend-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            <div className="max-w-5xl mb-10 lg:mb-12 pb-9 lg:pb-10 border-b border-[#242424]">
              <motion.div variants={fadeUp} className="flex items-center justify-between gap-6 mb-6">
                <p className="mono-font text-[10px] text-yellow-400 uppercase tracking-widest font-bold">
                  Product Collection
                </p>
                <p className="mono-font text-[10px] text-neutral-700 uppercase tracking-widest tabular-nums" aria-label="Two live travel products">
                  02 / Live Products
                </p>
              </motion.div>
              <motion.h2 id="frontend-heading" variants={headingReveal} className="motion-heading text-[clamp(32px,5vw,64px)] font-bold text-white tracking-tighter leading-[0.95] mb-5">
                Travel Products in Practice
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-400 max-w-3xl">
                Migo supports the full trip journey. Laag Bukidnon makes local discovery and planning easier.
              </motion.p>
            </div>

            <motion.article variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <motion.div variants={fadeUp} className="lg:col-span-4 lg:pt-6">
                <p className="mono-font text-[11px] text-yellow-400 uppercase tracking-widest font-bold mb-5">
                  Local Tourism Platform
                </p>
                <h3 className="text-[clamp(34px,5vw,58px)] font-bold text-white tracking-tighter leading-[0.95] mb-6">
                  {LAAG_BUKIDNON_PROJECT.title}
                </h3>
                <p className="text-[15px] mono-font leading-relaxed text-neutral-400 mb-6">
                  {LAAG_BUKIDNON_PROJECT.description}
                </p>
                <p className="border-l border-[#3a3a3a] pl-4 mono-font text-[11px] leading-relaxed text-neutral-600 mb-9">
                  Independent destination platform designed to turn local discovery into a practical trip-planning path.
                </p>

                <a
                  href={LAAG_BUKIDNON_PROJECT.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 active:translate-y-px text-black px-6 py-4 mono-font font-bold text-[11px] uppercase tracking-widest transition-all duration-200 min-h-[44px] whitespace-nowrap group"
                  aria-label="Visit the live Laag Bukidnon website"
                >
                  Visit Live Site
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-8 min-w-0">
                <div className="flex items-center justify-between gap-4 border-y border-[#242424] py-3 mb-5">
                  <p className="mono-font text-[9px] text-neutral-500 uppercase tracking-widest">
                    Responsive destination experience
                  </p>
                  <p className="mono-font text-[9px] text-neutral-700 uppercase tracking-widest whitespace-nowrap">
                    Desktop / Mobile
                  </p>
                </div>

                <div className="relative sm:pb-14">
                  <a
                    href={LAAG_BUKIDNON_PROJECT.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block sm:w-[92%] border border-[#2b2b2b] bg-[#101010] overflow-hidden group shadow-[0_24px_55px_-32px_rgba(0,0,0,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                    aria-label="Open Laag Bukidnon desktop experience"
                  >
                    <img
                      src="/images/laag-bukidnon-desktop.jpg"
                      alt="Laag Bukidnon desktop homepage showing the Bukidnon landscape and travel navigation"
                      width="1440"
                      height="1000"
                      className="w-full aspect-[16/10] object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.012] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
                      loading="lazy"
                    />
                  </a>

                  <a
                    href={LAAG_BUKIDNON_PROJECT.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[48%] ml-auto mt-4 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 sm:w-[27%] border border-[#343434] bg-[#101010] overflow-hidden group shadow-[0_24px_55px_-24px_rgba(0,0,0,0.92)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                    aria-label="Open Laag Bukidnon mobile experience"
                  >
                    <img
                      src="/images/laag-bukidnon-mobile.jpg"
                      alt="Laag Bukidnon mobile homepage with destination search and responsive navigation"
                      width="430"
                      height="932"
                      className="w-full h-auto object-contain opacity-95 group-hover:opacity-100 group-hover:scale-[1.012] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
                      loading="lazy"
                    />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-7 pt-8 border-t border-[#242424]">
                {LAAG_BUKIDNON_PROJECT.capabilities.map((capability) => (
                  <motion.div key={capability.label} variants={fadeUp} className="grid grid-cols-[88px_minmax(0,1fr)] md:grid-cols-1 gap-3 items-start">
                    <span className="mono-font text-[11px] font-bold text-white uppercase tracking-wide">
                      {capability.label}
                    </span>
                    <p className="mono-font text-[12px] leading-relaxed text-neutral-500 max-w-[30ch]">
                      {capability.detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <ProductProof project={LAAG_BUKIDNON_PROJECT} className="lg:col-span-12" />
            </motion.article>

            <motion.article variants={stagger} className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-[#242424] grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start">
              <motion.div variants={fadeUp} className="xl:col-span-4 xl:pt-5">
                <p className="mono-font text-[11px] text-yellow-400 uppercase tracking-widest font-bold mb-5">
                  AI Travel Companion
                </p>
                <h3 className="text-[clamp(42px,6vw,68px)] font-bold text-white tracking-tighter leading-[0.95] mb-6">
                  {MIGO_PROJECT.title}
                </h3>
                <p className="text-[15px] mono-font leading-relaxed text-neutral-400 max-w-[50ch] mb-6">
                  {MIGO_PROJECT.description}
                </p>
                <p className="border-l border-[#3a3a3a] pl-4 mono-font text-[11px] leading-relaxed text-neutral-600 mb-9">
                  {MIGO_PROJECT.note}
                </p>

                <div className="flex flex-col sm:flex-row xl:flex-col min-[1650px]:flex-row gap-3 items-stretch sm:items-start xl:items-stretch min-[1650px]:items-start">
                  <a
                    href={MIGO_PROJECT.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto xl:w-full min-[1650px]:w-auto items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 active:translate-y-px text-black px-6 py-4 mono-font font-bold text-[11px] uppercase tracking-widest transition-all duration-200 min-h-[44px] whitespace-nowrap group"
                    aria-label="Visit the live Migo app"
                  >
                    View Live Site
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/dionerazedev/migo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto xl:w-full min-[1650px]:w-auto items-center justify-center gap-3 border border-[#3a3a3a] hover:border-neutral-300 active:translate-y-px text-neutral-300 hover:text-white px-6 py-4 mono-font font-bold text-[11px] uppercase tracking-widest transition-all duration-200 min-h-[44px] whitespace-nowrap group"
                    aria-label="View the Migo source code on GitHub"
                  >
                    View Source
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="xl:col-span-8 min-w-0">
                <MigoPosterShowcase
                  posters={MIGO_PROJECT.posters}
                  onPreview={(url, title) => setZoomedImage({ url, title })}
                />
              </motion.div>

              <div id="migo-case-study" className="xl:col-span-12 scroll-mt-8">
                <ProductProof project={MIGO_PROJECT} />
              </div>
            </motion.article>
          </motion.div>
        </section>

        {/* - Digital Experiences - */}
        <section
          id="digital-experiences"
          className="p-6 sm:p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a] overflow-hidden"
          aria-labelledby="digital-experiences-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            <div className="max-w-5xl mb-12 lg:mb-16">
              <motion.h2 id="digital-experiences-heading" variants={headingReveal} className="motion-heading text-[clamp(32px,5vw,64px)] font-bold text-white tracking-tighter leading-[0.95] mb-5">
                Digital Experiences in Practice
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-400 max-w-3xl">
                Selected frontend experiences built around strong visual systems, responsive interaction, and practical product functionality.
              </motion.p>
            </div>

            <motion.article variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div variants={fadeUp} className="lg:col-span-4 lg:pt-6">
                <p className="mono-font text-[11px] text-yellow-400 uppercase tracking-widest font-bold mb-5">
                  Luxury Real Estate Concept
                </p>
                <h3 className="text-[clamp(38px,5vw,62px)] font-bold text-white tracking-tighter leading-[0.95] mb-6">
                  {NARRA_ESTATES_PROJECT.title}
                </h3>
                <p className="text-[15px] mono-font leading-relaxed text-neutral-400 mb-6">
                  {NARRA_ESTATES_PROJECT.description}
                </p>
                <p className="border-l border-[#3a3a3a] pl-4 mono-font text-[11px] leading-relaxed text-neutral-600 mb-9">
                  Fictional concept project created for design and development demonstration.
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col min-[1500px]:flex-row gap-3 items-start">
                  <a
                    href={NARRA_ESTATES_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 active:translate-y-px text-black px-6 py-4 mono-font font-bold text-[11px] uppercase tracking-widest transition-all duration-200 min-h-[44px] whitespace-nowrap group"
                    aria-label="Visit the live Narra Estates website"
                  >
                    Visit Live Site
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>
                  <a
                    href={NARRA_ESTATES_PROJECT.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 border border-[#3a3a3a] hover:border-neutral-300 active:translate-y-px text-neutral-300 hover:text-white px-6 py-4 mono-font font-bold text-[11px] uppercase tracking-widest transition-all duration-200 min-h-[44px] whitespace-nowrap group"
                    aria-label="View the Narra Estates source code on GitHub"
                  >
                    View Source
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-8 relative md:pb-16">
                <a
                  href={NARRA_ESTATES_PROJECT.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block md:w-[91%] border border-[#242424] bg-[#101010] overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                  aria-label="Open the Narra Estates Azure Cliffs homepage"
                >
                  <img
                    src="/images/projects/narra-estates-desktop.webp"
                    alt="Narra Estates luxury real estate concept homepage featuring Azure Cliffs"
                    width="1600"
                    height="900"
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.015] transition-all duration-500"
                    loading="lazy"
                  />
                </a>

                <a
                  href={`${NARRA_ESTATES_PROJECT.liveUrl}properties/azure-cliffs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 md:mt-0 md:absolute md:right-0 md:bottom-0 md:w-[42%] border border-[#2d2d2d] bg-[#101010] overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                  aria-label="Open the Narra Estates Azure Cliffs property detail"
                >
                  <img
                    src="/images/projects/narra-estates-detail.webp"
                    alt="Narra Estates Azure Cliffs property detail and architectural experience"
                    width="900"
                    height="600"
                    className="w-full aspect-[3/2] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                    loading="lazy"
                  />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-12 pt-8 border-t border-[#242424]">
                <p className="mono-font text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-5">Technology and capabilities</p>
                <ul className="flex flex-wrap gap-x-0 gap-y-3" aria-label="Narra Estates technology and capabilities">
                  {NARRA_ESTATES_PROJECT.technologies.map((technology, index) => (
                    <li key={technology} className="flex items-center mono-font text-[11px] font-bold text-neutral-300 uppercase tracking-wide">
                      {index > 0 && <span className="mx-3 text-neutral-700" aria-hidden="true">/</span>}
                      {technology}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.article>
          </motion.div>
        </section>

        {/* - Services & Offerings - */}
        <section
          id="services"
          className="relative p-6 sm:p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="services-heading"
        >
          <span id="what-i-do" className="absolute -top-16" aria-hidden="true" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={stagger}>
            <div className="max-w-5xl mb-12 lg:mb-16">
              <motion.h2 id="services-heading" variants={headingReveal} className="motion-heading text-[clamp(40px,6.5vw,76px)] font-bold text-white tracking-tighter leading-[0.94] mb-6 max-w-[12ch]">
                From workflow logic to shipped products.
              </motion.h2>
              <motion.p variants={fadeUp} className="mono-font text-[14px] leading-relaxed text-neutral-500 max-w-2xl">
                I design automation systems and full-stack applications, then connect the data, APIs, and AI behind them.
              </motion.p>
            </div>

            <motion.div variants={stagger} className="border-y border-[#242424]" role="list" aria-label="Core services">
              {PRIMARY_SERVICES.map((service) => (
                <motion.article
                  key={service.title}
                  variants={fadeUp}
                  className="group grid grid-cols-1 min-[1360px]:grid-cols-[64px_minmax(0,0.9fr)_minmax(340px,1.1fr)] gap-6 min-[1360px]:gap-10 py-9 lg:py-12 border-b border-[#242424] last:border-b-0 hover:bg-[#0d0d0d] transition-colors duration-300"
                  role="listitem"
                >
                  <div className="w-14 h-14 border border-[#2a2a2a] flex items-center justify-center text-neutral-500 group-hover:text-yellow-400 group-hover:border-yellow-400/40 transition-colors" aria-hidden="true">
                    <service.Icon size={25} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-[clamp(22px,2.8vw,34px)] font-bold text-white tracking-tight leading-tight mb-4">
                      {service.title}
                    </h3>
                    <p className="mono-font text-[13px] leading-relaxed text-neutral-500 max-w-[48ch]">
                      {service.description}
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 self-center" aria-label={`${service.title} deliverables`}>
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-3 mono-font text-[12px] leading-relaxed text-neutral-400">
                        <Check size={14} strokeWidth={1.5} className="text-yellow-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 lg:mt-20">
              <h3 className="text-[20px] font-bold text-white mb-3">Supporting capabilities</h3>
              <p className="mono-font text-[12px] leading-relaxed text-neutral-600 max-w-xl mb-8">
                Focused technical work that supports the core build without becoming a separate engagement.
              </p>

              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 border-t border-[#242424]" role="list" aria-label="Supporting services">
                {SUPPORTING_SERVICES.map((service, index) => (
                  <motion.article
                    key={service.title}
                    variants={fadeUp}
                    className={`group grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-7 border-b border-[#242424] ${index % 2 === 0 ? 'md:pr-8 md:border-r' : 'md:pl-8'}`}
                    role="listitem"
                  >
                    <service.Icon size={22} strokeWidth={1.5} className="text-neutral-600 group-hover:text-yellow-400 transition-colors mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-[15px] font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {service.title}
                      </h4>
                      <p className="mono-font text-[12px] text-neutral-500 leading-relaxed max-w-[46ch]">
                        {service.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* - About - */}
        <section
          id="about-me"
          className="relative p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a] overflow-hidden"
          aria-labelledby="about-heading"
        >
          {/* Decorative bg text */}
          <div className="absolute top-8 left-16 select-none pointer-events-none opacity-[0.04] flex flex-col gap-2" aria-hidden="true">
            <span className="text-[160px] font-black leading-none text-white tracking-tighter">EST.</span>
            <span className="text-[160px] font-black leading-none text-white tracking-tighter ml-24">2025</span>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* About me */'}
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <motion.h2 id="about-heading" variants={headingReveal} className="motion-heading text-[clamp(36px,5.5vw,64px)] font-bold mb-10 leading-tight tracking-tighter">
                  <span className="text-white">Automation</span>{' '}
                  <span className="text-neutral-600">Meets</span>
                  <br />
                  <span className="text-white">Full-Stack Products</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="mono-font text-[14px] md:text-[15px] font-bold leading-relaxed text-yellow-400 max-w-2xl mb-6">
                  Turning my passion for technology and travel into meaningful digital experiences.
                </motion.p>

                <div className="space-y-5 max-w-[68ch]">
                  <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-500">
                    I'm a 19-year-old AI automation and full-stack developer who loves building, exploring new ideas, and traveling to new places. I'm passionate about using AI and technology to solve real-world problems and create products that people can actually use.
                  </motion.p>
                  <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-500">
                    Projects like <strong className="font-bold text-neutral-300">Migo</strong> and <strong className="font-bold text-neutral-300">Laag Bukidnon</strong> bring my interests together—combining my love for travel with AI, automation, and full-stack development. I work with tools like React, Supabase, APIs, conversational AI, and workflow automation to turn ideas into functional digital experiences.
                  </motion.p>
                  <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-500">
                    For me, every project is an opportunity to learn, build something meaningful, and keep exploring—both in technology and around the world.
                  </motion.p>
                </div>
              </div>

              <motion.div variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="border border-[#1e1e1e] overflow-hidden group">
                  <img
                    src="/images/dione-profile.jpg"
                    alt="Dione Raze Oro, AI automation and full-stack developer based in Davao City, Philippines"
                    className="w-full aspect-square object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* - Tech Stack - */}
        <section
          id="tech-stack"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="stack-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Technical tools */'}
            </motion.div>
            <motion.h2 id="stack-heading" variants={headingReveal} className="motion-heading text-[clamp(24px,3.5vw,36px)] font-bold text-white uppercase tracking-tighter mb-10">
              Tech Stack
            </motion.h2>
            <motion.p variants={fadeUp} className="mono-font text-[13px] leading-relaxed text-neutral-500 max-w-2xl mb-14">
              A focused toolkit for building full-stack products, AI-powered workflows, and reliable integrations.
            </motion.p>

            <motion.div variants={stagger} className="space-y-12">
              {TECH_GROUPS.map((group, index) => (
                <motion.section key={group.label} variants={fadeUp} aria-labelledby={`tech-group-${index}`}>
                  <div className="border-t border-[#242424] pt-5 mb-5">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="mono-font text-[10px] text-yellow-400" aria-hidden="true">0{index + 1}</span>
                      <h3 id={`tech-group-${index}`} className="mono-font text-[13px] font-bold text-white uppercase tracking-wide">
                        {group.label}
                      </h3>
                    </div>
                    <p className="mono-font text-[11px] leading-relaxed text-neutral-600 max-w-xl pl-8">
                      {group.description}
                    </p>
                  </div>

                  <motion.div
                    variants={stagger}
                    className={`border-l border-t border-[#1a1a1a] grid ${group.gridClass}`}
                    role="list"
                    aria-label={`${group.label} technologies`}
                  >
                    {group.tools.map((tool) => (
                      <TechCard key={tool.name} {...tool} />
                    ))}
                  </motion.div>
                </motion.section>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* - Certifications - */}
        <section
          id="awards"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="certs-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Certifications & Credentials */'}
            </motion.div>
            <motion.h2 id="certs-heading" variants={headingReveal} className="motion-heading text-[clamp(24px,3.5vw,36px)] font-bold text-white uppercase tracking-tighter mb-12">
              Professional Credentials
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div variants={fadeUp} className="max-w-2xl">
                <h3 className="mono-font text-[12px] text-yellow-400 uppercase tracking-widest font-bold mb-6">Google Data Analytics Certificate</h3>
                <div className="border border-[#1e1e1e] overflow-hidden hover:border-yellow-400/30 transition-colors group">
                  <img
                    src="https://lh3.googleusercontent.com/d/1ZWdLal6W9PZFOdwtZA3G50xe2YA0pL2N"
                    alt="Google Data Analytics Professional Certificate"
                    className="w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="max-w-2xl">
                <h3 className="mono-font text-[12px] text-yellow-400 uppercase tracking-widest font-bold mb-6">Microsoft Office Specialist</h3>
                <div className="border border-[#1e1e1e] overflow-hidden hover:border-yellow-400/30 transition-colors group">
                  <img
                    src="https://lh3.googleusercontent.com/d/10Rr_eeyKontFn0v_aBNDNzTFN9MNb6rP"
                    alt="Microsoft Office Specialist Certificate"
                    className="w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* - Testimonials - */}
        <section
          id="client-s-word"
          className="relative p-8 lg:px-16 lg:py-32 border-b border-[#1a1a1a] overflow-hidden"
          aria-labelledby="feedback-heading"
        >
          <div className="absolute top-16 left-8 select-none pointer-events-none opacity-[0.04]" aria-hidden="true">
            <span className="text-[200px] font-black leading-none text-white tracking-tighter">WORDS</span>
          </div>
          <div className="relative z-10 text-center mb-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mono-font text-neutral-600 mb-10 text-[12px] italic" aria-hidden="true">
              {'/* Client Feedback */'}
            </motion.div>
            <motion.h2
              id="feedback-heading"
              variants={headingReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="motion-heading text-[clamp(56px,9vw,88px)] font-black text-white tracking-tighter uppercase"
            >
              Feedback
            </motion.h2>
          </div>

          <div className="space-y-20 relative z-10">
            <Testimonial
              text="Dione implemented AI-powered workflow automations that reduced our manual data processing by 40%. He is reliable and exceptionally detail-oriented."
              name="International Client"
              role="Operations Lead on Upwork"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Upwork&backgroundColor=1a1a1a"
            />
            <Testimonial
              text="The CRM synchronization and lead routing built by Dione have transformed our response times. Highly recommended for any scaling business."
              name="Strategic Partner"
              role="Founder at Tech Scaleup"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Founder&backgroundColor=1a1a1a"
              reverse
            />
          </div>
        </section>

        {/* - Contact - */}
        <section
          id="contact-me"
          className="p-8 lg:px-16 lg:py-24"
          aria-labelledby="contact-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Get in Touch */'}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <motion.h2 id="contact-heading" variants={headingReveal} className="motion-heading text-[clamp(48px,8vw,88px)] font-bold text-white leading-[0.88] tracking-tighter uppercase mb-10">
                  Build Smarter<br />
                  <span className="text-neutral-800">Digital Products</span>
                </motion.h2>

                <motion.div variants={fadeUp} className="space-y-5 mb-10">
                  {/* Primary CTA */}
                  <a
                    href="https://calendly.com/dioneoro11/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 bg-yellow-400 hover:bg-yellow-300 text-black mono-font font-bold text-[12px] px-6 py-4 min-h-[44px] uppercase tracking-wide transition-all duration-200 group shadow-lg hover:shadow-yellow-400/50 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                    aria-label="Schedule a 30-minute consultation call"
                  >
                    <span>Schedule a Call</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>

                  {/* Secondary CTAs */}
                  <div className="space-y-2">
                    <p className="text-[12px] mono-font text-neutral-600 uppercase tracking-widest font-bold mb-3">Or reach out directly:</p>
                    {[
                      { href: 'mailto:dioneraze.dev@gmail.com', label: 'Email', text: 'dioneraze.dev@gmail.com', Icon: Mail },
                      { href: '/dione-raze-oro-resume.pdf', label: 'Resume', text: 'Download Resume', Icon: Download, download: true },
                      { href: 'https://github.com/dionerazedev-commits', label: 'GitHub', text: 'GitHub Profile', Icon: Github },
                      { href: 'https://www.linkedin.com/in/dione-raze-oro-b274a8243/', label: 'LinkedIn', text: 'LinkedIn Profile', Icon: Linkedin },
                      { href: 'https://www.instagram.com/dnrze_/', label: 'Instagram', text: '@dnrze_', Icon: Instagram },
                      { href: 'https://www.tiktok.com/@raze.ventures', label: 'TikTok', text: '@raze.ventures', Icon: Music2 },
                      { href: 'https://www.facebook.com/raze.dodot/', label: 'Facebook', text: 'raze.dodot', Icon: Facebook },
                      { href: 'https://www.onlinejobs.ph/jobseekers/info/2465090', label: 'OnlineJobsPH', text: 'OnlineJobsPH Profile', Icon: Globe2 },
                      { href: 'https://www.upwork.com/freelancers/~019d50a01f575c8779', label: 'Upwork', text: 'Upwork Profile', Icon: BriefcaseBusiness },
                    ].map(({ href, label, text, Icon, download }) => (
                      <a
                        key={label}
                        href={href}
                        download={download || undefined}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 mono-font text-[13px] text-neutral-600 hover:text-white hover:bg-white/5 transition-all group py-3 px-3 min-h-[44px] border border-transparent hover:border-neutral-700"
                        aria-label={label}
                      >
                        <Icon size={16} aria-hidden="true" />
                        <span>{text}</span>
                        <ArrowUpRight size={12} className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-yellow-400" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="h-[640px] border border-[#1e1e1e] bg-[#0c0c0c] overflow-hidden">
                <iframe
                  src="https://calendly.com/dioneoro11/30min?embed_domain=portfolio&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0c0c0c&text_color=ffffff&primary_color=f5c842"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Schedule a consultation with Dione Raze Oro"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Modals */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={closeCaseStudy}
        project={selectedProject}
      />
      <ImageLightbox
        isOpen={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
        imageUrl={zoomedImage?.url ?? ''}
        title={zoomedImage?.title ?? ''}
      />
    </main>
  );
};
