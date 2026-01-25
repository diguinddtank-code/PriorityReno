import React, { useState } from 'react';
import { Award, Gem, Clock, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: 1,
      icon: Award,
      title: "Expert Stone Installers",
      subtitle: "15+ Years Experience",
      desc: "Our granite and quartz installers are factory-trained artisans. We use digital laser templating for 100% accurate countertop installation and seamless fits.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: Gem,
      title: "Direct Granite Sourcing",
      subtitle: "No Middleman",
      desc: "We import slabs directly, making us the most affordable stone supplier in Atlanta. Get premium Grade-A materials without big-box retailer markups.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: Clock,
      title: "3-5 Day Installation",
      subtitle: "Fast Turnaround",
      desc: "Need countertops installed fast? Once templates are taken, our local fabrication shop cuts your stone in record time. We don't leave you without a kitchen.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      icon: Sparkles,
      title: "Clean Installation",
      subtitle: "Dust-Free Process",
      desc: "We are professional contractors who respect your home. Our installation team uses industrial air scrubbers and protective coverings to leave your space spotless.",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-slate-950 py-12 md:py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-3xl rounded-full translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal width="100%" variant="down">
                <div className="mb-10 md:mb-16 text-center md:text-left">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Why Choose Priority</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 md:mt-4">The Best Installers in Atlanta.</h2>
                </div>
            </Reveal>

            {/* --- MOBILE LAYOUT (Compact Stack) --- */}
            <div className="flex flex-col gap-4 md:hidden">
                {features.map((feature, idx) => (
                    <Reveal key={idx} width="100%" delay={idx * 100} variant="right">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-row h-32 items-stretch">
                            {/* Mobile Image Left */}
                            <div className="w-1/3 relative shrink-0">
                                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-slate-900/30"></div>
                            </div>
                            
                            {/* Mobile Content Right */}
                            <div className="w-2/3 p-4 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <feature.icon size={16} className="text-brand-orange" />
                                    <h3 className="text-sm font-bold text-white leading-tight">{feature.title}</h3>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* --- DESKTOP LAYOUT (Split Screen Sticky - COMPACT) --- */}
            <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column: Interactive List */}
                <div className="col-span-5 flex flex-col justify-center gap-2">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`p-5 rounded-xl cursor-pointer transition-all duration-500 ease-out-expo border ${
                                activeIndex === idx 
                                ? 'bg-white/10 border-brand-orange/50 translate-x-2 shadow-lg shadow-brand-orange/10' 
                                : 'bg-transparent border-transparent hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div className={`p-1.5 rounded-lg transition-colors duration-300 ${activeIndex === idx ? 'bg-brand-orange text-white' : 'bg-slate-800 text-slate-400'}`}>
                                    <feature.icon size={18} />
                                </div>
                                <h3 className={`text-lg font-bold transition-colors duration-300 ${activeIndex === idx ? 'text-white' : 'text-slate-400'}`}>
                                    {feature.title}
                                </h3>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === idx ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                <p className="text-slate-300 text-sm leading-relaxed pl-[42px]">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Sticky Image Preview - Reduced Height */}
                <div className="col-span-7 relative h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                            
                            <div className={`absolute bottom-8 left-8 max-w-md transition-all duration-700 delay-100 transform ${activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-brand-orange w-6 h-1"></div>
                                    <span className="text-white font-bold uppercase tracking-widest text-xs">{feature.subtitle}</span>
                                </div>
                                <h3 className="text-3xl font-serif text-white leading-tight">
                                    {feature.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};

export default WhyChooseUs;