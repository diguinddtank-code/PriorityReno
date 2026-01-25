import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 1. Open chat and start typing animation
    const openTimer = setTimeout(() => {
        setIsChatOpen(true);
        setIsTyping(true);
        
        // 2. Stop typing and show message after delay
        setTimeout(() => {
            setIsTyping(false);
        }, 1500); // 1.5 seconds of "typing"

    }, 2500); // Start process after 2.5s

    return () => clearTimeout(openTimer);
  }, []);

  const handleCloseChat = () => {
      setIsChatOpen(false);
      setHasUnreadMessage(true);
  };

  const handleOpenChat = () => {
      setIsChatOpen(!isChatOpen);
      if (!isChatOpen) {
          setHasUnreadMessage(false);
      }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[60] flex flex-col items-end pointer-events-auto">
          
      {/* Main Floating Button */}
      <button 
         onClick={handleOpenChat}
         className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-2xl border-2 border-white flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
      >
         <div className="w-full h-full rounded-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Specialist" className="w-full h-full object-cover" />
         </div>
         {/* Online Dot (Green) */}
         <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
         
         {/* NOTIFICATION DOT (Red) - Shows when closed */}
         {hasUnreadMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                <span className="text-[10px] font-bold text-white leading-none">1</span>
            </div>
         )}
         
         {/* Label Tooltip */}
         {!isChatOpen && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider whitespace-nowrap shadow-lg hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                Chat Online
            </div>
         )}
      </button>

      {/* Expanded Chat Card */}
      <div className={`absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl w-[300px] md:w-[340px] overflow-hidden transition-all duration-300 origin-bottom-right transform ${isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
         
         {/* Header */}
         <div className="bg-slate-900 p-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
                 <div className="relative">
                     <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                         <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Specialist" className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-900 rounded-full"></div>
                 </div>
                 <div>
                     <h4 className="text-white font-bold text-sm">Design Specialist</h4>
                     <span className="text-slate-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online Now
                     </span>
                 </div>
             </div>
             <button onClick={handleCloseChat} className="text-slate-400 hover:text-white"><X size={18} /></button>
         </div>

         {/* Body */}
         <div className="p-5">
            {/* Chat Bubble with Typewriter Effect */}
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 mb-4 text-sm text-slate-700 leading-relaxed shadow-sm min-h-[60px] flex items-center">
                {isTyping ? (
                    <div className="flex gap-1.5 h-4 items-center px-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        Hi! 👋 I see you're looking for a renovation. I can help you get a <strong>Fast Quote</strong> or schedule a <strong>Free In-Home Estimate</strong>.
                    </div>
                )}
            </div>
            
            <div className={`grid grid-cols-1 gap-2 transition-opacity duration-500 ${isTyping ? 'opacity-0' : 'opacity-100'}`}>
                <button 
                    onClick={() => {
                        document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'});
                        handleCloseChat();
                    }}
                    className="w-full bg-brand-orange text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                >
                    Get Free Quote
                </button>
                <a 
                    href="tel:4703804785"
                    className="w-full bg-white text-slate-900 py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border border-slate-200"
                >
                    <Phone size={14} /> Call Specialist
                </a>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FloatingCTA;