import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layers, Star, ArrowRight, LayoutTemplate, X, CheckCircle2, Clock, Utensils, Bath, ChevronRight, ShieldCheck } from 'lucide-react';
import Button from './Button';
import { Reveal } from './Reveal';

const Features: React.FC = () => {
  const services = [
    {
      icon: Layers,
      title: 'Countertop Installation',
      badge: 'Best Seller',
      badgeColor: 'bg-brand-orange text-white', 
      desc: 'Expert granite & quartz countertop installers.',
      img: 'https://builderssurplusyeehaa.com/wp-content/uploads/2025/08/countertop-styles-granite-countertops.jpg',
      longDesc: "Looking for countertop installers near you? We provide precision fabrication and installation of Granite, Quartz, and Marble. We are the direct stone source in Atlanta, eliminating the middleman to give you the best price per square foot.",
      details: {
        materials: ['Quartz Install', 'Granite Slabs', 'Marble', 'Quartzite'],
        benefits: ['Scratch Resistant', 'Factory Direct Price', 'Pro Installation'],
        duration: '2-4 Days Install'
      }
    },
    {
      icon: LayoutTemplate,
      title: 'Cabinet Refacing',
      badge: 'High Value',
      badgeColor: 'bg-blue-600 text-white', 
      desc: 'Custom cabinet refacing & door replacement.',
      img: 'https://cabinetcurestriangle.com/wp-content/uploads/2021/10/kitchen-cabinet-refacing-raleigh.jpg',
      longDesc: "Don't tear out your kitchen; upgrade it. Our cabinet refacing services in Atlanta transform your existing boxes with new solid wood doors, veneers, and soft-close hardware. It's the fastest way to get a custom look for less.",
      details: {
        materials: ['Solid Wood Doors', 'Custom Veneers', 'New Hardware'],
        benefits: ['Cost Effective', 'Fast Turnaround', 'Soft-Close Hinges'],
        duration: '5-7 Days'
      }
    },
    {
      icon: Utensils,
      title: 'Kitchen Remodeling',
      badge: 'Full Service',
      badgeColor: 'bg-slate-900 text-white border border-slate-700', 
      desc: 'Fast-track kitchen renovation contractors.',
      img: 'https://iconcustombuilders.com/wp-content/uploads/2024/05/DS77374-Final-web-copy-scaled-1.webp',
      longDesc: "We are full-service kitchen remodeling contractors handling everything from demolition to plumbing and electrical. If you need a complete layout change or a turnkey kitchen makeover, our local team manages the entire project efficiently.",
      details: {
        materials: ['Full Design', 'Flooring', 'Plumbing & Electric'],
        benefits: ['Project Management', 'Turnkey Service', 'Warranty Included'],
        duration: '12-15 Days'
      }
    },
    {
      icon: Bath,
      title: 'Bathroom Vanities',
      badge: 'Luxury',
      badgeColor: 'bg-[#D4AF37] text-white', 
      desc: 'Stone vanity tops & bathroom remodeling.',
      img: 'https://images.ctfassets.net/79nimht05j33/OIrqW3haWkPOz5ZLzBs6S/b1faaa0f56fed3982b982275740d43ea/bathroom_vanity_cabinets.jpg?w=1300&h=729&fl=progressive&q=70&fm=jpg&bg=transparent',
      longDesc: "Upgrade your master bath with custom stone vanity tops and shower surrounds. We fabricate remnants and full slabs for bathroom projects, offering a luxury spa feel with professional waterproofing and tile installation.",
      details: {
        materials: ['Vanity Tops', 'Shower Tile', 'Frameless Glass'],
        benefits: ['Waterproofing', 'Spa Design', 'Value Add'],
        duration: '3-5 Days'
      }
    }
  ];

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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
    <section id="services" className="py-12 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%" variant="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Local Services</span>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mt-3 mb-4">Installation & Renovation Services</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              From quartz fabrication to cabinet refacing, we are the trusted local contractors for your home improvement needs.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 150} width="100%" variant="up">
              <div 
                className="group relative h-[340px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ease-out-expo transform hover:-translate-y-2"
                onClick={() => setSelectedService(service)}
              >
                <img 
                  src={service.img} 
                  alt={service.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-95 transition-opacity duration-500"></div>
                
                {/* HIGH CONTRAST BADGE */}
                <div className={`absolute top-4 right-4 ${service.badgeColor} text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg md:opacity-0 md:group-hover:opacity-100 md:translate-y-[-10px] md:group-hover:translate-y-0 transition-all duration-500 delay-100 z-20`}>
                    {service.badge}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-6 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
                  <div className="flex items-center gap-3 mb-2 md:mb-2">
                     <div className="bg-brand-orange text-white p-2 rounded-lg shadow-lg shadow-orange-500/30 transition-transform duration-500 group-hover:scale-110">
                        <service.icon size={20} />
                     </div>
                     <h3 className="text-xl md:text-xl font-serif text-white">{service.title}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-300 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-2 md:line-clamp-2 mt-2 md:mt-0 font-light leading-relaxed">
                    {service.desc}
                  </p>
                  
                  {/* "Quick Info" Line for Mobile */}
                   <div className="mt-3 flex gap-2 md:hidden">
                       <span className="text-[10px] text-white bg-white/10 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                          <Clock size={10} /> {service.details.duration}
                       </span>
                   </div>

                  <div className="mt-4 flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 delay-100">
                    See Details <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* --- MOBILE OPTIMIZED MODAL --- */}
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
                    {/* Mobile Title Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden opacity-90"></div>
                    <div className="absolute bottom-4 left-6 md:hidden z-10">
                        <div className="bg-brand-orange text-white p-2 rounded-lg inline-block shadow-lg mb-2">
                            <selectedService.icon size={20} />
                        </div>
                        <h3 className="text-2xl font-serif text-white leading-none shadow-black drop-shadow-md">{selectedService.title}</h3>
                    </div>
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
                                <p className="text-sm font-medium text-slate-700">Lifetime on Install Labor</p>
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