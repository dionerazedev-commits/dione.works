import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: number;
}

const BOT_RESPONSES = {
  greeting: [
    "Hi, I'm Dione's portfolio assistant. Ask me about AI automation, full-stack applications, Migo, or Laag Bukidnon.",
    "Welcome. I can walk you through Dione's automation systems, full-stack products, featured projects, and development approach.",
  ],
  about: "Dione Raze Oro is an AI automation and full-stack developer based in the Philippines. He builds intelligent workflows, connected web applications, conversational assistants, and scalable digital products.",
  automation: "I design and build automation systems using n8n, Make, Zapier, and GoHighLevel. I can automate lead qualification, CRM workflows, data processing, document handling, and more. Most systems respond in real-time (under 10 seconds). What process are you looking to automate?",
  ai: "I build AI systems like chatbots, WhatsApp AI concierges, lead capture pipelines, document processors, and AI-powered research systems using Claude, ChatGPT, and other AI models. I've built a WhatsApp AI that handles bookings and inquiries automatically with zero human touch. What's your AI need?",
  crm: "I specialize in CRM automation with GoHighLevel and HubSpot, including lead qualification, scoring pipelines, and intake automation. I can design workflows that enrich, qualify, and prioritize leads.",
  tools: "I work with: n8n, Make, Zapier, GoHighLevel, Supabase, Airtable, Google Sheets, Claude, ChatGPT, Base44, and API integrations. Basically, I connect any tool you need.",
  dashboard: "I build internal dashboards and tools with modern frameworks. Think analytics, booking systems, KPI tracking, and operational dashboards that give you real-time visibility into your business.",
  projects: "The featured products are Migo and Laag Bukidnon. Migo is an AI-assisted travel app for planning, expenses, passport progress, community, and memories. Laag Bukidnon is a local tourism platform for destinations, stays, guides, and trip planning.",
  whatsapp: "I've built WhatsApp AI concierge systems that handle customer inquiries, bookings, and logging using n8n, AI, and Google Sheets. Routine conversations can run automatically.",
  services: "Dione builds AI automation systems, full-stack web applications, conversational assistants, responsive product interfaces, API integrations, and connected data workflows.",
  contact: "Dione is open to freelance, project-based, and long-term roles. Share the product idea or workflow problem, then schedule a call or connect on LinkedIn.",
  hiring: "Yes, I'm available for work! I work with startups, agencies, and service-based businesses that want to automate operations and scale without adding headcount.",
  pricing: "I work project-by-project based on complexity and scope. Every automation is custom-built for your specific workflow. Let's discuss your needs and I'll design the right solution.",
  experience: "Dione builds working products and automation systems through personal projects and client work. The approach prioritizes useful outcomes, responsive interfaces, and steady iteration.",
  approach: "Dione combines product design, AI, APIs, and automation around a clear user problem. Each feature should make planning, discovery, or operations easier.",
  travel: "Travel is central to Dione's product niche. Migo addresses planning and trip management, while Laag Bukidnon focuses on useful local discovery and tourism information.",
  default: "Tell me what you would like to explore: AI automation, full-stack development, Migo, Laag Bukidnon, or connected workflows.",
};

