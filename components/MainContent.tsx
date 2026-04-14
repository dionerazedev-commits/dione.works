import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const headingReveal = {
  hidden: { opacity: 0, y: 60, letterSpacing: '0.25em' },
  visible: {
    opacity: 1, y: 0, letterSpacing: '0em',
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0], staggerChildren: 0.02 },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectData[] = [
  {
    title: 'AI Content Repurposing',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ugBCixWhFkzd4NrFMaXzi4zAGp0_OdZz',
    tag: 'Zapier + Make.com',
    caseStudy: {
      overview: 'Automated Content Repurposing Engine built in both Zapier and Make.com. Transforms raw audio/video files into 2 blog posts, Instagram & LinkedIn posts, plus logging — fully no-code with AI transcription, generation, conditional paths, and multi-platform distribution.',
      problem: 'Content creators and teams spend 4–6 hours manually transcribing, rewriting, formatting, and posting each audio/video piece — leading to inconsistent output, burnout, delayed distribution, and missed reach across blogs and social channels.',
      solution: [
        'Trigger: New file in Google Drive / OneDrive folder',
        'AI transcription → Generate 2 unique blog variants',
        'Create platform-specific social posts (Instagram + LinkedIn)',
        'Log everything to Google Sheets',
        'Conditional Paths/Router: Filter by keywords or quality to control auto-posting',
        'Identical logic implemented in Zapier and Make.com with strong AI prompt engineering.',
      ],
      impact: [
        'Reduced repurposing time from hours to ~5–10 minutes of review',
        'Scaled output: 1 file → 2 blogs + 2 social posts + log automatically',
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
      problem: 'Sales teams receive real-time inbound leads but spend excessive time on manual enrichment, qualification, prioritization, and personalized outreach. Without automation, low-fit leads waste resources, high-value opportunities get delayed, and outreach lacks consistency — resulting in inefficient pipelines and lost revenue.',
      solution: [
        'Webhook trigger receives real-time lead data (name, email, company, size, website, source)',
        'Apollo.io enrichment: revenue, employee count, industry, tech stack via API',
        'Scoring via Formatter + Paths by Zapier — based on company size, revenue bands, industry ICP match',
        'High-priority path: save to SQL database, notify team, generate AI email draft',
        'Low-priority path: basic notification or log only',
        'AI by Zapier (OpenAI/Gemini) creates short, context-aware outreach emails',
      ],
      impact: [
        'Reduced manual lead processing from hours to seconds per lead',
        'Automatically prioritized high-fit leads — focusing sales on the top 20–30% conversion potential',
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
      problem: 'Manual handling of incoming email attachments was time-consuming and error-prone — requiring constant Gmail monitoring, manual renaming, uploading to the correct folder, and tracking. This led to delays, misfiled documents, lost time, and inconsistent organization.',
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
        'Reduced manual processing from 5–10 minutes per attachment to near-zero hands-on time',
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
      problem: "Manual Xero report exports required logging in, navigating Reports > Account Transactions, filtering for the desired period, downloading CSV, and uploading to Asana — repetitive, time-consuming, and prone to oversight.",
      solution: [
        'Trigger: Asana Watch Completed Tasks',
        'Fetch Data: Xero API call to retrieve transaction-level data for the last calendar year',
        'Process & Format: Router, Iterators, Google Sheets staging, Text Aggregator to structure CSV',
        'Attach: Asana Upload Attachment — CSV attached directly to the completed task',
        'Cleanup: Clear temp Google Sheets ranges and add logging/sleeps for reliability',
      ],
      impact: [
        'Eliminated 10–20 minutes of manual Xero navigation per completed task',
        'CSV mirrors exact Xero report format — zero formatting errors, reliable audit trail',
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
      overview: 'A fully automated restaurant booking and inquiry system built with n8n that handles WhatsApp messages, AI-powered intent routing, booking management via Google Sheets, and multi-channel responses. Processes inquiries 24/7 with zero manual intervention—from customer message to confirmed booking automatically.',
      problem: 'Restaurant staff waste hours answering the same questions outside business hours. Booking inquiries get missed, customers get ignored, and staff spends time manually managing bookings, cancellations, and complaints — leading to lost reservations, frustrated customers, and operational chaos.',
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
        'Eliminated manual booking entry — 5+ API calls per booking automated',
        'Handles cancellations, new bookings, and complaints autonomously',
        '24/7 availability: never miss a customer inquiry again',
        'Conversation memory provides customer context on every interaction',
        'Staff only handles escalations — routine work fully automated',
        'Confirmed bookings written directly to Google Sheets',
      ],
    },
  },
  {
    title: 'AI Jobs Scraper + Resume Optimizer System',
    imageUrl: 'https://lh3.googleusercontent.com/d/1iENI_54wQ7DnJ3xrRj1a6AAgFUIU9Kse',
    tag: 'n8n + AI',
    caseStudy: {
      overview: 'Built with n8n. An intelligent automation pipeline that monitors incoming job requests via Messaging, scrapes tailored job listings, uses AI to customize resumes for each role, stores optimized versions in Google Drive, drafts personalized application emails, and sends completion reports — fully automated.',
      problem: 'Manual job applications are highly repetitive and inefficient. Searching for listings, tailoring resumes to match job descriptions, organizing files, and writing customized emails take hours per application — leading to fatigue, inconsistent tailoring, and missed opportunities.',
      solution: [
        'Triggers on Messaging job requests',
        'Scrapes and filters relevant job postings',
        'Analyzes job descriptions with AI to tailor resumes (keyword optimization, skill highlighting, ATS-friendly)',
        'Saves customized resumes to Google Drive with clear naming conventions',
        'Generates draft application emails',
        'Notifies results via Messaging',
      ],
      impact: [
        'Reduced application time from hours to minutes per job — enabling 10x more applications',
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
      overview: 'A fully autonomous, webhook-triggered AI agent built with n8n that handles incoming customer inquiries and applications. Classifies intent, answers FAQs in real time, extracts and structures application data, saves records cleanly, and sends personalized confirmation emails — all without human involvement.',
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
        '100% structured data collection — eliminated missed or incomplete submissions',
        'Removed 80–95% of repetitive inquiry/application handling work',
        'Instant, consistent, professional communication → higher satisfaction and trust',
      ],
    },
  },
  {
    title: 'AI Voice Receptionist & Dynamic Appointment Manager',
    imageUrl: 'https://lh3.googleusercontent.com/d/1n929yATdP0dtjO1ZEZoCRHvO1c9U6bUo',
    tag: 'n8n + Voice AI',
    caseStudy: {
      overview: 'A production-grade, fully autonomous AI receptionist built with n8n exposing multiple webhook/API endpoints to handle real-time appointment workflows. Checks calendar availability, books new slots, updates or reschedules existing appointments, processes cancellations, and stores call recordings + metadata in Airtable — all without human intervention.',
      problem: 'Traditional appointment scheduling via phone suffered from: long wait times and after-hours unavailability; human errors in double-booking; high staff burden for routine tasks; and limited scalability during peak demand — leading to lost bookings and frustrated customers.',
      solution: [
        'Get Availability — Real-time slot checking across calendars',
        'Book Appointment — Validates input, creates calendar event, confirms via voice/text',
        'Update Appointment — Modifies existing bookings with conflict detection',
        'Cancel Appointment — Safely deletes/cancels slots and notifies parties',
        'Call Logging — Automatically captures recordings and metadata in Airtable',
      ],
      impact: [
        '24/7 instant booking & management — no more missed after-hours opportunities',
        'Eliminated 90–100% of routine phone and scheduling work',
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
      overview: 'A completely autonomous pipeline built with n8n that turns high-level ideas into ready-to-watch short-form ASMR videos and publishes them across platforms. Auto-generates creative prompts, renders videos using AI, validates output quality, converts formats, adds metadata, and uploads directly to YouTube and Facebook — fully hands-free.',
      problem: 'Creating and distributing short-form ASMR content is extremely labor-intensive: manually writing detailed prompts; waiting for renders; checking quality; editing/exporting in correct formats; and uploading with metadata to multiple platforms — limiting output and causing burnout.',
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
        '10–30× increase in weekly content output',
        'Eliminated 95%+ of manual creative and publishing labor',
        'Enables rapid experimentation and sustained high-frequency posting',
      ],
    },
  },
];

const FRONTEND_PROJECTS = [
  {
    title: 'BookWise Pickleball',
    link: 'https://book-wise-pickleball.vercel.app/',
    description: 'Modern booking and reservation platform for sports facilities. Users can schedule court reservations, manage availability, and streamline bookings through a clean responsive interface.',
  },
  {
    title: 'Flow Invoice',
    link: 'https://flow-invoice-kit-khq6.vercel.app/',
    description: 'Lightweight invoicing tool for generating professional invoices quickly. Structured layouts, automated calculations, and export-ready invoice formats for freelancers and businesses.',
  },
  {
    title: 'FlowMetrics Dashboard',
    link: 'https://flowmetrics-saas-sim.vercel.app/',
    description: 'SaaS-style analytics and automation dashboard to monitor workflows, track KPIs, and manage automated processes. Built for operational insights and real-time performance monitoring.',
  },
  {
    title: 'RedditOps Dashboard',
    link: 'https://reddit-ops-psi.vercel.app/',
    description: 'Operations dashboard for monitoring Reddit community metrics, moderation activity, and engagement trends. Helps teams manage community growth and operational workflows.',
  },
  {
    title: 'Nexus Analytics Platform',
    link: 'https://nexus-analytics-zeta.vercel.app/',
    description: 'Data analytics platform visualizing business metrics through modern dashboards and interactive components. Built to help teams understand trends, performance, and operational insights.',
  },
];

const TECH_STACK = [
  { name: 'Zapier', category: 'Automate', logo: 'https://cdn.simpleicons.org/zapier/FF6719' },
  { name: 'Make.com', category: 'Automate', logo: 'https://cdn.simpleicons.org/make/6D28D9' },
  { name: 'n8n', category: 'Automate', logo: 'https://cdn.simpleicons.org/n8n/FF6D5A' },
  { name: 'Airtable', category: 'Data', logo: 'https://cdn.simpleicons.org/airtable/18BFFF' },
  { name: 'Supabase', category: 'Data', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Google Sheets', category: 'Data', logo: 'https://cdn.simpleicons.org/googlesheets/34A853' },
  { name: 'PostgreSQL', category: 'Data', logo: 'https://cdn.simpleicons.org/postgresql/336791' },
  { name: 'Google WS', category: 'Suite', logo: 'https://lh3.googleusercontent.com/d/15VMe3gS36JAjrQ9UMJBsO3xPTPmYKMH7' },
  { name: 'Gmail', category: 'Suite', logo: 'https://cdn.simpleicons.org/gmail/EA4335' },
  { name: 'Google Drive', category: 'Suite', logo: 'https://cdn.simpleicons.org/googledrive/4285F4' },
  { name: 'GoHighLevel', category: 'CRM', logo: 'https://lh3.googleusercontent.com/d/1dPxIfIDrY3drVBS30lwOf8fg_7UsFA4k' },
  { name: 'Apollo.io', category: 'CRM', logo: 'https://cdn.simpleicons.org/apollo/000000', whiteBg: true },
  { name: 'Xero', category: 'Finance', logo: 'https://cdn.simpleicons.org/xero/003B5C' },
  { name: 'Base44', category: 'Data', logo: 'https://lh3.googleusercontent.com/d/1ThbF1QMghL4wukffYLVHcoIy95YG8DnM', whiteBg: true },
  { name: 'Lovable', category: 'Low-Code', logo: 'https://lh3.googleusercontent.com/d/121v3K3Tv17wjguxy66RiQubeJ-_1pj94', whiteBg: true },
  { name: 'Asana', category: 'Project', logo: 'https://cdn.simpleicons.org/asana/F06B66' },
  { name: 'Calendly', category: 'Schedule', logo: 'https://cdn.simpleicons.org/calendly/006BFF' },
  { name: 'OpenAI', category: 'AI', logo: 'https://lh3.googleusercontent.com/d/1GMkcA0JzpaxvV4Jo7orXs_kQI1c0ZB8n' },
  { name: 'Claude', category: 'AI', logo: 'https://lh3.googleusercontent.com/d/1Hv-oN911Nij_AEBCknNvVcomm_sgv3lD' },
  { name: 'Gemini', category: 'AI', logo: 'https://lh3.googleusercontent.com/d/1nrFbIXVW5pN6UlAm-N9kK8F3v5D0Z0vK' },
  { name: 'JotForm', category: 'Forms', logo: 'https://lh3.googleusercontent.com/d/1-LtRBIHqmnLW60nC8SkjwvXN7KAEKFXY' },
  { name: 'Mailgun', category: 'Email', logo: 'https://cdn.simpleicons.org/mailgun/E74C3C' },
  { name: 'Webhook', category: 'API', logo: 'https://lh3.googleusercontent.com/d/15uSLQl14DqvU6479kRZlYqq-08O6hyi9' },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

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
                          <span className="text-yellow-400 flex-shrink-0 mt-[3px]" aria-hidden="true">—</span>
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
        aria-label={`${title} — ${caseStudy ? 'click to view case study' : 'click to open project'}`}
        className="flex items-start justify-between p-4 border-b border-[#1a1a1a] min-h-[72px] outline-none group-hover:border-[#1a1a1a] transition-colors"
      >
        <div className="flex-1">
          <h3 className="mono-font text-[11px] text-white font-semibold tracking-tight leading-relaxed uppercase pr-3 group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex gap-1.5 flex-wrap">
            {caseStudy && (
              <span className="inline-flex items-center gap-1 text-[9px] mono-font font-bold text-green-400/80 bg-green-400/10 px-2 py-1 rounded">
                <span aria-hidden="true">✓</span> Case Study
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

const FrontendCard: React.FC<{ title: string; description: string; link: string }> = ({ title, description, link }) => (
  <motion.a
    variants={fadeUp}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col border border-[#1e1e1e] bg-[#0c0c0c] hover:border-[#2a2a2a] hover:bg-[#0f0f0f] transition-all group h-full p-7 no-underline"
    aria-label={`${title} — open live demo`}
  >
    <div className="flex justify-between items-start mb-5 gap-3">
      <h3 className="text-[17px] font-bold text-white uppercase tracking-tighter leading-none">{title}</h3>
      <div className="text-yellow-400 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
        <ArrowUpRight size={20} />
      </div>
    </div>
    <p className="mono-font text-[12px] text-neutral-500 leading-relaxed flex-1">{description}</p>
    <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#1a1a1a]">
      <span className="mono-font text-[10px] text-neutral-600 uppercase tracking-widest group-hover:text-neutral-400 transition-colors flex items-center gap-1.5">
        Live Demo <ArrowUpRight size={10} aria-hidden="true" />
      </span>
      <div className="w-2 h-2 rounded-full bg-yellow-400/15 group-hover:bg-yellow-400 transition-colors" aria-hidden="true" />
    </div>
  </motion.a>
);

const TechCard: React.FC<{
  name: string;
  category: string;
  logo: string;
  whiteBg?: boolean;
}> = ({ name, category, logo, whiteBg }) => (
  <motion.div
    variants={fadeUp}
    className="aspect-square border-r border-b border-[#1a1a1a] bg-[#0c0c0c] p-5 flex flex-col justify-between hover:bg-[#111] transition-colors group"
    role="listitem"
    aria-label={`${name} — ${category}`}
  >
    <span className="mono-font text-[10px] text-neutral-600 uppercase tracking-tight">{name}</span>
    <div className="flex-1 flex items-center justify-center py-2">
      <img
        src={logo}
        alt={`${name} logo`}
        className={`w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ${whiteBg ? 'bg-white rounded-md p-1.5' : ''}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
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

// ─── Main Export ──────────────────────────────────────────────────────────────

export const MainContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openCaseStudy = useCallback((project: ProjectData) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeCaseStudy = useCallback(() => {
    setIsModalOpen(false);
    lastFocusedRef.current?.focus();
  }, []);

  // All line numbers that scroll with the page
  const lines = Array.from({ length: 570 }, (_, i) => i + 1);

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="flex-1 bg-[#0a0a0a] flex relative overflow-y-auto"
      tabIndex={-1}
    >

      {/* Line Numbers */}
      <div
        className="w-14 border-r border-[#1a1a1a] flex-shrink-0 py-8 hidden sm:flex flex-col items-center select-none bg-[#0a0a0a] z-10"
        aria-hidden="true"
      >
        {lines.map((n) => (
          <div key={n} className="line-numbers mono-font text-[11px] leading-[1.8] opacity-70">{n}</div>
        ))}
      </div>

      <div className="flex-1 min-w-0">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          id="home"
          className="p-8 lg:px-16 lg:py-24 min-h-[68vh] flex flex-col justify-center border-b border-[#1a1a1a]"
          aria-label="Introduction"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-10 text-[12px] italic" aria-hidden="true">
              {'/* Hero section */'}
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="text-[clamp(48px,8vw,96px)] font-extrabold text-white leading-[0.87] tracking-tighter uppercase">
                AI Automation
              </h2>
              <h2 className="text-[clamp(48px,8vw,96px)] font-extrabold text-neutral-700 leading-[0.87] tracking-tighter uppercase">
                & Low-Code Dev
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg md:text-xl mono-font leading-relaxed text-neutral-500 max-w-2xl mb-10">
              I build automation systems, dashboards, and workflows that eliminate manual work and scale your operations.
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
                <span>View Work</span>
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
        </section>

        {/* ── Impact Stats ──────────────────────────────────────────────────── */}
        <section
          className="p-8 lg:px-16 lg:py-16 border-b border-[#1a1a1a]"
          aria-labelledby="impact-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: '80-95%', desc: 'Time Saved' },
                { label: '24/7', desc: 'Automation' },
                { label: '8+', desc: 'Projects' },
                { label: '100%', desc: 'Autonomous' },
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

        {/* ── Services ─────────────────────────────────────────────────────── */}
        <section
          id="what-i-do"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="services-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Services */'}
            </motion.div>

            <div className="space-y-20">
              {[
                {
                  label: '01. AI & Automation',
                  items: ['Workflow Automation Architecture', 'AI Tool Integration', 'Prompt Engineering', 'Process Optimization Audit', 'Content Summarization Automations', 'Data Cleaning & Transformation'],
                },
                {
                  label: '02. Low-Code Development',
                  items: ['Modern Web Application Development', 'SaaS Dashboard Interfaces', 'Responsive UI / Mobile-First Design', 'Data Visualization Interfaces', 'API Integration for Low-Code Systems', 'Interactive User Experiences', 'Product Landing Pages', 'Booking & Reservation Platforms', 'Analytics & Operations Dashboards'],
                },
              ].map((group) => (
                <div key={group.label} className="space-y-8">
                  <motion.h2 variants={fadeUp} className="text-[clamp(24px,3.5vw,38px)] font-bold text-white uppercase tracking-tighter">
                    {group.label}
                  </motion.h2>
                  <motion.ul
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-10"
                    role="list"
                  >
                    {group.items.map((item, i) => (
                      <motion.li
                        key={i}
                        variants={fadeUp}
                        className="flex items-start gap-3 mono-font text-[13px] text-neutral-500 leading-relaxed border-b border-[#141414] pb-3 hover:text-neutral-300 transition-colors"
                      >
                        <span className="text-neutral-700 mt-0.5 flex-shrink-0" aria-hidden="true">—</span>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Featured Work ─────────────────────────────────────────────────── */}
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

        {/* ── Low-Code Dev ─────────────────────────────────────────────────── */}
        <section
          id="frontend-dev"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="frontend-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Low-Code Development Projects */'}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-4">
                <motion.h2 id="frontend-heading" variants={fadeUp} className="text-[clamp(24px,3.5vw,36px)] font-bold text-white uppercase tracking-tighter mb-4">
                  Low-Code Developer
                </motion.h2>
                <motion.div variants={fadeUp} className="w-10 h-[3px] bg-yellow-400" aria-hidden="true" />
              </div>
              <div className="lg:col-span-8">
                <motion.p variants={fadeUp} className="text-[15px] mono-font leading-relaxed text-neutral-500">
                  I build modern, responsive web applications and SaaS interfaces focused on automation, analytics, and productivity tools — clean UI, functional dashboards, and real-world business systems.
                </motion.p>
              </div>
            </div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              role="list"
              aria-label="Low-code development projects"
            >
              {FRONTEND_PROJECTS.map((p) => (
                <FrontendCard key={p.title} {...p} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Services & Offerings ──────────────────────────────────────────── */}
        <section
          id="services"
          className="relative p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a] overflow-hidden"
          aria-labelledby="services-heading"
        >
          <div className="absolute top-12 right-8 select-none pointer-events-none opacity-[0.04]" aria-hidden="true">
            <span className="text-[200px] font-black leading-none text-white tracking-tighter">SERVICES</span>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <div className="relative z-10 max-w-5xl">
              <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
                {'/* What I Do */'}
              </motion.div>

              <motion.h2 id="services-heading" variants={fadeUp} className="text-[clamp(48px,8vw,88px)] font-bold text-white tracking-tighter mb-16 leading-[0.9]">
                Services & <span className="text-neutral-700">Solutions</span>
              </motion.h2>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
                aria-label="Services offered"
              >
                {[
                  {
                    title: 'Workflow Automation',
                    description: 'Build complete automation systems using Zapier, Make.com, n8n to eliminate manual work and scale operations.',
                    icon: '⚙️',
                    deliverables: ['Process automation', 'API integrations', 'Data routing'],
                  },
                  {
                    title: 'AI-Powered Systems',
                    description: 'Design intelligent automations leveraging AI (OpenAI, Gemini) for content generation, classification, and decision-making.',
                    icon: '🤖',
                    deliverables: ['AI workflows', 'ML-driven routing', 'Intelligent processing'],
                  },
                  {
                    title: 'CRM & Business Logic',
                    description: 'Integrate, automate, and optimize your CRM workflows — lead qualification, pipeline management, and customer data sync.',
                    icon: '📊',
                    deliverables: ['CRM integration', 'Lead management', 'Data sync'],
                  },
                  {
                    title: 'Low-Code Web Apps',
                    description: 'Build modern, responsive web applications and dashboards optimized for business automation and analytics.',
                    icon: '🎨',
                    deliverables: ['React web apps', 'Dashboards', 'SaaS tools'],
                  },
                  {
                    title: 'Data Management',
                    description: 'Design clean data pipelines with Google Sheets, SQL, Airtable — structure, log, and access business data reliably.',
                    icon: '💾',
                    deliverables: ['Data pipelines', 'Logging systems', 'Database design'],
                  },
                  {
                    title: 'End-to-End Optimization',
                    description: 'Full automation ecosystem design — from triggers to delivery — solving complex, multi-step business processes.',
                    icon: '🔗',
                    deliverables: ['Complex workflows', 'System design', 'Optimization'],
                  },
                ].map((service) => (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    className="group border border-[#1e1e1e] bg-[#0c0c0c] p-6 lg:p-8 hover:border-yellow-400/30 hover:bg-[#131313] transition-all duration-300 cursor-pointer relative overflow-hidden"
                    role="listitem"
                  >
                    {/* Hover accent */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />

                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block" aria-hidden="true">
                        {service.icon}
                      </div>
                      <h3 className="text-[16px] font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[13px] mono-font text-neutral-500 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-1 border-t border-[#1a1a1a] pt-4 mt-4">
                        <p className="text-[11px] mono-font text-neutral-700 uppercase tracking-wider font-bold">Deliverables:</p>
                        <ul className="space-y-1">
                          {service.deliverables.map((d) => (
                            <li key={d} className="text-[12px] mono-font text-neutral-600 group-hover:text-neutral-400 transition-colors">
                              • {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-20 pt-12 border-t border-[#1a1a1a]">
                <p className="text-[15px] mono-font text-neutral-600 mb-6 max-w-3xl">
                  Each project is custom-built to solve your specific problem. I work collaboratively to understand your goals, design the solution, and deliver a system that scales with your business.
                </p>
                <a
                  href="#contact-me"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 mono-font text-[12px] uppercase tracking-wide transition-all duration-200 group hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 shadow-lg hover:shadow-yellow-400/50 hover:shadow-2xl hover:-translate-y-1"
                  aria-label="Schedule a consultation for services"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── How I Work ────────────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="process-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* My Process */'}
            </motion.div>

            <motion.h2 id="process-heading" variants={headingReveal} className="text-[clamp(48px,8vw,88px)] font-bold text-white tracking-tighter mb-16 leading-[0.9]">
              How I <span className="text-neutral-700">Work</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl">
              {[
                {
                  step: '01',
                  title: 'Discovery & Analysis',
                  description: 'We deep-dive into your current processes, pain points, and goals. I document everything to ensure I build exactly what you need.',
                  time: '1-2 weeks',
                },
                {
                  step: '02',
                  title: 'Design & Planning',
                  description: 'I create a detailed automation blueprint showing workflows, integrations, data flow, and success metrics.',
                  time: '1 week',
                },
                {
                  step: '03',
                  title: 'Build & Integration',
                  description: 'I build, test, and integrate the automation system. You get daily progress updates and can request adjustments.',
                  time: '2-4 weeks',
                },
                {
                  step: '04',
                  title: 'Deploy & Support',
                  description: 'We go live together, train your team, and I provide ongoing support and optimization for 30 days post-launch.',
                  time: 'Ongoing',
                },
              ].map((phase, idx) => (
                <motion.div
                  key={phase.step}
                  variants={fadeUp}
                  className="group relative"
                >
                  {/* Connection line to next item */}
                  {idx < 3 && (
                    <div
                      className="hidden lg:block absolute top-16 -right-4 w-8 h-[2px] bg-gradient-to-r from-yellow-400/50 to-transparent"
                      aria-hidden="true"
                    />
                  )}

                  <div className="border border-[#1e1e1e] bg-[#0c0c0c] p-6 lg:p-8 hover:border-yellow-400/30 hover:bg-[#131313] transition-all duration-300 h-full">
                    <h3 className="text-[16px] font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-[13px] mono-font text-neutral-500 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-20 pt-12 border-t border-[#1a1a1a] max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Avg Project', value: '4-6 weeks' },
                  { label: 'Success Rate', value: '100%' },
                  { label: 'Client Satisfaction', value: '5/5 ⭐' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[12px] mono-font text-neutral-600 uppercase tracking-widest mb-2">{label}</p>
                    <p className="text-[24px] font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── About ─────────────────────────────────────────────────────────── */}
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
                <motion.h2 id="about-heading" variants={fadeUp} className="text-[clamp(36px,5.5vw,64px)] font-bold mb-10 leading-tight tracking-tighter">
                  <span className="text-white">Automation</span>{' '}
                  <span className="text-neutral-600">Meets</span>
                  <br />
                  <span className="text-white">Low-Code Systems</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="mono-font text-[14px] font-bold text-yellow-400 uppercase tracking-tight mb-5">
                  Turning manual workflows into automated systems
                </motion.p>

                <div className="space-y-5 max-w-2xl">
                  <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-500">
                    I build automation systems that remove repetitive work and simplify operations. From workflows and CRM integrations to dashboards and internal tools, I create complete systems that help businesses run faster and more efficiently.
                  </motion.p>
                  <motion.p variants={fadeUp} className="text-[15px] md:text-[16px] mono-font leading-relaxed text-neutral-500">
                    Using Zapier, Make, n8n, APIs, and low-code tools, I turn manual processes into scalable systems — building both the automation and the tools teams use every day.
                  </motion.p>
                </div>
              </div>

              <motion.div variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="border border-[#1e1e1e] overflow-hidden group">
                  <img
                    src="https://i.imgur.com/nd8aQcp.jpeg"
                    alt="Dione Raze Oro, automation developer based in Davao City, Philippines"
                    className="w-full aspect-square object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <section
          id="tech-stack"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="stack-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Technical tools */'}
            </motion.div>
            <motion.h2 id="stack-heading" variants={fadeUp} className="text-[clamp(24px,3.5vw,36px)] font-bold text-white uppercase tracking-tighter mb-10">
              Tech Stack
            </motion.h2>
            <motion.div
              variants={stagger}
              className="border-l border-t border-[#1a1a1a] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
              role="list"
              aria-label="Technologies I work with"
            >
              {TECH_STACK.map((t) => (
                <TechCard key={t.name} name={t.name} category={t.category} logo={t.logo} whiteBg={t.whiteBg} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Certifications ───────────────────────────────────────────────── */}
        <section
          id="awards"
          className="p-8 lg:px-16 lg:py-24 border-b border-[#1a1a1a]"
          aria-labelledby="certs-heading"
        >
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mono-font text-neutral-600 mb-12 text-[12px] italic" aria-hidden="true">
              {'/* Certifications & Credentials */'}
            </motion.div>
            <motion.h2 id="certs-heading" variants={fadeUp} className="text-[clamp(24px,3.5vw,36px)] font-bold text-white uppercase tracking-tighter mb-12">
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

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
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
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[clamp(56px,9vw,88px)] font-black text-white tracking-tighter uppercase"
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

        {/* ── Contact ──────────────────────────────────────────────────────── */}
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
                <motion.h2 id="contact-heading" variants={fadeUp} className="text-[clamp(48px,8vw,88px)] font-bold text-white leading-[0.88] tracking-tighter uppercase mb-10">
                  Let's Build<br />
                  <span className="text-neutral-800">Together</span>
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
                    <span>📅 Schedule a Call</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </a>

                  {/* Secondary CTAs */}
                  <div className="space-y-2">
                    <p className="text-[12px] mono-font text-neutral-600 uppercase tracking-widest font-bold mb-3">Or reach out directly:</p>
                    {[
                      { href: 'mailto:dioneoro11@gmail.com', label: 'Email', text: 'dioneoro11@gmail.com', icon: '✉️' },
                      { href: 'https://www.linkedin.com/in/dione-raze-oro-b274a8243/', label: 'LinkedIn', text: 'LinkedIn', icon: '💼' },
                      { href: 'https://www.onlinejobs.ph/jobseekers/info/2465090', label: 'OnlineJobsPH', text: 'OnlineJobsPH Profile', icon: '🌐' },
                      { href: 'https://www.upwork.com/freelancers/~019d50a01f575c8779', label: 'Upwork', text: 'Upwork Profile', icon: '🚀' },
                    ].map(({ href, label, text, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 mono-font text-[13px] text-neutral-600 hover:text-white hover:bg-white/5 transition-all group py-3 px-3 rounded min-h-[44px] border border-transparent hover:border-neutral-700"
                        aria-label={label}
                      >
                        <span aria-hidden="true">{icon}</span>
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
