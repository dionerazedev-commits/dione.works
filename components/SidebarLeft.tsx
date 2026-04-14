import React from 'react';
import { Briefcase, MapPin, Mail } from 'lucide-react';

export const SidebarLeft: React.FC = () => {
  return (
    <aside
      className="w-72 hidden md:flex flex-col border-r border-neutral-200 dark:border-[#1e1e1e] bg-neutral-50 dark:bg-[#0e0e0e] overflow-y-auto transition-colors duration-300 flex-shrink-0"
      aria-label="Profile information"
    >
      <div className="p-7 flex flex-col gap-7">
        {/* Profile */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 flex-shrink-0 border border-neutral-200 dark:border-[#2a2a2a] overflow-hidden bg-white dark:bg-[#1a1a1a]">
            <img
              src="https://i.imgur.com/nd8aQcp.jpeg"
              alt="Dione Raze Oro, AI Automation & Low-Code Developer"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="eager"
            />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-black dark:text-white tracking-tight leading-none mb-1.5">
              DIONE RAZE ORO
            </h1>
            <p className="mono-font text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
              AI Automation & Low-Code Dev
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mono-font text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          Building automation systems and low-code interfaces that eliminate repetitive work and scale operations.
        </p>

        {/* Info */}
        <ul className="flex flex-col gap-5" aria-label="Contact information">
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500 dark:text-neutral-500">
            <Briefcase size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <span>Workflow Automation & Modern Web Apps</span>
          </li>
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500 dark:text-neutral-500">
            <MapPin size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <span>Davao City, Philippines</span>
          </li>
          <li className="flex items-start gap-3 mono-font text-[12px] text-neutral-500 dark:text-neutral-500">
            <Mail size={15} className="mt-0.5 flex-shrink-0 opacity-50" aria-hidden="true" />
            <a
              href="mailto:dioneoro11@gmail.com"
              className="hover:text-black dark:hover:text-white transition-colors underline-offset-2 hover:underline"
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
          className="flex items-center justify-center w-full h-12 bg-black dark:bg-white text-white dark:text-black mono-font font-bold text-[11px] tracking-widest uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors min-h-[44px]"
          aria-label="Schedule a call with Dione on Calendly"
        >
          Schedule a call
        </a>
        <a
          href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-12 bg-transparent border border-neutral-300 dark:border-[#2a2a2a] text-black dark:text-white mono-font font-bold text-[11px] tracking-widest uppercase hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] transition-colors min-h-[44px]"
          aria-label="View Dione's LinkedIn profile"
        >
          View LinkedIn
        </a>
      </div>
    </aside>
  );
};
