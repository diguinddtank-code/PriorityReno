import React, { useState, useEffect } from 'react';
import { Home, Layers, Package, Image, Phone } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', offset: 0 },
    { id: 'services', icon: Layers, label: 'Services', offset: -50 },
    { id: 'materials', icon: Package, label: 'Materials', offset: -50 },
    { id: 'locations', icon: Image, label: 'Gallery', offset: -50 },
  ];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const item of navItems) {
        if (item.id === 'home') continue;
        
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, offset: number) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setActiveSection(id);
  };

  return (
    // Floating Container - Thinner padding and specific layout
    <div className="fixed bottom-6 left-4 right-4 z-[60] md:hidden pointer-events-none">
      
      <div className="pointer-events-auto max-w-[380px] mx-auto bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] p-1.5 flex items-center justify-between transition-transform duration-300">
        
        {/* Navigation Icons Area */}
        <div className="flex items-center justify-around flex-1 px-1 gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id, item.offset)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group ${
                    isActive ? 'bg-white/10 text-brand-orange' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={item.label}
              >
                <item.icon 
                  size={isActive ? 20 : 18} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-300"
                />
                {/* Subtle active dot indicator */}
                {isActive && (
                    <span className="absolute bottom-2 w-1 h-1 bg-brand-orange rounded-full shadow-[0_0_5px_rgba(249,115,22,1)]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Vertical Separator */}
        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {/* Highlighted CALL CTA */}
        <a 
            href="tel:4703804785"
            className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-widest hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-500/25 ml-1"
        >
            <Phone size={14} className="fill-current" />
            <span>CALL</span>
        </a>

      </div>
    </div>
  );
};

export default MobileNav;