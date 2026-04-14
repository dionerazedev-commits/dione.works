import React from 'react';

interface NavbarProps {
  currentTime: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTime }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const main = document.querySelector('main');
    if (el && main) main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <nav
      className="h-13 border-b border-neutral-200 dark:border-[#1e1e1e] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-between px-0 sticky top-0 z-20 select-none transition-colors duration-300"
      aria-label="Site navigation"
    >
      {/* Tab strip */}
      <div className="flex h-full" role="tablist">
        <div
          className="h-full flex items-center px-6 sm:px-8 border-r border-neutral-200 dark:border-[#1e1e1e] relative bg-neutral-50 dark:bg-[#0e0e0e] transition-colors duration-300"
          role="tab"
          aria-selected="true"
        >
          <span className="mono-font text-black dark:text-white text-[11px] font-semibold tracking-wider">dione.resume</span>
        </div>
        <button
          onClick={() => scrollTo('work')}
          className="h-full flex items-center px-6 sm:px-8 border-r border-neutral-200 dark:border-[#1e1e1e] opacity-40 hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer group min-w-[44px]"
          role="tab"
          aria-selected="false"
          aria-label="Go to portfolio work section"
        >
          <span className="mono-font text-[11px] font-semibold tracking-wider group-hover:text-black dark:group-hover:text-white">portfolio.v1</span>
        </button>
        <button
          onClick={() => scrollTo('frontend-dev')}
          className="h-full flex items-center px-6 sm:px-8 border-r border-neutral-200 dark:border-[#1e1e1e] opacity-40 hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer group min-w-[44px]"
          role="tab"
          aria-selected="false"
          aria-label="Go to low-code development section"
        >
          <span className="mono-font text-[11px] font-semibold tracking-wider group-hover:text-black dark:group-hover:text-white">portfolio.v2</span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 lg:gap-5 pr-4 lg:pr-6">

        {/* Status pill */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-[#0d1f0d] border border-green-200 dark:border-[#1a3a1a] rounded-full"
          aria-label="Currently open to new projects"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <span className="mono-font text-[10px] text-green-700 dark:text-green-400 font-medium tracking-wide">Open to projects</span>
        </div>

        {/* Time */}
        {currentTime && (
          <div className="hidden sm:block mono-font text-[11px] text-neutral-400 dark:text-neutral-600 font-medium">
            <span className="hidden lg:inline">Davao, PH · </span>
            <time aria-label={`Current time: ${currentTime}`}>{currentTime}</time>
          </div>
        )}
      </div>
    </nav>
  );
};
