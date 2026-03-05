import React, { useMemo } from 'react';
import { X, ArrowRight, MapPin } from 'lucide-react';

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
    <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-900 text-white h-auto min-h-[40px] py-2 md:py-0 flex items-center justify-center px-4 shadow-md border-b border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm font-medium tracking-wide w-full text-center md:text-left">
        
        <div className="flex items-center gap-2 justify-center flex-wrap">
            <MapPin size={14} className="text-brand-orange shrink-0" />
            <span>
              <span className="font-bold text-brand-orange uppercase">Metro Atlanta Special:</span> Direct pricing valid until {deadline}.
            </span>
        </div>

        <button 
          onClick={scrollToQuote}
          className="hidden md:flex items-center gap-1 hover:text-brand-orange transition-colors underline decoration-brand-orange/50 underline-offset-4 whitespace-nowrap"
        >
          Lock in your price <ArrowRight size={12} />
        </button>
      </div>
      
      <button 
        onClick={onClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
