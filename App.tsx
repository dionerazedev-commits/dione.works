import React, { useState, useEffect } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-PH', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Manila',
        }) + ' PHT'
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));

  return (
    <>
      {/* Accessibility: skip nav */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div className="flex flex-col h-screen overflow-hidden bg-white text-black dark:bg-[#0a0a0a] dark:text-[#d4d4d4] transition-colors duration-300">
        <div className="flex flex-1 overflow-hidden">
          <SidebarLeft />

          <div className="flex-1 flex flex-col min-w-0">
            <Navbar currentTime={currentTime} />

            <div className="flex-1 overflow-hidden flex">
              <MainContent />
              <div className="hidden xl:block h-full flex-shrink-0">
                <SidebarRight />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </>
  );
};

export default App;
