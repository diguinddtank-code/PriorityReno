import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layers, ArrowRight, LayoutTemplate, X, CheckCircle2, Clock, Utensils, Bath, ChevronRight, ShieldCheck, Sparkles, Hammer, Grid3X3, AlignJustify, BadgeCheck } from 'lucide-react';
import Button from './Button';
import { Reveal } from './Reveal';

const Features: React.FC = () => {
  const services = [
    {
      id: "01",
      icon: Layers,
      title: 'Countertop Installation',
      badge: 'Best Seller',
      badgeColor: 'bg-brand-orange text-white', 
      desc: 'Granite & quartz fabrication.',
      img: 'https://builderssurplusyeehaa.com/wp-content/uploads/2025/08/countertop-styles-granite-countertops.jpg',
      longDesc: "Precision fabrication and installation of Granite, Quartz, and Marble. We are the direct stone source in Atlanta, eliminating the middleman.",
      details: {
        materials: ['Quartz Install', 'Granite Slabs', 'Marble', 'Quartzite'],
        benefits: ['Scratch Resistant', 'Factory Direct Price', 'Pro Installation'],
        duration: '2-4 Days',
        warranty: 'Lifetime Labor'
      }
    },
    {
      id: "02",
      icon: LayoutTemplate,
      title: 'Cabinet Refacing',
      badge: 'High Value',
      badgeColor: 'bg-blue-600 text-white', 
      desc: 'New doors on existing boxes.',
      img: 'https://cabinetcurestriangle.com/wp-content/uploads/2021/10/kitchen-cabinet-refacing-raleigh.jpg',
      longDesc: "Transform your existing boxes with new solid wood doors, veneers, and soft-close hardware. The fastest way to get a custom look for less.",
      details: {
        materials: ['Solid Wood Doors', 'Custom Veneers', 'New Hardware'],
        benefits: ['Cost Effective', 'Fast Turnaround', 'Soft-Close Hinges'],
        duration: '5-7 Days',
        warranty: '5-Year Finish'
      }
    },
    {
      id: "03",
      icon: Utensils,
      title: 'Kitchen Remodeling',
      badge: 'Turnkey',
      badgeColor: 'bg-slate-900 text-white border border-slate-700', 
      desc: 'Full demolition & renovation.',
      img: 'https://iconcustombuilders.com/wp-content/uploads/2024/05/DS77374-Final-web-copy-scaled-1.webp',
      longDesc: "Full-service remodeling handling demolition, plumbing, electrical, and flooring. We manage the entire project efficiently.",
      details: {
        materials: ['Full Design', 'Flooring', 'Plumbing & Electric'],
        benefits: ['Project Management', 'Turnkey Service', 'Warranty Included'],
        duration: '12-15 Days',
        warranty: 'Full Service'
      }
    },
    {
      id: "04",
      icon: Bath,
      title: 'Bathroom Vanities',
      badge: 'Luxury',
      badgeColor: 'bg-[#D4AF37] text-white', 
      desc: 'Stone tops & showers.',
      img: 'https://images.ctfassets.net/79nimht05j33/OIrqW3haWkPOz5ZLzBs6S/b1faaa0f56fed3982b982275740d43ea/bathroom_vanity_cabinets.jpg?w=1300&h=729&fl=progressive&q=70&fm=jpg&bg=transparent',
      longDesc: "Custom stone vanity tops and shower surrounds. We fabricate remnants and full slabs for a luxury spa feel.",
      details: {
        materials: ['Vanity Tops', 'Shower Tile', 'Frameless Glass'],
        benefits: ['Waterproofing', 'Spa Design', 'Value Add'],
        duration: '3-5 Days',
        warranty: 'Waterproof'
      }
    },
    {
      id: "05",
      icon: Hammer,
      title: 'Deck Builder',
      badge: 'Outdoor',
      badgeColor: 'bg-green-700 text-white', 
      desc: 'Custom decks & patios.',
      img: 'https://deckguardian.com/wp-content/uploads/2021/12/project-marlboro-03-1024x683.jpg',
      longDesc: "Expand your living space outdoors. We design and build custom pressure-treated and composite decks that withstand the Georgia weather and add value to your home.",
      details: {
        materials: ['Composite (Trex)', 'Pressure Treated', 'Cedar', 'Railings'],
        benefits: ['Rot Resistant', 'Custom Design', 'Permit Handling'],
        duration: '5-10 Days',
        warranty: 'Structural'
      }
    },
    {
      id: "06",
      icon: Grid3X3,
      title: 'Custom Tile Work',
      badge: 'Precision',
      badgeColor: 'bg-purple-700 text-white', 
      desc: 'Backsplashes & showers.',
      img: 'https://howtonestforless.com/wp-content/uploads/2014/10/kitchen-backsplash-tutorial.jpg',
      longDesc: "From intricate kitchen backsplashes to floor-to-ceiling shower tiling. Our master setters ensure perfect grout lines and waterproofing for a flawless finish.",
      details: {
        materials: ['Porcelain', 'Ceramic', 'Glass Mosaic', 'Natural Stone'],
        benefits: ['Waterproof Systems', 'Laser Leveling', 'Custom Niches'],
        duration: '2-5 Days',
        warranty: '2-Year Labor'
      }
    },
    {
      id: "07",
      icon: AlignJustify,
      title: 'Flooring Installation',
      badge: 'Durable',
      badgeColor: 'bg-amber-800 text-white', 
      desc: 'LVP, Hardwood & Tile.',
      img: 'https://cdn.shopify.com/s/files/1/0568/0942/2895/files/hardwood-installation-and-measure_png.png?v=1741104029',
      longDesc: "Upgrade your home's foundation. We specialize in installation of Luxury Vinyl Plank (LVP), engineered hardwood, and large format tile flooring for high-traffic areas.",
      details: {
        materials: ['LVP (Waterproof)', 'Engineered Wood', 'Hardwood Refinish'],
        benefits: ['Scratch Resistant', 'Moisture Proof', 'Sound Dampening'],
        duration: '1-3 Days',
        warranty: 'Install Guarantee'
      }
    }
  ];

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [activeDesktopService, setActiveDesktopService] = useState(services[0]);

  // Handle scroll lock for mobile modal
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => { 
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedService]);

  const handleGetQuote = () => {
    setSelectedService(null);
    setTimeout(() => {
      const form = document.getElementById('quote-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
        const input = form.querySelector('input');
        if (input) input.focus();
      }
    }, 300);
  };

  return (
    <section id="services" className="py-12 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" variant="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs bg-brand-orange/10 px-3 py-1 rounded-full">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mt-4 mb-4">Renovation Services</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We specialize in high-ROI upgrades. Select a service below to learn more.
            </p>
          </div>
        </Reveal>

        {/* --- DESKTOP LAYOUT: INTERACTIVE SHOWROOM (Bright & Clear) --- */}
        <div className="hidden lg:grid grid-cols-12 gap-6 h-[650px]">
            
            {/* LEFT: Navigation Menu */}
            <div className="col-span-4 flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
                {services.map((service, idx) => {
                    const isActive = activeDesktopService.id === service.id;
                    return (
                        <button 
                            key={idx}
                            onClick={() => setActiveDesktopService(service)}
                            className={`group w-full text-left p-5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden shrink-0 ${
                                isActive 
                                ? 'bg-white border-brand-orange shadow-xl shadow-brand-orange/10 z-10' 
                                : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {/* Active Indicator Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${isActive ? 'bg-brand-orange' : 'bg-transparent group-hover:bg-slate-200'}`}></div>

                            <div className="flex items-center gap-4 pl-2">
                                <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                                    isActive ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                                }`}>
                                    <service.icon size={22} />
                                </div>
                                <div>
                                    <span className={`block text-lg font-bold leading-tight transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {service.title}
                                    </span>
                                    <span className="text-xs text-slate-400 mt-1 block font-medium">
                                        {service.desc}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                })}
                
                {/* Static Trust Card at bottom of nav */}
                <div className="mt-auto bg-slate-100 border border-slate-200 p-5 rounded-xl shrink-0">
                    <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                        <BadgeCheck className="text-brand-orange" size={18} /> Licensed Contractor
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        We are fully insured and licensed in the state of Georgia. All installations come with a labor warranty.
                    </p>
                </div>
            </div>

            {/* RIGHT: Display Showcase (No Heavy Overlay) */}
            <div className="col-span-8 relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 ring-1 ring-slate-900/5 group">
                
                {/* Main Image - Full Brightness */}
                <img 
                    key={activeDesktopService.img}
                    src={activeDesktopService.img} 
                    alt={activeDesktopService.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 animate-scale-in"
                />
                
                {/* Subtle Gradient ONLY at bottom for contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                {/* Floating "Glass" Info Card - Bottom Left */}
                <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xl bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 animate-fade-in-up">
                    
                    <div className="flex items-start justify-between mb-4">
                        <div>
                             <div className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-1">
                                <Sparkles size={12} /> {activeDesktopService.badge}
                            </div>
                            <h3 className="text-3xl font-serif text-slate-900 leading-tight">
                                {activeDesktopService.title}
                            </h3>
                        </div>
                        {/* Desktop Icon */}
                         <div className="hidden md:block bg-brand-orange text-white p-3 rounded-xl shadow-lg shadow-brand-orange/20">
                            <activeDesktopService.icon size={24} />
                        </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {activeDesktopService.longDesc}
                    </p>

                    {/* Quick Stats Grid - Making it concrete, not vague */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <Clock className="text-brand-orange shrink-0" size={18} />
                            <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase">Turnaround</span>
                                <span className="block text-sm font-bold text-slate-900">{activeDesktopService.details.duration}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <ShieldCheck className="text-green-600 shrink-0" size={18} />
                            <div>
                                <span className="block text-[10px] text-slate-400 font-bold uppercase">Warranty</span>
                                <span className="block text-sm font-bold text-slate-900">{activeDesktopService.details.warranty}</span>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleGetQuote} fullWidth className="shadow-lg shadow-brand-orange/20">
                        Get Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                {/* Floating Tags (Top Right) */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                    {activeDesktopService.details.materials.slice(0, 3).map((mat, i) => (
                        <span key={i} className="bg-black/50 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                            {mat}
                        </span>
                    ))}
                </div>

            </div>
        </div>


        {/* --- MOBILE LAYOUT: Vertical Stack (UNCHANGED as requested) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 150} width="100%" variant="up">
              <div 
                className="group relative h-[340px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ease-out-expo border border-slate-100"
                onClick={() => setSelectedService(service)}
              >
                <img 
                  src={service.img} 
                  alt={service.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500"></div>
                <div className={`absolute top-4 right-4 ${service.badgeColor} text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20`}>
                    {service.badge}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="bg-brand-orange text-white p-2 rounded-lg shadow-lg shadow-orange-500/30">
                        <service.icon size={20} />
                     </div>
                     <h3 className="text-xl font-serif text-white">{service.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-2">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest gap-2">
                    See Details <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* --- MOBILE OPTIMIZED MODAL (Unchanged) --- */}
        {selectedService && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
              onClick={() => setSelectedService(null)}
            ></div>
            
            {/* Card Content */}
            <div className="relative bg-white w-full md:max-w-4xl md:rounded-2xl rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92dvh] md:max-h-[80vh] animate-fade-in-up">
                
                {/* Mobile Drag Handle */}
                <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/50 rounded-full z-50 mix-blend-overlay"></div>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white md:text-slate-500 md:bg-slate-100 md:hover:bg-slate-200 z-50 transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-2/5 h-56 md:h-auto relative shrink-0">
                    <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden opacity-90"></div>
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-3/5 flex flex-col overflow-hidden bg-white h-full">
                    
                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10 custom-scrollbar">
                        <div className="hidden md:flex items-center gap-3 mb-4">
                            <div className="bg-brand-orange/10 text-brand-orange p-2 rounded-lg">
                                <selectedService.icon size={24} />
                            </div>
                            <h3 className="text-3xl font-serif text-slate-900">{selectedService.title}</h3>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base border-l-2 border-brand-orange pl-4">
                            {selectedService.longDesc}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-[10px] uppercase tracking-wide">
                                    <Clock size={12} className="text-brand-orange" /> Timeline
                                </div>
                                <p className="text-sm font-medium text-slate-700">{selectedService.details.duration}</p>
                            </div>
                            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-[10px] uppercase tracking-wide">
                                    <ShieldCheck size={12} className="text-brand-orange" /> Warranty
                                </div>
                                <p className="text-sm font-medium text-slate-700">{selectedService.details.warranty}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-green-500" /> What's Included
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedService.details.materials.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] md:text-xs font-medium border border-slate-200">
                                        {item}
                                    </span>
                                ))}
                                {selectedService.details.benefits.map((item, i) => (
                                    <span key={i + 10} className="px-3 py-1 bg-brand-orange/5 text-brand-orange rounded-full text-[10px] md:text-xs font-medium border border-brand-orange/10">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer for Mobile Actions (Sticky Bottom) */}
                    <div className="p-4 md:p-0 md:static bg-white border-t border-slate-100 md:border-0 w-full z-20 pb-8 md:pb-6 px-6">
                        <Button fullWidth onClick={handleGetQuote} className="shadow-xl shadow-brand-orange/20 py-4 text-base rounded-xl">
                            Start Your Project
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Features;