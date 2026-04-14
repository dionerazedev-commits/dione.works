import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="h-11 border-t border-neutral-200 dark:border-[#1a1a1a] bg-neutral-50 dark:bg-[#0e0e0e] flex items-center justify-between px-6 mono-font text-[10px] tracking-widest text-neutral-400 dark:text-neutral-700 uppercase transition-colors duration-300 flex-shrink-0">
      <span>© Dione Raze Oro {year}</span>
      <nav className="flex items-center gap-5" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/dione-raze-oro-b274a8243/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={15} aria-hidden="true" />
        </a>
        <a
          href="mailto:dioneoro11@gmail.com"
          className="hover:text-black dark:hover:text-white transition-colors p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Send email to Dione"
        >
          <Mail size={15} aria-hidden="true" />
        </a>
      </nav>
    </footer>
  );
};
