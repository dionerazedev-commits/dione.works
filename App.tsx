import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Navbar } from './components/Navbar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

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

  return (
    <MotionConfig reducedMotion="user">
      {/* Accessibility: skip nav */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a] text-[#d4d4d4]">
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

      {/* Portfolio assistant */}
      <ChatAssistant />
    </MotionConfig>
  );
};

export default App;
