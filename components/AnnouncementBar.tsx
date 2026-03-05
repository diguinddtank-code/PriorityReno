import React, { useMemo } from 'react';
import { X, ArrowRight, Tag } from 'lucide-react';

interface AnnouncementBarProps {
  onClose: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onClose }) => {
  const scrollToQuote = () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic date: Always shows 2 days from now to create urgency
  const deadline = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white h-auto min-h-[32px] py-1.5 flex items-center justify-center px-8 shadow-lg border-b border-white/10 relative overflow-hidden">
      
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shimmer"></div>

      <div className="relative z-10 flex flex-row items-center justify-center gap-2 text-[10px] md:text-xs font-bold tracking-wide w-full text-center truncate">
        
        <div className="flex items-center gap-1.5 justify-center truncate">
            <Tag size={10} className="text-white shrink-0 hidden sm:block" fill="currentColor" />
            <span className="truncate">
              <span className="uppercase text-yellow-200 font-black tracking-wider drop-shadow-md mr-1">Offer:</span>
              Factory Direct Pricing ends {deadline}
            </span>
        </div>

        <button 
          onClick={scrollToQuote}
          className="hidden md:flex items-center gap-1 bg-white text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold hover:bg-yellow-50 transition-colors shadow-sm uppercase tracking-wider transform hover:scale-105 duration-200 shrink-0"
        >
          Claim <ArrowRight size={10} />
        </button>
      </div>
      
      <button 
        onClick={onClose}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/10 rounded-full transition-colors text-white/90 hover:text-white z-20"
        aria-label="Close announcement"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
