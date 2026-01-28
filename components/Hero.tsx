import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Star, ShieldCheck, Hammer, BadgeCheck, Zap, Ruler, CheckCircle2, Phone, Tag, Users, ChevronDown, Loader2 } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (videoRef.current) {
        // Optimized transform update
        videoRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0) scale(1.1)`;
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = `${1 - scrolled / 900}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const marqueeItems = [
    { icon: Ruler, text: "Free In-Home Estimates" },
    { icon: Zap, text: "3-5 Day Installation Turnaround" },
    { icon: Hammer, text: "Certified Stone Installers" },
    { icon: BadgeCheck, text: "Satisfaction Guaranteed" },
    { icon: ShieldCheck, text: "Licensed & Insured Contractors" },
    { icon: Star, text: "#1 Rated in Atlanta" },
  ];

  const handlePhoneClick = (e: React.MouseEvent) => {
    // @ts-ignore
    if (typeof window.gtag_report_conversion === 'function') {
        e.preventDefault();
        // @ts-ignore
        window.gtag_report_conversion('tel:4703804785');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
        const response = await fetch("https://formsubmit.co/ajax/priorityrenovationsatl@gmail.com", {
            method: "POST",
            body: formData,
            headers: { 
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setFormStatus('success');
            
            // --- CONVERSION TRACKING TRIGGER ---
            // Explicitly fire Google Ads conversion on successful submission
            // @ts-ignore
            if (typeof window.gtag_report_conversion === 'function') {
                 // @ts-ignore
                 window.gtag_report_conversion();
                 console.log("Conversion Event Fired: Form Submit (Hero)");
            }
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20 pb-16 md:pt-0 md:pb-0">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80 transition-transform duration-75 ease-out scale-110 will-change-transform"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay - Optimized for Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center" ref={contentRef}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Copywriting & Mobile Layout */}
            <div className="lg:col-span-7 flex flex-col items-center text-center lg:text-left lg:items-start">
            
                {/* Top Badge (Static) - Reduced margin on mobile */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4 border border-white/20 shadow-lg">
                    <Star size={12} className="text-brand-orange fill-brand-orange" />
                    #1 Stone & Cabinet Installers
                </div>
                
                {/* Main Headline (Static) - Adjusted leading for mobile */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-3 md:mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    <span className="block">
                        Countertops & Cabinets
                    </span>
                    <span className="block">
                        <span className="text-brand-orange italic relative inline-block">
                            Factory Direct
                            <svg className="absolute w-full h-2 -bottom-0 left-0 text-brand-orange opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </span>
                </h1>

                {/* PRICING PILL (Static) - More compact padding */}
                <div className="inline-flex items-center gap-2 md:gap-3 bg-black/40 border border-white/20 rounded-full pl-1.5 pr-3 py-1 md:pl-2 md:pr-4 md:py-1.5 mb-5 md:mb-6 backdrop-blur-md shadow-lg">
                    <div className="bg-brand-orange rounded-full p-1">
                        <Tag size={10} className="text-white md:w-3 md:h-3" />
                    </div>
                    <span className="text-[10px] md:text-sm text-slate-100 font-medium tracking-wide">
                        Save 30% <span className="text-white/30 mx-1 md:mx-2">|</span> <span className="text-brand-orange font-bold uppercase">Direct Importer Pricing</span>
                    </span>
                </div>
                
                {/* Subheadline (Static) */}
                <p className="text-sm sm:text-lg text-slate-100 max-w-xl font-light leading-relaxed mb-6 md:mb-8 mx-auto lg:mx-0 drop-shadow-md">
                    Stop searching for "installers near me" and go direct. We are Atlanta's premier granite, quartz, and cabinet specialists.
                </p>

                {/* Mobile STACKED CTA Buttons - REDUCED SIZE & CLUTTER */}
                <div className="flex flex-col gap-2 w-full lg:hidden mb-6">
                    <Button 
                        variant="primary" 
                        fullWidth
                        className="h-12 text-sm font-bold rounded-lg shadow-lg shadow-orange-900/40 bg-brand-orange border-none active:scale-[0.98] transition-transform flex items-center justify-center gap-2" 
                        onClick={() => document.getElementById('quote-form')?.scrollIntoView({behavior: 'smooth'})}
                    >
                        Get Free Installation Quote <ArrowRight size={16} className="text-white/80" />
                    </Button>
                    <a 
                        href="tel:4703804785"
                        onClick={handlePhoneClick}
                        className="w-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white h-12 rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs hover:bg-slate-900/80 transition-all shadow-lg active:scale-[0.98]"
                    >
                        <Phone size={16} className="text-brand-orange" /> Call Installers Now
                    </a>
                </div>

                {/* --- TRUST BADGES (Compacted for Mobile) --- */}
                <div className="w-full flex flex-col items-center lg:items-start gap-3">
                    
                    {/* Compacted Trust Layout for Mobile */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4">
                        
                        {/* Google - More compact vertical padding */}
                        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl py-2 px-4 rounded-xl border border-white/15 shadow-xl">
                             <div className="bg-white p-1 rounded-full flex-shrink-0 shadow-sm">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-3.5 h-3.5" alt="G" />
                             </div>
                             <div className="flex flex-col text-left">
                                 <div className="flex text-[#FBBC05] space-x-0.5">
                                    <Star size={10} fill="currentColor"/>
                                    <Star size={10} fill="currentColor"/>
                                    <Star size={10} fill="currentColor"/>
                                    <Star size={10} fill="currentColor"/>
                                    <Star size={10} fill="currentColor"/>
                                 </div>
                                 <span className="text-[9px] text-white font-bold uppercase tracking-wide opacity-90">5.0 Rating</span>
                             </div>
                        </div>

                        {/* Badges - Side by side on mobile now */}
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg py-1.5 px-2.5 backdrop-blur-sm">
                                <ShieldCheck size={14} className="text-green-500" />
                                <span className="text-[9px] text-slate-200 font-bold uppercase tracking-wide">Licensed</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg py-1.5 px-2.5 backdrop-blur-sm">
                                <Users size={14} className="text-brand-orange" />
                                <span className="text-[9px] text-slate-200 font-bold uppercase tracking-wide">Family Owned</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* RIGHT COLUMN: Desktop Form (Solid Color + Premium Badge) */}
            <div className="lg:col-span-5 hidden lg:block">
                <div className="relative max-w-md mx-auto lg:ml-auto">
                     
                     {/* PREMIUM BADGE EFFECT */}
                     <div className="absolute -top-6 -right-6 z-20">
                        <div className="relative group">
                            {/* Glow behind */}
                            <div className="absolute inset-0 bg-brand-orange blur-lg opacity-40 animate-pulse"></div>
                            
                            <div className="relative bg-gradient-to-br from-brand-orange to-orange-600 text-white px-5 py-3 rounded-full shadow-2xl border-2 border-brand-gold/50 flex items-center gap-3 overflow-hidden">
                                 {/* Shimmer Effect */}
                                 <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                                 
                                 <div className="bg-white/20 p-1.5 rounded-full"><ShieldCheck size={20} className="text-white" /></div>
                                 <div className="flex flex-col leading-none">
                                    <span className="text-[9px] uppercase font-bold text-white/90 mb-0.5">Guaranteed</span>
                                    <span className="text-base font-extrabold tracking-wide text-white drop-shadow-sm">BEST PRICE IN GA</span>
                                 </div>
                            </div>
                        </div>
                     </div>

                     {/* SOLID FORM CONTAINER */}
                     <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group min-h-[460px] flex flex-col justify-center">
                        
                        {formStatus === 'success' ? (
                            <div className="text-center animate-fade-in py-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full text-slate-900 mb-6 shadow-lg shadow-green-500/30">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-4">Request Received!</h3>
                                <p className="text-slate-400 mb-6 max-w-xs mx-auto">
                                    Thank you. One of our specialists will call you shortly to discuss your project.
                                </p>
                                <Button 
                                    variant="outline" 
                                    className="!border-slate-700 !text-slate-300 hover:!bg-slate-800 hover:!border-slate-600"
                                    onClick={() => setFormStatus('idle')}
                                >
                                    Send Another Request
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-serif text-white mb-2">Get Your Free Estimate</h3>
                                <p className="text-slate-400 text-sm mb-6">Lock in special pricing. No obligation.</p>

                                <form 
                                    className="space-y-4 relative z-10" 
                                    onSubmit={handleSubmit}
                                >
                                    {/* FormSubmit Configuration Hidden Fields */}
                                    <input type="hidden" name="_subject" value="New Hero Quote Request (Top of Page)" />
                                    <input type="hidden" name="_captcha" value="false" />
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="text" name="_honey" style={{display: 'none'}} />
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <input required type="text" name="name" placeholder="Name" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:border-brand-orange outline-none text-sm transition-all focus:ring-1 focus:ring-brand-orange" />
                                        </div>
                                        <div>
                                            <input required type="tel" name="phone" placeholder="Phone Number" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:border-brand-orange outline-none text-sm transition-all focus:ring-1 focus:ring-brand-orange" />
                                        </div>
                                        <div>
                                            <input required type="email" name="email" placeholder="Email Address" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-500 focus:border-brand-orange outline-none text-sm transition-all focus:ring-1 focus:ring-brand-orange" />
                                        </div>
                                        <div className="relative">
                                            <select required name="projectType" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:border-brand-orange outline-none text-sm transition-all focus:ring-1 focus:ring-brand-orange appearance-none cursor-pointer">
                                                <option value="" disabled selected className="text-slate-500">Select Project Type</option>
                                                <option value="countertops">Countertops Installation</option>
                                                <option value="cabinets">Cabinet Refacing</option>
                                                <option value="kitchen">Full Kitchen Remodel</option>
                                                <option value="bathroom">Bathroom Vanity Install</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        variant="primary" 
                                        fullWidth 
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="font-bold tracking-wide shadow-lg shadow-orange-500/20 mt-2 py-4 text-base flex items-center justify-center gap-2"
                                    >
                                        {formStatus === 'submitting' ? (
                                            <><Loader2 className="animate-spin" size={20} /> Sending...</>
                                        ) : (
                                            "Check Availability Near Me"
                                        )}
                                    </Button>
                                    
                                    {formStatus === 'error' && (
                                        <p className="text-red-400 text-xs text-center mt-2">Something went wrong. Please try again or call us.</p>
                                    )}

                                    <p className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                                        <ShieldCheck size={10} /> Your privacy is our priority.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Dynamic Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-white/5 py-3 md:py-4 z-20 overflow-hidden block">
        <div className="flex w-full">
            <div className="flex animate-[marquee_12s_linear_infinite] md:animate-[marquee_35s_linear_infinite] whitespace-nowrap min-w-full">
                {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 opacity-70 hover:opacity-100 transition-opacity">
                        <item.icon size={16} className="text-brand-orange md:w-[18px] md:h-[18px]" />
                        <span className="text-white text-[10px] md:text-sm font-bold uppercase tracking-widest">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;