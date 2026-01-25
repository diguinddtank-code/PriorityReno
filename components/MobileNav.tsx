import React, { useState, useEffect } from 'react';
import { Home, Image, Star, Phone, Layers } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [activeId, setActiveId] = useState('home');

  // Active State Detection
  useEffect(() => {
    const sections = ['home', 'services', 'locations', 'testimonials'];
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
    { id: 'services', icon: Layers, label: 'Services' },
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

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-[380px] transition-all duration-300"
    >
      <nav className="flex items-center justify-between px-2 py-1.5 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/5">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 flex-1 justify-around">
          {navItems.map((item) => {
            const isActive = activeId === (item.id === 'home' ? 'root' : item.id) || activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center w-12 h-10 rounded-lg transition-all duration-300 group`}
              >
                <div className={`transition-all duration-300 ${isActive ? 'text-brand-orange -translate-y-0.5' : 'text-slate-400'}`}>
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={`absolute bottom-0.5 text-[8px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-1 text-slate-500'
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
        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {/* Action Button - ONLY PHONE (Primary Style - Orange) */}
        <a 
          href="tel:4703804785"
          className="flex items-center justify-center w-10 h-10 bg-brand-orange text-white rounded-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:bg-orange-600 shrink-0"
          aria-label="Call Now"
        >
          <Phone size={18} />
        </a>

      </nav>
    </div>
  );
};

export default MobileNav;