const getResponse = (userInput: string): string => {
  const lower = userInput.toLowerCase().trim();

  // Conversational greetings
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'hey there' || lower === 'yo') {
    return "Hi. Are you here to explore Migo, Laag Bukidnon, travel product work, or Dione's broader AI experience?";
  }
  if (lower === 'how are you' || lower === 'how are you doing' || lower === 'whats up' || lower === "what's up") {
    return "Doing great, thanks for asking. What would you like to know about the travel products or AI systems?";
  }
  if (lower === 'thanks' || lower === 'thank you' || lower === 'thx') {
    return "You got it! Happy to help. Anything else you'd like to know?";
  }
  if (lower === 'cool' || lower === 'nice' || lower === 'awesome' || lower === 'amazing') {
    return "Glad you think so. Feel free to ask about the projects, product approach, or how to work with Dione.";
  }
  if (lower === 'ok' || lower === 'okay' || lower === 'got it' || lower === 'understood') {
    return "Perfect! What else would you like to know?";
  }
  if (lower === 'haha' || lower === 'lol' || lower === 'hehe') {
    return "Glad that resonated. What else would you like to know?";
  }

  // Check for specific keywords
  if (lower.includes('who are you') || lower.includes('dione') || lower.includes('about you')) {
    return BOT_RESPONSES.about;
  }
  if (lower.includes('whatsapp') || lower.includes('concierge')) {
    return BOT_RESPONSES.whatsapp;
  }
  if (lower.includes('dashboard') || lower.includes('analytics') || lower.includes('tool')) {
    return BOT_RESPONSES.dashboard;
  }
  if (lower.includes('travel') || lower.includes('migo') || lower.includes('laag') || lower.includes('bukidnon') || lower.includes('backpack')) {
    return BOT_RESPONSES.travel;
  }
  if (lower.includes('experience') || lower.includes('how long') || lower.includes('background')) {
    return BOT_RESPONSES.experience;
  }
  if (lower.includes('approach') || lower.includes('different') || lower.includes('style')) {
    return BOT_RESPONSES.approach;
  }
  if (lower.includes('tool') || lower.includes('tech') || lower.includes('framework') || lower.includes('n8n') || lower.includes('make') || lower.includes('zapier')) {
    return BOT_RESPONSES.tools;
  }
  if (lower.includes('project') || lower.includes('example') || lower.includes('webhook') || lower.includes('booking')) {
    return BOT_RESPONSES.projects;
  }
  if (lower.includes('automate') || lower.includes('automation') || lower.includes('workflow') || lower.includes('process')) {
    return BOT_RESPONSES.automation;
  }
  if (lower.includes('ai') || lower.includes('artificial intelligence') || lower.includes('chatbot') || lower.includes('agent')) {
    return BOT_RESPONSES.ai;
  }
  if (lower.includes('crm') || lower.includes('lead') || lower.includes('sales') || lower.includes('customer') || lower.includes('pipeline') || lower.includes('qualification')) {
    return BOT_RESPONSES.crm;
  }
  if (lower.includes('service') || lower.includes('offer') || lower.includes('do you') || lower.includes('expertise') || lower.includes('capability')) {
    return BOT_RESPONSES.services;
  }
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('get in touch') || lower.includes('schedule') || lower.includes('call') || lower.includes('work with')) {
    return BOT_RESPONSES.contact;
  }
  if (lower.includes('available') || lower.includes('hire') || lower.includes('freelance') || lower.includes('client')) {
    return BOT_RESPONSES.hiring;
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('charge') || lower.includes('budget')) {
    return BOT_RESPONSES.pricing;
  }

  return BOT_RESPONSES.default;
};

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)],
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Get response
    const botText = getResponse(text);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: botText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isMinimized) setIsMinimized(false);
        }}
        className="fixed bottom-0 right-2 sm:bottom-16 sm:right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center min-h-[44px] min-w-[44px] bg-yellow-400 text-black hover:bg-yellow-300"
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-14 sm:bottom-32 right-4 sm:right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#0c0c0c] border border-[#1e1e1e] shadow-2xl rounded-lg overflow-hidden flex flex-col h-[600px] max-h-[calc(100dvh-5rem)] sm:max-h-[70vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1e1e1e] bg-[#0f0f0f]">
              <div className="flex-1">
                <h2 id="chat-title" className="mono-font text-[12px] font-bold text-white uppercase tracking-widest">
                  Dione's AI & Full-Stack Assistant
                </h2>
                <p className="mono-font text-[10px] text-neutral-500 mt-1">Always online</p>
              </div>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-[#1a1a1a] rounded transition-colors"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? (
                  <Maximize2 size={18} className="text-neutral-400" />
                ) : (
                  <Minimize2 size={18} className="text-neutral-400" />
                )}
              </button>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-yellow-400 text-black mono-font text-[13px]'
                            : 'bg-[#1a1a1a] text-neutral-300 mono-font text-[13px] border border-[#2a2a2a]'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="bg-[#1a1a1a] p-3 rounded-lg flex gap-1 border border-[#2a2a2a]">
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-[#1e1e1e] bg-[#0f0f0f]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(input);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-white mono-font text-[12px] placeholder-neutral-600 focus:outline-none focus:border-yellow-400/50 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                      aria-label="Chat message input"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="p-2 bg-yellow-400 hover:bg-yellow-300 disabled:bg-neutral-700 text-black disabled:text-neutral-500 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
