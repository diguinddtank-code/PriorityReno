import React, { useState, useEffect } from 'react';
import { Home, Image, Star, Phone, FileText } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [activeId, setActiveId] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Visibility Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      
      // Only trigger change if scroll delta is significant to prevent jitter
      if (delta < 10) return;

      const footer = document.querySelector('footer');
      const footerRect = footer?.getBoundingClientRect();
      const isNearFooter = footerRect ? footerRect.top < window.innerHeight : false;

      if (isNearFooter) {
        setIsVisible(false);
      } else if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Active State Detection
  useEffect(() => {
    const sections = ['home', 'locations', 'testimonials'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id === 'home' ? 'root' : id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'locations', icon: Image, label: 'Gallery' },
    { id: 'testimonials', icon: Star, label: 'Reviews' },
  ];

  const scrollToSection = (id: string) => {
    setActiveId(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const scrollToQuote = () => {
    const form = document.getElementById('quote-form');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[95%] max-w-[400px] transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}
    >
      <nav className="flex items-center justify-between px-2 py-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/5">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 flex-1 justify-around">
          {navItems.map((item) => {
            const isActive = activeId === (item.id === 'home' ? 'root' : item.id) || activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-300 group`}
              >
                <div className={`transition-all duration-300 ${isActive ? 'text-brand-orange -translate-y-1' : 'text-slate-400'}`}>
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={`absolute bottom-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-2 text-slate-500'
                }`}>
                  {item.label}
                </span>

                {isActive && (
                   <div className="absolute inset-x-3 bottom-0 h-0.5 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-2"></div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
            
            {/* Call Button */}
            <a 
              href="tel:4703804785"
              className="flex items-center justify-center w-12 h-12 bg-slate-800 text-slate-200 rounded-xl border border-white/5 active:scale-95 transition-all active:bg-slate-700"
              aria-label="Call Now"
            >
              <Phone size={20} />
            </a>

            {/* Quote Button (Primary) */}
            <button 
              onClick={scrollToQuote}
              className="flex items-center justify-center w-12 h-12 bg-brand-orange text-white rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:bg-orange-600"
              aria-label="Get Quote"
            >
              <FileText size={20} />
            </button>
        </div>

      </nav>
    </div>
  );
};

export default MobileNav;