import React, { useState, useEffect } from 'react';
import { Home, Layers, Image, Phone, Calculator } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [activeId, setActiveId] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Visibility: Hide when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide dock when near footer (to avoid clutter)
      const footer = document.querySelector('footer');
      const footerRect = footer?.getBoundingClientRect();
      const isNearFooter = footerRect ? footerRect.top < window.innerHeight : false;

      if (isNearFooter) {
        setIsVisible(false);
      } else if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'transformation', icon: Calculator, label: 'Results' }, // New Section Link
    { id: 'locations', icon: Image, label: 'Gallery' },
  ];

  const handleScroll = (id: string) => {
    setActiveId(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Offset for the sticky header
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <nav className="flex items-center gap-1 p-1.5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 ring-1 ring-white/5">
        
        {/* Navigation Items */}
        <div className="flex items-center gap-1 px-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`relative w-12 h-12 flex flex-col items-center justify-center rounded-full transition-all duration-300 ${
                  isActive ? 'bg-white/10 text-brand-orange' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1"></div>

        {/* Primary Action Button */}
        <a 
          href="tel:4703804785"
          className="flex items-center justify-center w-12 h-12 bg-brand-orange text-white rounded-full shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
        >
          <Phone size={20} fill="currentColor" />
        </a>

      </nav>
    </div>
  );
};

export default MobileNav;