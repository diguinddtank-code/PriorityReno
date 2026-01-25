import React, { useState, useEffect } from 'react';
import { Home, Layers, Sparkles, Star, Phone } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [activeId, setActiveId] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Visibility Logic: Hides on scroll down, shows on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when near footer
      const footer = document.querySelector('footer');
      const footerRect = footer?.getBoundingClientRect();
      const isNearFooter = footerRect ? footerRect.top < window.innerHeight : false;

      if (isNearFooter) {
        setIsVisible(false);
      } else if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Scrolling Down -> Hide
      } else {
        setIsVisible(true); // Scrolling Up -> Show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Robust Active State Detection using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'services', 'transformation', 'testimonials'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Active when element is in the middle 20% of screen
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Special case: Hero is usually id="" or implies home, usually handled by scrollY=0
          // but we map ids directly here.
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id === 'home' ? 'root' : id); // root acts as home container
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'transformation', icon: Sparkles, label: 'Results' },
    { id: 'testimonials', icon: Star, label: 'Reviews' },
  ];

  const scrollToSection = (id: string) => {
    setActiveId(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Offset for header
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[90%] max-w-[360px] transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <nav className="flex items-center justify-between p-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/5">
        
        {/* Nav Items */}
        <div className="flex items-center justify-around flex-1 gap-1">
          {navItems.map((item) => {
            const isActive = activeId === (item.id === 'home' ? 'root' : item.id) || activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-brand-orange' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`} 
                />
                
                {/* Active Indicator Label */}
                <span className={`absolute bottom-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {item.label}
                </span>

                {/* Background Glow for active */}
                {isActive && (
                  <div className="absolute inset-0 bg-brand-orange/10 rounded-xl blur-md -z-10"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-white/10 mx-2"></div>

        {/* CTA Button */}
        <a 
          href="tel:4703804785"
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-orange to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
        >
          <Phone size={20} fill="currentColor" />
        </a>

      </nav>
    </div>
  );
};

export default MobileNav;