import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

interface NavbarProps {
  currentTime: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTime }) => {
  const navRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const nav = navRef.current;
    const main = document.querySelector<HTMLElement>('main');
    if (!nav || !main) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tabItems = gsap.utils.toArray<HTMLElement>('[data-gsap-nav-item]', nav);
    const status = nav.querySelector<HTMLElement>('[data-gsap-nav-status]');

    if (!reduceMotion) {
      gsap.from([...tabItems, status].filter(Boolean), {
        autoAlpha: 0,
        y: -8,
        duration: 0.48,
        stagger: 0.055,
        ease: 'power3.out',
        clearProps: 'opacity,visibility,transform',
      });
    }

    const trigger = ScrollTrigger.create({
      scroller: main,
      start: 18,
      end: 'max',
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: 'rgba(14,14,14,0.985)',
          borderColor: '#2a2a2a',
          duration: reduceMotion ? 0 : 0.24,
          overwrite: 'auto',
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: 'rgba(10,10,10,0.95)',
          borderColor: '#1e1e1e',
          duration: reduceMotion ? 0 : 0.24,
          overwrite: 'auto',
        });
      },
    });

    return () => trigger.kill();
  }, { scope: navRef });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const main = document.querySelector('main');
    if (el && main) main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="h-13 border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-between px-0 sticky top-0 z-20 select-none"
      aria-label="Site navigation"
    >
      {/* Tab strip */}
      <div className="flex h-full" role="tablist">
        <div
          data-gsap-nav-item
          className="h-full flex items-center px-3 sm:px-8 border-r border-[#1e1e1e] relative bg-[#0e0e0e]"
          role="tab"
          aria-selected="true"
        >
          <span className="mono-font text-white text-[11px] font-semibold tracking-wider">dione.resume</span>
        </div>
        <button
          data-gsap-nav-item
          onClick={() => scrollTo('digital-experiences')}
          className="h-full flex items-center px-3 sm:px-8 border-r border-[#1e1e1e] opacity-40 hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer group min-w-[44px]"
          role="tab"
          aria-selected="false"
          aria-label="Go to Narra Estates project"
        >
          <span className="mono-font text-[11px] font-semibold tracking-wider group-hover:text-white">portfolio.v1</span>
        </button>
        <button
          data-gsap-nav-item
          onClick={() => scrollTo('automation-work')}
          className="h-full flex items-center px-3 sm:px-8 border-r border-[#1e1e1e] opacity-40 hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer group min-w-[44px]"
          role="tab"
          aria-selected="false"
          aria-label="Go to additional automation work"
        >
          <span className="mono-font text-[11px] font-semibold tracking-wider group-hover:text-white">automation.log</span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 lg:gap-5 pr-4 lg:pr-6">

        {/* Status pill */}
        <div
          data-gsap-nav-status
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0d1f0d] border border-[#1a3a1a] rounded-full"
          aria-label="Currently open to new projects"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <span className="mono-font text-[10px] text-green-400 font-medium tracking-wide whitespace-nowrap">Open to projects</span>
        </div>

        {/* Time */}
        {currentTime && (
          <div className="hidden xl:block mono-font text-[11px] text-neutral-600 font-medium whitespace-nowrap">
            <span className="hidden lg:inline">Davao, PH · </span>
            <time aria-label={`Current time: ${currentTime}`}>{currentTime}</time>
          </div>
        )}
      </div>
    </nav>
  );
};
