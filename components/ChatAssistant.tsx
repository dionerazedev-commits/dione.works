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
    "Hey! 👋 I'm Dione's AI assistant. What automation challenge are you facing?",
    "Welcome! I'm here to help you explore AI automation and workflow systems. What brings you here?",
  ],
  about: "I'm Dione Raze, an AI Automation Specialist based in the Philippines. I build AI-powered workflows, agents, and internal tools that help businesses eliminate manual work and scale operations. I focus on building systems that actually run businesses—not just prototypes.",
  automation: "I design and build automation systems using n8n, Make, Zapier, and GoHighLevel. I can automate lead qualification, CRM workflows, data processing, document handling, and more. Most systems respond in real-time (under 10 seconds). What process are you looking to automate?",
  ai: "I build AI systems like chatbots, WhatsApp AI concierges, lead capture pipelines, document processors, and AI-powered research systems using Claude, ChatGPT, and other AI models. I've built a WhatsApp AI that handles bookings and inquiries automatically with zero human touch. What's your AI need?",
  crm: "I specialize in CRM automation with GoHighLevel and HubSpot—lead qualification, scoring pipelines, intake automation. I can design workflows that automatically enrich, qualify, and prioritize your leads. Interested in automating your sales?",
  tools: "I work with: n8n, Make, Zapier, GoHighLevel, Supabase, Airtable, Google Sheets, Claude, ChatGPT, Base44, and API integrations. Basically, I connect any tool you need.",
  dashboard: "I build internal dashboards and tools with modern frameworks. Think analytics, booking systems, KPI tracking, and operational dashboards that give you real-time visibility into your business.",
  projects: "My main projects include an AI Webhook Agent for automated lead intake, a WhatsApp AI Concierge that handles bookings and inquiries, TripGenie (an AI travel planner), and booking systems with full analytics. All built to actually solve real business problems.",
  whatsapp: "I've built WhatsApp AI concierge systems that handle customer inquiries, bookings, and logging automatically using n8n + AI + Google Sheets. Zero human intervention needed—fully autonomous.",
  services: "I offer: AI automation (n8n, Make, Zapier) • AI agents (chat, voice, WhatsApp) • CRM automation (GoHighLevel, HubSpot) • Workflow integrations (APIs, webhooks) • Internal dashboards & tools • Data extraction & processing",
  contact: "I'm open to freelance, project-based, or long-term roles. Send a message with your process or problem—I'll design a system to automate it. You can schedule a call, message me on LinkedIn, or fill out the contact form.",
  hiring: "Yes, I'm available for work! I work with startups, agencies, and service-based businesses that want to automate operations and scale without adding headcount.",
  pricing: "I work project-by-project based on complexity and scope. Every automation is custom-built for your specific workflow. Let's discuss your needs and I'll design the right solution.",
  experience: "I've been working in AI automation for several months, building real systems for clients and personal projects. I focus on systems that actually run businesses—shipping fast, iterating quickly, and prioritizing real-world results.",
  approach: "I don't just use AI—I build systems around it. I connect tools, automate workflows, and create end-to-end solutions that solve actual business problems.",
  travel: "I'm also a solo backpacker who loves traveling! I even built TripGenie to solve travel planning problems. When I'm not automating businesses, you'll find me exploring the world.",
  default: "Great question! Could you tell me more about what you're trying to accomplish? Are you looking for AI automation, CRM workflows, WhatsApp bots, dashboards, or something else?",
};

const getResponse = (userInput: string): string => {
  const lower = userInput.toLowerCase().trim();

  // Conversational greetings
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'hey there' || lower === 'yo') {
    return "Hey! 👋 What brings you here? Looking to automate something, build an AI system, or just curious about what I do?";
  }
  if (lower === 'how are you' || lower === 'how are you doing' || lower === 'whats up' || lower === "what's up") {
    return "Doing great, thanks for asking! 🚀 Always excited to talk about automation and AI systems. What's on your mind?";
  }
  if (lower === 'thanks' || lower === 'thank you' || lower === 'thx') {
    return "You got it! Happy to help. Anything else you'd like to know?";
  }
  if (lower === 'cool' || lower === 'nice' || lower === 'awesome' || lower === 'amazing') {
    return "Glad you think so! 😄 Feel free to ask me anything about automation, AI, or how we can work together.";
  }
  if (lower === 'ok' || lower === 'okay' || lower === 'got it' || lower === 'understood') {
    return "Perfect! What else would you like to know?";
  }
  if (lower === 'haha' || lower === 'lol' || lower === 'hehe') {
    return "😄 Glad that resonated! Got any other questions?";
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
  if (lower.includes('travel') || lower.includes('tripgenie') || lower.includes('backpack')) {
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center min-h-[44px] min-w-[44px] bg-yellow-400 text-black hover:bg-yellow-300"
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
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#0c0c0c] border border-[#1e1e1e] shadow-2xl rounded-lg overflow-hidden flex flex-col h-[600px] max-h-[70vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1e1e1e] bg-[#0f0f0f]">
              <div className="flex-1">
                <h2 id="chat-title" className="mono-font text-[12px] font-bold text-white uppercase tracking-widest">
                  Dione's AI Assistant 🤖
                </h2>
                <p className="mono-font text-[10px] text-neutral-500 mt-1">Always online</p>
              </div>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-[#1a1a1a] rounded transition-colors"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? (
                  <Minimize2 size={18} className="text-neutral-400" />
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
