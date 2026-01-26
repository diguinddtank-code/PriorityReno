import React, { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
  const [showTypingBubble, setShowTypingBubble] = useState(false);

  useEffect(() => {
    // Sequence:
    // 1. Wait 2.5s
    // 2. Show small "Typing..." bubble on the head
    // 3. Wait 2s
    // 4. Hide bubble, Open full chat box
    
    const startSequence = setTimeout(() => {
        setShowTypingBubble(true);
        
        const openChatTimer = setTimeout(() => {
            setShowTypingBubble(false);
            setIsChatOpen(true);
        }, 2000); // Typing for 2 seconds

        return () => clearTimeout(openChatTimer);

    }, 2500); // Initial delay

    return () => clearTimeout(startSequence);
  }, []);

  const handleCloseChat = () => {
      setIsChatOpen(false);
      setHasUnreadMessage(true);
  };

  const handleOpenChat = () => {
      if (isChatOpen) {
          handleCloseChat();
      } else {
          setIsChatOpen(true);
          setHasUnreadMessage(false);
          setShowTypingBubble(false); // Ensure typing bubble is gone if manually opened
      }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    // @ts-ignore
    if (typeof window.gtag_report_conversion === 'function') {
        e.preventDefault();
        // @ts-ignore
        window.gtag_report_conversion('tel:4703804785');
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[60] flex flex-col items-end pointer-events-auto">
      
      {/* SMALL TYPING BUBBLE (Attached to Head) */}
      <div 
        className={`absolute -top-10 right-0 bg-white px-3 py-2 rounded-xl rounded-br-none shadow-lg border border-slate-100 transition-all duration-300 transform origin-bottom-right flex items-center gap-1 z-10 ${
            showTypingBubble && !isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
         <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
         <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
         <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
      </div>

      {/* Main Floating Button */}
      <button 
         onClick={handleOpenChat}
         className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-2xl border-2 border-white flex items-center justify-center hover:scale-105 transition-transform duration-300 group z-20"
      >
         <div className="w-full h-full rounded-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Ashley" className="w-full h-full object-cover" />
         </div>
         {/* Online Dot (Green) */}
         <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
         
         {/* NOTIFICATION DOT (Red) - Shows when closed AND not typing */}
         {hasUnreadMessage && !showTypingBubble && !isChatOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                <span className="text-[10px] font-bold text-white leading-none">1</span>
            </div>
         )}
         
         {/* Label Tooltip */}
         {!isChatOpen && !showTypingBubble && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider whitespace-nowrap shadow-lg hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                Chat Online
            </div>
         )}
      </button>

      {/* Expanded Chat Card */}
      {/* Reduced width to w-[280px] on mobile to prevent overflow/cutting */}
      <div className={`absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl w-[280px] md:w-[340px] overflow-hidden transition-all duration-300 origin-bottom-right transform ${isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
         
         {/* Header */}
         <div className="bg-slate-900 p-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
                 <div className="relative">
                     <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                         <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Ashley" className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-900 rounded-full"></div>
                 </div>
                 <div>
                     <h4 className="text-white font-bold text-sm">Ashley</h4>
                     <span className="text-slate-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Design Specialist
                     </span>
                 </div>
             </div>
             <button onClick={handleCloseChat} className="text-slate-400 hover:text-white"><X size={18} /></button>
         </div>

         {/* Body */}
         <div className="p-4 md:p-5">
            {/* Message Content - Fixed: Block display, no flex, smaller font */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-3 mb-3 shadow-sm">
                <p className="text-xs text-slate-600 leading-relaxed">
                    Hi, I'm Ashley! 👋 Ready to transform your home? I can help you with a <span className="font-bold text-slate-900">Free Estimate</span> today.
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
                <button 
                    onClick={() => {
                        document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'});
                        handleCloseChat();
                    }}
                    className="w-full bg-brand-orange text-white py-3 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                >
                    Get Free Quote
                </button>
                <a 
                    href="tel:4703804785"
                    onClick={handlePhoneClick}
                    className="w-full bg-white text-slate-900 py-3 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border border-slate-200"
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