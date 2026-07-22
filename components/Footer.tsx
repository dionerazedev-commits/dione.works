import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="h-11 border-t border-[#1a1a1a] bg-[#0e0e0e] flex items-center justify-center sm:justify-between px-4 sm:px-6 mono-font text-[9px] sm:text-[10px] tracking-widest text-neutral-700 uppercase flex-shrink-0">
      <span className="hidden sm:inline">© Dione Raze Oro {year}</span>
      <nav className="flex items-center gap-3 sm:gap-5" aria-label="Social links">
        <a
          href="/dione-raze-oro-resume.pdf"
          download
          className="hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Download resume"
        >
          <Download size={15} aria-hidden="true" />
        </a>
        <a
          href="https://github.com/dionerazedev-commits"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="GitHub profile"
        >
          <Github size={15} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={15} aria-hidden="true" />
        </a>
        <a
          href="mailto:dioneraze.dev@gmail.com"
          className="hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Send email to Dione"
        >
          <Mail size={15} aria-hidden="true" />
        </a>
      </nav>
    </footer>
  );
};
