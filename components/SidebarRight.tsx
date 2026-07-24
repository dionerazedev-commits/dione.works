import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Travel Tech', id: 'frontend-dev' },
  { label: 'Digital Experiences', id: 'digital-experiences' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about-me' },
  { label: 'Stack', id: 'tech-stack' },
  { label: 'Certs', id: 'awards' },
  { label: 'Feedback', id: 'client-s-word' },
  { label: 'Contact', id: 'contact-me' },
];

export const SidebarRight: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { root: mainEl, rootMargin: '-10% 0px -45% 0px', threshold: 0 }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const mainEl = document.querySelector('main');
    if (!el || !mainEl) return;
    animate(mainEl.scrollTop, el.offsetTop, {
      duration: 0.75,
      ease: [0.6, 0.05, -0.01, 0.9],
      onUpdate: (v) => { mainEl.scrollTop = v; },
    });
    setActiveSection(id);
  };

  return (
    <aside
      className="w-52 border-l border-[#1a1a1a] bg-[#0e0e0e] flex flex-col p-7 pt-20 gap-1 sticky top-0 h-screen select-none overflow-y-auto"
      aria-label="Page section navigation"
    >
      <p className="mono-font text-[12px] font-bold text-white mb-5 tracking-tight">Index</p>

      <nav aria-label="Sections">
        {LINKS.map(({ label, id }) => (
          <div key={id} className="relative flex items-center">
            {activeSection === id && (
              <motion.div
                layoutId="activeBar"
                className="absolute -left-7 w-[3px] h-5 bg-white rounded-sm"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <button
              onClick={(e) => scrollToSection(e, id)}
              className={`mono-font text-[11px] py-2.5 pl-2 pr-1 uppercase tracking-wide transition-all duration-200 w-full text-left min-h-[44px] flex items-center ${
                activeSection === id
                  ? 'text-white font-bold'
                  : 'text-neutral-600 hover:text-neutral-300'
              }`}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {label}
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
};
