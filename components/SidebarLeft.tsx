import React from 'react';
import { Briefcase, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const SidebarLeft: React.FC = () => {
  return (
    <aside
      className="w-72 hidden md:flex flex-col border-r border-[#1e1e1e] bg-[#0e0e0e] overflow-y-auto flex-shrink-0"
      aria-label="Profile information"
    >
      <div className="p-7 flex flex-col gap-7">
        {/* Profile */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 flex-shrink-0 border border-[#2a2a2a] overflow-hidden bg-[#1a1a1a]">
            <img
              src="/images/dione-profile.jpg"
              alt="Dione Raze Oro, AI Automation and Full-Stack Developer"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="eager"
            />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white tracking-tight leading-none mb-1.5">
              DIONE RAZE ORO
            </h1>
            <p className="mono-font text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
              AI Automation & Full-Stack Dev
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mono-font text-[13px] leading-relaxed text-neutral-400">
          Building AI-powered automations, intelligent workflows, and full-stack digital products.
        </p>

        {/* Info */}
        <ul className="flex flex-col gap-5" aria-label="Contact information">
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500">
            <Briefcase size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <span>AI Automation & Full-Stack Apps</span>
          </li>
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500">
            <MapPin size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <span>Davao City, Philippines</span>
          </li>
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500">
            <Mail size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <a
              href="mailto:dioneoro11@gmail.com"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
              aria-label="Email Dione at dioneoro11@gmail.com"
            >
              dioneoro11@gmail.com
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-1" />

      {/* CTA Buttons */}
      <div className="p-6 flex flex-col gap-3">
        <a
          href="https://calendly.com/dioneoro11/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-12 bg-white text-black mono-font font-bold text-[11px] tracking-widest uppercase hover:bg-neutral-200 transition-colors min-h-[44px]"
          aria-label="Schedule a call with Dione on Calendly"
        >
          Schedule a call
        </a>
        <a
          href="/dione-raze-oro-resume.pdf"
          download
          className="flex items-center justify-center gap-2 w-full h-12 bg-transparent border border-[#2a2a2a] text-white mono-font font-bold text-[11px] tracking-widest uppercase hover:bg-[#1a1a1a] hover:border-neutral-500 transition-colors min-h-[44px]"
          aria-label="Download Dione Raze Oro's resume"
        >
          <Download size={14} aria-hidden="true" />
          Download Resume
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-11 border border-[#2a2a2a] text-neutral-400 mono-font font-bold text-[9px] tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors min-h-[44px]"
            aria-label="View Dione's LinkedIn profile"
          >
            <Linkedin size={14} aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="https://github.com/dionerazedev-commits"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-11 border border-[#2a2a2a] text-neutral-400 mono-font font-bold text-[9px] tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors min-h-[44px]"
            aria-label="View Dione's GitHub profile"
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-label="Social media profiles">
          {[
            { href: 'https://www.instagram.com/dnrze_/', label: 'Instagram' },
            { href: 'https://www.tiktok.com/@raze.ventures', label: 'TikTok' },
            { href: 'https://www.facebook.com/raze.dodot/', label: 'Facebook' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 border border-[#2a2a2a] text-neutral-500 mono-font font-bold text-[8px] uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors min-h-[44px]"
              aria-label={`View Dione's ${label} profile`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};
