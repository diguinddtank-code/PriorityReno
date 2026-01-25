import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#locations' },
    { name: 'Process', href: '#process' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  const scrollToQuote = () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-slate-100' 
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Area */}
            <div className="relative z-50 flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
              {/* Logo Container */}
              <div className={`relative transition-all duration-300`}>
                 <img 
                  src="https://i.imgur.com/VBoJH82.png" 
                  alt="Priority Renovations Logo" 
                  className={`h-10 w-auto md:h-14 object-contain transition-all duration-300`}
                />
              </div>
              
              <div className={`flex flex-col ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity duration-300`}>
                <span className={`text-base md:text-lg font-serif font-bold tracking-tight leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                  PRIORITY
                </span>
                <span className={`text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase ${isScrolled ? 'text-brand-orange' : 'text-slate-200'}`}>
                  RENOVATIONS
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    isScrolled ? 'text-slate-600 hover:text-brand-orange' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-brand-orange' : 'bg-white'}`}></span>
                </a>
              ))}
              
              <div className={`h-6 w-px ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`}></div>

              <a href="tel:4703804785" className={`flex items-center gap-2 text-sm font-bold ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                <Phone size={16} className="text-brand-orange" />
                +1 (470) 380-4785
              </a>

              <Button variant="primary" className="ml-2 !py-2.5 !px-6 text-sm shadow-xl hover:shadow-orange-500/40" onClick={scrollToQuote}>
                Free Estimate
              </Button>
            </div>

            {/* Mobile Controls (Button + Menu) */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
              {/* New Mobile Quote Button */}
              <button 
                onClick={scrollToQuote}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg transition-all ${
                    isScrolled 
                    ? 'bg-brand-orange text-white shadow-orange-500/20' 
                    : 'bg-white text-slate-900'
                }`}
              >
                Free Quote
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isMobileMenuOpen ? 'bg-white text-slate-900' : (isScrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10 backdrop-blur-md')
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900 z-40 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="space-y-6 relative z-10">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className={`block text-4xl font-serif font-bold text-white hover:text-brand-orange transition-colors transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms`, transitionDuration: '500ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div 
              className={`pt-8 space-y-4 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '400ms', transitionDuration: '500ms' }}
            >
              <Button fullWidth onClick={scrollToQuote} className="justify-between text-lg py-4">
                Get Free Quote <ArrowRight />
              </Button>
              <p className="text-slate-400 text-center text-sm tracking-widest uppercase mt-8">
                Metro Atlanta's Finest
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;